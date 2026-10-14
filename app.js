(() => {
  const tools = document.querySelector('.menu-tools');
  const buttons = [...document.querySelectorAll('[data-filter]')];
  const drinks = [...document.querySelectorAll('.drink')];
  const search = document.getElementById('menu-search');
  const status = document.getElementById('menu-status');
  const empty = document.getElementById('empty-state');
  let filter = 'all';
  const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const searchable = new Map(drinks.map(drink => [drink, normalize(drink.querySelector('h3').textContent + ' ' + drink.querySelector('.ingredients').textContent)]));
  const update = () => {
    const terms = normalize(search.value).split(/\s+/).filter(Boolean);
    let count = 0;
    drinks.forEach(drink => {
      const matches = (filter === 'all' || drink.dataset.type === filter) && terms.every(term => searchable.get(drink).includes(term));
      drink.hidden = !matches;
      if (matches) count++;
    });
    empty.hidden = count > 0;
    status.textContent = count === 12 ? 'Showing all 12 drinks' : `Showing ${count} ${count === 1 ? 'drink' : 'drinks'}`;
    buttons.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === filter)));
  };
  buttons.forEach(button => button.addEventListener('click', () => { filter = button.dataset.filter; update(); }));
  search.addEventListener('input', update);
  document.getElementById('reset-menu').addEventListener('click', () => {
    filter = 'all'; search.value = ''; update(); search.focus();
  });
  tools.hidden = false;
  status.hidden = false;
  document.getElementById('year').textContent = new Date().getFullYear();
})();
