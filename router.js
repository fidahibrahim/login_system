const express = require("express");
const router = express.Router();

const credential = {
    email: "admin@gmail.com",
    password: "admin123",
}


router.get('/',(req,res)=>{
    if(!req.session.user){
       res.render("index", { title: "Login system" });
   
    }
    else{
       res.redirect('/dashboard');
     }
})
//login user
router.post('/login', (req, res) => {
    try{
        if(req.body.email == credential.email && req.body.password == credential.password){
            req.session.user = req.body.email;
            res.redirect('/dashboard');
        }
        else{
            if(req.body.email != credential.email && req.body.password == credential.password){
                res.render('index',{title:"Login", invalid:"Invalid Email Address...!!!"})
            }
            else if(req.body.password != credential.password && req.body.email == credential.email){
                res.render('index', { invalid: "Invalid Password...!!!" });
            }
            else if(req.body.email != credential.email && req.body.password != credential.password){
                res.render('index', { invalid: "Invalid Username and Password...!!!" });
            }
        }
    }
    catch(error){
        console.log(error.message);
    }
});


//Route for dashboard
router.get('/dashboard', (req, res) => {
    if(req.session.user){
        const products= [
            {
                img: "/assets/S23Ultra.jpg",
                brand: 'Samsung',
                model: 'S23 Ultra',
                price: '₹124000',
            },
            {
                img: "/assets/S23+.jpg",
                brand: 'Samsung',
                model: 'S23 Plus',
                price: '₹94000',
            },
            {
                img: "/assets/S23.jpg",
                brand: 'Samsung',
                model: 'S23',
                price: '₹80000',
            },
            {
                img: "/assets/S23FE.jpg",
                brand: 'Samsung',
                model: 'S23 FE',
                price: '₹60000',
            },
            {
                img: "/assets/iPhone15ProMax.jpg",
                brand: 'Apple',
                model: 'iPhone 15 Pro Max',
                price: '₹160000',
            },
            {
                img: "/assets/iPhone15Pro.jpg",
                brand: 'Apple',
                model: 'iPhone 15 Pro',
                price: '₹135000',
            },
            {
                img: "/assets/iPhone15+.jpg",
                brand: 'Apple',
                model: 'iPhone 15 ',
                price: '₹90000',
            },
            {
                img: "/assets/iPhone15.jpg",
                brand: 'Apple',
                model: 'iPhone 15 ',
                price: '₹78000',
            }
        ]
            
        
            
            
        res.render('dashboard',{user : req.session.user,products})
    }
    else{
        res.render('index')
    }
})

//Route for logout
router.get('/logout', (req, res) => {
    req.session.destroy(function(err){
        if(err){
            console.log(err);
            res.send("Error")
        }
        else{
            res.render('index',{title:"Login", logout:"Logout Sucessful...!!!"})
        }
    })
})


module.exports = router;




