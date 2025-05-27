import { Router } from 'express'

const router = Router();

router.get("/mockingpets", mocksController.mockingpets())