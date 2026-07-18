const body = document.getElementById('body');
var content = document.getElementById('content');
if (content != null)
{
  content.addEventListener('blur', () => content.removeAttribute('tabindex'));
}
const accessbility = document.getElementById('accessibility');
if (accessbility != null)
{
  var skip = document.createElement('button');
  skip.id = "skip";
  skip.textContent = "Skip to content.";
  skip.addEventListener('click', (e) => 
  {
    window.location.href='#content';
    e.preventDefault();
    content.setAttribute('tabindex', '-1');
    content.focus();
  });
  accessbility.appendChild(skip);
}
var reposition = document.createElement('button');
reposition.id = "return";
reposition.textContent = "↑";
reposition.addEventListener('click', () => 
{
  window.scrollTo(
  {
    top: 0,
    behavior: 'smooth'
  });
});
body.appendChild(reposition);
window.addEventListener('scroll', () => 
{
  var scrolled = (document.body.scrollTop || document.documentElement.scrollTop) > (window.innerHeight / 4);
  if (scrolled) 
  {
    reposition.style.display = 'block';
    reposition.removeAttribute('aria-hidden');
    reposition.setAttribute('tabindex', '0');
  } 
  else 
  {
    reposition.style.display = 'none';
    reposition.setAttribute('aria-hidden', 'true');
    reposition.setAttribute('tabindex', '-1');
  }
});