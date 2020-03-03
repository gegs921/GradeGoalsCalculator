let app = new Vue({
  el: '#app',
  data: {
    email: '',
    password: ''
  },
  methods: {
    post: function() {
      if(validateEmail(this.email) === false) {
        return;
      }
      else if(validatePassword(this.password) === false){
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