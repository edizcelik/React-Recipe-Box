import React from 'react';
import PropTypes from 'prop-types';

const RecipeListItem = ({ id, recipe, selectRecipe }) => {
  if (id === 'recipe1') {
    return <li className="active" id={id} onClick={selectRecipe}>{recipe.name}</li>;
  }
  return <li id={id} onClick={selectRecipe}>{recipe.name}</li>;
};

RecipeListItem.propTypes = {
  recipe: PropTypes.object.isRequired,
  selectRecipe: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired
};

export default RecipeListItem;
