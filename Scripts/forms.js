const endpoint = 'https://formsubmit.co/ajax/thelifesimulator@gmail.com';
function send(id, payload)
{
    var form = document.querySelector(id);
    var status = document.getElementById('status');
    if (!form || !status) { return; }
    var submit = form.querySelector('button[type="submit"]');
    status.textContent = 'Sending your message...';
    status.className = 'status pending';
    if (submit) 
    {
        submit.disabled = true;
        submit.textContent = 'Sending...';
    }
    try 
    {
        var response = await fetch(endpoint, 
        {
            method: 'POST',
            headers: 
            {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) 
        {
            throw new Error('The message could not be sent right now.');
        }
        status.textContent = 'Thanks! Your message has been sent.';
        status.className = 'status success';
        form.reset();
    } 
    catch (error) 
    {
        console.error('Contact form submission failed:', error);
        status.textContent = 'Sorry, something went wrong. Please email me directly at thelifesimulator@gmail.com.';
        status.className = 'status error';
    } 
    finally 
    {
        if (submit) 
        {
            submit.disabled = false;
            submit.textContent = 'Send';
        }
    }
}