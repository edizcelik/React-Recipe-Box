import React from 'react';
import PropTypes from 'prop-types';
import RecipeListItem from './RecipeListItem';

const RecipeList = ({ recipes, selectRecipe, selectedRecipe }) =>
  (
    <ul className="RecipeList">
      {
        Object
          .keys(recipes)
          .map(
            key => <RecipeListItem key={key} id={key} selectedRecipe={selectedRecipe} recipes={recipes} recipe={recipes[key]} selectRecipe={selectRecipe} />
          )
      }
    </ul>
  );

RecipeList.propTypes = {
  recipes: PropTypes.object.isRequired,
  selectedRecipe: PropTypes.object.isRequired,
  selectRecipe: PropTypes.func.isRequired,
};

export default RecipeList;
