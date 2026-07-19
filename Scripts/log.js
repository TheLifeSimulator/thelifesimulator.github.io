/* Components */
class Log
{
    Container;
    constructor(tags)
    {
        var entries = Object.entries(tags);
        entries.splice(1, 0, ["Title", this.#version(tags)]);
        tags = Object.fromEntries(entries);
        tags["Release"] = null;
        tags["Build"] = null;
        tags["Revision"] = null;
        this.Container = build("card", tags);
    }
    #version(tags)
    {
        var version;
        var release = tags["Release"];
        switch (parseInt(release))
        {
            case 0:
            {
                version = "A";
                break;
            }
            case 1:
            {
                version = "B";
                break;
            }
        }
        var label = release + "." + tags["Build"].trim() + "." + tags["Revision"].trim() + "." + version;
        return "Version " + label;
    }
}
/* Settings */
const version = "0.1.6.A";
/* Methods */
function logs(id, path) 
{
    deserialize(path).then(data => data.files.forEach(file => { log(id, `${data.directory}/${file}`); }))
}
function log(id, file) 
{ 
    extract(file).then(data => 
    {
        var container = document.getElementById(id);
        if (!container) return;
        if (data == null) { return; }
        var tag = "";
        var value = "";
        let log = new Log(itemize(data));
        container.appendChild(log.Container);
    }) 
}