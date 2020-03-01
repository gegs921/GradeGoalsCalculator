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
        console.log(res);
        window.location.href = "/";

      }).catch((err) => {
        console.log(err);
      });
    }
  }
})