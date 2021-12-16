import * as CellColors from '../Constants/CellColors';
import * as CellTypes from '../Constants/CellTypes';
import * as SHOW_SEEDS from '../Constants/ShowSeeds';

export function colorGenerator(cellType, isSeed) {
    let showSeeds = SHOW_SEEDS.SHOW_SEEDS;

    let colors = CellColors.BLOCK_COLORS[cellType];

    if (showSeeds && isSeed) {
      // show seeds
      colors = CellColors.BLOCK_COLORS[CellTypes.SEED_BLOCKS[cellType]];
    }

    let randomColor = colors[Math.floor(Math.random()*colors.length)];
    return randomColor;
}

function getDist([x1,y1],[x2,y2]){
    return Math.sqrt( Math.pow((x1-x2), 2) + Math.pow((y1-y2), 2) );
}

export function createCellInfo(seeds, seedTypes, seedsTotal, column, row){
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
    if (dists[minDist] === 0){
        isSeed = true
    }
    return [thisType, isSeed];
}