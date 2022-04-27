const Router  = require("express");
const Food = require("../models/food")
const redis = require('redis');

const url = `redis://redis-14479.c301.ap-south-1-1.ec2.cloud.redislabs.com:14479`;
const redis_client = redis.createClient({
    url,
    password: "liwaro9995@wowcg.com"
});
redis_client.connect();
const router = Router()

// Get collection for Food
async function getFoodAll (req,res,next){
    try{
        const api_data = await Food.find()
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        redis_client.setEx('Allfood',3600,JSON.stringify(api_data))
        res.json(api_data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
async function Allfoodcache (req,res,next){
    try{
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        const value = await redis_client.get('Allfood')
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
router.get("/",Allfoodcache,getFoodAll)

//Create new individual
router.post("/", async (req, res) =>{
    const data = new Food({
        food_name: req.body.food_name,
        is_popcorn: req.body.is_popcorn,
        is_coke: req.body.is_coke,
        is_combo: req.body.is_combo,
        food_tag: req.body.food_tag,
        food_image: req.body.food_image,
        food_price: req.body.food_price,
        count: req.body.count
    })
    try {
        const newData = await data.save()
        res.status(200).json("Food Added!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})

//Get individual
async function getFoodOne (req,res,next){
    try{
        const api_data = await Food.findById(req.params.id)
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        const key = 'Food'.concat(req.params.id.toString())
        redis_client.setEx(key,3600,JSON.stringify(api_data))
        res.json(api_data)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
async function Foodcache (req,res,next){
    try{
        redis_client.on('error', (err) => console.log('Redis Client Error', err));
        const key = 'Food'.concat(req.params.id.toString())
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
router.get("/:id",Foodcache,getFoodOne)

//update individual
router.patch("/:id", getFood, async (req, res) =>{
    if(req.body.food_name != null){
        res.foods.food_name = req.body.food_name
    }
    if(req.body.is_popcorn != null){
        res.foods.is_popcorn = req.body.is_popcorn
    }
    if(req.body.is_coke != null){
        res.foods.is_coke = req.body.is_coke
    }
    if(req.body.is_combo != null){
        res.foods.is_combo = req.body.is_combo
    }
    if(req.body.food_tag != null){
        res.foods.food_tag = req.body.food_tag
    }
    if(req.body.image != null){
        res.foods.image = req.body.image
    }
    if(req.body.food_price != null){
        res.foods.food_price = req.body.food_price
    }
    if(req.body.count != null){
        res.foods.count = req.body.count
    }

    try {
        const updatedFood = await res.foods.save()
        res.status(200).json("Food Data Updated !!")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
})


//delete individual
router.delete("/:id", getFood, async (req, res) =>{
    try {
        await res.foods.remove()
        res.status(200).json({message: "Food Deleted succesfully"})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
})
async function getFood(req,res,nxt) {
    let foods;
    try {
        foods = await Food.findById(req.params.id)
        if(foods == null){
            return res.status(400).json({message: "Feed does not exist"})
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
    res.foods = foods
    nxt()
}
module.exports = router;
