import * as t from './interface';
export const INITIAL_STATE: t.State = {
    obstacles: [ ],
    grid: {
        columnsCount: 16,
        rowsCount: 16,
    },
    route: {
        start: undefined,
        target: undefined,
        path: [ ]
    },
    gridControlAction: undefined,
    solved: false
}
