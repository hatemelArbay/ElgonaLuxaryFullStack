
const {Schema,model}=require('mongoose');
const propertySchema=new Schema({
propertyType:{
    type:'string',
    required: true
},
price:{
    type:'number',
    required: true
},
location:{
    type: 'string',
    required: true
},
compound:{
    type: 'string',
    required: true
},
numBeds:{
    type: 'Number',
    required: true
},
numShower:{
    type: 'Number',
    required: true
    
},
coverImgUrl:{
    type: 'String',
    required: true
},
measure:{
    type: 'Number',
    required: true
},
view:{
    type: 'String',
    required: true
},
imagesUrl:{
    type: [String],
    required: true
},
propertyName:{
    type:'string',
    required: true
},
description:{
    type: "String",
    required: true
},
featured:{
    type: 'boolean',
    required: true
},
// totalPrice:{
//     type: Int,
//     required: false
// }


})

const propertyModel= new model('property',propertySchema);
module.exports=propertyModel;