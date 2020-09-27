import "react-calendar/dist/Calendar.css";
import styles from "./APOD.module.css";
import React, { Component } from "react";
import DatePicker from "react-date-picker";

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

  fetchAPOD = async ( queryparam = "" ) => {
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
    } catch (error) {

    }
  };

  showHDImage = () => {
    this.setState({
      showhd: !this.state.showhd,
    });
  };

  fetchAPODOnDate = async (date) => {
    const month = parseInt(date.getMonth()) + 1;    
    const userdate = `${date.getFullYear()}-${month}-${date.getDate()}`;
    console.log(userdate);
    const queryparam = `&date=${userdate}`;
    this.fetchAPOD(queryparam);
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
              {this.state.showhd ? (
                <button
                  className={styles.showhdimagebtn}
                  onClick={this.showHDImage}
                >
                  Show Plain Image
                </button>
              ) : (
                <button
                  className={styles.showhdimagebtn}
                  onClick={this.showHDImage}
                >
                  Show HD Image
                </button>
              )}
            </div>
            {this.state.showhd ? (
              <img
                src={this.state.hdurl}
                alt={this.state.title}
                data-testid="apod-image"
              />
            ) : (
              <img
                src={this.state.url}
                alt={this.state.title}
                data-testid="apod-image"
              />
            )}
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
