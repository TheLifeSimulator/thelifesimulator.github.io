/* Components */
class Card
{
    Container;
    constructor(type, tags) { this.Container = build(type, tags); }
}
/* Methods */
function cards(id, path) 
{
    deserialize(path).then(data => data.files.forEach(file => { card(id, "card", null, `${data.directory}/${file}`); }))
}
function card(id, type, identity, file) 
{ 
    extract(file).then(data => 
    { 
        var container = document.getElementById(id);
        if (!container) return;
        if (data == null) { return; }
        let card = new Card(type, itemize(data));
        container.appendChild(card.Container);
        if (identity != null) { card.Container.id = identity; }
    }) 
}