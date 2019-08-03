import {ObstacleType} from '../models';

export interface State {
    game: Game,
}

export interface Position {
    row: number,
    column: number,
}

export interface Game {
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
