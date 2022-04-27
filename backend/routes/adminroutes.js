const Router  = require("express");
const Admin = require("../models/admin")

const router = Router()

// Get collection for Food
router.get("/", async (req, res) =>{
    try {
        const data = await Admin.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Create new individual
router.post("/", async (req, res) =>{
    const data = new Admin({
        password: req.body.password,
        email: req.body.email
    })
    try {
        const newData = await data.save()
        res.status(200).json("Admin Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get individual
router.get("/:id", getAdmin, (req, res) =>{
    res.status(200).json(res.admins)
})


//update individual
router.patch("/:id", getAdmin, async (req, res) =>{
    if(req.body.password != null){
        res.admins.password = req.body.password
    }
    if(req.body.email != null){
        res.admins.email = req.body.email
    }
    try {
        const updatedAdmin = await res.admins.save()
        res.status(200).json("Admin Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//delete individual
router.delete("/:id", getAdmin, async (req, res) =>{
    try {
        await res.admins.remove()
        res.status(200).json({message: "Admin Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
async function getAdmin(req,res,nxt) {
    let admins;
    try {
        admins = await Admin.findById(req.params.id)
        if(admins == null){
            return res.status(400).json({message: "Admin does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.admins = admins
    nxt()
}
module.exports = router;
