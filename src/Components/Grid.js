import React, { Component } from 'react';
import GridCell from './GridCell';
import * as CellTypes from '../Constants/CellTypes';

class Grid extends React.Component {
    constructor(props) {
        super(props);
        this.updateNumber = 0;
        this.seedsTotal = 5;
        this.seedTypes = [CellTypes.OCEAN, CellTypes.BEACH];
        this.seeds = [];
        this.grid = [];
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
                            this.seeds[i][j] = [(this.seeds[i][j][0] - 1), this.seeds[i][j][1]];
                        } else {
                            this.seeds[i][j] = [15,this.getRandom(0,9)];
                        }
                    }
                }
            }
        }

        let tempGrid = [];
        for (let column = 0; column < gridLength; column++) {
            let thisColumn = [];
            for (let row = 0; row < gridLength; row++) {

                let dists = [];
                for (let i = 0; i < this.seedTypes.length; i++) {
                    let theseSeeds = [];
                    for (let j = 0; j < this.seedsTotal; j++) {
                        theseSeeds.push(this.getDist(this.seeds[i][j], [row, column]));
                    }
                    dists.push(Math.min(...theseSeeds));
                }

                let minDist = dists.indexOf(Math.min(...dists));
                let thisColor = this.seedTypes[minDist];

                let isSeed = false;
                if (dists[minDist] === 0){
                    isSeed = true
                }

                let thisCell = <GridCell column={column} row={row} cellType={thisColor} isSeed={isSeed}></GridCell>
                thisColumn.push(thisCell);
                itemList.push(thisCell)
            }
            tempGrid.push(thisColumn);
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