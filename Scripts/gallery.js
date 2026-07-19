function display(id, path, type, description)
{
    var gallery = document.getElementById(id);
    if (!gallery) return;
    var container = gallery.querySelector('#content');
    if (!container) return;
    image(container, type, path, description);
}
function gallery(id, path) 
{
    deserialize(path).then(data => data.files.forEach(file => { display(id, `${data.directory}/${file}`, 'screenshot', "Screenshot"); }))
}
