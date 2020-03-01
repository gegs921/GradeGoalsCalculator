
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
      /* I need to add form error handling (don't forget) */
      axios.post('/registrationComplete', {
        email: this.email,
        username: this.username,
        password: this.password,
        passwordConf: this.passwordConf
      }).then((res) => {
        console.log(res);
        window.location.href = "/";
      }).catch((err) => {
        console.log(err);
      });
    }
  }
})