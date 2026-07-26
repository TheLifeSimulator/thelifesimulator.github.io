function deserialize(path) 
{
    return fetch(path)
    .then(response => response.json())
    .then(data => { return data; })
    .catch(error => {  return null; });
}
function itemize(content)
{
    var tags = {};
    var tag = "";
    var value = null;
    var lines = content.split('\n');
    lines.forEach(line =>
    {
        if (value != null) { value += '\n' + line; }
        else
        {
            var data = line.split(':');
            tag = data[0].trim();
            value = data[1];
            if (data.length > 2)
            {
                for (var d = 2; d < data.length; d++) { value += ':' + data[d]; }
            }
        }
        if (line.endsWith(';')) 
        { 
            tags[tag] = (value ?? "").replace(';', "");
            value = null;
        }
    });
    return tags;
}
async function extract(path)
{
    if (!path.endsWith('.info')) { return null; }
    try 
    {
        const response = await fetch(path);
        if (!response.ok || response.status == "400") { return null; }
        return  await response.text() ?? null;
    } 
    catch (error) { return null; }
}