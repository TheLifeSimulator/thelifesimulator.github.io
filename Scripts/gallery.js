
/* Settings */
let gallery;
let container;
/* Methods */ 
function gallery_add(id, path, type, description)
{
    var gallery = document.getElementById(id);
    if (!gallery) return;
    var container = gallery.querySelector('#content');
    if (!container) return;
    var img = document.createElement('img');
    img.src = path;
    img.alt = description;
    img.className = type;
    container.appendChild(img);
}
function gallery_load(id, path) 
{
    fetch(path)
    .then(response => 
    {
        if (!response.ok) { throw new Error('Could not read JSON registry!'); }
        return response.json();
    })
    .then(data => 
    {
        data.files.forEach(file => { gallery_add(id, `${data.directory}/${file}`, 'screenshot', "Screenshot");});
    })
    .catch(error => console.error('Failed to load assets dynamically:', error));
}
