class Dimensions 
{
  constructor(height, width) 
  {
    this.height = height;
    this.width = width;
  }
}
class Contents 
{
  constructor(title, description, elements) 
  {
    this.title = title;
    this.description = description;
    this.elements = elements;
  }
}
const popup = document.getElementById('popup');
if (popup != null)
{
  function toggle(active) { popup.style.display = active ? 'flex' : 'none'; }
  function set(active, dimension, content)
  {
    togglePopup(active);
    popup.style.height = dimension.height;
    popup.style.width = dimension.width;
    var title = popup.querySelector('.title');
    var decription = popup.querySelector('.description');
    var contents = popup.querySelector('.content');
    title.textContent = content.title;
    decription.textContent = content.description;
    contents.innerHTML = content.elements;
  }
}