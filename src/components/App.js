import React, { Component } from 'react';

import RecipeDetail from './RecipeDetail';
import Recipes from './Recipes';
import recipes from './../sample-recipes';

const recipeboxsvg = require('./../images/recipe-box.svg');
const greyfloral = require('./../images/greyfloral.png');

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes,
      selectedRecipe: recipes.recipe1,
    };

    this.selectRecipe = this.selectRecipe.bind(this);
  }

  selectRecipe(e) {
    // if the selected recipe doesn't have the active class
    if (!e.target.classList.contains('active')) {
      const selectedRecipe = this.state.recipes[e.target.id];

      // remove active class from all list items
      document
        .querySelectorAll('.RecipeList li')
        .forEach(
          li => li.classList.remove('active')
        );
      // add active class to the clicked list item
      e.target.classList.add('active');

      // update the state
      this.setState({
        selectedRecipe
      });
    }
  }

  render() {
    return (
      <div className="App">
        <img src={recipeboxsvg} alt="Recipe box svg title" />
        <div className="recipeContainer">
          <Recipes recipes={this.state.recipes} selectRecipe={this.selectRecipe} />
          <RecipeDetail selectedRecipe={this.state.selectedRecipe} />
        </div>
      </div>
    );
  }
}

export default App;
