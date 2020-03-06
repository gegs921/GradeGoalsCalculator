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
      }).then((response) => {
        console.log('ran');
        // if(response.data = false) {
        //   console.log('ran');
        //   this.errorType = this.errorTypes.loginError;
        //   this.errorText = "Incorrect email or password";
        //   this.errorShown = true;
        //   return;
        // }
        console.log("data:" + " " + response.data);
        window.location.href = "/";

      }).catch((err) => {
        console.log(err);
      });
    }
  }
})