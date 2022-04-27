import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "../Components/Styling/Navbar.module.css";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { useTheme } from "@material-ui/core/styles";
import Slide from "@material-ui/core/Slide";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import NotificationImportant from "@material-ui/icons/NotificationImportant";
import Notifications from "@material-ui/icons/Notifications";
import ConfirmationNumber from "@material-ui/icons/ConfirmationNumber";
import Announcement from "@material-ui/icons/Announcement";
import Settings from "@material-ui/icons/Settings";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import { useDispatch, useSelector } from "react-redux";
import { storeAuth } from "../Redux/app/actions";
import Login from "../Pages/LoginPage";
import { useHistory } from "react-router-dom";
import userdata from "../database/db.json";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import Input from "@mui/material/Input";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import Search from "react-search";
import Select, { components, DropdownIndicatorProps } from "react-select";
import "../Components/Styling/navsearch.css";
import { borderBottom } from "@mui/system";
import Creatable, { useCreatable } from "react-select/creatable";

const useStyles = makeStyles({
  list: {
    width: 350,
  },
  fullList: {
    width: "auto",
  },
  root: {
    "& .MuiInput-root .MuiInput-notchedOutline": {
      borderColor: "white",
    },
    "&:hover .MuiInput-root .MuiInput-notchedOutline": {
      borderColor: "red",
    },
    "& .MuiInput-root.Mui-focused .MuiInput-notchedOutline": {
      borderColor: "purple",
    },
  },
});
const validateEmail = (email) => {
  let ans = email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
  if (ans == null) return false;
  return true;
};

const Navbar = () => {
  let items = [];
  for (let kkkk = 0; kkkk < userdata.events.length; kkkk++) {
    items.push({
      label: userdata.events[kkkk].name,
      value: userdata.events[kkkk].id,
    });
  }
  const [query, setQuery] = React.useState("");
  const [city, setCity] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState(1);
  const [usertype, setUsertype] = React.useState("");
  const [cityName, setCityName] = React.useState("Select City");
  const theme = useTheme();
  const classes = useStyles();
  const fullScreen = useMediaQuery(theme.breakpoints.down("sm"));
  const [state, setState] = React.useState(false);
  const [auth, setAuth] = React.useState(false);
  const [action, setAction] = React.useState(false);
  const isAuth = useSelector((state) => state.app.isAuth);
  let history = useHistory();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleLocation = (name) => {
    setOpen(false);
    setCityName(name);
  };

  const dispatch = useDispatch();

  const toggleDrawer = (open) => (event) => {
    setState(!state);
  };

  const handleSignIn = () => {
    setAction(true);
    setState(false);
  };

  const redirect_admin = (tid) => {
    history.push(`/organizer/${tid}`);
  };
  const signout_user = () => {
    setAuth(false);
    history.push("/");
  };

  const handleCloseLogin = (email, pass) => {
    let r = "";
    if (document.getElementById("tab-1").checked) {
      r = document.getElementById("tab-1").value;
    } else if (document.getElementById("tab-2").checked) {
      r = document.getElementById("tab-2").value;
    } else {
      alert("Select User Type");
    }

    if (r === "Organizer") {
      if (validateEmail(email) == true) {
        var obj_email_check = userdata.organizers.filter(
          (ele) => ele.email == email
        )[0];
        var obj_pass_check = userdata.organizers.filter(
          (ele) => ele.password == pass
        )[0];
        if (
          obj_email_check &&
          obj_pass_check &&
          obj_pass_check.id === obj_email_check.id
        ) {
          setAuth(true);
          setUser(obj_email_check.id);
          setUsertype("organizer");
          alert("Successfully Logged in");
          redirect_admin(obj_email_check.id);
        } else if (email == "") {
          setAuth(false);
          setUser(-1);
          setUsertype("");
          alert("Please type your email");
        } else if (pass == "") {
          setAuth(false);
          setUser(-1);
          setUsertype("");
          alert("Please type your passsword");
        } else {
          setAuth(false);
          setUser(-1);
          alert("You are not registered");
        }
        setAction(false);
        setState(false);
      } else {
        alert("Please type a valid email address");
      }
      setAction(false);
      setState(false);
    } else if (r == "User") {
      if (validateEmail(email) == true) {
        var obj_email_check = userdata.users.filter(
          (ele) => ele.email == email
        )[0];
        var obj_pass_check = userdata.users.filter(
          (ele) => ele.password == pass
        )[0];
        if (
          obj_email_check &&
          obj_pass_check &&
          obj_pass_check.id === obj_email_check.id
        ) {
          setAuth(true);
          setUser(obj_email_check.id);
          setUsertype("user");
          alert("Successfully Logged in");
        } else if (email == "") {
          setAuth(false);
          setUser(-1);
          setUsertype("");
          alert("Please type your email");
        } else if (pass == "") {
          setAuth(false);
          setUser(-1);
          setUsertype("");
          alert("Please type your passsword");
        } else {
          setAuth(false);
          setUser(-1);
          setUsertype("");
          alert("You are not registered");
        }
        setAction(false);
        setState(false);
      } else {
        alert("Please type a valid email address");
      }
      setAction(false);
      setState(false);
    }
  };

  React.useEffect(() => {
    dispatch(storeAuth(auth));
  }, [auth]);

  function ProfileRedirect() {
    const tid = user;
    const tp = usertype;
    let a;
    if (tp == "organizer") {
      a = (
        <>
          <Link
            to={{ pathname: `/organizer/${tid}` }}
            style={{ marginLeft: 20, color: "black" }}
          >
            <div>
              <AccountCircleIcon style={{ fontSize: "40px" }} />
              <span>Profile</span>
            </div>
          </Link>
        </>
      );
    } else if (tp == "user") {
      a = (
        <>
          <Link
            to={{ pathname: `/user/${tid}` }}
            style={{ marginLeft: 20, color: "black" }}
          >
            <div>
              <AccountCircleIcon style={{ fontSize: "40px" }} />
              <span>Profile</span>
            </div>
          </Link>
        </>
      );
    }
    return a;
  }
  const Notif = () => {
    const tid = user;
    const dt = userdata.users.filter((ele) => ele.id == tid)[0];
    if (dt.friend_requests.length > 0) {
      return <NotificationImportant style={{ fontSize: "40px" }} />;
    }
    return <Notifications style={{ fontSize: "40px" }} />;
  };
  const handleNotif = () => {
    const tid = user;
    const dt = userdata.users.filter((ele) => ele.id == tid)[0];
    const ll = dt.friend_requests.length;
    alert(`You have ${ll} event buddy requests.`);
  };
  const Intro = () => {
    const tid = user;
    const dt = userdata.users.filter((ele) => ele.id == tid);
    if (dt.length === 1) {
      if (isAuth && dt[0].friend_requests.length > 0) {
        return (
          <>
            <Announcement
              style={{
                fontSize: "20px",
                marginBottom: "150px",
                marginLeft: "150px",
                position: "absolute",
              }}
            />
            <AccountCircleIcon style={{ fontSize: "40px" }} />
            <div>Hi, User..</div>
          </>
        );
      } else if (isAuth) {
        return (
          <>
            <AccountCircleIcon style={{ fontSize: "40px" }} />
            <div>Hi, User..</div>
          </>
        );
      }
    }
    else if (isAuth) {
      return (
        <>
          <AccountCircleIcon style={{ fontSize: "40px" }} />
          <div>Hi, User..</div>
        </>
      );
    }
    return <></>;
  };
  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      width: 400,
      backgroundColor: "#16161D",
      color: "white",
      borderStyle: "none",
      borderBottom: "1px solid white",
      borderRadius: "0px",
      fontSize: "15px",
    }),
    menu: (provided, state) => ({
      ...provided,
      backgroundColor: "#16161D",
      color: "#f84464",
      opacity: 0.9,
    }),
  };
  const searchMovie = (e) => {
    history.push(`/events/${e.value}`);
    // window.location.reload(false);
  };
  return (
    <div>
      <div className={styles.navbar}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "30%",
            height: "100%",
          }}
        >
          <Link className={styles.link} to="/">
            <svg style={{ marginTop: "55px" }}>
              <image
                height="100"
                width="100"
                href="//www.iasplus.com/en/images/responsive/badges/g20/@@images/465e1ae9-46a0-4131-b3d0-984fcbb8233a.png"
              ></image>
            </svg>
          </Link>
        </div>
        <Select
          options={items}
          id="languages"
          name="languages"
          styles={customStyles}
          width="200px"
          placeholder="Search Events..."
          onChange={searchMovie}
          openMenuOnClick={false}
        />
        <Link className={styles.link} to="">
          Home
        </Link>
        <Link className={styles.link} to="/about">
          About
        </Link>
        <Link className={styles.link} to="/allevents">
          Events
        </Link>
        <Link className={styles.link} to="/contact">
          Contact
        </Link>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: "20px",
            size: "20px",
          }}
        >
          {!isAuth && (
            <button onClick={handleSignIn} className={styles.signBtn}>
              <p>Sign In</p>
            </button>
          )}
          <Login action={action} handleCloseLogin={handleCloseLogin} />
          <div
            onClick={toggleDrawer(true)}
            onClose={toggleDrawer(false)}
            className={styles.profile}
          >
            <Intro />
            <Drawer anchor="right" open={state}>
              <div className={styles.drawer}>
                <div>
                  <div>Hi, User </div>
                </div>
                <AccountCircleIcon style={{ fontSize: "60px" }} />
              </div>
              <div className={styles.sideber_content}>
                <ProfileRedirect />
                <div onClick={handleNotif}>
                  <Notif />
                  <span>Notifications</span>
                </div>
                <div>
                  <ConfirmationNumber style={{ fontSize: "40px" }} />
                  <Link to="/booking-history" style={{ color: "black" }}>
                    <span>Booking History</span>
                  </Link>
                </div>
                <div>
                  <Settings style={{ fontSize: "40px" }} />
                  <span>Settings</span>
                </div>
                <div className={styles.signout_button}>
                  <button onClick={signout_user}>Sign out</button>
                </div>
              </div>
            </Drawer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
