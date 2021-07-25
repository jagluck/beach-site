import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GridCellPixel from './GridCellPixel';
import * as CellTypes from '../Constants/CellTypes';
import * as CellColors from '../Constants/CellColors';
import * as SHOW_SEEDS from '../Constants/ShowSeeds';

class GridCell extends React.Component {
    colorGenerator = () => {
        let showSeeds = SHOW_SEEDS.SHOW_SEEDS;

        let colors = [];
        if (this.props.cellType === CellTypes.OCEAN) {
          colors = CellColors.OCEAN;
        } else if(this.props.cellType === CellTypes.BEACH) {
          colors = CellColors.BEACH;
        } 

        if (showSeeds && this.props.isSeed) {
          // show seeds
          if(this.props.cellType === CellTypes.BEACH) {
            colors = CellColors.BEACH_SEED;
          } else if(this.props.cellType === CellTypes.OCEAN) {
            colors = CellColors.OCEAN_SEED;
          }
        }

        let randomColor = colors[Math.floor(Math.random()*colors.length)];
        return randomColor;
    }
    render() {
      let gridLength = 12;
      let itemList=[];
      for (let column = 0; column < gridLength; column++) {
        for (let row = 0; row < gridLength; row++) {
            let thisCell = <GridCellPixel column={column} row={row} color={this.colorGenerator()}></GridCellPixel>
            itemList.push(thisCell)
        }
      }
      return (
        <div className="GridCell" style={{ background: this.props.color  }}>
          {itemList}
        </div>
      );
    }
  }

GridCell.propTypes = {
    column: PropTypes.number,
    row: PropTypes.number,
    cellType: PropTypes.number,
    isSeed: PropTypes.bool,
};

export default GridCell;