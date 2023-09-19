const signupFormHandler = async (event) => {
    event.preventDefault();
  
    const  usernameEl = document.querySelector('#username-signup').value.trim();
    const passwordEl = document.querySelector('#password-signup').value.trim();
    
       const response = await fetch('/api/users', {
         method: 'POST',
         body: JSON.stringify({
         username:usernameEl.value, 
         password: passwordEl.value }),
         headers: { 'Content-Type': 'application/json' },
       });
  
       if (response.ok) {
         document.location.replace('/dashboard');
       } else {
         alert('Failed to sign up.');
       }
  };
  
  document
    .querySelector('.signup-form')
    .addEventListener('submit', signupFormHandler);