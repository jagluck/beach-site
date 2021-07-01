import React, { Component } from 'react';
import GridCell from './GridCell';
import * as CellTypes from '../Constants/CellTypes';
import ReactDOM from 'react-dom';
import Clock from 'react-live-clock';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.updateNumber = 0;
        this.beachSeed1 = null;
        this.beachSeed2 = null;
        this.oceanSeed1 = null;
        this.oceanSeed1 = null;
        this.grid = [[]];
    }

    componentDidMount() {
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 500);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min; 
    }
    getDist([x1,y1],[x2,y2]){
        return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
    }

    render() {
        let gridLength = 10;
        let itemList=[];
        if (this.updateNumber % 2 === 0){
            if (this.beachSeed1 == null){
                this.beachSeed1 = [this.getRandom(-10,19),this.getRandom(0,9)];
                this.beachSeed2 = [this.getRandom(-10,19),this.getRandom(0,9)];
                this.oceanSeed1 = [this.getRandom(-10,19),this.getRandom(0,9)];
                this.oceanSeed2 = [this.getRandom(-10,19),this.getRandom(0,9)];


                let tempGrid = [];
                for (let column = 0; column < gridLength; column++) {
                    let thisColumn = [];
                    for (let row = 0; row < gridLength; row++) {
                        let beachDist = Math.min(this.getDist(this.beachSeed1, [row, column]),this.getDist(this.beachSeed2, [row, column]));
                        let oceanDist = Math.min(this.getDist(this.oceanSeed1, [row, column]),this.getDist(this.oceanSeed2, [row, column]));
                        let thisColor = CellTypes.OCEAN;
                        if (beachDist <= oceanDist){
                            thisColor = CellTypes.BEACH;
                        }
                        let thisCell = <GridCell column={column} row={row} cellType={thisColor}></GridCell>
                        thisColumn.push(thisCell);
                        itemList.push(thisCell)
                    }
                    tempGrid.push(thisColumn);
                }
                this.grid = tempGrid;
            } else {
                if (this.beachSeed1[0] !== -19){
                    this.beachSeed1 = [(this.beachSeed1[0] - 1), this.beachSeed1[1]];
                } else {
                    this.beachSeed1 = [19,this.getRandom(0,9)];
                }
                if (this.beachSeed2[0] !== -19){
                    this.beachSeed2 = [(this.beachSeed2[0] - 1), this.beachSeed2[1]];
                } else {
                    this.beachSeed2 = [19,this.getRandom(0,9)];
                }
                if (this.oceanSeed1[0] !== -19){
                    this.oceanSeed1 = [(this.oceanSeed1[0] - 1), this.oceanSeed1[1]];
                } else {
                    this.oceanSeed1 = [19,this.getRandom(0,9)];
                }
                if (this.oceanSeed2[0] !== -19){
                    this.oceanSeed2 = [(this.oceanSeed2[0] - 1), this.oceanSeed2[1]];
                } else {
                    this.oceanSeed2 = [19,this.getRandom(0,9)];
                }

                let tempGrid = [];
                for (let column = 0; column < gridLength; column++) {
                    let thisColumn = [];
                    for (let row = 0; row < gridLength; row++) {
                        if (column === 9){
                            let beachDist = Math.min(this.getDist(this.beachSeed1, [row, column]),this.getDist(this.beachSeed2, [row, column]));
                            let oceanDist = Math.min(this.getDist(this.oceanSeed1, [row, column]),this.getDist(this.oceanSeed2, [row, column]));
                            let thisColor = CellTypes.OCEAN;
                            if (beachDist <= oceanDist){
                                thisColor = CellTypes.BEACH;
                            }
                            let thisCell = <GridCell column={column} row={row} cellType={thisColor}></GridCell>
                            thisColumn.push(thisCell);
                            itemList.push(thisCell)
                        } else {
                            let thisCell = this.grid[column + 1][row];
                            thisColumn.push(thisCell);
                            itemList.push(thisCell)
                        }
                    }
                    tempGrid.push(thisColumn);
                }
                this.grid = tempGrid;
            }
        }

        this.updateNumber = this.updateNumber + 1;
        return (
            <div className="Grid">
                {itemList}
            </div>
        );
    }
}

export default Grid;