import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { AddCarousel } from "../Components/HomePage/AddCarousel";
import { PopularEvents } from "../Components/HomePage/PopularEvents";
import { PremierEvents } from "../Components/HomePage/PremierEvents";
import { RecommendedEvents } from "../Components/HomePage/RecommendedEvents";
import { getEvents, getPopularEvents } from "../Redux/app/actions";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Typography from "@material-ui/core/Typography";
import Slider from "@material-ui/core/Slider";
import { Link, useHistory, useParams } from "react-router-dom";
import { putEvents } from "../Redux/data/actions";
import TextField from '@mui/material/TextField';

var fs = require("fs");

function valuetext(value) {
  return `${value}`;
}

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

export const HomePage = () => {
  
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  function getMax(arr, prop) {
    var max = -1;
    for (var i = 0; i < arr.length; i++) {
      if (arr[i].id > max) max = arr[i].id;
    }
    return max;
  }
  const feedback_submit = () => {
    let n = document.getElementById("name").value;
    let f = document.getElementById("feed").value;
    fetch("http://chomspro.herokuapp.com/feed")
      .then((res) => res.json())
      .then((result) =>
        fetch("http://chomspro.herokuapp.com/feed", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name: n, feed: f }),
        })
      );
    handleClose();
    alert("Thank you for your feedback!")
  };

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getEvents());
    dispatch(getPopularEvents());
  }, []);
  return (
    <div style={{ backgroundColor: "#16161D" }}>
      <div>
        <AddCarousel />
        <div>

          <button
            style={{
              cursor: "pointer",
              margin: "20px 20px",
              height: 90,
              width: 90,
              fontSize: 24,
              color: "white",
              backgroundColor: "#f84464",
              borderRadius: 50,
              borderColor: "greenyellow",
              borderWidth: "5px",
              outline: "none",
              position: "fixed",
              bottom: "0px",
              right: "0px",
            }}
            onClick={handleOpen}
            className="ratebutton"
          >
            Rate Us
          </button>
        </div>

        <PremierEvents />
        <div style={{ backgroundColor: "#16161D" }}>
          <RecommendedEvents />
        </div>
        <div style={{ backgroundColor: "#16161D" }}>
          <PopularEvents />
        </div>

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
                <h5 style={{ margin: 0, padding: 0, marginTop: 10 }}></h5>
                <p style={{ margin: 0, padding: 0 }}>
                  {/* {"event" && "hehe"} */}
                </p>
                <button
                  onClick={handleClose}
                  style={{ position: "absolute", right: 10, top: 0 }}
                >
                  X
                </button>
              </div>
              <br />
              <br />
              <div className={classes.root}>
                {/* <Typography id="discrete-slider" gutterBottom>
                  How would you rate the website?
                </Typography> */}
                <h3><b>How would you rate the website?</b></h3>
                <form>
                  <div class="form-group">
                    <br />
                    <TextField label="Name" id="name" name="name" placeholder="Your name" />
                    <br />
                  </div>
                  <div class="form-group">
                    <br />
                    <TextField label="Feedback" id="feed" name="feed" placeholder="Your feedback" />
                    <br />
                  </div>
                </form>
              </div>
              <button
                onClick={feedback_submit}
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
                Submit Rating
              </button>
            </div>
          </Fade>
        </Modal>
      </div>
    </div>
  );
};
