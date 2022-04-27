import React from 'react';
import '../Components/Styling/LoginPag.css'
import '../Components/Styling/AboutPage.css'
import naveen from "../static/naveen.jpeg"
import yaduraj from "../static/yaduraj.jpeg"


export default function AboutPage({ action, handleCloseLogin }) {


  return (
    <div>
        <div class="about-section" style={{
              backgroundImage: "linear-gradient(315deg, #f9484a 0%, #fbd72b 74%)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}>
            <h1>Group 20</h1>
            <h3>Event Booking Website</h3>
        </div>

     
    <div class="container" style = {{
        marginBottom: "300px"
    }}>
        <div class="box">
            <div class="top-bar"></div>
            <div class="content">
                <img src="https://pbs.twimg.com/profile_images/1358109556522377216/CFwUr5Qx_400x400.jpg"
                    alt="Siddharth"/>
                <strong>Siddharth Pandey</strong>
                <p>S20190010163</p>
            </div>
            <div class="btn">
                <a href="mailto:siddharth25pandey@gmail.com"><i class="fa fa-phone" aria-hidden="true"></i>Contact</a>
                <a href="https://github.com/siddharth25pandey"><i class="fa fa-eye" aria-hidden="true"></i>About</a>
            </div>
        </div>
        <div class="box">
            <div class="top-bar"></div>
            <div class="content">
                <img src="https://gdsciiits.netlify.app/static/media/shreyash_mishra.3f9cfc3431e4c7dff3dc.png"
                    alt=""/>
                <strong>Shreyash Mishra</strong>
                <p>S20190010120</p>
            </div>
            <div class="btn">
                <a href="mailto:shreyashm1601@gmail.com"><i class="fa fa-phone" aria-hidden="true"></i>Contact</a>
                <a href="https://github.com/Shreyashm16"><i class="fa fa-eye" aria-hidden="true"></i>About</a>
            </div>
        </div>
        <div class="box">
            <div class="top-bar"></div>
            <div class="content">
                <img src="https://avatars.githubusercontent.com/u/56591603?v=4"
                    alt=""/>
                <strong>Priyam Bajpai</strong>
                <p>S20190010144</p>
            </div>
            <div class="btn">
                <a href="mailto:priyambajpai@yahoo.in"><i class="fa fa-phone" aria-hidden="true"></i>Contact</a>
                <a href="https://github.com/prichoms"><i class="fa fa-eye" aria-hidden="true"></i>About</a>
            </div>
        </div>
        <br/>
        <div class="box">
            <div class="top-bar"></div>
            <div class="content">
                <img src={yaduraj}
                    alt=""/>
                <strong>Yaduraj Deshmukh</strong>
                <p>S20190010194</p>
            </div>
            <div class="btn">
                <a href="mailto:yadurajdeshmukh2.303@gmail.com"><i class="fa fa-phone" aria-hidden="true"></i>Contact</a>
                <a href="https://github.com/yaduraj1720562"><i class="fa fa-eye" aria-hidden="true"></i>About</a>
            </div> 
        </div>
        <div class="box">
            <div class="top-bar"></div>
            <div class="content">
                <img src={naveen}
                    alt=""/>
                <strong>Naveen Vula</strong>
                <p>S20190010192</p>
            </div>
            <div class="btn">
                <a href="naveenkumar.v19@gmail.com"><i class="fa fa-phone" aria-hidden="true"></i>Contact</a>
                <a href="https://github.com/naveenkumar-192"><i class="fa fa-eye" aria-hidden="true"></i>About</a>
            </div>
        </div>
    </div>
    </div >
  );
}

