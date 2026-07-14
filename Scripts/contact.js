document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form#contact');
    const status = document.getElementById('status');

    if (!form || !status) {
        return;
    }

    const submitButton = form.querySelector('button[type="submit"]');
    const endpoint = 'https://formsubmit.co/ajax/thelifesimulator@gmail.com';

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const formData = new FormData(form);
        const firstName = String(formData.get('first_name') || '').trim();
        const lastName = String(formData.get('last_name') || '').trim();
        const email = String(formData.get('address') || '').trim();
        const message = String(formData.get('message') || '').trim();
        const subscribe = formData.get('subscribe') ? 'Yes' : 'No';

        const payload = {
            name: `${firstName} ${lastName}`.trim(),
            email,
            message,
            subscribe,
            _subject: 'New help form submission from thelifesimulator.github.io!',
            _template: 'table',
            _captcha: 'false'
        };

        status.textContent = 'Sending your message...';
        status.className = 'status pending';

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = 'Sending...';
        }

        try {
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('The message could not be sent right now.');
            }

            status.textContent = 'Thanks! Your message has been sent.';
            status.className = 'status success';
            form.reset();
        } catch (error) {
            console.error('Contact form submission failed:', error);
            status.textContent = 'Sorry, something went wrong. Please email me directly at thelifesimulator@gmail.com.';
            status.className = 'status error';
        } finally {
            if (submitButton) {
                submitButton.disabled = false;
                submitButton.textContent = 'Send';
            }
        }
    });
});
