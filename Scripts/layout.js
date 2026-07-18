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
        var link = create(button, "a", null, null, tag);
        link.href = value;
        component.appendChild(button);
    });
    container.appendChild(component);
    return component;
}
function create(container, element, type, id, text)
{
    var component = document.createElement(element);
    if (type != null) { component.className = type; }
    if (id != null) { component.id = id; }
    if (text != null) { component.textContent = text; }
    container.appendChild(component);
    return component;
}
function date(container, date)
{
    var tag = document.createElement('p');
    tag.className = 'card';
    tag.id = "tag";
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
    container.appendChild(tag);
    return tag;
}
function html(container, element, type, content)
{
    var component = document.createElement(element);
    if (type != null) { component.className = type; }
    component.innerHTML = content;
    container.appendChild(component);
    return component;
}
function image(container, type, path, description)
{
    var img = document.createElement('img');
    img.src = path;
    img.alt = description;
    img.className = type;
    container.appendChild(img);
    return img;
}
document.addEventListener("DOMContentLoaded", () => 
{
    /* Header */
    console.log("Building layout!");
    var header = document.getElementById("header");
    var branding = create(header, "div", "branding", null, null);
    var title = create(branding, "h2", "title", null, null);
    var link = create(title, "a", null, null, "LifeSimulator");
    link.href = "../index.html";
    var navigation = create(header, "div", "navigation", null, null);
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
                create(navigation, "p", "divider", null, "|");
                symbol = "/";
                break;
            }
        }
        var button = create(navigation, "button", "round", null, null);
        var label = create(button, "a", item == header.className ? "current" : null, null, symbol)
        label.href = "../Pages/" + item + ".html";
    })
    /* Footer */
    var footer = document.getElementById("footer");
    create(footer, "p", null, "copyright", "© 2026 LifeSimulator LLC");
});