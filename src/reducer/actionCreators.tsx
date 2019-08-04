import * as Interface from './types';

export const addBoulder = (position: Interface.Position):Interface.GridAction => ({
    type: Interface.ActionTypeKeys.ADD_BOULDER,
    ...position
});

export const addGravel = (position: Interface.Position):Interface.GridAction => ({
    type: Interface.ActionTypeKeys.ADD_GRAVEL,
    ...position
});

export const addWormholeEntrance = (position: Interface.Position):Interface.GridAction => ({
    type: Interface.ActionTypeKeys.ADD_WORMHOLE_ENTRANCE,
    ...position
});

export const addWormholeExit = (position: Interface.Position):Interface.GridAction => ({
    type: Interface.ActionTypeKeys.ADD_WORMHOLE_EXIT,
    ...position
});

export const removeObstacle = (position: Interface.Position):Interface.GridAction => ({
    type: Interface.ActionTypeKeys.REMOVE_OBSTACLE,
    ...position
});

export const addStartLocation = (position: Interface.Position):Interface.GridAction => ({
    type: Interface.ActionTypeKeys.ADD_START_LOCATION,
    ...position
});

export const addTargetLocation = (position: Interface.Position):Interface.GridAction => ({
    type: Interface.ActionTypeKeys.ADD_TARGET_LOCATION,
    ...position
});
