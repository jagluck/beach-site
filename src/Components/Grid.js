import React, { Component } from 'react';
import GridCell from './GridCell';
import GridCellPixel from './GridCellPixel';
import * as CellTypes from '../Constants/CellTypes';
import { colorGenerator, createCellInfo } from '../Util/Grid';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.updateNumber = 0;
        this.seedsTotal = 5;
        this.seedTypes = [CellTypes.OCEAN, CellTypes.ICE, CellTypes.SNOW];
        this.seeds = [];
        this.grid = [];
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 100);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        let gridLength = 10;
        let itemList=[];
        if (this.updateNumber % 2 === 0){
            if (this.seeds.length === 0){
                for (let i = 0; i < this.seedTypes.length; i++) {
                    let theseSeeds = [];
                    for (let j = 0; j < this.seedsTotal; j++) {
                        theseSeeds.push([this.getRandom(-10,15),this.getRandom(0,9)]);
                    }
                    this.seeds.push(theseSeeds);
                }
            } else {
                for (let i = 0; i < this.seedTypes.length; i++) {
                    for (let j = 0; j < this.seedsTotal; j++) {
                        if (this.seeds[i][j][0] > -5){
                            this.seeds[i][j] = [(this.seeds[i][j][0]) - 1, this.seeds[i][j][1]];
                        } else {
                            this.seeds[i][j] = [15,this.getRandom(0,9)];
                        }
                    }
                }
            }
        }

        let tempGrid = [];
        for (let row = 0; row < gridLength; row++) {
            let thisRow = [];
            for (let column = 0; column < gridLength; column++) {

                let isSeed = false;
                let thisType = 0;

                [thisType, isSeed] = createCellInfo(this.seeds, this.seedTypes, this.seedsTotal, column, row);
                let thisCellPixels = []
                for (let cellRow = 0; cellRow < 12; cellRow++) {
                    let thisCellPixelsRow = []
                    for (let cellColumn = 0; cellColumn < 12; cellColumn++) {
                        let thisCellPixelsColumn = []

                         if (this.grid && this.grid.length > 0 && column < 9) {
                            let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={this.grid[row][column + 1].props.pixels[cellRow][cellColumn][0].props.color}></GridCellPixel>
                            thisCellPixelsColumn.push(thisPixel)
                        } else {
                            let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={colorGenerator(thisType, isSeed)}></GridCellPixel>
                            thisCellPixelsColumn.push(thisPixel)
                        }
                        thisCellPixelsRow.push(thisCellPixelsColumn);
                    }
                    thisCellPixels.push(thisCellPixelsRow);
                }
                let thisCell = <GridCell column={column} row={row} cellType={thisType} isSeed={isSeed} pixels={thisCellPixels}></GridCell>
                thisRow.push(thisCell);
                itemList.push(thisCell)        
            }
            tempGrid.push(thisRow);
        }
        this.grid = tempGrid;

        this.updateNumber = this.updateNumber + 1;
        return (
            <div className="Grid">
                {itemList}
            </div>
        );
    }
}

export default Grid;