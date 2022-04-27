const Router  = require("express");
const Event = require("../models/events")
const redis = require('redis');

// const REDIS_PORT = process.env.PORT || 6379;
// const redis_client = redis.createClient(REDIS_PORT);
const url = `redis://redis-14479.c301.ap-south-1-1.ec2.cloud.redislabs.com:14479`;
const redis_client = redis.createClient({
    url,
    password: "liwaro9995@wowcg.com"
});
redis_client.connect();
const router = Router()

// Get collection for Event
async function getEventsAll (req,res,next){
    try{
        const api_data = await Event.find()
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        redis_client.setEx('Allevents',3600,JSON.stringify(api_data))
        res.json(api_data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
async function Alleventscache (req,res,next){
    try{
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        const value = await redis_client.get('Allevents')
        if (value!=null){
            const obj = JSON.parse(value.toString());
            res.json(obj)
        }
        else{
            next();
        }
    }catch(error){
        throw error;
    }
}
router.get("/",Alleventscache,getEventsAll)


//Create new individual
router.post("/", async (req, res) =>{
    const data = new Event({
        name: req.body.name,
        location: req.body.location,
        feedback: req.body.feedback,
        is_popular: req.body.is_popular,
        genre: req.body.genre,
        about: req.body.about,
        banner_image_url: req.body.banner_image_url,
        languages: req.body.languages,
        grade: req.body.grade,
        rating: req.body.rating,
        is_premier: req.body.is_premier,
        release_date: req.body.release_date,
        cast: req.body.cast,
        duration: req.body.duration
    })
    try {
        const newData = await data.save()
        res.status(200).json("Event Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

// Get collection for Event
async function getEventsOne (req,res,next){
    try{
        const api_data = await Event.findById(req.params.id)
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        const key = 'Event'.concat(req.params.id.toString())
        redis_client.setEx(key,3600,JSON.stringify(api_data))
        res.json(api_data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
async function Eventscache (req,res,next){
    try{
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        const key = 'Event'.concat(req.params.id.toString())
        const value = await redis_client.get(key)
        if (value!=null){
            const obj = JSON.parse(value.toString());
            res.json(obj)
        }
        else{
            next();
        }
    }catch(error){
        throw error;
    }
}
router.get("/:id",Eventscache,getEventsOne)

// //Get individual
// router.get("/:id", getEvent, (req, res) =>{
//     res.status(200).json(res.events)
// })



//update individual
router.patch("/:id", getEvent, async (req, res) =>{
    if(req.body.name != null){
        res.events.name = req.body.name
    }
    if(req.body.location != null){
        res.events.location = req.body.location
    }
    if(req.body.feedback != null){
        res.events.feedback = req.body.feedback
    }
    if(req.body.is_popular != null){
        res.events.is_popular = req.body.is_popular
    }
    if(req.body.duration != null){
        res.events.duration = req.body.duration
    }
    if(req.body.about != null){
        res.events.about = req.body.about
    }
    if(req.body.genre != null){
        res.events.genre = req.body.genre
    }
    if(req.body.banner_image_url != null){
        res.events.banner_image_url = req.body.banner_image_url
    }
    if(req.body.languages != null){
        res.events.languages = req.body.languages
    }
    if(req.body.grade != null){
        res.events.grade = req.body.grade
    }
    if(req.body.rating != null){
        res.events.rating = req.body.rating
    }
    if(req.body.is_premier != null){
        res.events.is_premier = req.body.is_premier
    }
    if(req.body.release_date != null){
        res.events.release_date = req.body.release_date
    }
    if(req.body.cast != null){
        res.events.cast = req.body.cast
    }

    

    try {
        const updatedEvent = await res.events.save()
        res.status(200).json("Event Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//delete individual
router.delete("/:id", getEvent, async (req, res) =>{
    try {
        await res.events.remove()
        res.status(200).json({message: "Event Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
async function getEvent(req,res,nxt) {
    let events;
    try {
        events = await Event.findById(req.params.id)
        if(events == null){
            return res.status(400).json({message: "Event does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.events = events
    nxt()
}
module.exports = router;
