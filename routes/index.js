const express= require("express")
 const noteRoutes= require('./notes')
const router= express()

router.use('/notes', noteRoutes)


module.exports=  router;