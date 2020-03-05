let app = new Vue({
  el: '#app',
  data: {
    email: '',
    password: '',
    errorText: '',
    errorType: '',
    errorShown: false,
    errorTypes: {
      emailError: 1,
      passwordError: 2
    },
  },
  methods: {
    post: function() {
      if(validateEmail(this.email) === false) {
        this.errorType = this.errorTypes.emailError;
        this.errorText = "Email is not valid!";
        this.errorShown = true;
        return;
      }
      else if(validatePassword(this.password) === false){
        this.errorType = this.errorTypes.passwordError;
        this.errorText = "Password is not valid";
        this.errorShown = true;
        return;
      }
      else {
        axios.post('/loginComplete', {
          email: this.email,
          password: this.password
        }).then((res) => {
          console.log(res);
          window.location.href = "/";

        }).catch((err) => {
          console.log(err);
        });
      }
    }
  }
})