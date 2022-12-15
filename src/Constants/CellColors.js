import * as CellTypes from './CellTypes';


export const ICE_COLORS = ['#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#DBF1FD', '#368BC1'];
export const SNOW_COLORS = ['#b7c2ce', '#e1e8ef', '#ebeef3', '#f9fafc', '#f9fafc'];
export const OCEAN_COLORS = ['#87E0FF', '#53C7F0', '#1D97C1'];
export const BEACH_COLORS = ['#F6E4AD', '#FAF2C3', '#FFFFE3'];
export const DIRT_COLORS = ['#9B7653', '#886749', '#74593E', '#614A34', '#4E3B2A', '#9B7653', '#A88769', '#B4987E', '#C1A994', '#CDBBA9'];
export const OCEAN_SEED_COLORS = ['#87E0FF'];
export const BEACH_SEED_COLORS = ['#F6E4AD'];
export const DIRT_SEED_COLORS = ['#9B7653'];
export const ICE_SEED_COLORS = ['#DBF1FD'];
export const SNOW_SEED_COLORS = ['#e1e8ef'];

export const BLOCK_COLORS = {
    [CellTypes.OCEAN]: OCEAN_COLORS,
    [CellTypes.BEACH]: BEACH_COLORS,
    [CellTypes.DIRT]: DIRT_COLORS,
    [CellTypes.ICE]: ICE_COLORS,
    [CellTypes.SNOW]: SNOW_COLORS,
    [CellTypes.OCEAN_SEED]: OCEAN_SEED_COLORS,
    [CellTypes.BEACH_SEED]: BEACH_SEED_COLORS,
    [CellTypes.DIRT_SEED]: DIRT_SEED_COLORS,
    [CellTypes.ICE_SEED]: ICE_SEED_COLORS,
    [CellTypes.SNOW_SEED]: SNOW_SEED_COLORS
}
