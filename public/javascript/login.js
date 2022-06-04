async function loginFormHandler(event) {
    event.preventDefault();

    // get username and password values provided in form
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    // make sure a username and password were provided
    if (username && password) {
        const response = await fetch('/api/users/login',{
            method: 'post',
            body: JSON.stringify({
                username,
                password
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        
        // check the response status
        if (response.ok) {
            console.log('success');
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }

}

// event listener
document.querySelector('.login-form').addEventListener('submit', loginFormHandler);