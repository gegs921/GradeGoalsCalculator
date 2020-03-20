const express = require('express');
const app = express();

const handleEditPost = new Promise(function(resolve, reject) {
  app.post('/classToEditPost', (req, res) => {

    if(!req.body.id) {
      reject(Error("Class id is requried."));
    }
    else {
      let classData = {
        id: req.body.id
      };

      resolve(classData);
    }
  })
})

module.exports = handleEditPost;