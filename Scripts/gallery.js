
/* Methods */
function load(id, folder, screenshots)
{
    var gallery = document.getElementById(id);
    if (gallery != null)
    {
        var container = gallery.querySelector('#content');
        screenshots.forEach(path => 
        {
            var img = document.createElement('img');
            img.src = folder + "/" + path;
            img.alt = 'Screenshot';
            img.className = 'screenshot';
            container.appendChild(img);
        });
    }
}