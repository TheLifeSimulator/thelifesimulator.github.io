function set(legacy, revision, release, archive)
{
    let icon = "LifeSim_MacOS.png";
    if (legacy)
    {
        var root = document.documentElement;
        root.style.setProperty('--color-dark-accent', 'rgb(0, 125, 50)');
        root.style.setProperty('--color-standard-accent', 'rgb(0, 150, 75)');
        root.style.setProperty('--color-light-accent', 'rgb(0, 175, 100)');
        icon = "LifeSim_Legacy.png";
    }
    const current = revision + "." + release[0];
    var title = document.title = "LifeSimulator | V." + current;
    document.addEventListener("DOMContentLoaded", () => 
    {
        var cover = document.getElementById("cover");
        cover.src = "/Assets/Icons/" + icon;
        var title = document.getElementById("title");
        var header = document.getElementById("header");
        header.className = revision;
        title.textContent = "LifeSim Version " + revision + " " + release;
        title.style.textAlign = "center"; 
        if (document.getElementById("news") != null)
        {
            card("post", "card", null, "/Assets/News/Updates/V." + current + ".info");
            card("post", "card", null, "/Assets/News/Demo/V." + current + ".info");
            card("post", "card", null, "/Assets/News/Snapshots/V." + current + ".info");
        }
        log("entry", "/Assets/Releases/" + release + "/V." + current + ".info");
        var subnavigation = document.getElementById("subnavigation");
        var menu = [];
        if (archive)
        {
            menu = [ ["Documents", "docs"], ["Archive", "archive"], ["Alpha", "Archive/" + release.toLowerCase()], [current, "Archive/" + release + "/" + current] ];
        }
        else 
        {
            menu = [ ["Documents", "docs"], ["Releases", "releases"], ["Alpha", "Releases/" + release.toLowerCase()], [current, "Releases/" + release + "/" + current] ];
        }
        menu.forEach(item => 
        {
            var end = item[0] == current;
            var button = instance(subnavigation, "button", null, null);
            var label = instance(button, "a", end ? "current" : null, null, item[0])
            label.href = "/Pages/" + item[1] + ".html";
            if (!end) { instance(subnavigation, "p", "divider", null, ">"); }
        });
    });
}