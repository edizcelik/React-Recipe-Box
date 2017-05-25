import React, { Component } from 'react';

import RecipeDetail from './RecipeDetail';
import Recipes from './Recipes';

const recipeboxsvg = require('./../images/recipe-box.svg');
const greyfloral = require('./../images/greyfloral.png');

let recipes = {
  'recipe-A-Recipe': {
    name: 'A Recipe',
    ingredients: 'Add, edit, delete and save your recipes.',
    instructions: '1. Delete or edit this recipe by clicking on the \'Edit Recipe\' button below.\n2. Add a new recipe by clicking on the \'+ Add Recipe\' button on the left.\n3. Your recipes will be automatically saved for your next visit.',
  },
};
recipes = (localStorage.recipes) ? JSON.parse(localStorage.recipes) : recipes;
let selectedRecipe = (recipes[Object.keys(recipes)[0]]) ? recipes[Object.keys(recipes)[0]] : {};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      recipes,
      selectedRecipe,
    };

    this.selectRecipe = this.selectRecipe.bind(this);
    this.addRecipe = this.addRecipe.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
  }

  componentWillUpdate(nextProps, nextState) {
    // we will persist data on the localStorage
    console.log('change');
    console.log({ nextProps, nextState });
    localStorage.setItem('recipes', JSON.stringify(nextState.recipes));
  }

  selectRecipe(e) {
    // if the selected recipe doesn't have the active class
    if (!e.target.classList.contains('active')) {
      // console.log(e.target.id);
      selectedRecipe = this.state.recipes[e.target.id];
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

    selectedRecipe = (Object.keys(copyRecipes)[0]) ?
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
