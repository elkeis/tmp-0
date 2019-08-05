import * as t from './types';
export const INITIAL_STATE: t.State = {
    obstacles: [ ],
    grid: {
        columnsCount: 10,
        rowsCount: 10,
    },
    route: {
        start: {
            row: 0,
            column: 0
        },
        target: {
            row: 9,
            column: 9
        },
        path: [ ]
    },
    gridControlAction: undefined
}
