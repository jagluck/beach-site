import * as CellColors from '../Constants/CellColors';
import * as CellTypes from '../Constants/CellTypes';
import * as SHOW_SEEDS from '../Constants/ShowSeeds';
import GridCellPixel from '../Components/GridCellPixel';

export function colorGenerator(cellType, isSeed) {
    let showSeeds = SHOW_SEEDS.SHOW_SEEDS;

    let colors = CellColors.BLOCK_COLORS[cellType];

    if (showSeeds && isSeed) {
        // show seeds
        colors = CellColors.BLOCK_COLORS[CellTypes.SEED_BLOCKS[cellType]];
    }

    let randomColor = colors[Math.floor(Math.random() * colors.length)];
    return randomColor;
}

export function addFriend(cellType, thisCellPixels) {
    let snowmanBlack = {
        0: [],
        1: [5, 6],
        2: [4, 5, 6, 7],
        3: [3, 8],
        4: [2, 5, 7, 9],
        5: [3, 8],
        6: [3, 8],
        7: [2, 9],
        8: [2, 6, 9],
        9: [3, 8],
        10: [4, 5, 6, 7],
        11: []
    }
    let snowmanRed = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [4, 5, 6, 7],
        7: [],
        8: [],
        9: [],
        10: [],
        11: []
    }
    let snowmanOrange = {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [6],
        6: [],
        7: [],
        8: [],
        9: [],
        10: [],
        11: []
    }
    let snowmanWhite = {
        0: [],
        1: [],
        2: [],
        3: [4, 5, 6, 7],
        4: [3, 4, 6, 8],
        5: [4, 5, 7],
        6: [],
        7: [3, 4, 5, 6, 7, 8],
        8: [3, 4, 5, 7, 8],
        9: [4, 5, 6, 7],
        10: [],
        11: []
    }
    if (cellType === CellTypes.SNOW) {
        let newThisCellPixels = []
        for (let cellRow = 0; cellRow < 12; cellRow++) {
            let thisCellPixelsRow = []
            for (let cellColumn = 0; cellColumn < 12; cellColumn++) {
                let thisCellPixelsColumn = []
                if (isInChar(cellColumn, cellRow, snowmanBlack)) {
                    let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={'#000000'}></GridCellPixel>
                    thisCellPixelsColumn.push(thisPixel);
                } else if (isInChar(cellColumn, cellRow, snowmanRed)) {
                    let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={'#FF0000'}></GridCellPixel>
                    thisCellPixelsColumn.push(thisPixel);
                } else if (isInChar(cellColumn, cellRow, snowmanOrange)) {
                    let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={'#FFA500'}></GridCellPixel>
                    thisCellPixelsColumn.push(thisPixel);
                } else if (isInChar(cellColumn, cellRow, snowmanWhite)) {
                    let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={'#FFFFFF'}></GridCellPixel>
                    thisCellPixelsColumn.push(thisPixel);
                } else {
                    let thisPixel = thisCellPixels[cellColumn][cellRow][0];
                    thisCellPixelsColumn.push(thisPixel)
                }
                thisCellPixelsRow.push(thisCellPixelsColumn);
            }
            newThisCellPixels.push(thisCellPixelsRow);
        }
        return newThisCellPixels;
    }

    return thisCellPixels;
}

function isInChar(cellColumn, cellRow, character) {
    if (cellRow in character) {
        if (character[cellRow].includes(cellColumn)) {
            return true;
        }
    }
    return false;
}

function getDist([x1, y1], [x2, y2]) {
    return Math.sqrt(Math.pow((x1 - x2), 2) + Math.pow((y1 - y2), 2));
}

export function createCellInfo(seeds, seedTypes, seedsTotal, column, row) {
    let dists = [];
    for (let i = 0; i < seedTypes.length; i++) {
        let theseSeeds = [];
        for (let j = 0; j < seedsTotal; j++) {
            theseSeeds.push(getDist(seeds[i][j], [column, row]));
        }
        dists.push(Math.min(...theseSeeds));
    }

    let minDist = dists.indexOf(Math.min(...dists));
    let thisType = seedTypes[minDist];

    let isSeed = false;
    if (dists[minDist] === 0) {
        isSeed = true
    }
    return [thisType, isSeed];
}