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
          console.log("notDeleted:" + JSON.stringify(response.data));
          for(let i = 0; i < response.data.length; i++) {
            if(response.data[i].deleted === false) {
              classes.push(response.data[i]);
            }
            else {
              console.log('deleted');
            }

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
    },
    deleteClassDB: function(classId) {
      axios.post('/deleteClass', {
        id: classId
      }).then((response) => {
        console.log(response);
        window.location.reload();
      }).catch((err) => {
        console.log(err);
      });
    },
    redirectEdit: function(classId, scores, weights) {
      axios.post('/classToEditPost', {
        scores: scores,
        weights, weights,
        id: classId
      }).then((response) => {
        console.log(response);
      }).catch((err) => {
        console.log(err);
      });
      window.location.href = "/";
    }
  },
  beforeMount() {
    this.getClasses();
  }
})