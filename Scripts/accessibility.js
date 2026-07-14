const mainContent = document.getElementById('content');
mainContent.addEventListener('blur', () => mainContent.removeAttribute('tabindex'));

const skipButton = document.getElementById('skip');
skipButton.addEventListener('click', (e) => 
{
  e.preventDefault();
  mainContent.setAttribute('tabindex', '-1');
  mainContent.focus();
});

class Dimensions {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
}
class Contents {
  constructor(title, description, elements) {
    this.title = title;
    this.description = description;
    this.elements = elements;
  }
}
const popupCard = document.getElementById('popup');
function togglePopup(active)
{
  popupCard.style.display = active ? 'flex' : 'none';
}
function setPopup(active, dimension, content)
{
  togglePopup(active);
  popupCard.style.height = dimension.height;
  popupCard.style.width = dimension.width;
  const popupTitle = popupCard.querySelector('.title');
  const popupDescription = popupCard.querySelector('.description');
  const popupContent = popupCard.querySelector('.content');
  popupTitle.textContent = content.title;
  popupDescription.textContent = content.description;
  popupContent.innerHTML = content.elements;
}

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
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
});