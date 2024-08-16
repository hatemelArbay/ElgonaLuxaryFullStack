const {Router}= require('express');
const authController=require('../controllers/auth');

const authRouter=Router();

authRouter.post('/signUp',authController.postUser);
authRouter.post('/login',authController.postLogin);
authRouter.get('/getUserData',authController.getUserData);

module.exports=authRouter;