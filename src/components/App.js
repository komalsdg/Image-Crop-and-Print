import React, { Component } from 'react';
import logo from '../logo.svg';
import './styles/App.css';

import ImageControl from './ImageControl'
import ImageFunctions from './ImageFunctions'

class App extends Component {
  render() {
    return (
      <div className="App">
	  <h3>Image Crop and Print</h3>
	  
        <ImageControl />
		
      </div>
    );
  }
}

export default App;
