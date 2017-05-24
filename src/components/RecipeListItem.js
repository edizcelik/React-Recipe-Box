import React from 'react';
import PropTypes from 'prop-types';

const RecipeListItem = ({ id, recipes, recipe, selectRecipe, selectedRecipe }) => {
  let name = selectedRecipe.name;
  name = name.replace(/\s/g, '-');
  id = id.replace(/\s/g, '-');
  if (id === `recipe-${name}`) {
    return <li className="active" id={`recipe-${name}`} onClick={selectRecipe}>{recipe.name}</li>;
  }
  return <li id={id} onClick={selectRecipe}>{recipe.name}</li>;
};

RecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  recipes: PropTypes.object.isRequired,
  selectedRecipe: PropTypes.object.isRequired,
  selectRecipe: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default RecipeListItem;
