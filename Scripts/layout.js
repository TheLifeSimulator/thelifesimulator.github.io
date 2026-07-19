function build(type, tags)
{
    var container = document.createElement('div');
    container.className = type;
    for (var [tag, value] of Object.entries(tags))
    {
        if (value == null) { continue; }
        var lowered = tag.toLowerCase();
        switch (lowered)
        {
            case "card": 
            {
                html(container, "div", "card", value);
                break;
            }
            case "category":
            {
                category(container, value);
                break;
            }
            case "controls":
            {
                controls(container, value.split(','));
                break;
            }
            case "cover":
            {
                image(container, lowered, value, lowered);
                break;
            }
            case "date":
            {
                date(container, value);
                break;
            }
            case "links":
            {
                links(container, value.split(','));
                break;
            }
            case "list":
            {
                list(container, value.split(','))
                break;
            }
            case "subtitle":
            case "title":
            {
                html(container, lowered == "title" ? "h3" : "h4", lowered, value);
                break;
            }
            default: 
            {
                if (value.includes("- ")) { section(container, tag, value.split("- ")); }
                else { html(container, 'p', lowered, value); }
                break;
            }
        }
    }
    return container;
}
function category(container, value)
{
    var tag = document.createElement('p');
    tag.className = "card";
    tag.id = "tag";
    tag.style = "background-color: var(--color-light-background); height: 1rem; width: 5rem;";
    tag.textContent = value;
    container.appendChild(tag);
}
function controls(container, controls)
{
    var component = document.createElement("div");
    component.className = "controls";
    controls.forEach(control => 
    {
        var data = control.split('=');
        var tag = data[0].trim();
        var value = data[1].trim();
        var button = document.createElement("button");
        var link = element(button, "a", tag);
        link.href = value;
        component.appendChild(button);
    });
    container.appendChild(component);
    return component;
}
function element(container, element, text) { return instance(container, element, null, null, text); }
function date(container, date)
{
    var tag = instance(container, "p", "card", "tag");
    tag.style = "width: 10rem;";
    var data = date.split('/');
    var month;
    var day = data[1];
    var year = data[2];
    switch (parseInt(data[0]))
    {
        case 1:
        {
            month = "January";
            break;
        }
        case 2:
        {
            month = "Feburary";
            break;
        }
        case 3:
        {
            month = "March";
            break;
        }
        case 4:
        {
            month = "April";
            break;
        }
        case 5:
        {
            month = "May";
            break;
        }
        case 6:
        {
            month = "June";
            break;
        }
        case 7:
        {
            month = "July";
            break;
        }
        case 8:
        {
            month = "August";
            break;
        }
        case 9:
        {
            month = "September";
            break;
        }
        case 10:
        {
            month = "October";
            break;
        }
        case 11:
        {
            month = "November";
            break;
        }
        default:
        {
            month = "December";
            break;
        }
    }
    tag.textContent = month + " " + day + ", " + year;
    return tag;
}
function html(container, element, type, content)
{
    var component = instance(container, element, type, null)
    component.innerHTML = content;
    return component;
}
function image(container, type, path, description)
{
    var img = instance(container, "img", type, null);
    img.src = path;
    img.alt = description;
    container.appendChild(img);
    return img;
}
function instance(container, element, type, id, text = null)
{
    var component = document.createElement(element);
    if (type != null) { component.className = type; }
    if (id != null) { component.id = id; }
    if (text != null) { component.textContent = text; }
    container.appendChild(component);
    return component;
}
function links(container, controls)
{
    var component = document.createElement("div");
    component.className = "card";
    component.id = "links"
    controls.forEach(control => 
    {
        var data = control.split('=');
        var tag = data[0].trim();
        var value = data[1].trim();
        var button = document.createElement("button");
        var link = html(button, "a", null, tag);
        link.href = value;
        component.appendChild(button);
    });
    container.appendChild(component);
    return component;
}
function list(container, entries)
{
    if (entries == null) { return; }
    var list = document.createElement("ul");
    list.className = "list";
    entries.forEach(entry => 
    {
        if (entry.trim() != "") { html(list, "li", null, entry); }
    });
    container.appendChild(list);
}
function section(container, category, entries)
{
    if (entries == null) { return; }
    var section = document.createElement("div");
    section.className = "card";
    if (category != null) { instance(section, "h4", "subtitle", null, category); }
    list(section, entries);
    container.appendChild(section);
}
document.addEventListener("DOMContentLoaded", () => 
{
    /* Header */
    console.log("Building layout!");
    var header = document.getElementById("header");
    var branding = instance(header, "div", "branding", null);
    var title = instance(branding, "h2", "title", null);
    var link = element(title, "a", "LifeSimulator");
    link.href = "../index.html";
    var navigation = instance(header, "div", "navigation", null);
    var menu = [ "about", "contact", "docs" ];
    menu.forEach(item => 
    {
        var symbol;
        switch (item)
        {
            case "about":
            {
                symbol = "?";
                break;
            }
            case "contact":
            {
                symbol = "@";
                break;
            }
            case "docs":
            {
                instance(navigation, "p", "divider", null, "|");
                symbol = "/";
                break;
            }
        }
        var button = instance(navigation, "button", "round", null);
        var label = instance(button, "a", item == header.className ? "current" : null, null, symbol)
        label.href = "../Pages/" + item + ".html";
    })
    /* Footer */
    var footer = document.getElementById("footer");
    instance(footer, "p", null, "copyright", "© 2026 LifeSimulator LLC");
});