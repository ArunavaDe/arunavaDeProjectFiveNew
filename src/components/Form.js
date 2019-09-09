import React from 'react';



const Form = props => (
    <form onSubmit={props.getRecipe} className="searchForm">
        <label htmlFor="searchString" className="visuallyHidden">Search for recipes</label>
        <input type="text" name="searchString" className="searchBar" id="searchString"/>
        <button className="searchButton">search</button>
        
    </form>   
);

export default Form;
