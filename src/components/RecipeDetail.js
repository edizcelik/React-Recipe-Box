import React, { Component } from 'react';
import Modal from 'react-modal';
import PropTypes from 'prop-types';

const chefhat = require('./../images/chef-hat.svg');
const coffee = require('./../images/coffee.svg');

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


class RecipeDetail extends Component {
  constructor(props) {
    super(props);

    this.state = {
      modalIsOpen: false,
    };

    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.editRecipe = this.editRecipe.bind(this);
    this.deleteRecipe = this.deleteRecipe.bind(this);
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

  editRecipe(e) {
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

      this.props.editRecipe(recipe);

      // reset form
      this.recipeForm.reset();

      // close modal
      this.setState({
        modalIsOpen: false,
      });
    }
  }

  deleteRecipe(e) {
    e.preventDefault();

    this.props.deleteRecipe();

    // close modal
    this.setState({
      modalIsOpen: false,
    });
  }

  render() {
    const recipe = this.props.selectedRecipe;
    if (Object.keys(recipe).length === 0) {
      return (
        <div className="RecipeDetail">
          <img id="chefhat" src={chefhat} alt="recipe box chef hat svg" />
          <h1>RECIPE DETAIL</h1>
        </div>
      );
    }
    return (
      <div className="RecipeDetail">
        <img id="chefhat" src={chefhat} alt="recipe box chef hat svg" />
        <h1>RECIPE DETAIL</h1>
        <div className="details">
          <h2>{recipe.name}</h2>

          <div className="ingredients">
            <h3>Ingredients</h3>
            <p>
              {
                // split into newlines
              recipe.ingredients.split('\n')
                .map(item => <span key={`${item}-${new Date()}`}>{item} <br /></span>)
              }
            </p>
          </div>

          <div className="instructions">
            <h3>Instructions</h3>
            <p>
              {
                // split into newlines
              recipe.instructions.split('\n')
                .map(item => <span key={`${item}-${new Date()}`}>{item} <br /></span>)
              }
            </p>
          </div>
          <div className="bonappetite">
            <img id="coffee" src={coffee} alt="recipe box coffee svg" />
            <span>BON APPETITE !</span>
          </div>
        </div>

        <button onClick={this.openModal}>
          <i className="fa fa-cutlery" aria-hidden="true" />Edit Recipe
        </button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Edit A Recipe"
        >
          <h2 ref={(subtitle) => { this.subtitle = subtitle; }}>
            Edit Recipe for {recipe.name}
          </h2>
          <form
            ref={(input) => { this.recipeForm = input; }}
            onSubmit={this.createRecipe}
          >
            <label htmlFor="recipeName">Name</label>
            <input
              type="text"
              id="recipeName"
              defaultValue={recipe.name}
              ref={(input) => { this.name = input; }}
            />

            <label htmlFor="ingredients">Ingredients</label>
            <textarea
              id="ingredients"
              defaultValue={recipe.ingredients}
              ref={(input) => { this.ingredients = input; }}
            />

            <label htmlFor="instructions">Instructions</label>
            <textarea
              id="instructions"
              defaultValue={recipe.instructions}
              ref={(input) => { this.instructions = input; }}
            />
            <button id="closeBtn" onClick={this.closeModal}>Close</button>
            <button type="submit" id="deleteBtn" onClick={this.deleteRecipe}>Delete</button>
            <button type="submit" id="addBtn" onClick={this.editRecipe}>Edit Recipe</button>
          </form>
        </Modal>
      </div>
    );
  }
}

RecipeDetail.propTypes = {
  selectedRecipe: PropTypes.object.isRequired,
  editRecipe: PropTypes.func.isRequired,
  deleteRecipe: PropTypes.func.isRequired,
};

export default RecipeDetail;
