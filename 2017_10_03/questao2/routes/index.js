var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  global.db.findAll((e, docs) => {
      if(e) { return console.log(e); }
      res.render('index', { title: 'Users CRUD 2', author: 'Erick Santos', docs: docs });
  });
});

/* GET new user. */
router.get('/new', function(req, res, next) {
  res.render('new', { 
    title: 'New user | Users CRUD 2',
    doc: { "name":"","photo":"","email":"","address":"","phone":""},
    action: './new'
  });
});

/* POST new user. */
router.post('/new', function(req, res) {
  var name = req.body.name;
  var photo = "./uploads/";
  console.log(req.file);
  if (req.file==undefined) {
    photo += "default-user-image.png";
  }
  else {
    photo += req.file.filename;
  }
  var email = req.body.email;
  var address = req.body.address;
  var phone = req.body.phone;

  global.db.insert({name, photo, email, address, phone}, (err, result) => {
    if(err) { return console.log(err); }
    res.redirect('/');
  });
});

/* GET edit user. */
router.get('/edit/:id', function(req, res, next) {
  var id = req.params.id;
  global.db.findOne(id, (e, docs) => {
      if(e) { return console.log(e); }
      res.render('new', {
        title: 'Edit user | Users CRUD 2',
        doc: docs[0],
        action: './edit/' + docs[0]._id
      });
    });
});

/* POST edit user. */
router.post('/edit/:id', function(req, res) {
  var id = req.params.id;
  var name = req.body.name;
  var email = req.body.email;
  var address = req.body.address;
  var phone = req.body.phone;
  var obj = null;
  if (req.file!=undefined) {
    var photo = "./uploads/" + req.file.filename;
    obj = {name, photo, email, address, phone};
  }
  else {
    obj = {name, email, address, phone};
  }
  global.db.update(id, { $set: obj }, (e, result) => {
    if(e) { return console.log(e); }
    res.redirect('/');
  });
});

/* GET delete user. */
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOne(id, (e, r) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

module.exports = router;
