import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import AnchorLink from 'react-anchor-link-smooth-scroll'


// importing react, Component, css link  and smooth scroll plugin from respective packages


const apiKey = 'd42b866f825168ee78404d7ae0353e5d';
const apiId = '328c4500';

// setting ID and Key value for api
// API used is from Edamam.com. Documentation can be foud here https://developer.edamam.com/edamam-docs-recipe-api

class App extends Component {

  state = {
    recipeArray: [],
    more: null,

  }

  // setting state of array that receives response from API call and another element 'More' from the response which is used in error handling

  getRecipe = async (event) =>{
    const searchString = event.target.elements.searchString.value;
    event.preventDefault();

    const apiCall = await fetch(`https://api.edamam.com/search?q=${searchString}&app_id=${apiId}&app_key=${apiKey}`);

    const response = await apiCall.json();
    this.setState({recipeArray: response.hits});
    this.setState({more: response.more});

  }

  // defining a fucntion to call and receive response from API using fetch and async, await

  refreshPage = () => {
    window.location.reload(false);
  } 

  // defining fucntion to refresh page on link click

  checkString = () => {
    if(this.state.more === false){
      return(
      
        <div className="errorHandle">
          <h2 className="statusText">we found nothing matching that description.</h2>
          <AnchorLink href="#top" onClick={this.refreshPage} className="topButton">refresh search</AnchorLink>
        </div>
      )
    } else if (this.state.more === true){
      return (
        <h2 className="statusText">your results</h2>
      )
    }
  }

  //error handling function that allows to check if returned array is empty and show user a text accordingly

  //DOM manipulation follows from here. JSX below. 
  render() {
    return (
      <div className="App wrapper">

        <div className="displayForm">
          <h1 className="headLine" id="top">what can i cook today?</h1>
          <Form getRecipe={this.getRecipe}/>
        </div>
        {/* component linked here */}

        {this.checkString()} 
        {/* checking search string received from user  */}
        
  
  {/* mapping the response array to display results on Document begins below */}
        { this.state.recipeArray.map((item) => {
          return (
            <div className="display">

              <div className="resultsDisplay">

                <h3>{item.recipe.label}</h3>
                <p>Calories: {Math.round(item.recipe.calories)} </p>

                <div className="flexContainer">
                    <img src={item.recipe.image} alt={item.recipe.label}/>
                    <ul className="ingredientList">{item.recipe.ingredients.map(item => (
                      <li>{item.text}</li>
                    ))}</ul>
                  
                </div>

                  <a className="linkButton" href={item.recipe.url}>See recipe</a>
                  <AnchorLink href="#top" className="topButton">to top</AnchorLink>
                  {/* using smooth scroll plugin here */}
                  <AnchorLink href="#top" onClick={this.refreshPage} className="topButton">refresh search</AnchorLink>
                  
              </div>
              
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
