//event page
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents } from "../../Redux/data/actions";
import { useHistory, useParams } from "react-router-dom";
import "../../Components/EventPage/eventPage.css";
import Carousel from "react-elastic-carousel";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Slider from "@material-ui/core/Slider";
import { RecommendedEvents } from "../../Components/HomePage/RecommendedEvents";
import Login from "../LoginPage";
import { storeAuth } from "../../Redux/app/actions";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import userdata from '../../database/db.json';
import TextField from '@mui/material/TextField';

function valuetext(value) {
  return `${value}`;
}
//styling
const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    height: "400px",
    width: "300px",
  },
  root: {
    width: 250,
    margin: 20,
    textAlign: "center",
  },
}));

const EventPage = () => {
  const [user,setUser] = React.useState(-1);
  const [usertype,setUsertype] = React.useState("");
  const [rValue, setRvalue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState(false);
  const classes = useStyles();
  const { id } = useParams();
  const data = useSelector((state) => state.data.events.data);
  const dispatch = useDispatch();
  const history = useHistory();
  const [action, setAction] = React.useState(false);
  const isAuth = useSelector(state => state.app.isAuth)
  const [auth, setAuth] = React.useState(false);
  React.useEffect(() => {
    dispatch(getEvents(id));
    window.scrollTo(window.scrollX, 0);
  }, []);
  const data_temp = useSelector((state) => state.data);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleChange = (e, v) => {
    setRvalue(v);
  };
  // put rating event 
  const handleRating = () => {
    let newdata = data;
    let per = (data.rating.no_of_ratings)*(data.rating.percentage) + rValue;
    newdata.rating.no_of_ratings = data.rating.no_of_ratings + 1;
    newdata.rating.percentage = Math.floor(per/newdata.rating.no_of_ratings);
    let n = document.getElementById("name").value;
    let brr = newdata.feedback;
    let nid = {"name":n,"rating":rValue};
    brr.push(nid);
    newdata.feedback = brr;
    fetch(`http://chomspro.herokuapp.com/events/${data._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newdata)
        })
    setOpen(false);
    alert("Thank you for your feedback!");
  };

  const handleClick = () => {
    if (isAuth) {
      history.push(`/booktickets/${data.id}`)
      
    } else {
      alert("Please login to book your tickets")
      setAction(true)
    }
  }

  const redirect_admin = (id) => {
    history.push(`/organizer/${id}`)
  }
  const redirect_user = () => {
    history.push('/user')
  }
  const signout_user = () => {
    setAuth(false);
    history.push('/')
  }

  const gotouserpage = (email) => {
    if ((+email === 9876543210)) {
      console.log("admin redirect");
      return "/admin"
    }
    else if (+email === 123456789) {
      console.log("user redirect");
      return "/user"
    }
    return ""
  }
  //Login
  const handleCloseLogin = (email, pass, number) => {
    let r = "";
    if (document.getElementById('tab-1').checked) {
      r = document.getElementById('tab-1').value;
    }
    else if (document.getElementById('tab-2').checked) {
      r = document.getElementById('tab-2').value;
    }
    else {
      alert("Select User Type");
    }

    if (r === "Organizer") {
      var obj_email_check = userdata.organizers.filter(ele => ele.email == email)[0];
      var obj_pass_check = userdata.organizers.filter(ele => ele.password == pass)[0];
      if (obj_email_check && obj_pass_check && obj_pass_check.id === obj_email_check.id) {
        setAuth(true);
        setUser(obj_email_check.id);
        setUsertype("organizer");
        alert("Successfully Logged in");
        redirect_admin(obj_email_check.id);
      }
      else if (email == "") {
        setAuth(false);
        setUser(-1);
        setUsertype("");
        alert("Please type your email");
      }
      else if (pass == "") {
        setAuth(false);
        setUser(-1);
        setUsertype("");
        alert("Please type your passsword");
      }
      else {
        setAuth(false);
        setUser(-1);
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
    else if (r=="User"){
      var obj_email_check = userdata.users.filter(ele => ele.email == email)[0];
      var obj_pass_check = userdata.users.filter(ele => ele.password == pass)[0];
      if (obj_email_check && obj_pass_check && obj_pass_check.id === obj_email_check.id) {
        setAuth(true);
        setUser(obj_email_check.id);
        setUsertype("user");
        alert("Successfully Logged in");
      }
      else if (email == "") {
        setAuth(false);
        setUser(-1);
        setUsertype("");
        alert("Please type your email");
      }
      else if (pass == "") {
        setAuth(false);
        setUser(-1);
        setUsertype("");
        alert("Please type your passsword");
      }
      else {
        setAuth(false);
        setUser(-1);
          setUsertype("");
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
  };
    React.useEffect(() => {
      dispatch(storeAuth(auth))
  }, [auth])

  return (
    <div>
      {data && (
        <>
          <div
            className="container"
            style={{
              backgroundImage: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          >
            <Login action={action} handleCloseLogin={handleCloseLogin} />
            <div className="event_details">
              <h1>{data.name}</h1>
              <div className="BookButton">
                <button onClick={handleClick}>Book Tickets</button>
              </div>
            </div>
          </div>
          <div className='rowC'>
          <div className="middleContainer">
            <div>
              <h1>About</h1>
              <p>{data.about}</p>
            </div>
            <hr />
             <div>
              <h1>Starring</h1>
              <Carousel itemsToShow={5} pagination={true}>
                {data.cast.map((e) => (
                  <div key={e.id} className="carousel_cast">
                    <div>
                      <img
                        className="carousel_image"
                        src={e.cast_image}
                        alt="e.cast_image"
                      />
                    </div>
                    <div style={{ textAlign: "center" }}>
                      <h4>{e.original_name}</h4>
                    </div>
                  </div>
                ))}
              </Carousel>
            </div>
            <hr />
            <div className="cimg">
              <h1>Highlights</h1>
              <AliceCarousel autoPlay autoPlayInterval="3000" infinite autoHeight>
                    <img src="https://videos.jdmagicbox.com/delhi/e7/011pxx11.xx11.190311123542.t6e7/video/4902f76a299bfa23d3b6deee37576770_m.jpg" className="sliderimg"/>
                    <img src="https://nearmetrade.com/local/public/vendor/event-noida2.jpg" className="sliderimg"/>
                    <img src="https://www.gl-events.com/sites/glevents2022/files/styles/max_2600x2600/public/2019-03/about_us.jpg?itok=VCR0q3hv" className="sliderimg"/>
                    <img src="https://total-event.com/wp-content/uploads/2018/01/event-planning-microsoft-ignite.jpg" className="sliderimg"/>
                    
              </AliceCarousel>
            </div>
            <hr />
          </div>
          <div className="middleContainer_right">
            <div className="container__card">
              <img src={data.banner_image_url} alt="title" />
            </div>
            <div className="container__eventDetail_rating">
                <img
                  src="https://www.leadingwithhonor.com/wp-content/uploads/2021/02/redheart.png"
                  alt="Rating"
                  style={{ width: 30 }}
                />
                <h1>{data.rating.percentage}%</h1>
              </div>
              <h3>{Math.ceil(data.rating.no_of_ratings)} Ratings</h3>
              <div className="container__eventDetail_ratingButton">
                <div>
                  <h4 style={{ color: "white" }}>Your ratings matter</h4>
                </div>
                <div>
                  <button style={{ cursor: "pointer" }} onClick={handleOpen}>Rate Now</button>
                </div>
              </div>
              <div className="container__eventDetail">
                <div className="container__eventDetail_language">
                  <div>
                    <p>{data.languages}</p>
                  </div>
                </div>
                <div style={{ color: "white", fontSize: 18 }}>
                  <h5 style={{ color: "white", fontSize: 18 }}>
                    {`${data.duration} - ${data.genre.map(
                      (e) => " " + e.genre
                    )} - ${data.release_date}`}
                  </h5>
                </div>
            </div>
          </div>
          </div>
        </>
      )}
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={classes.modal}
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <div className={classes.paper}>
              <div style={{ textAlign: "center", position: "relative" }}>
                <button
                  onClick={handleClose}
                  style={{ position: "absolute", right: 5, top: 2, backgroundColor: "#f84464", border: "1px solid #f84464", borderRadius: "40px", color: "white" }}
                >
                  X
                </button>
              </div>
              <div className={classes.root}>
                <TextField label="Name" id="name" name="name" placeholder="Your name" />
                <br /><br />
                <h3><b>How would you rate the event?</b></h3>
                <Slider
                  onChange={handleChange}
                  defaultValue={10}
                  getAriaValueText={valuetext}
                  aria-labelledby="discrete-slider"
                  valueLabelDisplay="auto"
                  step={10}
                  marks
                  min={0}
                  max={100}
                  color="secondary"
                />

                <div
                  style={{
                    width: 120,
                    height: 120,
                    borderRadius: "50%",
                    backgroundColor: "#f84464",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    marginLeft: 60,
                    position: "relative"
                  }}
                >
                  <h1 style={{ color: "white", margin: 0, position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                    {rValue}%
                  </h1>
                </div>
              </div>
              <button
                onClick={handleRating}
                style={{
                  width: "80%",
                  margin: "30px",
                  height: 50,
                  fontSize: 18,
                  color: "white",
                  backgroundColor: "#f84464",
                  borderRadius: 10,
                  border: "none",
                  outline: "none",
                  cursor: "pointer"
                }}
              >
                Submit Rating
              </button>
            </div>
          </Fade>
        </Modal>
      </div>
      <RecommendedEvents></RecommendedEvents>
    </div>
  );
};

export default EventPage;
