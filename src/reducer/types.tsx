import {ObstacleType} from '../models';

// export interface State {
//     game: Game,
// }

export interface Position {
    row: number,
    column: number,
}

export interface State {
    grid: Grid,
    obstacles: Array<Obstacle>,
    route: Route
}

export interface Grid {
    rowsCount: number;
    columnsCount: number;
}

export interface Route {
    start: Position
    target: Position
    path: Array<Position>
}

export interface Obstacle extends Position {
    type: ObstacleType
}

export interface GridControl extends Grid {
    onClick: (position: Position) => void
}


export enum ActionTypeKeys {
    ADD_BOULDER,
    ADD_GRAVEL,
    ADD_WORMHOLE_ENTRANCE,
    ADD_WORMHOLE_EXIT,
    REMOVE_OBSTACLE,

    ADD_START_LOCATION,
    ADD_TARGET_LOCATION,

    OPEN_OBSTACLES_SCREEN,
    OPEN_ROUTE_SCREEN,
}

export interface Action {
    type: ActionTypeKeys
}

export interface GridAction extends Action {
    type: typeof
        ActionTypeKeys.ADD_BOULDER |
        ActionTypeKeys.ADD_GRAVEL |
        ActionTypeKeys.ADD_WORMHOLE_ENTRANCE |
        ActionTypeKeys.ADD_WORMHOLE_EXIT |
        ActionTypeKeys.REMOVE_OBSTACLE |
        ActionTypeKeys.ADD_START_LOCATION |
        ActionTypeKeys.ADD_TARGET_LOCATION;
    column: number,
    row: number
}
