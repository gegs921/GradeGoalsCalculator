
let app = new Vue({
  el: '#app',
  data: {
    email: '',
    username: '',
    password: '',
    passwordConf: ''
  },
  methods: {
    post: function() {
      let checkUsernameBool = checkUsernameAndEmail(this.username, this.email);
      if(validateEmail(this.email) === false) {
        // email not valid
        return;
      }
      else if(validatePassword(this.password) === false){
        // password not valid
        return;
      }
      else if(this.password !== this.passwordConf) {
        // password confirmation does not match password
        return;
      }
      else if(checkUsernameBool === false) {
        // username is already taken
        return;
      }
      else {
        axios.post('/registrationComplete', {
          email: this.email,
          username: this.username,
          password: this.password,
          passwordConf: this.passwordConf
        }).then((res) => {
          // console.log(res);
          window.location.href = "/";
        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }
})