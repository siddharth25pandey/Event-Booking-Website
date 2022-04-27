import React from 'react';
import axios from "axios"
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import '../Components/Styling/LoginPag.css'
import '../Components/Styling/UserPage.css'
import { PopularEvents } from "../Components/HomePage/PopularEvents";
import { PremierEvents } from "../Components/HomePage/PremierEvents";
import { RecommendedEvents } from "../Components/HomePage/RecommendedEvents";
import { BookedEvents } from '../Components/BookedEvents';
import { useHistory, useParams, Link } from "react-router-dom";
import jsondata from "../database/db.json"
import TextField from '@mui/material/TextField';
import { TextareaAutosize } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import Select from 'react-select'
import { useSelector } from "react-redux";

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
  textField: {
    width: '90%',
    marginLeft: 'auto',
    marginRight: 'auto',            
    paddingBottom: 0,
    marginTop: 0,
    fontWeight: 500,
    color: 'white'
},
input: {
    color: 'white'
}
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const DialogContent = withStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(1),
  },
}))(MuiDialogActions);

export default function UserPage({ action, handleCloseLogin }) {
  const { id } = useParams();
  // let user_data = all_data.filter(ele => ele.id == id)[0];
  const [user_data,setUdt] = React.useState({"name":"","about":"","booked_events":[],"phone":"","email":"","password":""});
  const [all_data,setAllData] = React.useState([{"name":"","about":"","booked_events":[],"phone":"","email":"","password":""}])
  const getuserData = (user_data) => {
    return axios.get("http://chomspro.herokuapp.com/users")
        .then(res => { 
          let ud = res.data.filter(ele => ele.id == id)[0];
          setUdt(ud); 
          setAllData(res.data); 
        })
        .catch(error => console.log(error))
  }
  React.useEffect(() => {
    getuserData();
  }, []);
  let eligible=[];
  let fraands = [];
  let acceptf = [];
  let goodfraands = [];
  const mapping_ids = {"1": "624455b77b88e84a609d2419","2":"624455b77b88e84a609d241b","3":"624455b77b88e84a609d241a","4":"624455b77b88e84a609d241c"}
  const sendRequest = (tid) => {
    const target = all_data.filter(ele => ele.id == tid)[0];
    target.friend_requests.push(user_data.id);
    fetch(`http://chomspro.herokuapp.com/users/${target._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(target)
    })
    user_data.friends.push({"id":tid,"status":"requested"})
    fetch(`http://chomspro.herokuapp.com/users/${user_data._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user_data)
    })
    console.log(target);
    const index = eligible.indexOf(tid);
    if (index > -1) {
      eligible.splice(index, 1);
    }
  }
  const acceptRequest = (tid) => {
    const target = all_data.filter(ele => ele.id == tid)[0];
    let s=0;
    for(let ii=0;ii<target.friends.length;ii++){
      if(target.friends[ii].id==user_data.id ){
        target.friends[ii].status="accepted";
        s=1;
        break;
      }
    }
    if(s==0){
      target.friends.push({"id":user_data.id,"status":"accepted"})
    }
    fetch(`http://chomspro.herokuapp.com/users/${target._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(target)
    })
    const index = user_data.friend_requests.indexOf(target.id);
    if (index > -1) {
      user_data.friend_requests.splice(index, 1);
    }
    user_data.friends.push({"id":target.id,"status":"accepted"})
    fetch(`http://chomspro.herokuapp.com/users/${user_data._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(user_data)
    })
  }
  const Fraand = () => {
    let ret;
    if (user_data.friend_interest){
      let allusers = all_data.filter(ele => ele.friend_interest  && ele.id!=user_data.id);
      let flg=0;
      let kk=0;
      let fids=[];
      console.log(user_data.friends);
      for(let rr=0;rr<user_data.friends.length;rr++){
        fids.push(user_data.friends[rr].id);
      }
      eligible=[];
      console.log(allusers.length);
      for(let i=0;i<allusers.length;i++){
        flg=0;
        console.log(allusers[i]);
        if (!fids.includes(allusers[i].id)){
          console.log(allusers[i].id);
          if(!user_data.friend_requests.includes(allusers[i].id)){
            if(!eligible.includes(allusers[i].id)){
              eligible.push(allusers[i].id);
            }
          }
        }
      }
      fraands = all_data.filter(ele => eligible.includes(ele.id))
      acceptf = user_data.friend_requests;
      acceptf = all_data.filter(ele => acceptf.includes(ele.id));
      fids=[];
      for(let rr=0;rr<user_data.friends.length;rr++){
        if(user_data.friends[rr].status=="accepted"){
          fids.push(user_data.friends[rr].id);
        }
      }
      goodfraands = all_data.filter(ele => fids.includes(ele.id));
      console.log(fids);
      console.log(allusers);
      console.log(eligible);
      console.log(fraands);
      console.log(all_data);
      ret=(<center>
        <h1 style={{color:"white"}}>Send Friend Requests</h1>
        <table className="styled-table">
          <thead>
            <tr>
            <th scope="col">Profile Pic</th>
              <th scope="col">Name</th>
              <th scope="col">Profile</th>
              <th scope="col">Favorite Genres</th>
              <th scope="col">Send Request?</th>
            </tr>
          </thead>
          <tbody>
            {fraands.map((i) => (
                    <tr key={i.id}>
                      <td><center><img src={i.image} height="40px" width="40px" style={{borderRadius: "50px"}}/></center></td>
                      <td>{i.name}</td>
                      <td><Link to={{ pathname: `/user/${i.id}` }} target="_blank"><button>{i.name}'s Profile</button></Link></td>
                      <td><center>{i.fav_genres.join(', ')}</center></td>
                      <td><center><button style={{color: 'blue'}} onClick={() => sendRequest(i.id)}>Send</button></center></td>
                    </tr>
            ))}
          </tbody>
        </table>

        <h1 style={{color:"white"}}>Accept Friend Requests</h1>
        <table className="styled-table">
          <thead>
            <tr>
            <th scope="col">Profile Pic</th>
              <th scope="col">Name</th>
              <th scope="col">Profile</th>
              <th scope="col">Favorite Genres</th>
              <th scope="col">Accept Request?</th>
            </tr>
          </thead>
          <tbody>
            {acceptf.map((i) => (
                    <tr key={i.id}>
                      <td><center><img src={i.image} height="40px" width="40px" style={{borderRadius: "50px"}}/></center></td>
                      <td>{i.name}</td>
                      <td><Link to={{ pathname: `/user/${i.id}`}} target="_blank"><button>{i.name}'s Profile</button></Link></td>
                      <td>{i.fav_genres.join(', ')}</td>
                      <td><button style={{color: 'blue'}} onClick={() => acceptRequest(i.id)}>Accept</button></td>
                    </tr>
            ))}
          </tbody>
        </table>

        <h1 style={{color:"white"}}>Friends</h1>
        <table className="styled-table">
          <thead>
            <tr>
            <th scope="col">Profile Pic</th>
              <th scope="col">Name</th>
              <th scope="col">Profile</th>
              <th scope="col">E-mail</th>
              <th scope="col">Favorite Genres</th>
            </tr>
          </thead>
          <tbody>
            {goodfraands.map((i) => (
                    <tr key={i.id}>
                      <td><center><img src={i.image} height="40px" width="40px" style={{borderRadius: "50px"}}/></center></td>
                      <td>{i.name}</td>
                      <td><Link to={{ pathname: `/user/${i.id}`} } target="_blank"><button>{i.name}'s Profile</button></Link></td>
                      {/* <td><button onClick={sendRequest(i.id)} >Send Request</button></td>  */}
                      <td>{i.email}</td>
                      <td>{i.fav_genres.join(', ')}</td>
                      {/* onClick={sendRequest(i.id)} */}
                    </tr>
            ))}
          </tbody>
        </table>
      </center>)
    }else{
      ret=(<></>)
    }
    return ret;
  }
  const [email,SetEmail] = React.useState(true);
  const changeEmail = () => {
    SetEmail(!email);
  }
  const saveEmail = () => {
    let jj = document.getElementById("email").value;
    if(jj!=""){
      user_data.email =jj;
      fetch(`http://chomspro.herokuapp.com/users/${user_data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user_data)
      })
    }
    SetEmail(!email);
  }
  const isAuth = useSelector((state) => state.app.isAuth);
  const EmailData = () => {
    let r;
    if (email && isAuth){
      r = (<><h4><a href="" style={{ color: "#f84464" }}>Email: </a>{" "}{user_data.email}<button style={{marginLeft: "20px", background: "#16161D", borderStyle: "none"}} onClick={changeEmail}><EditIcon/></button></h4></>)
    }
    else if (email){
      r = (<><h4><a href="" style={{ color: "#f84464" }}>Email: </a>{" "}{user_data.email}</h4></>)
    }
    else{
      r = (<><h4><a href="" style={{ color: "#f84464" }}>Email: </a>{" "}<TextField   inputProps={{ style: { color: 'white', border: 'none', borderColor: '#16161D', borderBottom: '1px solid white' }}} id="email" name="email" placeholder={user_data.email}/><button style={{marginLeft: "20px", background: "#16161D", borderStyle: "none"}} onClick={saveEmail}><SaveIcon/></button></h4></>)
    }
    return r;
  }
  const [about,SetAbout] = React.useState(true);
  const changeAbout = () => {
    SetAbout(!about);
  }
  const saveAbout = () => {
    let jj = document.getElementById("about").value;
    if(jj!=""){
      user_data.about =jj;
      fetch(`http://chomspro.herokuapp.com/users/${user_data._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(user_data)
      })
    }
    SetAbout(!about);
  }
  const AboutData = () => {
    let r;
    if (about && isAuth){
      r = (<><button style={{marginLeft: "800px", background: "#16161D", borderStyle: "none", color: "gold"}} onClick={changeAbout}><EditIcon/></button><h4>{user_data.about}</h4></>)
    }
    else if (about){
      r = (<><h4>{user_data.about}</h4></>)
    }
    else{
      r = (<><button style={{marginLeft: "800px", background: "#16161D", borderStyle: "none", color: "gold"}} onClick={saveAbout}><SaveIcon/></button><h4><TextareaAutosize style={{ backgroundColor:"#16161D", color: 'white', border: 'none', borderColor: '#16161D', borderBottom: '1px solid white', width: "800px" }} minrows={7} id="about" name="about" placeholder={user_data.about}/></h4></>)
    }
    return r;
  }
  const [img,setImg] = React.useState("https://miro.medium.com/max/880/0*H3jZONKqRuAAeHnG.jpg");
  const handleImage = (e) => {
    let value = document.getElementById("poster").value;
    setImg(value);
  }
  const [imgmod, setImgmod] = React.useState(true);
  const imgmodchange = () => {
    setImgmod(!imgmod);
  }
  const imgmodsave = () => {
    imgmodchange();
    let a = document.getElementById("poster").value;
    let newdata = user_data;
    if (a != "" ){
      newdata.image = a;
    }
    fetch(`http://chomspro.herokuapp.com/users/${newdata._id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newdata)
        }
    )
  }
  function Posterbox(props) {
    const imgmod1 = imgmod;
    let poster;
    if (imgmod1 && isAuth ) {
      poster = <>
              <img className="profilepic" src={user_data.image}/>
              <button style={{background: "#16161D", borderStyle: "none", color: "gold"}} onClick={imgmodchange}><EditIcon/></button>
            </>
    }
    else if (imgmod1) {
      poster = <>
                <img className="profilepic" src={user_data.image}/>
              </>
    } else {
      poster = <>
      <img className="profilepic" src={user_data.image}/>
      <button style={{background: "#16161D", borderStyle: "none", color: "gold"}} onClick={imgmodsave}><SaveIcon/></button>
      <br/>
      <div style={{marginLeft: "50px", position: "absolute"}}>
        <TextField inputProps={{ style: { color: 'white', border: 'none', borderColor: '#16161D', borderBottom: '1px solid white' }}} id="poster" name="poster" onChange={handleImage} />
        <br/><br/> 
        <img style={{marginLeft: "80px", borderRadius: "50px" }} src={img} height="50px" width="50px"/>
      </div>
    </>
    }
    return poster;
  }
  const FriendData = () => {
    let r;
    if(user_data.friend_interest){
      const gens_n = user_data.fav_genres.join(', ');
      r = (<><h4><a href="" style={{ color: "#f84464" }}>Favorite Genres: </a>{" "}{gens_n}</h4></>)
    }
    else{
      r = (<></>)
    }
    return r;
  }
  return (
    <div>
      <div
        className="container_user"
        style={{
          backgroundImage: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)",
          backgroundPosition: "center",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
        }}
      >

      </div>
      {/* <img className="profilepic" src={user_data.image}/> */}
      <Posterbox/>
      <div className="userdetails">
        <h1>{user_data.name}</h1>
        <br/><br/>
        <EmailData/>
        <br/><br/>
        <AboutData/>
        <br/><br/>
        <FriendData/>
      </div>
      <br/><br/><br/><br/>

        <div style={{ backgroundColor: "#16161D" }}>
          <RecommendedEvents />
        </div>
        <div style={{ backgroundColor: "#16161D" }}>
          <BookedEvents />
        </div>
        {isAuth && <Fraand/>}
        {/* <Fraand/> */}
      <br/><br/><br/>
    </div>
  );
}

