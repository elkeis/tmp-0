import * as Interface from './types';

export const createGridAction = (key: Interface.GridActionTypeKeys, position: Interface.Position) => ({
    type: key,
    ...position
});

export const createToggleGridControlAction = (gridControlActionKey: Interface.GridActionTypeKeys) => ({
    type: Interface.ActionTypeKeys.TOGGLE_GRID_CONTROL_ACTION,
    data: gridControlActionKey
});
