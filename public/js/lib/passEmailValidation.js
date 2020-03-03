function validateEmail(email) {
  if(typeof(email) !== 'string') {
    console.log('email should be a string');
    return false;
  }
  stringArr = email.split('@');
  if(stringArr.length < 2 || stringArr[1].split('.').length < 2) {
    console.log('not valid');
    return false;
  }
  else {
    console.log('valid');
    return true
  }
}

function validatePassword(pass) {
  charArr = pass.split('');
  if(charArr.length < 8) {
    console.log('not valid');
    return false;
  }
  else {
    for(let i = 0; i < charArr.length; i++) {
      if(isNaN(charArr[i]) === false) {
        console.log('valid');
        return true;
      }
      else if(i === charArr.length - 1 && isNaN(charArr[i]) === true) {
        console.log('not valid');
        return false;
      }
    }
  }
}