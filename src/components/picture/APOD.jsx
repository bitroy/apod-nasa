import styles from './APOD.module.css'
import React, { Component } from 'react'

export class APOD extends Component {
    constructor() {
        super()
        
        this.state = {
            copyright: null,
            date: null,
            explanation: null,
            hdurl: null,
            title: null,
            url: null,
        };

        this.fetchAPOD = this.fetchAPOD.bind(this)
    };

    async componentDidMount() {
        const data = await this.fetchAPOD()
        if(!data.error) {
            this.setState({
                copyright: data.copyright,
                date: data.date,
                explanation: data.explanation,
                hdurl: data.hdurl,
                title: data.title,
                url: data.url
            })    
        } else {
            console.log(data.error)
        }
    }

    async fetchAPOD() {
        try {
            const url = process.env.REACT_APP_NASA_APOD_URL
            const apikey = process.env.REACT_APP_NASA_API_KEY
            const apodurl = `${url}?api_key=${apikey}`
            const response = await fetch(apodurl)
            return await response.json()
        } catch (error) {
            return error
        }
    }

    render() {
        return (
          <div className={styles.container}>
            <img src={this.state.url} alt={this.state.title} />
            <div className={styles.date}>{this.state.date}</div>
            <div className={styles.title}>{this.state.title}</div>
            <div className={styles.copywright}>
              <span>Copywright: </span>
              {this.state.copyright}
            </div>
            <div className={styles.explanation}>
              <span>Explanation: </span>
              {this.state.explanation}
            </div>
          </div>
        );
    }
}

export default APOD
