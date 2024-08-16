
const {Schema,model}=require('mongoose');
const appointmentSchema=new Schema({
userId:{
    type: Schema.Types.ObjectId,
    ref: 'user',
    required: true
},
startDate:{
    type: Date,
    required: true
},
endDate:{
    type: Date,
    required: false
},
status:{
    type: 'String',
    required: true
},
bookedBy:{
    type: 'String',
    required: true
},
propertyId:{
    type: Schema.Types.ObjectId,
    ref: 'property',
    required: true
},
time:{
    type: 'String',
    required: false
}

})
const appointmentModel= new model('appointment',appointmentSchema);
module.exports=appointmentModel;