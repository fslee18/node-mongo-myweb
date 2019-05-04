var express = require('express');
let dbProfile = require('../models/Profile');

var router = express.Router();

router.get('/', (req, res)  => {
    res.render('login');
});

router.get('/signup', (req, res) => {
    res.render('signup');
})


router.get('/profile/:id', (req, res) => {
    let qid = req.params.id
    
    dbProfile.findById(qid)
    .then(profile =>{
        res.json({
            confirmation: 'success',
            data: profile
        })
    })
    .catch(err => {
        res.json({
            confirmation: 'fail',
            message: err.message
        })
    })
    
})

router.post('/profile', (req, res) => {
    let pemail = req.body.email
    let ppassword = req.body.password
    dbProfile.find({email: pemail, password: ppassword})
    .then(profile => {
        if(profile != ''){
            res.json({
                confirmation: 'login success',
                data: profile
            })
        } else {
            res.json({
                confirmation: 'login fail',
                message: "sorry"
            })
        }
    })
    .catch(err =>{
        res.json({
            confirmation: 'Error',
            message: err.message
        })
    }) 
})

router.post('/confirmation', (req, res) => {

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