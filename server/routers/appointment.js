const {Router}= require('express');
const appointmentController=require('../controllers/appointment');

const appointmentRouter=Router();

appointmentRouter.post('/bookApp',appointmentController.postApp);
appointmentRouter.get('/getPendingApps',appointmentController.getPendingAppointments);
appointmentRouter.get('/getAcceptedApps',appointmentController.getAcceptedAppointments);
appointmentRouter.get('/acceptApp',appointmentController.acceptAppointment);
appointmentRouter.delete('/deleteApp',appointmentController.deleteApp);
appointmentRouter.post('/bookSaleApp',appointmentController.postSaleApp);
appointmentRouter.get('/getAppStatistics',appointmentController.getAppStatistics);
appointmentRouter.get('/getAppDetails',appointmentController.getAppDetails);
appointmentRouter.get('/getDisableDates',appointmentController.getDisableDates);

module.exports=appointmentRouter;