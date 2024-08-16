const {Router}= require('express');
const propertyController=require('../controllers/property');

const propertyRouter=Router();

propertyRouter.post('/addProperty',propertyController.postProperty);
propertyRouter.get('/getFeaturedProperties',propertyController.getFeaturedProperties);
propertyRouter.get('/getProperties',propertyController.getProperties);
propertyRouter.get('/getRentProperties',propertyController.getPropertiesRent);
propertyRouter.get('/getSaleProperties',propertyController.getPropertiesSale);
propertyRouter.get('/getPropertyUsingId',propertyController.getPropertyUsingId);
propertyRouter.get('/setPropertyFeatured', propertyController.setFeaturedType);
propertyRouter.delete('/deleteProperty', propertyController.deleteProperty);
propertyRouter.get('/getPropStatistics', propertyController.getPropStatistics);
propertyRouter.get('/getPropPrice', propertyController.getPropertyPrice);

module.exports=propertyRouter;