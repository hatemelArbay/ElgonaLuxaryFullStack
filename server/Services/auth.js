const bcrypt = require('bcryptjs');
const jwt=require('jsonwebtoken');

const userModel=require('../models/user');

module.exports.postUser=async(userInfo)=>{
try{
let hashedPass=await bcrypt.hash(userInfo.pass,12);
    const newUser=new userModel(
        {
            fname:userInfo.fname,
            lname:userInfo.lname,
            email:userInfo.email,
            phoneNum:userInfo.phoneNum,
            pass:hashedPass,
            role:userInfo.role
        }
   
    );
   const response= await newUser.save();
   if(response){
    console.log(response);
    return response;
   }
    

}catch(err){
    console.log("error in adding user : " + err);
}

}

module.exports.doesUserExist= async(email)=>{
    try{
        const existingUser= await userModel.findOne({ email: email });
        if(existingUser)
            return true;
        else 
        return false;


    }catch(err){
        console.log("error in checking user : " + err);
    }

}
module.exports.checkCreadentials= async (email,pass)=>{
    try{
   
        const user = await userModel.findOne({email:email});
        const isCorrectPass= await bcrypt.compare(pass,user.pass);
        if(isCorrectPass){
            return {status: true , user:user}
        }
        else 
        return {status: false}

    }catch(err){
        console.log("error in checkCreadentials",err);
    }
}

        




module.exports.jenerateJWT = (user)=>{
    const jwtPayload={
        email:user.email,
        userId:user._id,
        role:user.role
    };

    const jwtSecret=process.env.JWT_SECRET;
try {
    let token=jwt.sign(jwtPayload,jwtSecret,{expiresIn :'1h'});
    console.log('Generated Token from the server:', token);
    return token;
}catch(err){
    console.error("Failed to generate JWT:", err);
    console.log("failed to login : "+err);
};



}

module.exports.getUserData = async(id) =>{
    try{
        const user = await userModel.findById(id);
        const {fname,email} = user
        
        return {name :fname, email : email}
     
    }catch(err){
        console.log("Failed to get user data : "+err);
    }
}
