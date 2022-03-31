import React from 'react';
import PropTypes from 'prop-types';

class GridCell extends React.Component {
    render() {
      return (
        <div className="GridCell" style={{ background: this.props.color  }}>
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