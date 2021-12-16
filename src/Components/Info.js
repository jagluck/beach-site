import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Info extends React.Component {
    constructor(props) {
        super(props);
        this.showSeeds = false;
    }

    render() {
      return (
        <div className="Info">
          <span>Winter Fun!!</span>
          {/* <br></br>
          <br></br>
          <span>Show Seeds?</span>
          <input type="checkbox" name="showSeeds" /> */}
        </div>
      );
    }
  }

export default Info;