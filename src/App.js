import React, { Component } from 'react';
import './App.css';
import Form from './components/Form';
import AnchorLink from 'react-anchor-link-smooth-scroll'

const apiKey = 'd42b866f825168ee78404d7ae0353e5d';
const apiId = '328c4500';


class App extends Component {

  state = {
    recipeArray: [],
    more: null,
  }

  getRecipe = async (event) =>{
    const searchString = event.target.elements.searchString.value;
    event.preventDefault();

    const apiCall = await fetch(`https://api.edamam.com/search?q=${searchString}&app_id=${apiId}&app_key=${apiKey}`);

    const response = await apiCall.json();
    this.setState({recipeArray: response.hits});
    this.setState({more: response.more});

  }

  refreshPage = () => {
    window.location.reload(false);
  } 

  checkString = () => {
    if(this.state.more === false){
      return(
        <h2 className="statusText">nothing found</h2>
      )
    } else if (this.state.more === true){
      return (
        <h2 className="statusText">your results</h2>
      )
    }
  }



  render() {
    return (
      <div className="App wrapper">

        <h1 className="headLine" id="top">what can i cook today?</h1>
        <Form getRecipe={this.getRecipe}/>

        {this.checkString()}
  
        { this.state.recipeArray.map((item) => {
          return (
            <div className="display">

              <div className="resultsDisplay">

                <h3>{item.recipe.label}</h3>
                <p>Calories: {item.recipe.calories} </p>

                <div className="flexContainer">
                    <img src={item.recipe.image} alt={item.recipe.label}/>
                    <ul className="ingredientList">{item.recipe.ingredients.map(item => (
                      <li>{item.text}</li>
                    ))}</ul>
                  
                </div>

                  <a className="linkButton" href={item.recipe.url}>See recipe</a>
                  <AnchorLink href="#top" className="topButton">to top</AnchorLink>
                  {/* <a href="" onClick={this.refreshPage} className="searchButton">refresh search</a> */}
                  <AnchorLink href="#top" onClick={this.refreshPage} className="searchButton">refresh search</AnchorLink>
                  
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default App;
