# GradeGoalsCalculator

### Calculator that calculates what you need to do to get that next grade.

**Installation**

Clone repo:

`$ git clone https://github.com/talonbragg/GradeGoalsCalculator`

Go to directory:

`$ cd GradeGoalsCalculator`

Start app:

`$ nodemon app.js`

**Calculate a Grade for Each Scoring Category**

Divide points earned by points possible to calculate your grade in each scoring category. So if you've earned 280 points out of 300 points possible on tests, you'd have:

`280 ÷ 300 = 0.933` for tests

And if you were diligent in your homework and got 295 points out of 300 possible, you'd have:

`295 ÷ 300 = 0.983` for homework

Note that for now, you're leaving the results in decimal form.

Multiply by Weighted Percentages
Next, multiply the grade in each scoring category by the appropriate weighted percentage. Go ahead and leave the weighted percentage in decimal form. This gives you:

`0.933 × 0.8 = 0.7464` (because tests are worth 80% or 0.8 of your grade), and

`0.983 × 0.2 = 0.1966` (because homework is worth 20% or 0.2 of your grade).

Add Your Results Together
Add together the weighted grades for each scoring category. The result is your overall weighted grade. So, you have:

`0.7464 + 0.1966 = 0.943`

But the result is still in decimal form. Go ahead and multiply by 100 to convert it to an easier-to-read percentage:

`0.943 × 100 = 94.3%`

After calculating the weighted average, your class grade is 94.3%.