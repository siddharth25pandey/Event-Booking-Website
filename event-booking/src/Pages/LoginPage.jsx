import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import MuiDialogContent from "@material-ui/core/DialogContent";
import MuiDialogActions from "@material-ui/core/DialogActions";
import "../Components/Styling/LoginPag.css";

import { useHistory } from "react-router-dom";

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

export default function Login({ action, handleCloseLogin }) {
  const [email_id, setEmail] = React.useState("");
  const [pass, setPassword] = React.useState("");
  let history = useHistory();

  const redirect_admin = () => {
    history.push("/admin");
  };
  const redirect_user = () => {
    history.push("/user");
  };
  return (
    <div>
      <Dialog
        onClose={handleCloseLogin}
        aria-labelledby="customized-dialog-title"
        open={action}
        style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
      >
        <DialogContent
          dividers
          style={{
            textAlign: "center",
            color: "white",
            backgroundColor: "#383838",
          }}
        >
          <div>
            <div
              style={{
                fontSize: "25px",
                width: "400px",
                margin: "auto",
                marginBottom: "50px",
              }}
            >
              <u>Login Here</u>
            </div>
          </div>
          <>
            <form>
              <center>
                <div className="rowA">
                  <div className="middle_Container">
                    <input
                      id="tab-1"
                      type="radio"
                      name="tab"
                      class="sign-in"
                      value="User"
                    />
                    <label for="tab-1" class="tab">
                      User
                    </label>
                  </div>
                  <div className="middle_Container_right">
                    <input
                      id="tab-2"
                      type="radio"
                      name="tab"
                      class="sign-up"
                      value="Organizer"
                    />
                    <label for="tab-2" class="tab">
                      Organizer
                    </label>
                  </div>
                </div>
              </center>
              <div className="einputs">          
                <label htmlFor="email" style={{marginRight: "-5px"}}>E-mail</label>
                <input style={{ marginLeft: "15px", background: "#383838", border: "none", borderBottom: "1px solid gray", padding: "10px", fontSize: "16px", outline: "none", borderRadius: "0% !important" }} type="text" name="email" placeholder="Enter your email" onChange={(e)=>setEmail(e.target.value)} />
                <br/>
                <label htmlFor="password">Password</label>
                <input style={{ background: "#383838", border: "none", borderBottom: "1px solid gray", padding: "10px", fontSize: "16px", outline: "none", borderRadius: "0% !important" }} type="password" name="password" placeholder="Enter your password" onChange={(e)=>setPassword(e.target.value)} />
              </div>
              <div style={{ marginTop: "10px" }}>
                I agree to the{" "}
                <a href="" style={{ color: "#f84464" }}>
                  Terms &amp; Conditions
                </a>{" "}
                &amp;{" "}
                <a href="" style={{ color: "#f84464" }}>
                  Privacy Policy
                </a>
              </div>
              <div style={{ marginTop: "20px" }}>
                New user? Register  <a href="" style={{ color: "#f84464"}}> here </a>
              </div>
            </form>
          </>
          <>
          </>
        </DialogContent>
        <DialogActions style={{ backgroundColor: "#383838" }}>
          <Button
            autoFocus
            onClick={() => handleCloseLogin(email_id, pass)}
            style={{ color: "#f84464" }}
          >
            Sign in
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
