/*
 * Plan picker on /pricing/ (markup: _includes/plan-picker.html).
 *
 * Highlights the cheapest plan column that covers the chosen number of products,
 * customers and licensing models. Each plan column declares its key and limits
 * (data-plan, data-products, data-customers; no limit means unlimited), and each
 * model checkbox lists the plans that include it (data-plans). A plan may sell
 * extra customers in packs (data-pack-size, data-pack-price per month, at most
 * data-pack-max packs; empty means no limit); its cost
 * is then data-price (data-offer-price while the promo shows) plus the packs.
 */
(function () {
  'use strict';

  var root = document.getElementById('plan-picker');
  var table = document.querySelector('.NL_pricing');
  if (!root || !table) {
    return;
  }

  var columns = [].slice.call(table.querySelectorAll('[data-plan]'));
  var plans = columns.map(function (column) {
    return {
      key: column.getAttribute('data-plan'),
      name: column.querySelector('.NL_plan_name').textContent,
      products: limit(column, 'products'),
      customers: limit(column, 'customers'),
      packSize: Number(column.getAttribute('data-pack-size')) || 0,
      packPrice: Number(column.getAttribute('data-pack-price')) || 0,
      packMax: Number(column.getAttribute('data-pack-max')) || Infinity
    };
  });

  var products = root.querySelector('[name=products]');
  var customers = root.querySelector('[name=customers]');
  var productsOut = root.querySelector('[data-for=products]');
  var customersOut = root.querySelector('[data-for=customers]');
  var productsUnit = root.querySelector('[data-unit=products]');
  var menuButton = root.querySelector('.NL_picker_models button');
  var menuLabel = menuButton.querySelector('span');
  var menu = root.querySelector('.NL_picker_menu');
  var models = [].slice.call(menu.querySelectorAll('input'));
  var reset = root.querySelector('.NL_picker_reset');
  var status = root.querySelector('[data-status]');

  // The highest fixed limits; one step beyond them stands for "more" ("10+").
  // For customers the slider also reaches one pack past the largest plan.
  var topProducts = highest('products');
  var topCustomers = Math.max.apply(null, plans.map(function (plan) {
    return plan.customers + plan.packSize;
  }).filter(isFinite));
  products.max = topProducts + 1;
  customers.max = topCustomers + 50;

  function limit(column, name) {
    return limitValue(column.getAttribute('data-' + name));
  }

  function limitValue(value) {
    return value === null ? Infinity : Number(value);
  }

  function highest(name) {
    return Math.max.apply(null, plans.map(function (plan) {
      return plan[name];
    }).filter(isFinite));
  }

  function shown(value, top) {
    return value > top ? top + '+' : String(value);
  }

  function chosenModels() {
    return models.filter(function (box) {
      return box.checked;
    });
  }

  function includes(box, plan) {
    return box.getAttribute('data-plans').split(',').indexOf(plan.key) > -1;
  }

  // Packs a plan needs for c customers; Infinity if it cannot cover them.
  function packsNeeded(plan, c) {
    if (c <= plan.customers) {
      return 0;
    }
    // Past the end of the slider ("1500+") only an unlimited plan fits.
    if (!plan.packSize || c > topCustomers) {
      return Infinity;
    }
    var packs = Math.ceil((c - plan.customers) / plan.packSize);
    return packs > plan.packMax ? Infinity : packs;
  }

  // Monthly price as currently shown: the offer price while the promo is on.
  function price(column) {
    var offer = column.querySelector('.NL_price_tag[data-promo-on]');
    var name = offer && !offer.hidden ? 'data-offer-price' : 'data-price';
    return limitValue(column.getAttribute(name));
  }

  // The cheapest plan that fits and the packs it needs. A plan without a price
  // (the last one, no limits) is chosen only when no priced plan fits.
  function bestPlan() {
    var p = Number(products.value);
    var c = Number(customers.value);
    var chosen = chosenModels();
    var best = { index: plans.length - 1, packs: 0, cost: Infinity };
    plans.forEach(function (plan, i) {
      var fitsModels = chosen.every(function (box) {
        return includes(box, plan);
      });
      var packs = packsNeeded(plan, c);
      if (p > plan.products || !fitsModels || packs === Infinity) {
        return;
      }
      var cost = price(columns[i]) + packs * plan.packPrice;
      if (cost < best.cost) {
        best = { index: i, packs: packs, cost: cost };
      }
    });
    return best;
  }

  function render() {
    var p = Number(products.value);
    var chosen = chosenModels();
    productsOut.textContent = shown(p, topProducts);
    customersOut.textContent = shown(Number(customers.value), topCustomers);
    productsUnit.textContent = p === 1 ? 'product' : 'products';
    if (chosen.length === 0) {
      menuLabel.textContent = 'pick licensing models';
    } else if (chosen.length <= 3) {
      menuLabel.textContent = chosen.map(function (box) {
        return box.value;
      }).join(', ');
    } else {
      menuLabel.textContent = chosen.length + ' models';
    }
  }

  // index === null removes the highlight.
  function highlight(index, packs) {
    table.classList.toggle('NL_plan_picked', index !== null);
    columns.forEach(function (column, i) {
      column.classList.toggle('NL_plan_match', i === index);
      var tag = column.querySelector('.NL_price_pack');
      if (tag) {
        tag.classList.toggle('NL_price_pack_used', i === index && packs > 0);
      }
    });
  }

  function describe(best) {
    var plan = plans[best.index];
    if (best.packs === 0) {
      return plan.name + ' covers this';
    }
    return plan.name + ' + ' + best.packs + ' customer pack' + (best.packs === 1 ? '' : 's') +
      ' (+' + best.packs * plan.packPrice + ' € / month) covers this';
  }

  function update() {
    var best = bestPlan();
    render();
    highlight(best.index, best.packs);
    status.textContent = describe(best);
    reset.hidden = false;
  }

  function clear() {
    products.value = products.min;
    customers.value = customers.min;
    models.forEach(function (box) {
      box.checked = false;
    });
    render();
    highlight(null);
    status.textContent = '';
    reset.hidden = true;
  }

  function setMenu(open) {
    menu.hidden = !open;
    menuButton.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  products.addEventListener('input', update);
  customers.addEventListener('input', update);
  models.forEach(function (box) {
    box.addEventListener('change', update);
  });
  reset.addEventListener('click', clear);
  menuButton.addEventListener('click', function () {
    setMenu(menu.hidden);
  });
  document.addEventListener('click', function (event) {
    if (!menu.hidden && !menu.contains(event.target) && !menuButton.contains(event.target)) {
      setMenu(false);
    }
  });
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && !menu.hidden) {
      setMenu(false);
      menuButton.focus();
    }
  });

  root.hidden = false;
})();
