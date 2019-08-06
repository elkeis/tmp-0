import * as t from './interface';
export const INITIAL_STATE: t.State = {
    obstacles: [ ],
    grid: {
        columnsCount: 10,
        rowsCount: 10,
    },
    route: {
        start: undefined,
        target: undefined,
        path: [ ]
    },
    gridControlAction: undefined,
    solved: false
}
