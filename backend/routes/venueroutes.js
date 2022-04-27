const Router  = require("express");
const Venue = require("../models/venue")
const redis = require('redis');

const url = `redis://redis-14479.c301.ap-south-1-1.ec2.cloud.redislabs.com:14479`;
const redis_client = redis.createClient({
    url,
    password: "liwaro9995@wowcg.com"
});
redis_client.connect();
const router = Router()

// Get collection for Venue
async function getVenueAll (req,res,next){
    try{
        const api_data = await Venue.find()
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        redis_client.setEx('Allvenue',3600,JSON.stringify(api_data))
        res.json(api_data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
async function Allvenuecache (req,res,next){
    try{
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        const value = await redis_client.get('Allvenue')
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
router.get("/",Allvenuecache,getVenueAll)

//Create new individual
router.post("/", async (req, res) =>{
    const data = new Venue({
        name: req.body.name,
        image: req.body.image,
        sub_region: req.body.sub_region,
        package: req.body.package,
        capacity: req.body.capacity,
        cancellation_availability: req.body.cancellation_availability,
        timings: req.body.timings
    })
    try {
        const newData = await data.save()
        res.status(200).json("Venue Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get individual
async function getVenueOne (req,res,next){
    try{
        const api_data = await Venue.findById(req.params.id)
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        const key = 'Venue'.concat(req.params.id.toString())
        redis_client.setEx(key,3600,JSON.stringify(api_data))
        res.json(api_data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
async function Venuecache (req,res,next){
    try{
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        const key = 'Venue'.concat(req.params.id.toString())
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
router.get("/:id",Venuecache,getVenueOne)


//update individual
router.patch("/:id", getVenue, async (req, res) =>{
    if(req.body.name != null){
        res.venues.name = req.body.name
    }
    if(req.body.image != null){
        res.venues.image = req.body.image
    }
    if(req.body.sub_region != null){
        res.venues.sub_region = req.body.sub_region
    }
    if(req.body.package != null){
        res.venues.package = req.body.package
    }
    if(req.body.capacity != null){
        res.venues.capacity = req.body.capacity
    }
    if(req.body.cancellation_availability != null){
        res.venues.cancellation_availability = req.body.cancellation_availability
    }
    if(req.body.timings != null){
        res.venues.timings = req.body.timings
    }

    try {
        const updatedVenue = await res.venues.save()
        res.status(200).json("Venue Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//delete individual
router.delete("/:id", getVenue, async (req, res) =>{
    try {
        await res.venues.remove()
        res.status(200).json({message: "Venue Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
async function getVenue(req,res,nxt) {
    let venues;
    try {
        venues = await Venue.findById(req.params.id)
        if(venues == null){
            return res.status(400).json({message: "Venue does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.venues = venues
    nxt()
}
module.exports = router;
