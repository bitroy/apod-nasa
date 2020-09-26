import styles from "./APOD.module.css";
import React, { Component } from "react";

export class APOD extends Component {
  constructor() {
    super();

    this.state = {
      copyright: null,
      date: null,
      explanation: null,
      hdurl: null,
      title: null,
      url: null,
      errormsg: null,
    };
  }

  async componentDidMount() {
    const data = await this.fetchAPOD();
    if (data.error !== undefined) {
      this.setState({
        errormsg: data.error.message,
      });
    } else if (data.code !== undefined) {
      this.setState({
        errormsg: data.msg,
      });
    } else {
      this.setState({
        copyright: data.copyright,
        date: data.date,
        explanation: data.explanation,
        hdurl: data.hdurl,
        title: data.title,
        url: data.url,
      });
    }
  }

  fetchAPOD = async () => {
    try {
      const url = process.env.REACT_APP_NASA_APOD_URL;
      const apikey = process.env.REACT_APP_NASA_API_KEY;
      const apodurl = `${url}?api_key=${apikey}`;
      const response = await fetch(apodurl);
      return await response.json();
    } catch (error) {
      return error;
    }
  };

  render() {
    return (
      <div className={styles.container}>
        {this.state.errormsg === null ? (
          <>
            <img src={this.state.url} alt={this.state.title} data-testid="apod-image"/>
            <div className={styles.date} data-testid="apod-date">{this.state.date}</div>
            <div className={styles.title} data-testid="apod-title">{this.state.title}</div>
            <div className={styles.copywright} data-testid="apod-copywright">
              <span>Copywright: </span>
              {this.state.copyright}
            </div>
            <div className={styles.explanation} data-testid="apod-explanation">
              <span>Explanation: </span>
              {this.state.explanation}
            </div>
          </>
        ) : (
          <div className={styles.errormsg} data-testid="apod-errormsg">{this.state.errormsg}</div>
        )}
      </div>
    );
  }
}

export default APOD;
