import React from 'react';
import { Link } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import '../Components/Styling/LoginPag.css'
import '../Components/Styling/CreatePage.css'
import data from "../database/db.json"
import { useHistory, useParams} from "react-router-dom";
import Select from 'react-select'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DurationPicker from 'react-duration-picker'
import TextField from '@mui/material/TextField';
import Grid from '@material-ui/core/Grid'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';

const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

export default function CreateEvent({ action, handleCloseLogin }) {
  const { admin_id } = useParams();
  const [startDate, setStartDate] = React.useState(new Date());
  const options_lang = [
    {value: 'English', label: 'English'},
    {value:'Hindi', label:'Hindi'},
    {value: 'Tamil', label: 'Telugu'},
    {value:'Telugu', label: 'Telugu'},
    {value: 'Japanese', label: 'Japanese'},
    {value: 'Kannada', label: 'Kannada'},
    {value: 'Punjabi', label: 'Punjabi'}
  ]
  const options_genre = [
    {value: 'Action', label:'Action'},
    {value: 'Drama', label:'Drama'},
    {value: 'Thriller', label:'Thriller'},
    {value: 'Comedy', label:'Comedy'},
    {value: 'Adventure', label: 'Adventure'}, 
    {value: 'Family', label: 'Family'},
    {value: 'Fantasy', label: 'Fantasy'},
    {value: 'Health & Fitness', label:'Health & Fitness'}
  ]
  const history = useHistory();
  function getMax(arr, prop) {
    var max = -1;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id > max)
        max = arr[i].id;
    }
    return max;
  }
  const [lang,setLang] = React.useState([]);
  const handleLang = (e) => {
    let value = Array.from(e, option => option.value);
    setLang(value.join());
  }
  const [gen,setGenre] = React.useState([]);
  const handleGenre = (e) => {
    let value = Array.from(e, option => option.value);
    setGenre(value);
  }
  const [time, setTime] = React.useState({
    hours: 1,
    minutes: 25
  });
  const handleTime = time => {
    setTime(time);
  };
  const [img,setImg] = React.useState("https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg");
  const handleImage = (e) => {
    let value = document.getElementById("poster").value;
    setImg(value);
  }
  const [checked, setChecked] = React.useState(false);
  const handleChecked = (event) => {
    setChecked(event.target.checked);
  };
  const submit_event = () => {
    let n = document.getElementById("name").value;
    let a = document.getElementById("about").value;
    let p = document.getElementById("poster").value;
    let d = String(time.hours)+"h "+String(time.minutes)+"min";
    let dt = startDate.toDateString();
    let l = document.getElementById("location").value;
    let prem = checked;
    let lg = lang;
    let g = [];
    for(let i=0;i<gen.length;i++){
      g.push({"genre": gen[i]})
    }
    let r = {"percentage":88, "no_of_ratings": 197};
    let c = [{"original_name": "Gal Gadot","character": "as Wonder Woman/ Diana Prince","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/gal-gadot-11088-17-10-2017-11-45-36.jpg"},{"original_name": "Chris Pine","character": "as Steve Trevor","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/chris-pine-435-24-03-2017-13-51-09.jpg"},{"original_name": "Kristen Wiig","character": "as Cheetah","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/kristen-wiig-9007-24-03-2017-12-36-08.jpg"},{"original_name": "Pedro Pascal","character": "as Max Lord","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/pedro-pascal-1065016-24-03-2017-17-40-11.jpg"},{"original_name": "Connie Nielsen","character": "as Hippolyta","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/connie-nielsen-7706-15-05-2017-11-42-20.jpg"},{"original_name": "Robin Wright","character": "as Antiope","cast_image": "https://in.bmscdn.com/iedb/artist/images/website/poster/large/robin-wright-22180-24-03-2017-12-31-27.jpg"}]
    let brr = data.organizers.filter(a => a.id == 1)[0].organized_events;
    let nid = getMax(data.events) + 1;
    brr.push(nid);
    let admindata =  data.organizers.filter(a => a.id == 1)[0];
    admindata.organized_events=brr;
    fetch("http://chomspro.herokuapp.com/events")
      .then(res => res.json())
      .then(result =>
        fetch("http://chomspro.herokuapp.com/events", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "id": getMax(result) + 1, "name": n, "location": l, "about": a, "is_popular":false, "duration":d, "languages": lg,"release_date":dt,"is_premier":prem,"genre": g, "banner_image_url": p ,"rating":r,"cast":c,"feedback":[]})
        })
      )
      .then(r => 
        fetch(`http://chomspro.herokuapp.com/organizers/${admindata._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(admindata)
        })
      )

      history.push('/')
  };
  return (
    <div>
        <div
            className="container_create"
            style={{
            backgroundImage: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)",
            backgroundPosition: "center",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            }}
        >
          <div className="title" style={{"margin-top":"200px", "margin-left":"50px", "fontSize":"20px"}}>
              <h1>Create A New Event</h1>
          </div>
        </div>
        <div className='formc'>
          <form>     
              <h1>Event Name:</h1>
              <TextField id="name" name="name" />
              <br/><br/>
              <Grid container>
                  <Grid item xs={6}>
                    <h1>Event Details:</h1>
                    <TextField id="about" name="about" multiline rows={4} />
                  </Grid>
                  <Grid item xs={6}> 
                    <h1>Event Location:</h1>
                    <TextField id="location" name="location" multiline rows={4} />
                  </Grid>
              </Grid>
              <br/><br/>
              <Grid container>
                  <Grid item xs={4}> 
                  <div class="form-group">
                    <h1>Event Poster</h1>
                    <TextField onChange={handleImage} id="poster" name="poster" />
                  </div>
                  </Grid>
                  <Grid item xs={4}>
                      <div style={{"margin-top":"50px"}}>
                      <img src={img} height="60px" width="60px"/>
                      </div>
                  </Grid>
              </Grid>
              <br/><br/>
              <Grid container>
                  <Grid item xs={6}>
                    <h1>Event Date:</h1>
                    <DatePicker selected={startDate} onChange={(date) => setStartDate(date)} inline/>
                  </Grid>
                  <Grid item xs={6}> 
                    <h1>Event Duration:</h1>
                    <DurationPicker onChange={handleTime} initialDuration={{ hours: 1, minutes: 0}} maxHours={5}/>
                    <br/><br/><br/>
                    <Grid container>
                    <Grid item xs={6}> 
                      <h1>Is Event Premier?</h1>
                    </Grid>
                    <Grid item xs={1}> 
                      <Checkbox checked={checked} onChange={handleChecked} inputProps={{ 'aria-label': 'controlled' }} icon={<FavoriteBorder />} checkedIcon={<Favorite />} sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}/>
                    </Grid>
                    </Grid>
                  </Grid>
              </Grid>
              <br/><br/>
              <h1>Event Genre:</h1>
              <Select options={options_genre} isMulti onChange={handleGenre} id="genre" name="genre"/>
              <br/><br/>
              <h1>Event Languages:</h1>
              <Select options={options_lang} isMulti onChange={handleLang} id="languages" name="languages"/>
          </form>
          <Link to="/" style={{ marginLeft: 20, color: "black" }}>  
            <button
              onClick={submit_event}
              style={{
                width: "80%",
                margin: "30px",
                height: 50,
                fontSize: 24,
                color: "white",
                backgroundColor: "#f84464",
                borderRadius: 10,
                border: "none",
                outline: "none",
                cursor: "pointer",
              }}
            >
              Create Event
            </button>
          </Link>
        </div>
      </div>
  );
}

