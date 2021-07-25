import * as CellTypes from './CellTypes';



export const OCEAN_COLORS = ['#87E0FF', '#53C7F0', '#1D97C1'];
export const BEACH_COLORS = ['#F6E4AD', '#FAF2C3', '#FFFFE3'];
export const DIRT_COLORS = ['#9B7653', '#886749', '#74593E', '#614A34', '#4E3B2A', '#9B7653', '#A88769', '#B4987E', '#C1A994', '#CDBBA9'];
export const OCEAN_SEED_COLORS = ['#87E0FF'];
export const BEACH_SEED_COLORS = ['#F6E4AD'];
export const DIRT_SEED_COLORS = ['#9B7653'];

export const BLOCK_COLORS = {
    [CellTypes.OCEAN]: OCEAN_COLORS,
    [CellTypes.BEACH]: BEACH_COLORS,
    [CellTypes.DIRT]: DIRT_COLORS,
    [CellTypes.OCEAN_SEED]: OCEAN_SEED_COLORS,
    [CellTypes.BEACH_SEED]: BEACH_SEED_COLORS,
    [CellTypes.DIRT_SEED]: DIRT_SEED_COLORS
}
