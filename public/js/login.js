let app = new Vue({
  el: '#app',
  data: {
    email: '',
    password: ''
  },
  methods: {
    post: function() {
      axios.post('/loginComplete', {
        email: this.email,
        password: this.password
      }).then((res) => {
        if(res.data === false) {
          console.log("incorrect password or email!");
          return;
        }
        else {
          console.log("data:" + " " + JSON.stringify(res.data));
          window.location.href = "/";
        }

      }).catch((err) => {
        console.log(err);
      });
    }
  }
})