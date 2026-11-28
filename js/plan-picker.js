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
 *
 * The answer repeats the plan's price and its button (the column's data-plan-cta),
 * links to the column, and says why when only the plan without limits fits.
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
  var actions = root.querySelector('.NL_picker_actions');
  var pickCta = root.querySelector('[data-pick-cta]');
  var pickSee = root.querySelector('[data-pick-see]');

  // The highest fixed limits; one step beyond them stands for "more" ("10+").
  // For customers the slider also reaches one pack past the largest plan.
  var topProducts = highest('products');
  var topCustomers = Math.max.apply(null, plans.map(function (plan) {
    return plan.customers + plan.packSize;
  }).filter(isFinite));
  products.max = topProducts + 1;

  // The customer slider moves through uneven steps: fine where the plan limits are,
  // coarse above them. Its value is an index into this list.
  var steps = [];
  [[10, 50, 10], [60, 200, 20], [250, 500, 50], [600, 1000, 100], [1250, topCustomers, 250]].forEach(function (range) {
    for (var v = range[0]; v <= range[1] && v <= topCustomers; v += range[2]) {
      steps.push(v);
    }
  });
  plans.forEach(function (plan) {
    [plan.customers, plan.customers + plan.packSize * plan.packMax].forEach(function (v) {
      if (v <= topCustomers && steps.indexOf(v) < 0) {
        steps.push(v);
      }
    });
  });
  if (steps.indexOf(topCustomers) < 0) {
    steps.push(topCustomers);
  }
  steps.sort(function (a, b) {
    return a - b;
  });
  steps.push(topCustomers + 1);
  customers.min = 0;
  customers.max = steps.length - 1;
  customers.step = 1;
  customers.value = 0;

  function customerCount() {
    return steps[Number(customers.value)];
  }

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
    var c = customerCount();
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
    customersOut.textContent = shown(customerCount(), topCustomers);
    // Screen readers hear the shown value ("10+", "1500+"), not the slider position.
    products.setAttribute('aria-valuetext', productsOut.textContent);
    customers.setAttribute('aria-valuetext', customersOut.textContent);
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

  // In the licensing models row, marks each chosen model the column lists. A chosen
  // model it does not list comes from a lower plan: mark the "All in ..." line.
  function markModels(column, chosen) {
    var names = chosen.map(function (box) {
      return box.value;
    });
    var listed = [].slice.call(column.querySelectorAll('.NL_price_model')).map(function (model) {
      var name = model.getAttribute('data-model');
      model.classList.toggle('NL_price_model_used', names.indexOf(name) > -1);
      return name;
    });
    var inherited = column.querySelector('.NL_price_inherited');
    if (inherited) {
      inherited.classList.toggle('NL_price_inherited_used', names.some(function (name) {
        return listed.indexOf(name) < 0;
      }));
    }
  }

  // index === null removes the highlight.
  function highlight(index, packs, chosen) {
    table.classList.toggle('NL_plan_picked', index !== null);
    columns.forEach(function (column, i) {
      column.classList.toggle('NL_plan_match', i === index);
      markModels(column, i === index ? chosen : []);
      var tag = column.querySelector('.NL_price_pack');
      if (tag) {
        tag.classList.toggle('NL_price_pack_used', i === index && packs > 0);
      }
    });
  }

  // Why no plan with fixed limits fits; empty when the choice fits one.
  function reasons() {
    var priced = plans.slice(0, -1);
    var why = [];
    if (customerCount() > topCustomers) {
      why.push('Above ' + topCustomers + ' customers, limits are set to match your needs.');
    }
    var largest = priced[priced.length - 1];
    if (Number(products.value) > topProducts) {
      why.push(largest.name + ' includes up to ' + topProducts + ' products.');
    }
    chosenModels().forEach(function (box) {
      var sold = priced.some(function (plan) {
        return includes(box, plan);
      });
      if (!sold) {
        why.push(box.value + ' is not included in ' + largest.name + ' or below.');
      }
    });
    return why.join(' ');
  }

  function describe(best) {
    var plan = plans[best.index];
    var amount = price(columns[best.index]);
    var offer = columns[best.index].querySelector('.NL_price_tag[data-promo-on]');
    if (amount === Infinity) {
      return plan.name + ' fits: custom quote. ' + reasons();
    }
    if (amount === 0) {
      return plan.name + ' fits your products, customers and models: free.';
    }
    var text = plan.name + ' fits your products, customers and models: ' + amount + ' € / month';
    if (offer && !offer.hidden) {
      text += ' in year one';
    }
    if (best.packs > 0) {
      text += ', plus ' + best.packs + ' customer pack' + (best.packs === 1 ? '' : 's') +
        ' (+' + best.packs * plan.packPrice + ' € / month)';
    }
    return text + ', billed annually.';
  }

  // The same button as in the plan's column, and a link to that column.
  function offerActions(index) {
    var source = columns[index].querySelector('[data-plan-cta]');
    pickCta.href = source.href;
    pickCta.textContent = source.textContent.trim() + ' \u2013 ' + plans[index].name;
    if (source.target) {
      pickCta.target = source.target;
      pickCta.rel = source.rel;
    } else {
      pickCta.removeAttribute('target');
      pickCta.removeAttribute('rel');
    }
    pickSee.href = '#' + columns[index].id;
    pickSee.textContent = 'See ' + plans[index].name + ' in the table';
    actions.hidden = false;
  }

  function update() {
    var best = bestPlan();
    render();
    highlight(best.index, best.packs, chosenModels());
    status.textContent = describe(best);
    offerActions(best.index);
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
    actions.hidden = true;
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
  reset.addEventListener('click', function () {
    clear();
    // The button disappears, so hand focus to the first control of the sentence.
    products.focus();
  });
  // Close the models menu when keyboard focus moves on to something else.
  root.querySelector('.NL_picker_models').addEventListener('focusout', function (event) {
    if (event.relatedTarget && !this.contains(event.relatedTarget)) {
      setMenu(false);
    }
  });
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

  render();
  root.hidden = false;
})();
