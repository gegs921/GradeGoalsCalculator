var Fraction = algebra.Fraction;
var Expression = algebra.Expression;
var Equation = algebra.Equation;

Object.defineProperty(Array.prototype, "asyncForEach", {
    enumerable: false,
    value: function(task){
        return new Promise((resolve, reject) => {
            this.forEach(function(item, index, array){
                task(item, index, array);
                if(Object.is(array.length - 1, index)){
                    resolve({ status: 'finished', count: array.length })
                }
            });        
        })
    }
});

let scores = [
  // {
  //   fnum: 10, 
  //   snum: 10, 
  //   percentage: 100, 
  //   category: 'hw', 
  //   id: 1
  // }, 
  // {
  //   fnum: 10, 
  //   snum: 10, 
  //   percentage: 100, 
  //   category: 'tst', 
  //   id: 2
  // }, 
  // {
  //   fnum: 10, 
  //   snum: 10, 
  //   percentage: 100, 
  //   category: 'prj', 
  //   id: 3
  // },
  // {
  //   fnum: 5,
  //   snum: 10,
  //   percentage: 50,
  //   category: 'tst',
  //   id: 7
  // }
];
let weights = [
  {
    weight: 0.1,
    category: 'hw',
    pointsPossible: 0,
    pointsEarned: 0,
    score: 0,
    maximumPossibleIncrease: 0,
    id: 4
  }, 
  {
    weight: 0.2,
    category: 'prj',
    pointsPossible: 0,
    pointsEarned: 0,
    score: 0,
    maximumPossibleIncrease: 0,
    id: 5
  }, 
  {
    weight: 0.7,
    category: 'tst',
    pointsPossible: 0,
    pointsEarned: 0,
    score: 0,
    maximumPossibleIncrease: 0,
    id: 6
  }
];

Vue.component('weights-comp', {
  template: '<li class="field">{{ weight.category }}: {{ weight.weight }} <button v-on:click="deleteWeight(weight.id)" class="button">delete</button></li>',
  props: {
    weight: Object
  },
  methods: {
    deleteWeight: function(selectedId) {
      for(let i=0; i<weights.length; i++) {
        if(weights[i].id === selectedId) {
          weights.splice(i, 1);
        }
      }
    }
  }
})

Vue.component('percent-comp', {
  template: '<li class="field">{{ score.category }}: {{ score.fnum }} / {{ score.snum }}: {{ score.percentage }}%<button v-on:click="deleteScore(score.id)" class="button">delete</button></li>',
  props: {
    score: Object
  },
  methods: {
    deleteScore: function(selectedId) {
      for(let i=0; i<scores.length; i++) {
        if(scores[i].id === selectedId) {
          scores.splice(i, 1);
        }
      }
    }
  }
})

let app = new Vue({
  el: '#app',
  data: {
    fnum: '',
    snum: '',
    weight: '',
    type: '',
    scores: scores,
    weights: weights,
    weightsFull: false,
    classGrade: 0,
    category: '',
    goalPercentage: '',
    idNum: 0,
  },
  methods: {
    addScore: function() {
      if(isNaN(this.fnum) === false && isNaN(this.snum) === false && this.fnum !== '' && this.snum !== '') {
        scores.push({
          fnum: parseInt(this.fnum, 10), 
          snum: parseInt(this.snum, 10), 
          percentage: Math.round(this.fnum/this.snum*100), 
          category: this.category, 
          id: this.idNum
        })
        this.idNum += 1;
        console.log(typeof(this.fnum));
        console.log(typeof(this.snum));
      }
    },
    addWeight: function() {
      let sum = 0;
      for(let i=0; i < weights.length; i++) {
        if(sum !== 1) {
          sum = weights[i].weight + sum;
        }
        else if(sum === 1) {
          this.weightsFull = true;
        }
      }
      if(isNaN(this.weight) === false && this.weight !== '' && this.type !== '' && this.weightsFull === false) {
        weights.push({
          weight: this.weight/100, 
          category: this.type,
          pointsPossible: 0, 
          pointsEarned: 0, 
          score: 0,
          maximumPossibleIncrease: 0,
          id: this.idNum
        });
        this.idNum += 1;
      }
    },
    changeAssignmentCategory: function(event) {
      console.log('ran');
      this.category = event.target.options[event.target.options.selectedIndex].text;
    },
    calculateGrade: function() {
      let weightedScore = 0;
      weights.forEach((weight) => {
        weight.pointsEarned = 0;
        weight.pointsPossible = 0;
      })
      weights.asyncForEach((weight) => {
        scores.asyncForEach((score) => {
          if(score.category === weight.category) {
            weight.pointsPossible += score.snum;
            weight.pointsEarned += score.fnum;
          }
        })
      }).then(() => {
        weights.asyncForEach((weight2) => {
          if(weight2.pointsEarned === 0 && weight2.pointsPossible === 0) {
            weight2.score = 0;
          }
          else {
            weight2.score = weight2.pointsEarned / weight2.pointsPossible;
          }
        }).then(() => {
          weights.asyncForEach((weight3) => {
            weight3.score = weight3.score * weight3.weight;
          }).then(() => {
            weights.asyncForEach((weight4) => {
              weightedScore += weight4.score;
            }).then(() => {
              this.classGrade = weightedScore * 100;
            })
          })
        })
      })
    },
    calculateMethods: function() {
      //Calculates the amount the score of a category can increase
      function calculateMaxPossibleIncrease() {
        weights.forEach((weight) => {
          weight.maximumPossibleIncrease = weight.weight - weight.score;

          console.log(weight.maximumPossibleIncrease)
        });
      }

      function calculateNeededCategoryScoreIncrease() {
        var x1 = algebra.parse("0.1 + 0.16 + 0.7t");
        var x2 = algebra.parse("0.8");

        var eq = new Equation(x1, x2);
        console.log(eq.toString());

        var answer = eq.solveFor("t");

        console.log("t = " + answer.toString());
        weights.forEach((weight) => {
          
        });
      }
      
      calculateMaxPossibleIncrease();
      calculateNeededCategoryScoreIncrease();
    }
  }
})