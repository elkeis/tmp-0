import {ObstacleType} from '../models';
import * as t from './types';
export const INITIAL_STATE: t.State = {
    obstacles: [
        {row: 0, column: 0, type: ObstacleType.GRAVEL},
        {row: 2, column: 3, type: ObstacleType.WORMHOLE_ENTRANCE},
        {row: 5, column: 6, type: ObstacleType.GRAVEL},
        {row: 5, column: 5, type: ObstacleType.BOULDER},
        {row: 7, column: 4, type: ObstacleType.WORMHOLE_EXIT},
        {row: 9, column: 1, type: ObstacleType.WORMHOLE_ENTRANCE},
        {row: 0, column: 9, type: ObstacleType.WORMHOLE_EXIT},
    ],
    grid: {
        columnsCount: 10,
        rowsCount: 10,
    },
    route: {
        start: {
            row: 0,
            column: 0
        },
        target: {
            row: 9,
            column: 9
        },
        path: [
            {row: 0, column: 0},
            {row: 0, column: 1},
            {row: 1, column: 1},
            {row: 1, column: 2},
            {row: 2, column: 2},
            {row: 3, column: 2},
            {row: 3, column: 3},
            {row: 3, column: 4},
            {row: 4, column: 4},
        ]
    }
}

export enum ScreenType  {
    INITIAL,
    OBSTACLES_BUILDER,
    ROUTE_BUILDER
}

