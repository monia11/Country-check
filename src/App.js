import React, { Component } from 'react';

import './App.scss';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      countryInput: '',
      isSubmited: false,
      isLoaded: false,
      countryOutput: [],
      name: [],
      capital: [],
      flag: [],
      currency: [],
      nativeName: [],
      population: 0,
   
      error: null
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.convertPopulation = this.convertPopulation.bind(this);
  }

  handleChange(e) {
    this.setState({ countryInput: e.target.value });
  }

  convertPopulation(population){
    if(population >=1000000){
      return `${(population/1000000).toFixed(2)} mln`
    } else if (population < 1000000 && population >= 1000){
      return `${(population/1000).toFixed(2)} tys.`
    } else {
      return population
    }

  }

  displayResults() {
    if (this.state.error) {
      return <div>Incorrect country name. Try one more time! :)</div>;
    } else if (!this.state.isLoaded && this.state.isSubmited) {
      return <div>Loading... Be patient ;)</div>;
    } else if (!this.state.isSubmited) {
      return <div>No results</div>;
    } else {
      return (
        <div>
          <div className="info_container" >
          <table>
            <tr>
              <th>Name</th>
              <td>{this.state.name} - {this.state.nativeName}</td>
            </tr>
            <tr>
              <th>Capital</th>
              <td>{this.state.capital}</td>
            </tr>
            <tr>
              <th>Currency</th>
              <td>{this.state.currency}</td>
            </tr>
            <tr>
              <th>Population</th>
              <td>{this.convertPopulation(this.state.population)}</td>
            </tr>
         
          </table>

          </div>
         
          <div className="flag_container">
            <h4>National flag</h4>
            <img className="flag" alt="flag" src={this.state.flag} />
          </div>
        </div>
      );
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setState({
      isSubmited: true
    });
    fetch(`https://restcountries.eu/rest/v2/name/${this.state.countryInput}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          isLoaded: true,
          name: result[0].name,
          capital: result[0].capital,
          flag: result[0].flag,
          countryOutput: result,
          currency: result[0].currencies[0].name,
          nativeName: result[0].nativeName,
          population: result[0].population,
    
          error: null
        });
      })
      .catch(err => {
        this.setState({
          isLoaded: true,
          error: err
        });
      });
  }
  render() {
    return (
      <div>
        <div className="container">
          <form onSubmit={this.handleSubmit}>
            <h1>Choose a country</h1>
            <input
              type="text"
              className="country_input"
              onChange={this.handleChange}
            />
            <input type="submit" value="Search" />
          </form>
          <div className="results">{this.displayResults()}</div>
        </div>
      </div>
    );
  }
}
