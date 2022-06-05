async function commentFormHandler(event) {
    event.preventDefault();

    // get post id
    const urlArray = window.location.toString().split('/');
    const post_id = urlArray[urlArray.length - 1];
  
    const comment_text = document.querySelector('input[name="comment-text"]').value;
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({
        post_id,
        comment_text
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  
    if (response.ok) {
      document.location.replace(`/post/${post_id}`);
    } else {
      alert(response.statusText);
    }
  }
  
  document.querySelector('.comment-form').addEventListener('submit',commentFormHandler);