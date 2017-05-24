import React, { Component } from 'react';
import PropTypes from 'prop-types';

const chefhat = require('./../images/chef-hat.svg');
const coffee = require('./../images/coffee.svg');

class RecipeDetail extends Component {
  render() {
    const recipe = this.props.selectedRecipe;
    return (
      <div className="RecipeDetail">
        <img id="chefhat" src={chefhat} alt="recipe box chef hat svg" />
        <h1>RECIPE DETAIL</h1>
        <h2>{recipe.name}</h2>
        <div className="ingredients">
          <h3>Ingredients</h3>
          <p>{recipe.ingredients}</p>
        </div>
        <div className="instructions">
          <h3>Instructions</h3>
          <p>{recipe.instructions}</p>
        </div>
        <div className="bonappetite">
          <img id="coffee" src={coffee} alt="recipe box coffee svg" />
          <span>BON APPETITE !</span>
        </div>
        <button><i className="fa fa-cutlery" aria-hidden="true" />Edit Recipe</button>
      </div>
    );
  }
}

RecipeDetail.propTypes = {
  selectedRecipe: PropTypes.object.isRequired,
};

export default RecipeDetail;
