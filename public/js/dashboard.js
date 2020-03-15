import axios from "axios"

Vue.component('scores-comp', {
  template: '<li class="field">{{ score.category }}: {{ score.fnum }} / {{ score.snum }}: {{ score.percentage }}% <button v-on:click="deleteScore(score.id)" class="button">delete</button></li>',
  props: {
    score: Object
  },
  methods: {
    deleteScore: function (selectedId) {
      for (let i = 0; i < scores.length; i++) {
        if (scores[i].id === selectedId) {
          scores.splice(i, 1);
        }
      }
    }
  }
})

Vue.component('weights-comp', {
  template: '<li class="field">{{ weight.category }}: {{ weight.fnum }} / {{ weight.snum }}: {{ weight.percentage }}% <button v-on:click="deleteScore(weight.id)" class="button">delete</button></li>',
  props: {
    weight: Object
  },
  methods: {
    deleteScore: function (selectedId) {
      for (let i = 0; i < weights.length; i++) {
        if (weights[i].id === selectedId) {
          weights.splice(i, 1);
        }
      }
    }
  }
})

let app = new Vue({
  el: "#app",
  data: {
    scores: [],
    weights: []
  },
  methods: {
    getClasses: function() {
      axios.get('/classes').then((response) => {
        if(!response.data.scores || !response.data.weights) {
          return;
        }
        else {
          this.scores = response.data.scores;
          this.weights = response.data.weights;
          return
        }
      })
      .catch((err) => {
        return console.log(err);
      });
    },
    beforeMount() {
      this.getClasses();
    }
  }
})