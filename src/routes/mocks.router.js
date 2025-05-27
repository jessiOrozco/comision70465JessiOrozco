import { Router } from 'express'
import  mocksController  from '../controllers/mocks.controller.js'

const router = Router();

router.get("/mockingpets", mocksController.mockingpets)
router.get('/mockingusers', mocksController.mockingusers)
router.post("/generateData", mocksController.generateData)

export default router