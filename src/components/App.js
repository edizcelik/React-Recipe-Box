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
      selectedRecipe: recipes[Object.keys(recipes)[0]],
    };

    this.selectRecipe = this.selectRecipe.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  selectRecipe(e) {
    // if the selected recipe doesn't have the active class
    if (!e.target.classList.contains('active')) {
      // console.log(e.target.id);
      const selectedRecipe = this.state.recipes[e.target.id];
      // console.log(selectedRecipe);
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

  addRecipe(recipe) {
    // copy current recipes object
    const copyRecipes = JSON.parse(JSON.stringify(this.state.recipes));

    let name = recipe.name;

    name = name.replace(/\s/g, '-');

    // add new recipe
    copyRecipes[`recipe-${name}`] = recipe;

    // set the state
    this.setState({
      recipes: copyRecipes,
      selectedRecipe: copyRecipes[`recipe-${name}`]
    });
  }

  editRecipe(recipe) {
    // copy current recipes object
    const copyRecipes = JSON.parse(JSON.stringify(this.state.recipes));

    let name = this.state.selectedRecipe.name;
    name = name.replace(/\s/g, '-');

    console.log(name);

    // delete the previous object property
    delete copyRecipes[`recipe-${name}`];
    // add edited recipe as a new recipe
    copyRecipes[`recipe-${recipe.name.replace(/\s/g, '-')}`] = recipe;

    // set the state
    this.setState({
      recipes: copyRecipes,
      selectedRecipe: recipe,
    });
  }

  deleteRecipe() {
    // copy current recipes object
    const copyRecipes = JSON.parse(JSON.stringify(this.state.recipes));

    let name = this.state.selectedRecipe.name;
    name = name.replace(/\s/g, '-');

    // delete from the new object
    delete copyRecipes[`recipe-${name}`];

    const selectedRecipe = (Object.keys(copyRecipes)[0]) ?
      copyRecipes[Object.keys(copyRecipes)[0]] :
      {};

    // set the state
    this.setState({
      recipes: copyRecipes,
      selectedRecipe,
    });

    if (Object.keys(selectedRecipe).length !== 0) {
      // add active class to the new selectedRecipe in the recipes list
      name = copyRecipes[Object.keys(copyRecipes)[0]].name;
      name = name.replace(/\s/g, '-');

      const selectedRecipeItem = document.querySelector(`#recipe-${name}`);
      console.log(selectedRecipeItem);
      selectedRecipeItem.classList.add('active');
    }
  }

  render() {
    return (
      <div className="App">
        <img src={recipeboxsvg} alt="Recipe box svg title" />
        <div className="recipeContainer">
          <Recipes
            recipes={this.state.recipes}
            selectedRecipe={this.state.selectedRecipe}
            selectRecipe={this.selectRecipe}
            addRecipe={this.addRecipe}
          />
          <RecipeDetail
            selectedRecipe={this.state.selectedRecipe}
            editRecipe={this.editRecipe}
            deleteRecipe={this.deleteRecipe}
          />
        </div>
      </div>
    );
  }
}

export default App;
