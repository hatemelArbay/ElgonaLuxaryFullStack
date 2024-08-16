const authService=require('../Services/auth');
const {ObjectId} = require('mongodb');

module.exports.postUser=async (req,res)=>{
try{
    const newUser={
        fname:req.body.fname,
        lname:req.body.lname,
        email:req.body.email,
        phoneNum:req.body.phoneNum,
        pass:req.body.pass,
        role:req.body.role
    };
    const doesUserExist= await authService.doesUserExist(newUser.email);
    if(doesUserExist){
        return (
            res.send({response : "User already exists"})
        )
    }

    response =await authService.postUser(newUser);
    if(response){
        return (
            res.status(200).send(
                {newUser:newUser}
            )
        );
    }
   

}catch(err){
    console.error("error in post user in controller : "+err);
    res.status(500); 
    res.send(err.message);

}

};

module.exports.postLogin=async (req,res)=>{
try{
    const email = req.body.email;
    const pass = req.body.pass;
    console.log({email: email, pass: pass});
    const userExist= await authService.doesUserExist(email);
    
    if(userExist) {
        const response = await authService.checkCreadentials(email,pass);
        if(response.status){
            const jwt = await authService.jenerateJWT(response.user);
            res.send({
                status:response.status,
                jwt:jwt
            });
        }    
        else {
            res.send({status:response.status});
        }
    }
    else {
        res.send({status:false});
    }

}catch(err){

    console.log("error in controller : "+err);
}

};

module.exports.getUserData = async (req,res)=>{
    try{
        const objectUserId=new ObjectId(req.query.userId);
        const userData = await authService.getUserData(objectUserId);
        if(userData){
        
            res.send({userData:userData});
        }

        
    }catch(err){
        res.send("failed to get user data .");
        console.log("error in getting user data in controller : "+err);
    }
}