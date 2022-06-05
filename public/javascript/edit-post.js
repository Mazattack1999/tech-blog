async function editFormHandler(event) {
    event.preventDefault();

    // get post id
    const urlArray = window.location.toString().split('/');
    const id = urlArray[urlArray.length - 1];
  
    const title = document.querySelector('input[name="post-title"]').value;
    const post_text = document.querySelector('textarea[name="post-text"]').value;

    const response = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      body: JSON.stringify({
        title,
        post_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }

  async function deleteBtnHandler(event) {
    event.preventDefault();

    // get post id
    const urlArray = window.location.toString().split('/');
    const id = urlArray[urlArray.length - 1];
    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  
    if (response.ok) {
      document.location.replace('/dashboard');
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.edit-post-form').addEventListener('submit', editFormHandler);
  document.querySelector('#delete-btn').addEventListener('click',
  deleteBtnHandler);