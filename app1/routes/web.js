import express from 'express'
let router= express.Router()

import studentData from '../controller/student-controller.js'
router.get('/api/jokes',studentData)

export default router;