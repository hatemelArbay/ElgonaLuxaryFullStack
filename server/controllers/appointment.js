const appointmentService= require('../Services/appointment');
const {ObjectId} = require('mongodb');

module.exports.postApp=async(req,res)=>{

    try{
        userObjectId=new ObjectId(req.body.userId,);
        propertyObjectId=new ObjectId(req.body.propertyId)
        
        const appData={
            userId:userObjectId,
            startDate:req.body.startDate,
            endDate:req.body.endDate,
            propertyId:propertyObjectId,
            bookedBy:req.body.bookedBy,
            status:req.body.status
        }
        console.log(appData);
        
        const newApp = await appointmentService.postAppointment(appData);
        if(newApp)
            res.send({
        app:newApp
            })
        else 
        res.send({
            message:"error in adding appointment"
                })

    }catch(err){
        console.log("error in adding appointment in controller : "+err);
    }
};
module.exports.postSaleApp=async(req,res)=>{

    try{
        userObjectId=new ObjectId(req.body.userId,);
        propertyObjectId=new ObjectId(req.body.propertyId)
        
        const appData={
            userId:userObjectId,
            startDate:req.body.startDate,
            propertyId:propertyObjectId,
            bookedBy:req.body.bookedBy,
            status:req.body.status,
            time:req.body.time
        }
        console.log(appData);
        
        const newApp = await appointmentService.postSaleAppointment(appData);
        if(newApp)
            res.send({
        mesg: 'Appointment Booked successfully',
        app:newApp
            })
        else 
        res.send({
            message:"error in adding appointment"
                })

    }catch(err){
        console.log("error in adding appointment in controller : "+err);
    }
};

module.exports.getPendingAppointments= async(req, res)=>{

    try{
        const pendingAppointments = await appointmentService.getPendingAppointments();
        if(pendingAppointments){
            res.send({pendingAppointments:pendingAppointments})
        }
        

    }catch(err){
        res.send({
            msg:"error in getting pending appointments"
        })
    }

};


module.exports.getAcceptedAppointments= async(req, res)=>{
    try{
        const acceptedAppointments = await appointmentService.getAcceptedAppointments();
        if(acceptedAppointments){
            res.send({acceptedAppointments:acceptedAppointments})
        }
        

    }catch(err){
        res.send({
            msg:"error in getting accepted appointments"
        })
    }
}

module.exports.acceptAppointment= async(req, res)=>{
    try{
        const appId=new ObjectId(req.query.appId);
        const acceptedApp= await appointmentService.acceptAppointment(appId);
        if (acceptedApp){
            res.send({acceptedApp: acceptedApp});
        }
        else {
            res.send("error in accepting app");
        }

    }catch(err){
        res.send({msg:"error in accepting appointment"});
    }
}

module.exports.deleteApp= async(req, res)=>{
try{
    const appId=new ObjectId(req.query.appId);

    const deletedApp= await appointmentService.deleteAppointment(appId);

    if (deletedApp){
        res.send({deletedApp:deletedApp})
    }else{
        res.send({msg:"error in deleting appointment"});
    }
   
    
    
}catch(err){
    res.send({msg:"error in deleting appointment"});
}

}

module.exports.getAppStatistics = async(req,res)=>{

    try{
        const response=await appointmentService.getAppStatistics();
        console.log('response in controller : '+response);
        res.send(response);

    }catch(err){
        console.log("error ing getting app statistics in controller : "+err)
    }
}
module.exports.getAppDetails= async(req,res)=>{
    try{
        const objectAppId=new ObjectId(req.query.appId);
        const appDetails = await appointmentService.getAppDetails(objectAppId);
        if(appDetails){
        res.send(appDetails);
        }
    }catch(err){
        console.log("error ing getting app details in controller : "+err);
    }
}

module.exports.getDisableDates = async(req,res)=>{
    try{
        const propertyId = new ObjectId(req.query.propertyId);
        const disabledDates= await appointmentService.getDisabledDates(propertyId);
        res.send({disabledDates});
    }catch(err){
        console.log("error ing getting disable apps in controller : "+err);
    }
}