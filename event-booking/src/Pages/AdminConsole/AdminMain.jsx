import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import db from "../../database/db.json"
import Select from 'react-select'

  let col_e = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'Event', headerName: 'Event Name', width: 300 },
    { field: 'Location', headerName: 'Location', width: 200 },
    { field: 'About', headerName: 'About', width: 410 },
    { field: 'Duration', headerName: 'Duration', width: 80 },
    { field: 'Languages', headerName: 'Languages', width: 200 },
    { field: 'Date', headerName: 'Date', width: 100 },
    { field: 'Rating', headerName: 'Rating(%)', type: 'number', width: 90 }
  ];
  let row_e = [];
  const events = db.events;
  for(let ii=0;ii<events.length;ii++){
    row_e.push({'id':ii+1, 'Event': events[ii].name, 'Location': events[ii].location, 'About':events[ii].about, 'Duration':events[ii].duration, 'Languages': events[ii].languages, 'Date': events[ii].release_date, 'Rating': events[ii].rating.percentage })
  }
  let col_v = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'Venue', headerName: 'Venue Name', width: 300 },
    { field: 'Region', headerName: 'Region', width: 200 },
    { field: 'Capacity', headerName: 'Capacity', width: 200 },
    { field: 'Cancellation', headerName: 'Ticket Cancellation', width: 200 },
    { field: 'Package', headerName: 'Package Till', width: 180 },
  ];
  let row_v = [];
  const venues = db.venue[0];
  const yesno = (a) => {
    if (a){
        return 'Yes'
    }
    return 'No'
  }
  for(let ii=0;ii<venues.length;ii++){
    row_v.push({'id':ii+1, 'Venue': venues[ii].name, 'Region': venues[ii].sub_region, 'Capacity': venues[ii].capacity, 'Cancellation': yesno(venues[ii].cancellation_availability), 'Package': venues[ii].package })
  }
  let col_f = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'Food', headerName: 'Food', width:500 },
    { field: 'Popcorn', headerName: 'Popcorn', width: 100 },
    { field: 'Coke', headerName: 'Coke', width: 100 },
    { field: 'Combo', headerName: 'Combo', width: 100 },
    { field: 'Price', headerName: 'Price (Rs.)', width: 100 }
  ];
  let row_f = [];
  const foods = db.food;
  for(let ii=0;ii<foods.length;ii++){
    row_f.push({'id':ii+1, 'Food': foods[ii].food_name, 'Popcorn': yesno(foods[ii].is_popcorn), 'Coke': yesno(foods[ii].is_coke), 'Combo': yesno(foods[ii].is_combo), 'Price': foods[ii].food_price})
  }
  let col_us = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'Name', headerName: 'Name', width:100 },
    { field: 'About', headerName: 'About', width: 510 },
    { field: 'Booked Events', headerName: 'Booked Events', width: 150 },
    { field: 'Phone', headerName: 'Phone', width: 100 },
    { field: 'E-mail', headerName: 'E-mail', width: 140 },
    { field: 'Friend Interest', headerName: 'Friend Interest', width: 130 },
    { field: 'Friends', headerName: 'Friends', width: 100 },
    { field: 'Friend Requests', headerName: 'Friend Requests', width: 150 }
  ];
  let row_us = [];
  const users = db.users;
  for(let ii=0;ii<users.length;ii++){
    row_us.push({'id':ii+1, 'Name': users[ii].name, 'About':users[ii].about, 'Booked Events': users[ii].booked_events, 'Phone': users[ii].phone, 'E-mail': users[ii].email, 'Friend Interest': yesno(users[ii].friend_interest), 'Friends': users[ii].friends.length, 'Friend Requests': users[ii].friend_requests.length})
  }
  let col_org = [
    { field: 'id', headerName: 'ID', width: 20 },
    { field: 'Name', headerName: 'Name', width:100 },
    { field: 'About', headerName: 'About', width: 600 },
    { field: 'Organized Events', headerName: 'Organized Events', width: 150 },
    { field: 'Phone', headerName: 'Phone', width: 100 },
    { field: 'E-mail', headerName: 'E-mail', width: 140 }
  ];
  let row_org = [];
  const orgns = db.organizers;
  for(let ii=0;ii<orgns.length;ii++){
    row_org.push({'id':ii+1, 'Name': orgns[ii].name, 'About':orgns[ii].about, 'Organized Events': orgns[ii].organized_events, 'Phone': orgns[ii].phone, 'E-mail': orgns[ii].email})
  }
  let options_events = [];
  for(let ii=0;ii<events.length;ii++){
      options_events.push({'label': events[ii].name, 'value': events[ii]._id})
  }
export default function AdminLogin() {
    const [event,setEvent] = React.useState(false);
    const [venue,setVenue] = React.useState(false);
    const [food,setFood] = React.useState(false);
    const [us,setUs] = React.useState(false);
    const [org,setOrg] = React.useState(false);
    const handleEvents = () => {
        setVenue(false);
        setFood(false);
        setOrg(false);
        setUs(false);
        setEvent(!event);
    }
    const handleVenues = () => {
        setEvent(false);
        setFood(false);
        setOrg(false);
        setUs(false);
        setVenue(!venue);
    }
    const handleFoods = () => {
        setVenue(false);
        setEvent(false);
        setOrg(false);
        setUs(false);
        setFood(!food);
    }
    const handleUs = () => {
        setVenue(false);
        setEvent(false);
        setFood(false);
        setOrg(false);
        setUs(!us);
    }
    const handleOrg = () => {
        setVenue(false);
        setEvent(false);
        setFood(false);
        setUs(false);
        setOrg(!org);
    }
    const createEvent = () => {
        let n = document.getElementById("name").value;
        let a = document.getElementById("about").value;
        let l = document.getElementById("location").value;
        let d = document.getElementById("duration").value;
        let dt = document.getElementById("date").value;
        let checked = document.querySelectorAll('#lang :checked');
        let lg = [...checked].map(option => option.value);
        let r = {"percentage":88, "no_of_ratings": 197};
        let c = [{"original_name": "Gal Gadot","character": "as Wonder Woman/ Diana Prince","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/gal-gadot-11088-17-10-2017-11-45-36.jpg"},{"original_name": "Chris Pine","character": "as Steve Trevor","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/chris-pine-435-24-03-2017-13-51-09.jpg"},{"original_name": "Kristen Wiig","character": "as Cheetah","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/kristen-wiig-9007-24-03-2017-12-36-08.jpg"},{"original_name": "Pedro Pascal","character": "as Max Lord","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/pedro-pascal-1065016-24-03-2017-17-40-11.jpg"},{"original_name": "Connie Nielsen","character": "as Hippolyta","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/connie-nielsen-7706-15-05-2017-11-42-20.jpg"},{"original_name": "Robin Wright","character": "as Antiope","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/robin-wright-22180-24-03-2017-12-31-27.jpg"}]
        fetch("http://chomspro.herokuapp.com/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"name": n, "location": l, "about": a, "is_popular":false, "duration":d, "languages": lg,"release_date":dt,"is_premier":false,"genre": [], "banner_image_url": "","rating":r,"cast":c,"feedback":[]})
        })
    }
    const tf = (a) => {
        if (a=="Yes"){
            return true;
        }
        return false;
    }
    function getMax(arr, prop) {
        var max = -1;
        for (var i = 0; i < arr.length; i++) {
          if (arr[i].id > max)
            max = arr[i].id;
        }
        return max;
      }
    const createVenue = () => {
        let n = document.getElementById("name").value;
        let c = document.getElementById("about").value;
        let r = document.getElementById("location").value;
        let t = document.getElementById("duration").value;
        let pt = document.getElementById("date").value;
        fetch("http://chomspro.herokuapp.com/venue", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"id": getMax(venues)+1,"name": n, "capacity": c, "sub_region": r, "package":pt, "cancellation_availability":tf(t), "image":"", "timings":[]})
        })
    }
    const createFood = () => {
        let n = document.getElementById("name").value;
        let c = document.getElementById("about").value;
        let r = document.getElementById("location").value;
        let t = document.getElementById("duration").value;
        let pt = document.getElementById("date").value;
        let idm =  getMax(foods)+1;
        console.log(idm);
        fetch("http://chomspro.herokuapp.com/food", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({"food_name": n, "is_popcorn": c, "is_coke": r, "is_combo":t, "food_tag":n, "food_image":"", "count":0, "food_price":pt})
        })
    }
    const [evdet,setEvdet] = React.useState(-1);
    const handleEventDelete = (e) => {
        setEvdet(e.value);
    }
    function DeleteEvent(){
        let aa = window.confirm('Are you sure you want to delete this event?');
        if (aa) {
          fetch(`http://chomspro.herokuapp.com/events/${evdet}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
        }
      }
    return (
        <div>
            <center>
            <button style={{backgroundColor: 'red', height: '50px', width:'200px', borderRadius: '10px', border: '1px solid red', fontSize: '20px', margin:'40px'}} onClick={handleUs}>Users</button><button style={{backgroundColor: 'red', height: '50px', width:'200px', borderRadius: '10px', border: '1px solid red', fontSize: '20px', margin:'40px'}} onClick={handleOrg}>Organizers</button><button style={{backgroundColor: 'red', height: '50px', width:'200px', borderRadius: '10px', border: '1px solid red', fontSize: '20px', margin:'40px'}} onClick={handleEvents}>Events</button><button onClick={handleVenues} style={{backgroundColor: 'red', height: '50px', width:'200px', borderRadius: '10px', border: '1px solid red', fontSize: '20px', margin:'40px'}}>Venues</button><button onClick={handleFoods} style={{backgroundColor: 'red', height: '50px', width:'200px', borderRadius: '10px', border: '1px solid red', fontSize: '20px', margin:'40px'}}>Food</button>
            </center>
            {event && 
            <div style={{ height: 400, width: '100%', backgroundColor: 'gold'}}>
            <DataGrid
                    rows={row_e}
                    columns={col_e}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                </div>
            }
            {venue && 
            <div style={{ height: 400, width: '80%', backgroundColor: 'gold', marginLeft: '150px'}}>
            <DataGrid
                    rows={row_v}
                    columns={col_v}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                </div>
            }
            {food && 
            <div style={{ height: 400, width: '70%', backgroundColor: 'gold', marginLeft: '220px'}}>
            <DataGrid
                    rows={row_f}
                    columns={col_f}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                </div>
            }
            {us && 
            <div style={{ height: 400, width: '100%', backgroundColor: 'gold'}}>
            <DataGrid
                    rows={row_us}
                    columns={col_us}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                </div>
            }
            {org && 
            <div style={{ height: 400, width: '80%', backgroundColor: 'gold', marginLeft: '150px'}}>
            <DataGrid
                    rows={row_org}
                    columns={col_org}
                    pageSize={5}
                    rowsPerPageOptions={[5]}
                />
                </div>
            }
            <br/><br/><br/><br/>
            {event && 
                <center>
                <div style={{backgroundColor: 'white', width: '50%', borderRadius: '100px', padding: '20px'}}>
                    <h2>Create Event</h2>
                    <br/><br/>
                    <form>
                        <div class="form-group">
                            <label for="name">Name</label><br/>
                            <input type="text" class="form-control" id="name" placeholder="Event Name"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="location">Location</label><br/>
                            <input type="text" class="form-control" id="location" placeholder="Event Location"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="about">About</label><br/>
                            <textarea rows="5" type="text" class="form-control" id="about" placeholder="Event About"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="duration">Duration</label><br/>
                            <input type="text" class="form-control" id="duration" placeholder="Event Duration"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="duration">Date</label><br/>
                            <input type="text" class="form-control" id="date" placeholder="Event Date"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="lang">Languages</label><br/>
                            <select multiple class="form-control" id="lang">
                            <option>English</option>
                            <option>Hindi</option>
                            <option>Tamil</option>
                            <option>Telugu</option>
                            <option>Japanese</option>
                            <option>Kannada</option>
                            <option>Punjabi</option>
                            </select>
                        </div>
                        <br/><br/>
                        <button onClick={createEvent} style={{backgroundColor: 'red', height: '40px', width:'80px', borderRadius: '10px', border: '1px solid red', fontSize: '15px'}}>Submit</button>
                    </form>
                </div>
                </center>
            
            }
            {venue && 
                <center>
                <div style={{backgroundColor: 'white', width: '50%', borderRadius: '100px', padding: '20px'}}>
                    <h2>Add Venue</h2>
                    <br/><br/>
                    <form>
                        <div class="form-group">
                            <label for="name">Name</label><br/>
                            <input type="text" class="form-control" id="name" placeholder="Event Name"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="location">Region</label><br/>
                            <input type="text" class="form-control" id="location" placeholder="Event Location"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="about">Capacity</label><br/>
                            <input type="text" class="form-control" id="about" placeholder="Event About"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="duration">Package Till</label><br/>
                            <input type="text" class="form-control" id="duration" placeholder="Event Duration"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="duration">Ticket Cancellation</label><br/>
                            <input type="text" class="form-control" id="date" placeholder="Event Date"/>
                        </div>
                        <br/><br/>
                        <button onClick={createVenue} style={{backgroundColor: 'red', height: '40px', width:'80px', borderRadius: '10px', border: '1px solid red', fontSize: '15px'}}>Submit</button>
                    </form>
                </div>
                </center>  
            }
            {food && 
                <center>
                <div style={{backgroundColor: 'white', width: '50%', borderRadius: '100px', padding: '20px'}}>
                    <h2>Add Food</h2>
                    <br/><br/>
                    <form>
                        <div class="form-group">
                            <label for="name">Name</label><br/>
                            <input type="text" class="form-control" id="name" placeholder="Event Name"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="location">PopCorn</label><br/>
                            <input type="text" class="form-control" id="location" placeholder="Event Location"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="about">Coke</label><br/>
                            <input type="text" class="form-control" id="about" placeholder="Event About"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="duration">Combo</label><br/>
                            <input type="text" class="form-control" id="duration" placeholder="Event Duration"/>
                        </div>
                        <br/><br/>
                        <div class="form-group">
                            <label for="duration">Price</label><br/>
                            <input type="text" class="form-control" id="date" placeholder="Event Date"/>
                        </div>
                        <br/><br/>
                        <button onClick={createFood} style={{backgroundColor: 'red', height: '40px', width:'80px', borderRadius: '10px', border: '1px solid red', fontSize: '15px'}}>Submit</button>
                    </form>
                </div>
                </center>  
            }
            {event && 
            <center>
            <div style={{backgroundColor: 'white', width: '50%', borderRadius: '100px', padding: '20px', marginTop: '50px'}}>
                <h2>Delete Event</h2>
                <br/><br/>
                <h4>Choose Event</h4>
                <br/>
                <Select options={options_events} onChange={handleEventDelete} id="delev" name="delev"/>
                <br/><br/>
                <button onClick={DeleteEvent} style={{backgroundColor: 'red', height: '100px', width:'160px', borderRadius: '10px', border: '1px solid red', fontSize: '15px'}}>
                Delete Event?
                </button>
            </div>
            </center>
            }

        </div>
    );
}

