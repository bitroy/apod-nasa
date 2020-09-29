import "react-calendar/dist/Calendar.css";
import styles from "./APOD.module.css";
import React, { Component } from "react";
import DatePicker from "react-date-picker";
import { isImageURL } from "../../utils/imageurl";

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
      showhd: false,
    };
  }

  componentDidMount() {
    this.fetchAPOD();
  }

  fetchAPOD = async (queryparam = "") => {
    try {
      const url = process.env.REACT_APP_NASA_APOD_URL;
      const apikey = process.env.REACT_APP_NASA_API_KEY;
      const apodurl = `${url}?api_key=${apikey}${queryparam}`;
      const response = await fetch(apodurl);
      const data = await response.json();
      if (data.error === undefined && data.code === undefined) {
        this.setState({
          copyright: data.copyright,
          date: data.date,
          explanation: data.explanation,
          hdurl: data.hdurl,
          title: data.title,
          url: data.url,
        });
      } else if (data.error !== undefined) {
        this.setState({
          errormsg: data.error.message,
        });
      } else if (data.code !== undefined) {
        this.setState({
          errormsg: data.msg,
        });
      }
    } catch (error) {}
  };

  showHDImage = () => {
    this.setState({
      showhd: !this.state.showhd,
    });
  };

  fetchAPODOnDate = async (date) => {
    const month = parseInt(date.getMonth()) + 1;
    const userdate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    const queryparam = `&date=${userdate}`;
    this.fetchAPOD(queryparam);
  };

  showButton = (url) => {
    if (url !== null) {
      if (isImageURL(url)) {
        if (this.state.showhd) {
          return (
            <button
              className={styles.showhdimagebtn}
              onClick={this.showHDImage}
            >
              Show Plain Image
            </button>
          );
        } else {
          return (
            <button
              className={styles.showhdimagebtn}
              onClick={this.showHDImage}
            >
              Show HD Image
            </button>
          );
        }
      } else {
        return null;
      }
    } else {
      return null;
    }
  };

  showURLImage = (url) => {
    if (url !== null) {
      if (isImageURL(url)) {
        return (
          <img
            src={url}
            alt={this.state.title}
            loading="lazy"
            data-testid="apod-image"
          />
        );
      } else {
        return (
          <iframe
            src={url}
            title={this.state.title}
            loading="lazy"
            width="600"
            height="400"
          ></iframe>
        );
      }
    } else {
      return <div></div>;
    }
  };

  render() {
    return (
      <div className={styles.container}>
        {this.state.errormsg === null ? (
          <>
            <div className={styles.filters}>
              <DatePicker
                clearIcon={null}
                format="yyyy-MM-dd"
                onChange={this.fetchAPODOnDate}
                value={this.state.date ? new Date(this.state.date) : new Date()}
              />
              {this.showButton(this.state.url)}
            </div>
            {this.state.showhd
              ? this.showURLImage(this.state.hdurl)
              : this.showURLImage(this.state.url)}
            <div className={styles.date} data-testid="apod-date">
              {this.state.date}
            </div>
            <div className={styles.title} data-testid="apod-title">
              {this.state.title}
            </div>
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
          <div className={styles.errormsg} data-testid="apod-errormsg">
            {this.state.errormsg}
          </div>
        )}
      </div>
    );
  }
}

export default APOD;
