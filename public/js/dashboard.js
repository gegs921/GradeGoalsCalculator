import axios from "axios"

let classes = [];

let app = new Vue({
  el: "#app",
  data: {
    classes: classes
  },
  methods: {
    getClasses: function() {
      console.log('ran');
      axios.get('/classes').then((response) => {
        if(!response.data) {
          return;
        }
        else {
          for(let i = 0; i < response.data.length; i++) {
            classes.push(response.data[i]);
            if(i === response.data.length - 1) {
              this.classes = classes;
              return;
            }
          }
        }
      })
      .catch((err) => {
        return console.log(err);
      });
    }
  },
  beforeMount() {
    this.getClasses();
  }
})