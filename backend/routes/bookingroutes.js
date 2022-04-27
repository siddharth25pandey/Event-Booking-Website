const Router  = require("express");
const Booking = require("../models/booking")

const router = Router()

// Get collection for Booking
router.get("/", async (req, res) =>{
    try {
        const data = await Booking.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Create new individual
router.post("/", async (req, res) =>{
    const data = new Booking({
        name: req.body.name,
        date: req.body.date,
        day: req.body.day,
        time: req.body.time,
        venues_name: req.body.venues_name,
        silver: req.body.silver,
        platinium: req.body.platinium,
        price: req.body.price,
        total_price: req.body.total_price,
        banner_image_url: req.body.banner_image_url,
        grade: req.body.grade
    })
    try {
        const newData = await data.save()
        res.status(200).json("Booking Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get individual
router.get("/:id", getBooking, (req, res) =>{
    res.status(200).json(res.bookings)
})


//update individual
router.patch("/:id", getBooking, async (req, res) =>{
    if(req.body.name != null){
        res.bookings.name = req.body.name
    }
    if(req.body.date != null){
        res.bookings.date = req.body.date
    }
    if(req.body.day != null){
        res.bookings.day = req.body.day
    }
    if(req.body.time != null){
        res.bookings.time = req.body.time
    }
    if(req.body.venues_name != null){
        res.bookings.venues_name = req.body.venues_name
    }
    if(req.body.silver != null){
        res.bookings.silver = req.body.silver
    }
    if(req.body.platinium != null){
        res.bookings.platinium = req.body.platinium
    }
    if(req.body.price != null){
        res.bookings.price = req.body.price
    }
    if(req.body.total_price != null){
        res.bookings.total_price = req.body.total_price
    }
    if(req.body.banner_image_url != null){
        res.bookings.banner_image_url = req.body.banner_image_url
    }
    if(req.body.grade != null){
        res.bookings.grade = req.body.grade
    }
    

    try {
        const updatedBooking = await res.bookings.save()
        res.status(200).json("Booking Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//delete individual
router.delete("/:id", getBooking, async (req, res) =>{
    try {
        await res.bookings.remove()
        res.status(200).json({message: "Booking Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
async function getBooking(req,res,nxt) {
    let bookings;
    try {
        bookings = await Booking.findById(req.params.id)
        if(bookings == null){
            return res.status(400).json({message: "Booking does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.bookings = bookings
    nxt()
}
module.exports = router;
