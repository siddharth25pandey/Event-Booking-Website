const Router  = require("express");
const User = require("../models/users")

const router = Router()

// Get collection for Food
router.get("/", async (req, res) =>{
    try {
        const data = await User.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Create new individual
router.post("/", async (req, res) =>{
    const data = new User({
        name: req.body.name,
        image: req.body.image,
        about: req.body.about,
        email: req.body.email,
        phone: req.body.phone,
        password: req.body.password,
        friend_interest: req.body.friend_interest,
        fav_genres: req.body.fav_genres,
        booked_events: req.body.booked_events,
        friends: req.body.friends,
        friend_requests: req.body.friend_requests
    })
    try {
        const newData = await data.save()
        res.status(200).json("User Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get individual
router.get("/:id", getUser, (req, res) =>{
    res.status(200).json(res.users)
})


//update individual
router.patch("/:id", getUser, async (req, res) =>{
    if(req.body.name != null){
        res.users.name = req.body.name
    }
    if(req.body.email != null){
        res.users.email = req.body.email
    }
    if(req.body.about != null){
        res.users.about = req.body.about
    }
    if(req.body.phone != null){
        res.users.phone = req.body.phone
    }
    if(req.body.password != null){
        res.users.password = req.body.password
    }
    if(req.body.image != null){
        res.users.image = req.body.image
    }
    if(req.body.friend_interest != null){
        res.users.friend_interest = req.body.friend_interest
    }
    if(req.body.fav_genres != null){
        res.users.fav_genres = req.body.fav_genres
    }
    if(req.body.booked_events != null){
        res.users.booked_events = req.body.booked_events
    }
    if(req.body.friends != null){
        res.users.friends = req.body.friends
    }
    if(req.body.friend_requests != null){
        res.users.friend_requests = req.body.friend_requests
    }

    try {
        const updatedUser = await res.users.save()
        res.status(200).json("User Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//delete individual
router.delete("/:id", getUser, async (req, res) =>{
    try {
        await res.users.remove()
        res.status(200).json({message: "User Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
async function getUser(req,res,nxt) {
    let users;
    try {
        users = await User.findById(req.params.id)
        if(users == null){
            return res.status(400).json({message: "Feed does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.users = users
    nxt()
}
module.exports = router;
