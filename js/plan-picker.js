/*
 * Plan picker on /pricing/ (markup: _includes/plan-picker.html).
 *
 * Highlights the cheapest plan column that covers the chosen number of products,
 * customers and licensing models. Each plan column declares its key and limits
 * (data-plan, data-products, data-customers; no limit means unlimited), and each
 * model checkbox lists the plans that include it (data-plans).
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
      customers: limit(column, 'customers')
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
  var topProducts = highest('products');
  var topCustomers = highest('customers');
  products.max = topProducts + 1;
  customers.max = topCustomers + 50;

  function limit(column, name) {
    var value = column.getAttribute('data-' + name);
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

  // Index of the first (cheapest) plan that fits; the last plan has no limits.
  function bestPlan() {
    var p = Number(products.value);
    var c = Number(customers.value);
    var chosen = chosenModels();
    for (var i = 0; i < plans.length; i++) {
      var plan = plans[i];
      var fitsModels = chosen.every(function (box) {
        return includes(box, plan);
      });
      if (p <= plan.products && c <= plan.customers && fitsModels) {
        return i;
      }
    }
    return plans.length - 1;
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
  function highlight(index) {
    table.classList.toggle('NL_plan_picked', index !== null);
    columns.forEach(function (column, i) {
      column.classList.toggle('NL_plan_match', i === index);
    });
  }

  function update() {
    var index = bestPlan();
    render();
    highlight(index);
    status.textContent = plans[index].name + ' covers this';
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
