import * as Interface from './types';

export const createGridAction = (key: Interface.GridActionTypeKeys, position: Interface.Position) => ({
    type: key,
    ...position
});

export const createToggleGridControlAction = (gridControlActionKey: Interface.GridActionTypeKeys) => ({
    type: Interface.ActionTypeKeys.TOGGLE_GRID_CONTROL_ACTION,
    data: gridControlActionKey
});


export const updatePath = (path: Array<Interface.Position>) => ({
    type: Interface.ActionTypeKeys.UPDATE_PATH,
    data: path
});
