import React from 'react';
import $ from 'jquery';
import GridCell from './GridCell';
import GridCellPixel from './GridCellPixel';
import * as CellTypes from '../Constants/CellTypes';
import * as CHARACTERS from '../Constants/Characters';
import { colorGenerator, createCellInfo, addFriend, buildFriend } from '../Util/Grid';

interface Grid {
    updateNumber: number;
    seedsTotal: number;
    seedTypes: number[];
    seeds: any;
    grid: any;
    interval: any;
    gridLength: number;
    horseDirection: number;
}

interface character {
    [key: number]: any[];
}

class Grid extends React.Component {
    constructor(props: any) {
        super(props);
        this.updateNumber = 0;
        this.seedsTotal = 5;
        this.seedTypes = [CellTypes.OCEAN, CellTypes.ICE, CellTypes.SNOW];
        this.seeds = [];
        this.gridLength = 11;
        this.grid = [];
        this.horseDirection = 1;

        $('body').off().on('keydown', this.onKeyPressHandler);
    }

    componentDidMount() {
        let column_css: string = '';
        let row_css: string = '';
        for (let i: number = 0; i < this.gridLength; i++) {
            if (i === this.gridLength - 1) {
                column_css = column_css + '60px';
                row_css = row_css + '60px';
            } else {
                column_css = column_css + '60px '
                row_css = row_css + '60px ';
            }
        }
        let width: string = String(60 * this.gridLength) + 'px';
        let height: string = String(60 * this.gridLength) + 'px';
        $('.Grid').css("grid-template-columns", column_css);
        $('.Grid').css("grid-template-rows", row_css);
        $('.Grid').css("width", width);
        $('.Grid').css("height", height);
        this.interval = setInterval(() => this.setState({ time: Date.now() }), 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
    }

    getRandom(min: number, max: number) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    render() {
        if (this.seeds.length === 0) {
            for (let i: number = 0; i < this.seedTypes.length; i++) {
                let theseSeeds: any[] = [];
                for (let j = 0; j < this.seedsTotal; j++) {
                    theseSeeds.push([this.getRandom(-10, this.gridLength + 10), this.getRandom(0, 9)]);
                }
                this.seeds.push(theseSeeds);
            }
        }
        let tempGrid = [];
        let itemList = [];
        if (this.grid.length === 0) {
            // generate initial terains
            for (let row = 0; row < this.gridLength; row++) {
                let thisRow = [];
                for (let column = 0; column < this.gridLength; column++) {

                    let isSeed: boolean = false;
                    let thisType: number = 0;

                    [thisType, isSeed] = createCellInfo(this.seeds, this.seedTypes, this.seedsTotal, column, row);
                    let thisCellPixels = []
                    for (let cellRow = 0; cellRow < 12; cellRow++) {
                        let thisCellPixelsRow = []
                        for (let cellColumn: number = 0; cellColumn < 12; cellColumn++) {
                            let thisCellPixelsColumn = []
                            let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={colorGenerator(thisType, isSeed)}></GridCellPixel>
                            thisCellPixelsColumn.push(thisPixel)

                            thisCellPixelsRow.push(thisCellPixelsColumn);
                        }
                        thisCellPixels.push(thisCellPixelsRow);
                    }
                    if (isSeed) {
                        thisCellPixels = addFriend(thisType, thisCellPixels);
                    }
                    let thisCell = <GridCell column={column} row={row} cellType={thisType} isSeed={isSeed} pixels={thisCellPixels}></GridCell>
                    thisRow.push(thisCell);
                    itemList.push(thisCell)
                }
                tempGrid.push(thisRow);
            }
            this.grid = tempGrid;
        }
        let gridWithCharacter = this.grid;
        gridWithCharacter = this.addCharacter(gridWithCharacter, this.updateNumber);
        this.updateNumber = this.updateNumber + 1;

        return (
            <div className="Grid">
                {gridWithCharacter}
            </div>

        );
    }

    addCharacter(gridWithoutCharacter: any, updateNumber: number) {
        let character: any = CHARACTERS.HORSE_ONE;
        if (this.horseDirection === 1) {
            if ((updateNumber / 2) % 2 === 0) {
                character = CHARACTERS.HORSE_TWO;
            }
        } else {
            character = CHARACTERS.HORSE_THREE;
            if ((updateNumber / 2) % 2 === 0) {
                character = CHARACTERS.HORSE_FOUR;
            }
        }


        let charPos: number = Math.floor(this.gridLength / 2);
        let gridWithCharacter = [];
        for (let row = 0; row < this.gridLength; row++) {
            let thisRow = [];
            for (let column: number = 0; column < this.gridLength; column++) {
                let thisCellPixels = []

                for (let cellRow: number = 0; cellRow < 12; cellRow++) {
                    let thisCellPixelsRow = []
                    for (let cellColumn = 0; cellColumn < 12; cellColumn++) {
                        let thisCellPixelsColumn = []
                        let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={gridWithoutCharacter[row][column].props.pixels[cellRow][cellColumn][0].props.color}></GridCellPixel>
                        thisCellPixelsColumn.push(thisPixel)
                        thisCellPixelsRow.push(thisCellPixelsColumn);
                    }
                    thisCellPixels.push(thisCellPixelsRow);
                }

                if (row === charPos && column === charPos) {
                    thisCellPixels = buildFriend(thisCellPixels, character);
                }

                let thisCell = <GridCell column={column} row={row} cellType={gridWithoutCharacter[row][column].props.cellType} isSeed={gridWithoutCharacter[row][column].props.isSeed} pixels={thisCellPixels}></GridCell>
                thisRow.push(thisCell);
            }
            gridWithCharacter.push(thisRow);
        }

        return gridWithCharacter;
    }

    isInChar(cellColumn: number, cellRow: number, character: character) {
        if (cellRow in character) {
            if (character[cellRow].includes(cellColumn)) {
                return true;
            }
        }
        return false;
    }

    updateGrid(direction: string) {
        let itemList = [];

        if (direction === 'left') {
            this.horseDirection = 0;
        } else if (direction === 'right') {
            this.horseDirection = 1;
        }

        if (this.seeds.length !== 0) {
            for (let i = 0; i < this.seedTypes.length; i++) {
                for (let j = 0; j < this.seedsTotal; j++) {
                    if (direction === 'down') {
                        if (this.seeds[i][j][1] > -10) {
                            this.seeds[i][j] = [(this.seeds[i][j][0]), this.seeds[i][j][1] - 1];
                        } else {
                            this.seeds[i][j] = [this.getRandom(0, 9), this.gridLength + 10];
                        }
                    } else if (direction === 'up') {
                        if (this.seeds[i][j][1] < this.gridLength + 10) {
                            this.seeds[i][j] = [(this.seeds[i][j][0]), this.seeds[i][j][1] + 1];
                        } else {
                            this.seeds[i][j] = [this.getRandom(0, 9), -10];
                        }
                    } else if (direction === 'right') {
                        if (this.seeds[i][j][0] > -10) {
                            this.seeds[i][j] = [(this.seeds[i][j][0]) - 1, this.seeds[i][j][1]];
                        } else {
                            this.seeds[i][j] = [this.gridLength + 10, this.getRandom(0, 9)];
                        }
                    } else if (direction === 'left') {
                        if (this.seeds[i][j][0] < this.gridLength + 10) {
                            this.seeds[i][j] = [(this.seeds[i][j][0]) + 1, this.seeds[i][j][1]];
                        } else {
                            this.seeds[i][j] = [-10, this.getRandom(0, 9)];
                        }
                    }
                }
            }
        }


        let tempGrid = [];

        if (this.grid.length > 0) {
            for (let row = 0; row < this.gridLength; row++) {
                let thisRow = [];
                for (let column = 0; column < this.gridLength; column++) {

                    if (direction === 'down' && row !== (this.gridLength - 1)) {
                        let thisCell = this.grid[row + 1][column];
                        thisRow.push(thisCell);
                        itemList.push(thisCell);
                    } else if (direction === 'up' && row !== 0) {
                        let thisCell = this.grid[row - 1][column];
                        thisRow.push(thisCell);
                        itemList.push(thisCell);
                    } else if (direction === 'right' && column !== (this.gridLength - 1)) {
                        let thisCell = this.grid[row][column + 1];
                        thisRow.push(thisCell);
                        itemList.push(thisCell);
                    } else if (direction === 'left' && column !== 0) {
                        let thisCell = this.grid[row][column - 1];
                        thisRow.push(thisCell);
                        itemList.push(thisCell);
                    } else {
                        let isSeed = false;
                        let thisType = 0;
                        [thisType, isSeed] = createCellInfo(this.seeds, this.seedTypes, this.seedsTotal, column, row);
                        let thisCellPixels = []
                        for (let cellRow = 0; cellRow < 12; cellRow++) {
                            let thisCellPixelsRow = []
                            for (let cellColumn = 0; cellColumn < 12; cellColumn++) {
                                let thisCellPixelsColumn = []
                                let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={colorGenerator(thisType, isSeed)}></GridCellPixel>

                                thisCellPixelsColumn.push(thisPixel)

                                thisCellPixelsRow.push(thisCellPixelsColumn);
                            }
                            thisCellPixels.push(thisCellPixelsRow);
                        }
                        if (isSeed) {
                            thisCellPixels = addFriend(thisType, thisCellPixels);
                        }
                        let thisCell = <GridCell column={column} row={row} cellType={thisType} isSeed={isSeed} pixels={thisCellPixels}></GridCell>
                        thisRow.push(thisCell);
                        itemList.push(thisCell)
                    }
                }
                tempGrid.push(thisRow);
            }
        }

        this.grid = tempGrid;

    }

    onKeyPressHandler = (e: any) => {
        if (e.originalEvent && e.originalEvent.which) {
            let key: number = e.originalEvent.which;
            if (key === 37) {
                // left
                this.updateGrid('left');
            } else if (key === 38) {
                // up
                this.updateGrid('up');
            } else if (key === 39) {
                // right
                this.updateGrid('right');
            } else if (key === 40) {
                //down
                this.updateGrid('down');
            }
        }

    };


}

export default Grid;