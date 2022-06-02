const express=require('express');
const router=express.Router();
const {registerUser, loginUser, authorisedUser}=require('../controllers/userController');
const {protect}=require('../middleware/authMiddleware');

router.post('/signup',registerUser);
router.post('/login',loginUser);
router.get('/user', protect ,authorisedUser);
 
module.exports=router