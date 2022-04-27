const Router  = require("express");
const Feed = require("../models/feed")

const router = Router()

// Get collection for Feed
router.get("/", async (req, res) =>{
    try {
        const data = await Feed.find()
        res.json(data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Create individual
router.post("/", async (req, res) =>{
    const data = new Feed({
        name: req.body.name,
        feed: req.body.feed,
    })
    try {
        const newData = await data.save()
        res.status(200).json("Feed Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get individual
router.get("/:id", getFeed, (req, res) =>{
    res.status(200).json(res.survey)
})


//update individual
router.patch("/:id", getFeed, async (req, res) =>{
    if(req.body.name != null){
        res.feeds.name = req.body.name
    }
    if(req.body.feed != null){
        res.feeds.feed = req.body.feed
    }
    try {
        const updatedFeed = await res.survey.save()
        res.status(200).json("Feed Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//delete individual
router.delete("/:id", getFeed, async (req, res) =>{
    try {
        await res.feeds.remove()
        res.status(200).json({message: "Feed Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
async function getFeed(req,res,nxt) {
    let feeds
    try {
        feeds = await Feed.findById(req.params.id)
        if(feeds == null){
            return res.status(400).json({message: "Feed does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.feeds = feeds
    nxt()
}
module.exports = router;
