/* Components */
class Post
{
    Card;
    Tags = {};
    add(tag, value) { this.Tags[tag] = value; }
    build()
    {
        this.Card = document.createElement('div');
        this.Card.className = "card";
        date(this.Card, this.Tags["Date"]);
        create(this.Card, "h3", "title", null, this.Tags["Title"]);
        this.#category(this.Tags["Category"]);
        image(this.Card, "cover", this.Tags["Cover"], "Cover");
        html(this.Card, "p", "content", this.Tags["Content"]);
        html(this.Card, "em", "description", this.Tags["Description"]);
        controls(this.Card, this.Tags["Controls"].split(','));
    }
    #category(group)
    {
        var tag = document.createElement('p');
        tag.className = "card";
        tag.id = "tag";
        tag.style = "background-color: var(--color-light-background); height: 1rem; width: 5rem;";
        tag.textContent = group;
        this.Card.appendChild(tag);
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
/* Methods */
function news_add(id, data)
{
    var container = document.getElementById(id);
    if (!container) return;
    if (data == null) { return; }
    var tag = "";
    var value = null;
    let post = new Post();
    var lines = data.split('\n');
    lines.forEach(line =>
    {
        if (value != null) { value += '\n' + line; }
        else
        {
            data = line.split(':', 2);
            tag = data[0].trim();
            value = data[1];
        }
        if (line.endsWith(';')) 
        { 
            post.add(tag, value.replace(';', "")); 
            value = null;
        }
    });
    post.build();
    container.appendChild(post.Card);
}
function news_import(id, file)
{
    if (file.endsWith('.info')) 
    {
        fetch(file)
        .then(res => res.text())
        .then(text => { news_add(id, text); })
        .catch(error => console.error(`Error loading info file:`, error));
    } 
}
function news_load(id, path) 
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
        files.forEach(file => { news_import(id, `${folder}/${file}`); });
    })
    .catch(error => console.error('Failed to load assets dynamically:', error));
}
