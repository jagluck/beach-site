import * as CellColors from '../Constants/CellColors';
import * as CellTypes from '../Constants/CellTypes';
import * as SHOW_SEEDS from '../Constants/ShowSeeds';
import * as CHARACTERS from '../Constants/Characters';
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
    if (cellType === CellTypes.SNOW) {
        thisCellPixels = buildFriend(thisCellPixels, CHARACTERS.SNOWMAN);
    }

    if (cellType === CellTypes.ICE) {
        thisCellPixels = buildFriend(thisCellPixels, CHARACTERS.PENGUIN);
    }

    if (cellType === CellTypes.OCEAN) {
        thisCellPixels = buildFriend(thisCellPixels, CHARACTERS.SHARK);
    }

    return thisCellPixels;
}

export function buildFriend(thisCellPixels, friend) {
    let newThisCellPixels = []
    for (let cellRow = 0; cellRow < 12; cellRow++) {
        let thisCellPixelsRow = []
        for (let cellColumn = 0; cellColumn < 12; cellColumn++) {
            let thisCellPixelsColumn = []
            let pixelFound = false;
            for (var color in friend) {
                if (!pixelFound && friend.hasOwnProperty(color)) {
                    if (isInChar(cellColumn, cellRow, friend[color])) {
                        let thisPixel = <GridCellPixel column={cellColumn} row={cellRow} color={color}></GridCellPixel>
                        thisCellPixelsColumn.push(thisPixel);
                        pixelFound = true;
                    }
                }
            }
            if (!pixelFound) {
                let thisPixel = thisCellPixels[cellColumn][cellRow][0];
                thisCellPixelsColumn.push(thisPixel)
            }
            thisCellPixelsRow.push(thisCellPixelsColumn);
        }
        newThisCellPixels.push(thisCellPixelsRow);
    }
    return newThisCellPixels;
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