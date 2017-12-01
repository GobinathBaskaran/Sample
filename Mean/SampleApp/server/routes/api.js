const express = require('express');
const router = express.Router();

let User = require('../domain/models/user');

/* GET api listing. */
router.post('/user/add', (req, res) => {

  let user = new User();      // create a new instance of the Bear model
  user.name = req.body.name;  // set the bears name (comes from the request)
  user.userName = req.body.userName;
  user.password = req.body.password;

  // save the bear and check for errors
  user.save((err, data) => {
    if (err)
      res.send(err);

    res.json(data);
  });

});

router.get('/user/all', (req, res) => {
  User.find((err, data) => {
    if (err)
      res.send(err);
    res.json(data);
  });
});

router.put('/user/:id', (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (err)
      res.send(err);

    user.name = req.body.name;

    // save the bear
    user.save((err, data) => {
      if (err)
        res.send(err);
      res.json(data);
    });
  });
});

router.delete('/user/:id', (req, res) => {
  User.remove({ _id: req.params.id }, (err, user) => {
    if (err)
      res.send(err);
    res.json(true);
  });
});

module.exports = router;