const appointmentModel=require('../models/appointment');

module.exports.postAppointment=async(appData)=>{
    try{
        const { startDate, endDate ,propertyObjectId} = appData;
        const startDateObj = new Date(startDate);
        const endDateObj = new Date(endDate);
    
const overlapping =  await appointmentModel.find({
    property_id: propertyObjectId,
    $or: [
        { startDate: { $lt: endDateObj }, endDate: { $gt: startDateObj } }
    ]});

    if (overlapping.length > 0) {
        return  {mesg:"This property is already booked for the selected dates"} ;
    }
    console.log("start data : "+startDate);
    
    const app= new appointmentModel({
        userId:appData.userId,
        startDate:startDateObj,
        endDate:endDateObj,
        propertyId:appData.propertyId,
        bookedBy:appData.bookedBy,
        status:appData.status
    });
    const newApp= await app.save();
    console.log(newApp);
    return ({
        newApp:newApp,
        mesg:"appointment booked successfully"
    });

    }catch(err){
        console.error(err);
        return "Internal server error" +err;
    }
}
module.exports.postSaleAppointment= async(appData)=>{
try{
   
  
    const {propertyObjectId,time,startDate}=appData;
    const date = new Date(startDate);
    const appointments = await appointmentModel.find({
        property_id: propertyObjectId,
        startDate: date,
        time: time
    });
    console.log(appointments);
    if (appointments.length > 0) {
        return "Appointment already reserved, please choose another date";
    }
    else {
        const app= new appointmentModel({
            userId:appData.userId,
            startDate:date,
            propertyId:appData.propertyId,
            bookedBy:appData.bookedBy,
            status:appData.status,
            time:appData,time
        });
        const newApp = app.save();
        return newApp;
    }
    
 

    
}catch(err){
    console.log("cannot add sale appointment : ",err);
    return "cannot add sale appointment"
}
}

module.exports.getPendingAppointments=async()=>{
    try{
        const pendingApps = await appointmentModel.find({status: "pending"}).populate("userId").populate("propertyId");
        console.log("pendingApps");
        
        
        if(pendingApps){
            return pendingApps;
        }
        else {
            return "cannot get pending appointments"
        }



    }catch(err){
        console.log("error in getting reserved appointments: "+err);
    }


}

module.exports.getPendingSaleAppointments=async()=>{
    try{
        const pendingApps = await appointmentModel.find({status: "pending",type:"sale"}).populate("userId").populate("propertyId");
        if(pendingApps){
            return pendingApps;
        }
        else {
            return "cannot get pending appointments"
        }



    }catch(err){
        console.log("error in getting reserved appointments: "+err);
    }


}


module.exports.getAcceptedAppointments=async()=>{
    try{
        const acceptedApps = await appointmentModel.find({status: "accepted"}).populate("userId").populate("propertyId");
        if(acceptedApps){
            return acceptedApps;
        }
        else {
            return "cannot get accepted appointments"
        }
        
    }catch(err){
        console.log("error in getting accepted appointments: "+err);

    }
}

module.exports.acceptAppointment=async(appId)=>{
    try{
        const acceptedApp= await appointmentModel.findOneAndUpdate({_id:appId},{status: "accepted"});
        return acceptedApp;


    }catch(err){
        console.log(" error in accepting appointment : "+err);
    }
}
module.exports.deleteAppointment=async(appId)=>{
    try{
        await appointmentModel.deleteOne({_id: appId}).then(function(){
          return "App deleted successfully";
       }).catch(function(error){
       return "error in deleting App " + error
       });
       return "App deleted successfully";
   }catch(err){
       console.log("eror in deleting property ");
   }
}

module.exports.getAppStatistics= async()=>{
try{
    const appointments = await appointmentModel.find({status: "accepted"}).populate('propertyId');
   
    return {statisfiedCust:appointments.length}


}catch(err){
    console.log("error in getting AppStatistics : "+err);
}

}

module.exports.getAppDetails= async(appId)=>{
    try{
    const app = await appointmentModel.findById(appId).populate('propertyId').populate('userId');
    const {startDate,endDate,time,compound,propertyId,userId,email}=app
    // console.log(app);
    
        return {startDate,endDate,time,compound,propertyId,userId,email}
    }catch(err){
        console.log("error in getting AppDetails : "+err);
    }
}

module.exports.getDisabledDates= async(propertyId)=>{
    try{

        const propertyApps= await appointmentModel.find({propertyId:propertyId});
        const startDates = propertyApps.map(propApp => new Date(propApp.startDate).toISOString().split('T')[0]);
        const endDates = propertyApps.map(propApp => new Date(propApp.endDate).toISOString().split('T')[0]);
        
        console.log(startDates); 
        console.log(endDates); 
        const disDates= {starteDates:startDates,endeDates:endDates}
        return (disDates);
        
    }catch(err){
        console.log("error in getting DisabledDates : "+err);
    }

}