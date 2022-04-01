import React, { Component } from 'react';
import PropTypes from 'prop-types';

class GridCell extends Component {
    render() {
      return (
        <div className="GridCell">
          {this.props.pixels}
        </div>
      );
    }
  }

GridCell.propTypes = {
    column: PropTypes.number,
    row: PropTypes.number,
    cellType: PropTypes.number,
    isSeed: PropTypes.bool,
    pixels: PropTypes.array,
};

export default GridCell;