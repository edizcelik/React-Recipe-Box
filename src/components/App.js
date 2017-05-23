import React, { Component } from 'react';

import RecipeList from './RecipeList';
import RecipeDetail from './RecipeDetail';

const recipeboxsvg = require('./../images/recipe-box.svg');

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={recipeboxsvg} alt="Recipe box svg title" />
        <div className="recipeContainer">
          <RecipeList />
          <RecipeDetail />
        </div>
      </div>
    );
  }
}

export default App;
