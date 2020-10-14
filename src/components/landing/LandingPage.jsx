import React, { Component } from "react";
import APOD from "../picture/APOD";
import Header from "./Header";

export class LandingPage extends Component {
  render() {
    return (
      <>
        <Header />
        <APOD />
      </>
    );
  }
}

export default LandingPage;
