const Router  = require("express");
const Organizer = require("../models/organizers")

const router = Router()

// Get collection for Organizer
router.get("/", async (req, res) =>{
    try {
        const data = await Organizer.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Create new individual
router.post("/", async (req, res) =>{
    const data = new Organizer({
        name: req.body.name,
        image: req.body.image,
        about: req.body.about,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        organized_events: req.body.booked_events
    })
    try {
        const newData = await data.save()
        res.status(200).json("Organizer Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get individual
router.get("/:id", getOrganizer, (req, res) =>{
    res.status(200).json(res.organizers)
})


//update individual
router.patch("/:id", getOrganizer, async (req, res) =>{
    if(req.body.name != null){
        res.organizers.name = req.body.name
    }
    if(req.body.email != null){
        res.organizers.email = req.body.email
    }
    if(req.body.about != null){
        res.organizers.about = req.body.about
    }
    if(req.body.phone != null){
        res.organizers.phone = req.body.phone
    }
    if(req.body.password != null){
        res.organizers.password = req.body.password
    }
    if(req.body.image != null){
        res.organizers.image = req.body.image
    }
    if(req.body.organized_events != null){
        res.organizers.organized_events = req.body.organized_events
    }

    try {
        const updatedOrganizer = await res.organizers.save()
        res.status(200).json("Organizer Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//delete individual
router.delete("/:id", getOrganizer, async (req, res) =>{
    try {
        await res.organizers.remove()
        res.status(200).json({message: "Organizer Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
async function getOrganizer(req,res,nxt) {
    let organizers;
    try {
        organizers = await Organizer.findById(req.params.id)
        if(organizers == null){
            return res.status(400).json({message: "Organizer does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.organizers = organizers
    nxt()
}
module.exports = router;
