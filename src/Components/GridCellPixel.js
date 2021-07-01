import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GridCellPixel extends React.Component {
    render() {
      return (
        <div className="GridCellPixel" style={{ background: this.props.color  }}></div>
      );
    }
  }

GridCellPixel.propTypes = {
    column: PropTypes.number,
    row: PropTypes.number,
    color: PropTypes.string,
};

export default GridCellPixel;