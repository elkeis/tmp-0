import * as Interface from './types';
import {GridActionTypeKeys} from './types';
import {INITIAL_STATE} from './initialState';
import { ObstacleType } from '../models';
export const reducer = (state: Interface.State = INITIAL_STATE , action: Interface.GridAction | Interface.AppAction): Interface.State => {
    console.log(action);
    switch (action.type) {
        case GridActionTypeKeys.ADD_BOULDER: {
            return {
                ...state,
                obstacles: [...state.obstacles, {
                    type: ObstacleType.BOULDER,
                    row: action.row,
                    column: action.column
                }]
            }
        } case GridActionTypeKeys.ADD_GRAVEL : {
            return {
                ...state,
                obstacles: [...state.obstacles, {
                    type: ObstacleType.GRAVEL,
                    row: action.row,
                    column: action.column
                }]
            }
        } case GridActionTypeKeys.ADD_WORMHOLE_ENTRANCE : {
            return {
                    ...state,
                obstacles: [...state.obstacles, {
                    type: ObstacleType.WORMHOLE_ENTRANCE,
                    row: action.row,
                    column: action.column
                }]
            }

        } case GridActionTypeKeys.ADD_WORMHOLE_EXIT : {
            return {
                ...state,
                obstacles: [...state.obstacles, {
                    type: ObstacleType.WORMHOLE_EXIT,
                    row: action.row,
                    column: action.column
                }]
            }

        } case GridActionTypeKeys.REMOVE_OBSTACLE : {
            return {
                ...state,
                obstacles: [...state.obstacles.filter(o => {
                    return o.row !== action.row || o.column !== action.column
                })]
            }
        } case GridActionTypeKeys.ADD_START_LOCATION : {
            return {
                ...state,
                route: {
                    ...state.route,
                    start: {
                        row: action.row,
                        column: action.column
                    }
                }
            }
        } case GridActionTypeKeys.ADD_TARGET_LOCATION : {
            return {
                ...state,
                route: {
                    ...state.route,
                    target: {
                        row: action.row,
                        column: action.column
                    }
                }
            }
        } case Interface.ActionTypeKeys.TOGGLE_GRID_CONTROL_ACTION: {
            console.log('toggle');
            return {
                ...state,
                gridControlAction: action.data
            }
        }
    }
}
