import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getEvents, putEvents } from "../Redux/data/actions";
import { useHistory, useParams } from "react-router-dom";
import "./EventPage/eventPage.css";
import "./Styling/ModifyEvent.css"
import Carousel from "react-elastic-carousel";
import Login from "../Pages/LoginPage";
import { storeAuth } from "../Redux/app/actions";
import AliceCarousel from 'react-alice-carousel';
import "react-alice-carousel/lib/alice-carousel.css";
import userdata from '../database/db.json';
const ModifyEvent = () => {
  const [state, setState] = React.useState(false);
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

  const redirect_admin = () => {
    history.push('/admin')
  }

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
      var obj_email_check = userdata.organizers.filter(ele => ele.email == +email);
      var obj_pass_check = userdata.organizers.filter(ele => ele.password == +pass);
      var obj_mob_check = userdata.organizers.filter(ele => ele.phone == +number)[0];
      if (obj_mob_check) {
        setAuth(true);
        alert("Successfully Logged in");
        redirect_admin();
      }
      else if (+number == "" && +email == "") {
        setAuth(false);
        alert("Both Email & Mob is missing");
      }
      else if (+number == "") {
        setAuth(false);
        if (obj_email_check && obj_pass_check) {
          setAuth(true);
          alert("Successfully Logged in");
          redirect_admin();
        }
        else if (+email == "") {
          setAuth(false);
          alert("Please type your email");
        }
        else if (+pass == "") {
          setAuth(false);
          alert("Please type your passsword");
        }
      }
      else {
        setAuth(false);
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
    else if (r=="User"){
      var obj_email_check = userdata.users.filter(ele => ele.email == +email);
      var obj_pass_check = userdata.users.filter(ele => ele.password == +pass);
      var obj_mob_check = userdata.users.filter(ele => ele.phone == +number)[0];
      if (obj_mob_check) {
        setAuth(true);
        alert("Successfully Logged in");
      }
      else if (+number == "" && +email == "") {
        setAuth(false);
        alert("Both Email & Mob is missing");
      }
      else if (+number == "") {
        setAuth(false);
        if (obj_email_check && obj_pass_check) {
          setAuth(true);
          alert("Successfully Logged in");
        }
        else if (+email == "") {
          setAuth(false);
          alert("Please type your email");
          handleCloseLogin(email, pass, number);
        }
        else if (+pass == "") {
          setAuth(false);
          alert("Please type your passsword");
          handleCloseLogin(email, pass, number);
        }

      }
      else {
        setAuth(false);
        alert("You are not registered");
      }
      setAction(false);
      setState(false);
    }
  };
    React.useEffect(() => {
      dispatch(storeAuth(auth))
  }, [auth])

  const [abtmod, setAbtmod] = React.useState(false);
  const abtmodchange = () => {
    setAbtmod(!abtmod);
  }
  const abtmodsave = () => {
    abtmodchange();
    let a = document.getElementById("about").value;
    let newdata = data;
    if (a != "" ){
      newdata.about = a;
    }
    fetch(`http://chomspro.herokuapp.com/events/${data._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newdata)
        }
    )
  }
  function Aboutbox(props) {
    const dat = props.dat;
    const abtmod1 = abtmod;
    let about;
    if (abtmod1) {
      about = <>
                <h1>About <button onClick={abtmodsave} className="bttn">Save</button></h1>
                <div class="form-group">
                  <textarea class="form-control form-control-lg" rows="4" cols="100" id="about" name="about" placeholder={dat.about} /><br /><br />
                </div>
              </>
    } else {
      about = <>
                <h1>About <button onClick={abtmodchange} className="bttn">Modify</button></h1>
                <p>{dat.about}</p>
              </>
    }
    return about;
  }

  const [imgmod, setImgmod] = React.useState(false);
  const imgmodchange = () => {
    setImgmod(!imgmod);
  }
  const imgmodsave = () => {
    imgmodchange();
    let a = document.getElementById("poster").value;
    let newdata = data;
    if (a != "" ){
      newdata.banner_image_url = a;
    }
    fetch(`http://chomspro.herokuapp.com/events/${data._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newdata)
        }
    )
  }
  function Posterbox(props) {
    const dat = props.dat;
    const imgmod1 = imgmod;
    let poster;
    if (imgmod1) {
      poster = <>
                <div className="container__card">
                  <img src={dat.banner_image_url} alt="title" />
                </div>
                <button onClick={imgmodsave} className="bttn_det">Save</button>
                <div class="form-group">
                  <input class="form-control form-control-lg" type="text" id="poster" name="poster"/><br/><br/>
                </div>
              </>
    } else {
      poster = <>
                <div className="container__card">
                  <img src={dat.banner_image_url} alt="title" />
                </div>
                <button onClick={imgmodchange} className="bttn_det">Modify</button>
              </>
    }
    return poster;
  }


  const [detmod, setDetmod] = React.useState(false);
  const detmodchange = () => {
    setDetmod(!detmod);
  }
  const detmodsave = () => {
    detmodchange();
    let a = document.getElementById("languages").value;
    let b = document.getElementById("duration").value;
    let c = document.getElementById("release_date").value;
    let newdata = data;
    if (a != "" ){
      newdata.languages = a;
    }
    if (b != "" ){
      newdata.duration = b;
    }
    if (c != "" ){
      newdata.release_date = c;
    }
    fetch(`http://chomspro.herokuapp.com/events/${data._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newdata)
        }
    )
  }
  function Detailsbox(props) {
    const dat = props.dat;
    const detmod1 = detmod;
    let details;
    if (detmod1) {
      details = <>
                <button onClick={detmodsave} className="bttn_det">Save</button>
                <div className="container__eventDetail">
                  <div style={{ color: "white", fontSize: 18 }}>
                    <div class="form-group otherdet">
                      <label for="languages"><h3>Languages:</h3></label><br />
                      <input class="form-control form-control-lg langbox" type="text"  id="languages" name="languages" placeholder={dat.languages} /><br /><br />
                    </div>

                    <div class="form-group otherdet">
                      <label for="duration"><h3>Duration:</h3></label><br />
                      <input class="form-control form-control-lg langbox" type="text"  id="duration" name="duration" placeholder={dat.duration} /><br /><br />
                    </div>
                    
                    <div class="form-group otherdet">
                      <label for="release_date"><h3>Release Date:</h3></label><br />
                      <input class="form-control form-control-lg langbox" type="text"  id="release_date" name="release_date" placeholder={dat.release_date} /><br /><br />
                    </div>
                  </div>
                </div>
              </>
    } else {
      details = <>
                <button onClick={detmodchange} className="bttn_det">Modify</button>
                <div className="container__eventDetail">
                  <div className="container__eventDetail_language">
                    <div>
                      <p>{dat.languages}</p>
                    </div>
                  </div>
                  <div style={{ color: "white", fontSize: 18 }}>
                    <h5 style={{ color: "white", fontSize: 18 }}>
                      {`${dat.duration} - ${dat.genre.map(
                        (e) => " " + e.genre
                      )} - ${dat.release_date}`}
                    </h5>
                  </div>
                </div>
              </>
    }
    return details;
  }
  
  function DeleteEvent(){
    let aa = window.confirm('Are you sure you want to delete this event?');
    if (aa) {
      fetch(`http://chomspro.herokuapp.com/events/${data._id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      history.push("/")
    }
  }
  const Trash = ({size=40, color="#d0021b"}) => (<svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="square" strokeLinejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line></svg>);
  
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
                <button >Book Tickets</button>
              </div>
            </div>
          </div>
          <center>
            <button className="Delete" onClick={DeleteEvent}>
              <Trash/><br/>
              Delete Event?
            </button>
          </center>
          <div className='rowC'>
          <div className="middleContainer">
            <div>
              <Aboutbox dat={data} />
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
          </div>
          <div className="middleContainer_right">
            <Posterbox dat={data} />
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
                  <button style={{ cursor: "pointer" }} >Rate Now</button>
                </div>
              </div>       
              <Detailsbox dat={data} />
          </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ModifyEvent;
