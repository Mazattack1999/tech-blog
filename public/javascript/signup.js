async function signupFormHandler(event) {
    event.preventDefault();

    // get username and password provided inform
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        // send post to create new user
        const response = await fetch('/api/users',{
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
            document.location.replace('/');
        } else {
            alert(response.statusText);
        }
    }

}

document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);