const {Schema,model}=require('mongoose');
const userSchema=new Schema({
    fname:{
        type:'string',
        required: true
    },
    lname:{
        type:'string',
        required: true
    },
    email:{
        type:'string',
        required: true
    },
    phoneNum:{
        type:'string',
        required: true
    },
    pass:{
        type:'string',
        required: true
    },
    role:{
        type:'string',
        required: true
    }


})
const userModel= new model('user',userSchema);
module.exports=userModel;