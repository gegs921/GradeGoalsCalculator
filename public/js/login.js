let app = new Vue({
  el: '#app',
  data: {
    email: '',
    password: '',
    errorText: '',
    errorType: '',
    errorShown: false,
    errorTypes: {
      loginError: 1
    },
  },
  methods: {
    post: function() {
      axios.post('/loginComplete', {
        email: this.email,
        password: this.password
      }).then((res) => {
        if(res.data === false) {
          this.errorType = this.errorTypes.loginError;
          this.errorText = "Incorrect password or email!";
          this.errorShown = true;
          return;
        }
        else {
          console.log("data:" + " " + JSON.stringify(res.data));
          window.location.href = "/";
        }

      }).catch((err) => {
        console.log(err);
      });
    },
    hideError: function() {
      this.errorShown = false;
    },
  }
})