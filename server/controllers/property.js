const propertyService= require('../Services/property'); 
const {ObjectId } = require('mongodb');

module.exports.postProperty= async (req,res)=>{
    try{
    
    const propertyInfo=({
        propertyType:req.body.propertyType, 
        propertyName:req.body.propertyName,
        price:req.body.price, 
        location:req.body.location,
        compound:req.body.compound,
        numBeds:req.body.numBeds,
        numShower:req.body.numShower,
        coverImgUrl:req.body.coverImgUrl,
        imagesUrl:req.body.imagesUrl,
        view:req.body.view,
        measure:req.body.measure,
        description:req.body.description,
        featured:req.body.featured
    });

    const newProperty  =await propertyService.PostProperty(propertyInfo);
    if(newProperty.err){
        console.log(newProperty.err);
        res.send({err:newProperty.err});
        return ;
    }
    if(newProperty){
    return res.status(201).send({
        msg: "property added successfully",
        newProperty:newProperty
    });
    }


}catch(err){
    console.log('error in adding property in contorller : '+err);
    return res.status(500).send({
        error: "the error is "+err.message
    });
}

};



module.exports.getFeaturedProperties= async (req, res)=>{
    try{
        const featuredProperties= await propertyService.getFeaturedProperties();
        return (
            res.status(200).send(
                {featuredProperties:featuredProperties}
            )
        );



}catch(err){
    console.log('error in getting featured properties : '+err);
    res.status(500); 
    res.send(err.message);
}


};

module.exports.getProperties= async (req, res)=>{
    try{
        const properties= await propertyService.getProperties();
        return (
            res.status(200).send(
                {properties:properties}
            )
        );



}catch(err){
    console.log('error in getting properties : '+err);
    res.status(500); 
    res.send(err.message);
}


};

module.exports.getPropertiesRent=async(req,res)=>{
    try{
        const propertiesRent= await propertyService.getRentProperty();
        return (
            res.status(200).send(
                {propertiesRent:propertiesRent}
            )
        );



}catch(err){
    console.log('error in getting properties for rent in controller  : '+err);
    res.status(500); 
    res.send(err.message);
}
}

module.exports.getPropertiesSale=async(req,res)=>{
    try{
        const propertiesSale= await propertyService.getSaleProperty();
        return (
            res.status(200).send(
                {propertiesSale:propertiesSale}
            )
        );



}catch(err){
    console.log('error in getting properties for sale in controller  : '+err);
    res.status(500); 
    res.send(err.message);
}
}

module.exports.getPropertyUsingId=async(req,res)=>{
try{
   
    const propertyIdObjectId =new ObjectId(req.query.propertyId);
 
    const property = await propertyService.getPropertyUsingId(propertyIdObjectId);
   
    if(property){
        res.send({
        property: property
    });
    }
    else {
        res.send({
           "errorMessage": "Property not found"
        });
    }


}catch(err){
    res.send(
        {
            mesg:"error in getting property using id from controller : "+err
        }
    )
}
};


module.exports.setFeaturedType= async (req,res)=>{
    try{
        const propertyId =new ObjectId(req.query.propertyId);
        const featuredType = req.query.featuredType;
        const response = await propertyService.setFeaturedType(propertyId,featuredType);
        if (response){
            res.send({mesg : "property updated successfully"});
        }else {
            res.send({mesg : "failed property updated"});    
        }
        


    }catch(err){
        res.send("error in setting featured type : "+err);
    }
}

module.exports.deleteProperty = async (req,res)=>{
try {
   
    const propertyId =new ObjectId(req.query.propertyId);
    const response = await propertyService.deleteProperty(propertyId);
    console.log("respoinse in controller :"+response);
    if(response){
        res.send({
           mesg: "property Deleted successfully"
        });
    }

}catch(err){
    res.send("error in deleting property : "+err);
}
};

module.exports.getPropStatistics = async (req,res)=>{
try{
    const {rentPropertiesCount,salePropertiesCount}= await propertyService.getPropStatistics();
    res.send({
        rentCount : rentPropertiesCount,
        saleCount:salePropertiesCount
    })
}catch(err){
    console.log("error in getting properties statistics in controller :"+err);
}
};

module.exports.getPropertyPrice=async (req,res)=>{

    try{
        const propertyIdObjectId =new ObjectId(req.query.propertyId);
        const propertyPrice = await propertyService.getPropertyPrice(propertyIdObjectId);
        if(propertyPrice)
            res.send({propertyPrice : propertyPrice});
    
        
    }catch(err){
        console.log("error in getting property price in controller :"+err);
    }
}

