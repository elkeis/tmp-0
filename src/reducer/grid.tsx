import { ObstacleType } from "./models/ObstacleType";

export type GridState = {
    readonly rowCount: number,
    readonly columnCount: number,
    readonly obstacles?: Array<Obstacle> | undefined,
    readonly startingLocation?: Location | undefined,
    readonly targetLocation?: Location | undefined,
    readonly path?: Array<Location> | undefined
}

export type Obstacle = {
    readonly location: Location
    readonly type: ObstacleType
}

export type Location = {
    readonly column: number;
    readonly row: number;
}


export const initialState: GridState = {
    rowCount: 0,
    columnCount: 0,
    obstacles: [],
    startingLocation: undefined,
    targetLocation: undefined,
    path: []
}


