class Hero
{
    Container;
    Tags = {};
    add(tag, value) { this.Tags[tag] = value; }
    constructor(tags)
    {
        this.Tags = tags;
        this.build();
    }
    build()
    {
        this.Container = document.createElement('div');
        this.Container.className = "hero";
        this.Container.id = "visual";
        this.Container.style = "background-image: url(" + this.Tags["Cover"] + ");"
        instance(this.Container, "h1", "title", null, this.Tags["Title"]);
        instance(this.Container, "h3", "description", null, this.Tags["Description"]);
        controls(this.Container, this.Tags["Controls"].split(','));
        html(this.Container, "p", "disclaimer", this.Tags["Disclaimer"]);
    }
}
/* Methods */
function hero(id, file) 
{ 
    extract(file).then(data => 
    { 
        var container = document.getElementById(id);
        if (!container) return;
        if (data == null) { return; }
        let hero = new Hero(itemize(data));
        container.appendChild(hero.Container);
    }) 
}