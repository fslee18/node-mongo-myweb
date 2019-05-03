var express = require('express');
let dbProfile = require('../models/Profile');

var router = express.Router();

router.get('/', function (req, res) {
    res.render('signup');
});

// router.get('/courses', function (req, res) {
//     var vm = { title: "Rest Demo" };
//     res.render('courses', vm);
// });

//API or REST Endpoints are defined below

// router.get('/api/courses', function (req, res) {
//     Course.find({}, function (err, courses) {
//         res.json(courses);
//     });
// });

router.post('/profile', (req, res) => {

    dbProfile.create(req.body)

    .then(profile => {
        res.json({
            confirmation: "Signup success",
            data: profile
        })
    })

    .catch(profile => {
        res.json({
            confirmation: "fail to signup",
            message: err.message
        })
    })


});

module.exports = router;