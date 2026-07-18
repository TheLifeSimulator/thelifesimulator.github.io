/* Components */
class Log
{
    Card;
    Tags = {};
    add(tag, value) { this.Tags[tag] = value; }
    build()
    {
        this.Card = document.createElement('div');
        this.Card.className = 'card';
        date(this.Card, this.Tags["Date"]);
        this.#title();
        create(this.Card, "p", "content", null, this.Tags["Description"]);
        var sections = [ "Additions", "Changes", "Fixes", "Planned" ];
        sections.forEach(section => { this.#section(section); });
        this.#section("Additions");
    }
    #title()
    {
        var component = document.createElement("h3");
        component.className = "title";
        var version;
        var release = this.Tags["Release"];
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
        var label = this.Tags["Release"] + "." + this.Tags["Build"] + "." + this.Tags["Revision"] + "." + "A";
        component.textContent = "Version " + label;
        this.Card.appendChild(component);
    }
    #section(tag)
    {
        if (this.Tags[tag] == null) { return; }
        var section = document.createElement("div");
        section.className = "card";
        create(section, "h4", "subtitle", null, tag);
        var list = document.createElement("ul");
        list.className = "list";
        var data = this.Tags[tag].split("- ");
        data.forEach(entry => 
        {
            if (entry.trim() != "") { create(list, "li", null, null, entry); }
        });
        section.appendChild(list);
        this.Card.appendChild(section);
    }
}
/* Settings */
const version = "0.1.6.A";
/* Methods */
function log_add(id, data)
{
    var container = document.getElementById(id);
    if (!container) return;
    if (data == null) { return; }
    var tag = "";
    var value = "";
    let log = new Log();
    var lines = data.split('\n');
    lines.forEach(line =>
    {
        if (!line.includes(':')) { value += '\n' + line; }
        else
        {
            data = line.split(':', 2);
            tag = data[0].trim();
            value = data[1].trim();
        }
        if (line.endsWith(';')) { log.add(tag, value.replace(';', "")); }
    });
    log.build();
    container.appendChild(log.Card);
}
function log_import(id, file)
{
    if (file.endsWith('.info')) 
    {
        fetch(file)
        .then(res => res.text())
        .then(text => { log_add(id, text); })
        .catch(error => console.error(`Error loading info file:`, error));
    } 
}
function log_load(id, path) 
{
    fetch(path)
    .then(response => 
    {
        if (!response.ok) { throw new Error('Could not read JSON registry!'); }
        return response.json();
    })
    .then(data => 
    {
        const folder = data.directory;
        const files = data.files;
        files.forEach(file => { log_import(id, `${folder}/${file}`); });
    })
    .catch(error => console.error('Failed to load assets dynamically:', error));
}
