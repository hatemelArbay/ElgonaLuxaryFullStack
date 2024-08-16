const { json } = require("express");
const propertyModel = require("../models/property");

module.exports.PostProperty= async (propertyInfo)=>{
try {
const {imagesUrl,coverImgUrl}=propertyInfo;

if(imagesUrl.length ===0 || coverImgUrl===''){
   return {err:'please provide property images'}
}

    const property=new propertyModel({
        propertyType:propertyInfo.propertyType, 
        propertyName:propertyInfo.propertyName,
        price:propertyInfo.price, 
        location:propertyInfo.location, 
        compound:propertyInfo.compound, 
        numBeds:propertyInfo.numBeds, 
        numShower:propertyInfo.numShower,
        coverImgUrl:propertyInfo.coverImgUrl, 
        imagesUrl:propertyInfo.imagesUrl,
        view:propertyInfo.view,
        measure:propertyInfo.measure,
       description:propertyInfo.description,
        featured:propertyInfo.featured
   
    });
  
    const createdApp= await property.save();
    if(createdApp)
    return createdApp;
   
    


}catch(err){
    console.log('error in adding property : '+err);
}
};

module.exports.getFeaturedProperties= async()=>{
try{
    const featuredProterties = await propertyModel.find({featured:true});
    return featuredProterties;

}catch(err){
console.log("error in getting featured properties in service : "+err);
};
};

module.exports.getProperties= async()=>{
    try{
        const properties = await propertyModel.find();
        return properties;
    
    }catch(err){
    console.log("error in getting properties in service : "+err);
    };
    };

    module.exports.getRentProperty= async()=>{
        try{
            const propertiesRent = await propertyModel.find({propertyType:"rent"});
            return propertiesRent;

        }catch(err){
        console.log("error in getting properties for rent : "+err);
        }
    };

    module.exports.getSaleProperty= async()=>{
        try{
            const propertiesSale = await propertyModel.find({propertyType:"sale"});
            return propertiesSale;

        }catch(err){
        console.log("error in getting properties for sale : "+err);
        }
    };



module.exports.getPropertyUsingId= async(propertyId)=>{
try{
    const property= await propertyModel.findById(propertyId);
return property;
}catch(err){
    return "error in getting property using id : "+err;
}

};

module.exports.setFeaturedType= async (propertyId,featuredState)=>{
try{
   const property = await propertyModel.findOneAndUpdate({_id:propertyId},{featured:featuredState}, { new: true });
    return property;
  
}catch(err){
    console.log("eror in setting featured type ");
}

}

module.exports.deleteProperty = async (propertyid)=>{
    console.log("property id : "+propertyid);
    try{
         await propertyModel.deleteOne({_id: propertyid}).then(function(){
           return "property deleted successfully";
        }).catch(function(error){
        return "error in deleting property " + error
        });
        return "property deleted successfully";


    }catch(err){
        console.log("eror in deleting property ");
    }
}

module.exports.getPropStatistics= async()=>{
try{
    const rentProperties= await propertyModel.find({propertyType: "rent"});
    const saleProperties = await propertyModel.find({propertyType: "sale"});
    
    return {rentPropertiesCount: rentProperties.length,
         salePropertiesCount: saleProperties.length}

}catch(err){
    console.log("eror in getting properties statistics");
}

}

module.exports.getPropertyPrice=async(id)=>{
    try{
        const property = await propertyModel.findById(id);
        return property.price;
    }catch(err){
        console.log("eror in getting property price");
    }
}