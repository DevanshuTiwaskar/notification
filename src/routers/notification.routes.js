import express, { Router } from "express"

import * as  notificationController from '../controllers/notification.controller.js'


const router = express.Router()



router.post('/send-forget-password-otp',notificationController.sendForgotPasswordEmail)


export default router;



