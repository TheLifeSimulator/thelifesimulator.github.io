const content = document.getElementById('content');
const skipButton = document.getElementById('skip');
content.addEventListener('blur', () => content.removeAttribute('tabindex'));
skipButton.addEventListener('click', (e) => 
{
  e.preventDefault();
  content.setAttribute('tabindex', '-1');
  content.focus();
});
const returnButton = document.getElementById('return');
window.addEventListener('scroll', () => 
{
  let scrolled = (document.body.scrollTop || document.documentElement.scrollTop) > (window.innerHeight / 4);
  if (scrolled) 
  {
    returnButton.style.display = 'block';
    returnButton.removeAttribute('aria-hidden');
    returnButton.setAttribute('tabindex', '0');
  } 
  else 
  {
    returnButton.style.display = 'none';
    returnButton.setAttribute('aria-hidden', 'true');
    returnButton.setAttribute('tabindex', '-1');
  }
});
returnButton.addEventListener('click', () => 
{
  window.scrollTo(
  {
    top: 0,
    behavior: 'smooth'
  });
});