Object.defineProperty(Array.prototype, "asyncForEach", {
  enumerable: false,
  value: function (task) {
    return new Promise((resolve, reject) => {
      this.forEach(function (item, index, array) {
        task(item, index, array);
        if (Object.is(array.length - 1, index)) {
          resolve({ status: 'finished', count: array.length })
        }
      });
    })
  }
});

let scores = [
  {
    fnum: 10,
    snum: 10,
    percentage: 100,
    category: 'hw',
    id: 1
  },
  {
    fnum: 8,
    snum: 10,
    percentage: 80,
    category: 'prj',
    id: 2
  },
  {
    fnum: 7,
    snum: 10,
    percentage: 100,
    category: 'tst',
    id: 3
  }
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
    deleteWeight: function (selectedId) {
      for (let i = 0; i < weights.length; i++) {
        if (weights[i].id === selectedId) {
          weights.splice(i, 1);
        }
      }
    }
  }
})

Vue.component('percent-comp', {
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
    recommendedCategoryOfImprovement: '',
    selectedCategoryOfImprovement: '',
    percentageToRaise: 0,
    neededScore: '',
    numAssignmentsToComplete: '',
    finalAssignmentPercentage: '',
    howButtonSectionVisible: false,
    howSectionVisible: false,
    errorText: '',
    errorType: '',
    errorShown: false,
    errorTypes: {
      assignmentAdditionError: 1,
      categoryAdditionError: 2,
      goalCalculationError: 3,
    },
    user: {},
    idNum: 0,
  },
  methods: {
    addScore: function () {
      if (isNaN(this.fnum) === false && isNaN(this.snum) === false && this.fnum !== '' && this.snum !== '' && this.category !== '') {
        scores.push({
          fnum: parseFloat(this.fnum, 10),
          snum: parseFloat(this.snum, 10),
          percentage: Math.round(this.fnum / this.snum * 100),
          category: this.category,
          id: this.idNum
        })
        this.idNum += 1;
        this.errorShown = false;
        // console.log(typeof(this.fnum));
        // console.log(typeof(this.snum));
      }
      else if(isNaN(this.fnum) === true){
        this.errorType = this.errorTypes.assignmentAdditionError;
        this.errorText = "Assignment Score Numerator should be a number.";
        this.errorShown = true;
        return;
      }
      else if(isNaN(this.snum) === true) {
        this.errorType = this.errorTypes.assignmentAdditionError;
        this.errorText = "Assignment Score Denominator should be a number.";
        this.errorShown = true;       
        return; 
      }
      else if(this.fnum === '') {
        this.errorType = this.errorTypes.assignmentAdditionError;
        this.errorText = "Please enter an Assignment Score Numerator";
        this.errorShown = true;       
        return;         
      }
      else if(this.snum === '') {
        this.errorType = this.errorTypes.assignmentAdditionError;
        this.errorText = "Please enter an Assignment Score Denominator";
        this.errorShown = true;       
        return;        
      }
      else {
        this.errorType = this.errorTypes.assignmentAdditionError;
        this.errorText = "Please select an Assignment Category";
        this.errorShown = true;       
        return;
      }
    },
    addWeight: function () {
      let sum = 0;
      for (let i = 0; i < weights.length; i++) {
        if (sum !== 1) {
          sum = weights[i].weight + sum;
          console.log(sum);
        }
      }
      if (isNaN(this.weight) === false && this.weight !== '' && this.type !== '' && sum !== 1) {
        weights.push({
          weight: this.weight / 100,
          category: this.type,
          pointsPossible: 0,
          pointsEarned: 0,
          score: 0,
          maximumPossibleIncrease: 0,
          id: this.idNum
        });
        this.idNum += 1;
      }
      else if(isNaN(this.weight) === true) {
        this.errorType = this.errorTypes.categoryAdditionError;
        this.errorText = "Category Weight should be a number.";
        this.errorShown = true;
        return;
      }
      else if(this.weight === '') {
        this.errorType = this.errorTypes.categoryAdditionError;
        this.errorText = "Please enter a category weight.";
        this.errorShown = true;
        return;
      }
      else if(this.type === '') {
        this.errorType = this.errorTypes.categoryAdditionError;
        this.errorText = "Please enter a category type";
        this.errorShown = true;
        return;
      }
      else {
        this.errorType = this.errorTypes.categoryAdditionError;
        this.errorText = "The weights of the categories already have a sum of 100%";
        this.errorShown = true;
        return;
      }
    },
    changeAssignmentCategory: function (event) {
      // console.log('ran');
      this.category = event.target.options[event.target.options.selectedIndex].text;
    },
    changeAssignmentCategoryOfImprovement: function (event) {
      this.selectedCategoryOfImprovement = event.target.options[event.target.options.selectedIndex].text;
    },
    calculateGrade: function () {
      vm = this;
      let weightedScore = 0;
      weights.forEach((weight) => {
        weight.pointsEarned = 0;
        weight.pointsPossible = 0;
      })
      weights.asyncForEach((weight) => {
        scores.asyncForEach((score) => {
          if (score.category === weight.category) {
            weight.pointsPossible += score.snum;
            weight.pointsEarned += score.fnum;
          }
        })
      }).then(() => {
        weights.asyncForEach((weight2) => {
          if (weight2.pointsEarned === 0 && weight2.pointsPossible === 0) {
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
              let maxPossibleIncreaseSorted = [];
              weights.forEach((weight) => {
                weight.maximumPossibleIncrease = weight.weight - weight.score;
              });
              weights.asyncForEach((weight) => {
                maxPossibleIncreaseSorted.push(weight.maximumPossibleIncrease);
              }).then(() => {
                maxPossibleIncreaseSorted.sort();
                vm.recommendedCategoryOfImprovement = maxPossibleIncreaseSorted[maxPossibleIncreaseSorted.length - 1];
                console.log(vm.recommendedCategoryOfImprovement);
              });
            });
          });
        });
      });
    },
    calculateMethods: function () {
      //error handling
      if (this.goalPercentage !== '' && isNaN(this.goalPercentage) === false && this.selectedCategoryOfImprovement !== '') {
        console.log('ran');
        const vm = this;
        let weightsArr = [];
        let selectedCategoryOfImprovement = this.selectedCategoryOfImprovement;
        let goalPercentage = this.goalPercentage
        //Calculates the amount the score of a category can increase

        function calculateNeededCategoryScoreIncrease() {
          let side1Percentage = parseInt(goalPercentage, 10);
          let side1 = side1Percentage / 100;
          let multiplierWeight;
          weights.asyncForEach((weight) => {
            if (weight.category == selectedCategoryOfImprovement) {
              multiplierWeight = weight.weight;
            }
            else if (weight.category !== selectedCategoryOfImprovement) {
              weightsArr.push(weight.score);
            }
          }).then(() => {
            let sum = 0;
            weightsArr.asyncForEach((weight) => {
              sum += weight;
            }).then(() => {
              side1 -= sum;
              vm.percentageToRaise = (side1 / multiplierWeight) * 100;
              multiplierWeight = 0;
              sum = 0;
            });
          });
        }

        function calculateAssignmentsNeeded() {
          let categorySpecificScores = [];
          let numScores = 0;
          let numeratorSum = 0;
          let denominatorSum = 0;
          let numeratorAvg;
          let denominatorAvg;
          let percentageAvg;
          scores.asyncForEach((score) => {
            if (score.category == selectedCategoryOfImprovement) {
              categorySpecificScores.push({
                fnum: score.fnum,
                snum: score.snum
              })
            }
          }).then(() => {
            categorySpecificScores.asyncForEach((score) => {
              // Do average code here
              numScores += 1;
              numeratorSum += score.fnum;
              denominatorSum += score.snum;
              numeratorAvg = numeratorSum / numScores;
              denominatorAvg = denominatorSum / numScores;

              // console.log(numeratorAvg, denominatorAvg);
            }).then(() => {
              let categoryPercentage;
              let step1;
              let step2;

              let extraPercentage;
              let numAssignments = 1;
              function calculateAssignment() {
                if (numAssignments === 1) {
                  categoryPercentage = (numeratorSum / denominatorSum) * 100;
                  step1 = vm.percentageToRaise * (numScores + 1);
                  step2 = Math.ceil(step1 - categoryPercentage);
                }
                else if (numAssignments > 1) {
                  categoryPercentage = (categoryPercentage + 100) / 2;
                  step1 = vm.percentageToRaise * (numScores + 1);
                  step2 = Math.ceil(step1 - categoryPercentage);
                }
                if (step2 > 100) {
                  extraPercentage = step2 - 100;
                  numAssignments += 1;
                  calculateAssignment();
                }
                else {
                  vm.numAssignmentsToComplete = numAssignments - 1;
                  vm.finalAssignmentPercentage = step2;
                  return;
                }
              }
              calculateAssignment();
            })
          });
        }

        calculateNeededCategoryScoreIncrease();
        calculateAssignmentsNeeded();
        this.howButtonSectionVisible = true;
        return;
      }
      else if(this.goalPercentage === '') {
        this.errorType = this.errorTypes.goalCalculationError;
        this.errorText = "Please enter a goal percentage.";
        this.errorShown = true;
        return;
      }
      else if(isNaN(this.goalPercentage) === true) {
        this.errorType = this.errorTypes.goalCalculationError;
        this.errorText = "Goal percentage should be a number.";
        this.errorShown = true;
        return;
      }
      else {
        this.errorType = this.errorTypes.goalCalculationError;
        this.errorText = "Please select a category to improve upon.";
        this.errorShown = true;
        return;
      }
    },
    showHowSection: function () {
      this.howSectionVisible = true;
    },
    hideError: function() {
      this.errorShown = false;
    },
    getUser: function() {
      axios.get('http://localhost:3000/user').then((response) => {
        this.user = response;
        console.log(this.user);
      }).catch((error) => {
        console.log(error.response);
      })
    },
    logOut: function() {
      window.location.href = "/logout";
    }
  },
  beforeMount() {
    this.getUser();
  }
})