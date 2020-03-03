function checkUsernameAndEmail(username, email) {
  axios.post('/usernameandemailcheck', {
    username: username,
    email: email
  }).then((response) => {
    if(response.data === true) {
      return true;
    }
    else {
      return false;
    }
  }).catch((error) => {
    console.log(error);
  });
}