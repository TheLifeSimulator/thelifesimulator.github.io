document.addEventListener('DOMContentLoaded', () => 
{
    var id = 'form#contact';
    var contact = document.querySelector(id);
    if (!contact) { return; }
    contact.addEventListener('submit', async (event) => 
    {
        event.preventDefault();
        var data = new FormData(contact);
        var firstName = String(data.get('first_name') || '').trim();
        var lastName = String(data.get('last_name') || '').trim();
        var email = String(data.get('address') || '').trim();
        var message = String(data.get('message') || '').trim();
        var subscribe = data.get('subscribe') ? 'Yes' : 'No';
        var payload = 
        {
            name: `${firstName} ${lastName}`.trim(),
            email,
            message,
            subscribe,
            _subject: 'New help form submission from thelifesimulator.github.io!',
            _template: 'table',
            _captcha: 'false'
        };
        send(id, payload);
    });
});
