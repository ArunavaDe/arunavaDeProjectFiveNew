import React from 'react';


// search form component JSX markup below
const Form = props => (
    <form onSubmit={props.getRecipe} className="searchForm">
        <input type="text" name="searchString" className="searchBar" id="searchString" required/>
        <label htmlFor="searchString" className="formLabel">What's in your fridge?</label>
        <button className="searchButton">search</button>
        
        
    </form>   
);

export default Form;
