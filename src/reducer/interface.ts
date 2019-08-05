import {ObstacleType} from '../models';

export interface Position {
    row: number,
    column: number,
}

export interface State {
    grid: Grid,
    obstacles: Array<Obstacle>,
    route: Route,
    gridControlAction?: GridActionTypeKeys,
}

export interface Grid {
    rowsCount: number;
    columnsCount: number;
}

export interface Path {
    path: Array<Position>
}

export interface Route extends Path{
    start: Position
    target: Position
}

export interface Obstacle extends Position {
    type: ObstacleType
}

export interface GridControl extends Grid {
    width: number,
    height: number,
    onClick: (position: Position) => void
}

export interface Switch {
    isOn: boolean,
    onToggle: (isOn: boolean) => void
}


export enum ActionTypeKeys {
    TOGGLE_GRID_CONTROL_ACTION = 'TOGGLE_GRID_CONTROL_ACTION',
    UPDATE_PATH = 'UPDATE_PATH',
    CLEAR_ALL_OBSTACLES = 'CLEAR_ALL_OBSTACLES'
}

export enum GridActionTypeKeys {
    ADD_BOULDER = 'ADD_BOULDER',
    ADD_GRAVEL = 'ADD_GRAVEL',
    ADD_WORMHOLE_ENTRANCE = 'ADD_WORMHOLE_ENTRANCE',
    ADD_WORMHOLE_EXIT = 'ADD_WORMHOLE_EXIT',
    REMOVE_OBSTACLE = 'REMOVE_OBSTACLE',

    ADD_START_LOCATION = 'ADD_START_LOCATION',
    ADD_TARGET_LOCATION = 'ADD_TARGET_LOCATION',
}

export interface GridAction {
    type: GridActionTypeKeys,
    column: number,
    row: number
}

export interface AppAction {
    type: ActionTypeKeys,
    data?: any
}
