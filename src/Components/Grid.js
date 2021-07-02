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
                this.beachSeed1 = [this.getRandom(-10,-5),this.getRandom(0,1)];
                this.beachSeed2 = [this.getRandom(-5,0),this.getRandom(2,3)];
                this.beachSeed3 = [this.getRandom(0,5),this.getRandom(4,6)];
                this.beachSeed4 = [this.getRandom(5,10),this.getRandom(5,8)];
                this.beachSeed5 = [this.getRandom(10,15),this.getRandom(8,9)];

                this.oceanSeed1 = [this.getRandom(-10,-5),this.getRandom(0,1)];
                this.oceanSeed2 = [this.getRandom(-5,0),this.getRandom(2,3)];
                this.oceanSeed3 = [this.getRandom(0,5),this.getRandom(4,6)];
                this.oceanSeed4 = [this.getRandom(5,10),this.getRandom(5,8)];
                this.oceanSeed5 = [this.getRandom(10,19),this.getRandom(8,9)];
            } else {
                if (this.beachSeed1[0] > -5){
                    this.beachSeed1 = [(this.beachSeed1[0] - 1), this.beachSeed1[1]];
                } else {
                    this.beachSeed1 = [15,this.getRandom(1,2)];
                }
                if (this.beachSeed2[0] > -5){
                    this.beachSeed2 = [(this.beachSeed2[0] - 1), this.beachSeed2[1]];
                } else {
                    this.beachSeed2 = [15,this.getRandom(2,3)];
                }
                if (this.beachSeed3[0] > -5){
                    this.beachSeed3 = [(this.beachSeed3[0] - 1), this.beachSeed3[1]];
                } else {
                    this.beachSeed3 = [15,this.getRandom(3,5)];
                }
                if (this.beachSeed4[0] > -5){
                    this.beachSeed4 = [(this.beachSeed4[0] - 1), this.beachSeed4[1]];
                } else {
                    this.beachSeed4 = [15,this.getRandom(6,8)];
                }
                if (this.beachSeed5[0] > -5){
                    this.beachSeed5 = [(this.beachSeed5[0] - 1), this.beachSeed5[1]];
                } else {
                    this.beachSeed5 = [15,this.getRandom(8,9)];
                }

                if (this.oceanSeed1[0] > -5){
                    this.oceanSeed1 = [(this.oceanSeed1[0] - 1), this.oceanSeed1[1]];
                } else {
                    this.oceanSeed1 = [15,this.getRandom(0,2)];
                }
                if (this.oceanSeed2[0] > -5){
                    this.oceanSeed2 = [(this.oceanSeed2[0] - 1), this.oceanSeed2[1]];
                } else {
                    this.oceanSeed2 = [15,this.getRandom(2,3)];
                }
                if (this.oceanSeed3[0] > -5){
                    this.oceanSeed3 = [(this.oceanSeed3[0] - 1), this.oceanSeed3[1]];
                } else {
                    this.oceanSeed3 = [15,this.getRandom(4,6)];
                }
                if (this.oceanSeed4[0] > -5){
                    this.oceanSeed4 = [(this.oceanSeed4[0] - 1), this.oceanSeed4[1]];
                } else {
                    this.oceanSeed4 = [15,this.getRandom(6,8)];
                }
                if (this.oceanSeed5[0] > -5){
                    this.oceanSeed5 = [(this.oceanSeed2[0] - 1), this.oceanSeed5[1]];
                } else {
                    this.oceanSeed5 = [15,this.getRandom(8,9)];
                }
            }
        }

        let tempGrid = [];
        for (let column = 0; column < gridLength; column++) {
            let thisColumn = [];
            for (let row = 0; row < gridLength; row++) {
                let beachDist = Math.min(this.getDist(this.beachSeed1, [row, column]),this.getDist(this.beachSeed2, [row, column]),this.getDist(this.beachSeed3, [row, column]),this.getDist(this.beachSeed4, [row, column]),this.getDist(this.beachSeed5, [row, column]));
                let oceanDist = Math.min(this.getDist(this.oceanSeed1, [row, column]),this.getDist(this.oceanSeed2, [row, column]),this.getDist(this.oceanSeed3, [row, column]),this.getDist(this.oceanSeed4, [row, column]),this.getDist(this.oceanSeed5, [row, column]));
                let thisColor = CellTypes.OCEAN;
                if (beachDist < oceanDist){
                    thisColor = CellTypes.BEACH;
                }
                if (beachDist === 0){
                    thisColor = CellTypes.BEACH_SEED;
                }
                if (oceanDist === 0){
                    thisColor = CellTypes.OCEAN_SEED;
                }

                let thisCell = <GridCell column={column} row={row} cellType={thisColor}></GridCell>
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