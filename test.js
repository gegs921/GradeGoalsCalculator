const test = require('ava');
const loginUtils = require('./public/js/lib/checkUsernameAndEmail.js');
const registrationUtils = require('./public/js/lib/passEmailValidation.js');

test("checking username and email (won't connect)", t => {
  loginUtils.checkUsernameAndEmail('test', 'test@gmail.com');
  t.pass();
});

test('email validates', t => {
  registrationUtils.validateEmail('test@gmail.com');
  t.pass();
});

test('password validates', t => {
  registrationUtils.vaildatePassword('testpassword1');
  t.pass();
})

