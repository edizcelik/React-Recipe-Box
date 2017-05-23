import React, { Component } from 'react';

const recipeboxsvg = require('./../images/recipe-box.svg');

class App extends Component {
  render() {
    return (
      <div className="App">
        <img src={recipeboxsvg} alt="Recipe box svg title" />
      </div>
    );
  }
}

export default App;
