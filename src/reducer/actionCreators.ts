import * as Interface from './interface';

export const createGridAction = (key: Interface.GridActionTypeKeys, position: Interface.Position) => ({
    type: key,
    ...position
});

export const toggleGridControlAction = (gridControlActionKey: Interface.GridActionTypeKeys) => ({
    type: Interface.ActionTypeKeys.TOGGLE_GRID_CONTROL_ACTION,
    data: gridControlActionKey
});


export const updatePath = (path: Array<Interface.Position>) => ({
    type: Interface.ActionTypeKeys.UPDATE_PATH,
    data: path
});


export const clearAll = () => ({
    type: Interface.ActionTypeKeys.CLEAR_ALL
});

export const setSolved = (solved: boolean) => ({
    type: Interface.ActionTypeKeys.SET_SOLVED,
    data: solved
});


