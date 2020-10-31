import React from "react";
import "./index.scss";

const LandingPage = () => (
  <div class="landingPage">
    <div class="wrapper landingPageTitle">
      <h1>Welcome to Changmo's world!</h1>
      <p>I hope you'll have a wonderful day :)</p>
      <form>
        <input type="email" placeholder="Email" />
        <input type="password" placeholder="Password" />
      </form>
    </div>
  </div>
);

export default LandingPage;
