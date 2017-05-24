import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';
import RecipeList from './RecipeList';

// custom styles for the modal
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class Recipes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.createRecipe = this.createRecipe.bind(this);
  }

  openModal() {
    this.setState({
      modalIsOpen: true,
    });
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#3C3C3B';
  }

  closeModal() {
    this.setState({
      modalIsOpen: false,
    });
  }

  createRecipe(e) {
    e.preventDefault();
    const name = this.name.value;
    const ingredients = this.ingredients.value;
    const instructions = this.instructions.value;

    // create a recipe from user input
    if (name !== '' && ingredients !== '' && instructions !== '') {
      const recipe = {
        name,
        ingredients,
        instructions,
      };

      this.props.addRecipe(recipe);

      // reset form
      this.recipeForm.reset();

      // close modal
      this.setState({
        modalIsOpen: false,
      });
    }
  }

  render() {
    return (
      <div className="recipes">
        <h1>RECIPES</h1>

        <RecipeList
          recipes={this.props.recipes}
          selectRecipe={this.props.selectRecipe}
          selectedRecipe={this.props.selectedRecipe}
        />

        <button onClick={this.openModal}>
          <i className="fa fa-plus" aria-hidden="true" /> Add Recipe
        </button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Add A Recipe"
        >
          <h2 ref={(subtitle) => { this.subtitle = subtitle; }}>
            Add A Recipe
          </h2>
          <form
            ref={(input) => { this.recipeForm = input; }}
            onSubmit={this.createRecipe}
          >
            <label htmlFor="recipeName">Name</label>
            <input
              type="text"
              id="recipeName"
              placeholder="Enter the recipe name"
              ref={(input) => { this.name = input; }}
            />

            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              placeholder="Enter the needed ingredients"
              ref={(input) => { this.ingredients = input; }}
            />

            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              placeholder="Enter instructions for the recipe"
              ref={(input) => { this.instructions = input; }}
            />
            <button id="closeBtn" onClick={this.closeModal}>Close</button>
            <button type="submit" id="addBtn" onClick={this.createRecipe}>Add Recipe</button>
          </form>
        </Modal>

      </div>
    );
  }
}

Recipes.propTypes = {
  recipes: PropTypes.object.isRequired,
  selectedRecipe: PropTypes.object.isRequired,
  selectRecipe: PropTypes.func.isRequired,
  addRecipe: PropTypes.func.isRequired,
};

export default Recipes;
