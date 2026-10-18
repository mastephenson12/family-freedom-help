const search = document.querySelector('#search');
const groups = [...document.querySelectorAll('.faq-group')];
const items = [...document.querySelectorAll('details')];
function filterAnswers() {
  const query = search.value.trim().toLowerCase();
  let count = 0;
  for (const item of items) {
    const match = !query || item.textContent.toLowerCase().includes(query);
    item.hidden = !match;
    if (match) count++;
  }
  for (const group of groups) {
    const policy = group.querySelector('.policy');
    const policyMatch = policy && (!query || policy.textContent.toLowerCase().includes(query));
    if (policy) policy.hidden = !policyMatch;
    group.hidden = ![...group.querySelectorAll('details')].some(item => !item.hidden) && !policyMatch;
  }
  document.querySelector('#result-count').textContent = query ? `${count} matching answer${count === 1 ? '' : 's'}` : '';
  document.querySelector('#no-results').hidden = groups.some(group => !group.hidden);
}
search.addEventListener('input', filterAnswers);
document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener('click', () => {
  search.value = '';
  filterAnswers();
}));
document.querySelector('#support-form').addEventListener('submit', event => {
  event.preventDefault();
  const topic = document.querySelector('#topic').value;
  const product = document.querySelector('#product').value.trim();
  const message = document.querySelector('#message').value.trim();
  if (!message) { document.querySelector('#message').focus(); return; }
  const body = `Hi Mark,\n\nI need help with: ${topic}\nProduct: ${product || '(please add if relevant)'}\nPurchase email: \nOrder reference (if available): \n\n${message}\n\nThank you!`;
  window.location.href = `mailto:mark@thefreedomfamilyplan.com?subject=${encodeURIComponent('Family Freedom Plan help: ' + topic)}&body=${encodeURIComponent(body)}`;
  document.querySelector('#email-status').textContent = 'Your email app should open with a draft. Review it and press Send there. If it does not open, email mark@thefreedomfamilyplan.com directly.';
});
document.querySelector('#year').textContent = new Date().getFullYear();
