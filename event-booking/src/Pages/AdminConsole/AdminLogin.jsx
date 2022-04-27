import React from 'react';
import "../../Components/Styling/AdminConsole/login.css";
import { useHistory } from "react-router-dom";

export default function AdminLogin() {
    let val;
    const [users, setUsers] = React.useState([]);
    async function getuserdata(){
        let val = await fetch('http://chomspro.herokuapp.com/admins')
            .then(res => res.json())
            .then(json => {
                return json
        })
        console.log(val);
        setUsers(val);
    }
    React.useEffect(() => {
        val = getuserdata();
        console.log(val);
        for(let i=0;i<users.length;i++){
            console.log(users[i].email);
        }
      }, []);
    let history = useHistory();
    const [login_bool, setLoginBool] = React.useState(true);
    function wait(ms){
        var start = new Date().getTime();
        var end = start;
        while(end < start + ms) {
          end = new Date().getTime();
       }
     }
    const log = async () => {
        const e = document.getElementById("email").value;
        const p = document.getElementById("password").value;
        let jj=0;
        for(let i=0;i<users.length;i++){
            if(e==users[i].email && p==users[i].password){
                alert("Successful Login!")
                jj=1;
                return true;
                // history.push('/admin-main');
            }
        }
        if(jj==0){
            alert("Unsuccessful Login")
        }
        return false;
    }
    const register = () =>{
        const e = document.getElementById("email").value;
        const p = document.getElementById("password").value;
        const k = document.getElementById("key").value;
        if(k!="123"){
            alert("Invalid Key.")
            return
        }
        fetch("http://chomspro.herokuapp.com/admins", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ "email": e, "password": p})
        })
        alert("Successful Registration, Logging In now....");
        history.push('/admin-main');
    }
    const reg = () => {
        setLoginBool(!login_bool);
    }
    function LoginData(){
        let r = (<> <div class="login-form"> <form method="POST" action="../../../post" onsubmit="return log()"> <h1>Login</h1> <div class="content"> <div class="input-field"> <input type="email" placeholder="Email" id="email" name="email"/> </div> <div class="input-field"> <input type="password" placeholder="Password" id="password" name="password"/></div></div> <div class="action"> <button type="submit">Sign in</button> <br/> <button onClick={reg}>Register?</button></div> </form> </div> </>);
        return r;
    }
    function RegisterData(){
        let r = (<> <div class="login-form"> <form> <h1>Register</h1> <div class="content"> <div class="input-field"> <input type="email" placeholder="Email" id="email" name="email"/> </div> <div class="input-field"> <input type="password" placeholder="Password" id="password" name="password"/></div><div class="input-field"> <input type="key" placeholder="Security Key" id="key" name="key"/> </div> </div> <div class="action"> <button onClick={register}>Register</button> <br/> <button onClick={reg}>Login?</button></div> </form> </div> </>);
        return r;
    }
    return (
        <div>
            {login_bool && <LoginData/> }
            {!login_bool && <RegisterData/> }
        </div>
    );
}

