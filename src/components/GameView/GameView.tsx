import React, { useEffect, useMemo } from 'react';

import {
    useInvertedMatrix,
    usePerspectiveMatrix,
} from '@react-vertex/math-hooks';

import {useRender} from '@react-vertex/core';

import Grid, {GridProperties} from './Grid';
import {ObstaclesGroup, ObstacleRenderingProperties} from './Obstacles';
import {ObstacleType} from '../../models';
import { Route, RouteRenderingProperties } from './Route/Route';

export type GameViewState = {
    gridProperties: GridProperties,
    obstacles: Array<ObstacleProperties>,
    route: RouteProperties
}

export type RouteProperties = {
    start: {
        row: number,
        column: number
    },
    target: {
        row: number,
        column: number
    },
}

export type ObstacleProperties = {
    row: number,
    column: number,
    type: ObstacleType
}

export const GameView: React.FC<GameViewState> = ({
    gridProperties,
    obstacles,
    route
}) => {
    const view = useInvertedMatrix(0, 0, 5.65);
    const projection = usePerspectiveMatrix(22, 1, 1, 1000);
    const renderScene = useRender();

    useEffect(() => {
        renderScene();
    },[gridProperties, renderScene]);

    const obstaclesToRender = useMemo(
        () => obstacles.map(o => buildObstacleRenderProperties(o, gridProperties)),
        [
            ...obstacles.flatMap(o => [o.column, o.row, o.type]),
            gridProperties.columnsCount,
            gridProperties.rowsCount
        ]
    );

    const routeRenderingProperties = useMemo(
        () => buildRouteRenderingProperties(route, gridProperties),
        [route, gridProperties]
    );

    return (<camera view={view} projection={projection}>
        <Route {...routeRenderingProperties}></Route>
        <ObstaclesGroup obstacles={obstaclesToRender}></ObstaclesGroup>
        <Grid {...gridProperties}></Grid>
    </camera>);
}


function buildRouteRenderingProperties(
    route: RouteProperties,
    grid: GridProperties
): RouteRenderingProperties {
    const scaleX = 1/grid.columnsCount;
    const scaleY = 1/grid.rowsCount;
    return {
        start: {
            x: (route.start.column + .5) * scaleX * 2  -1,
            y: (route.start.row + .5) * scaleY * 2 -1,
            scaleX,
            scaleY
        },
        target: {
            x: (route.target.column + .5) * scaleX * 2  -1,
            y: (route.target.row + .5) * scaleY * 2 -1,
            scaleX,
            scaleY
        },
        path: []
    }
}

function  buildObstacleRenderProperties(
    obstacle: ObstacleProperties,
    grid: GridProperties)
: ObstacleRenderingProperties {
    const scaleX = 1/grid.columnsCount;
    const scaleY = 1/grid.rowsCount;
    const x = (obstacle.column + .5) * scaleX * 2  -1;
    const y = (obstacle.row + .5) * scaleY * 2 -1 ;
    return  {
        x,
        y,
        scaleX,
        scaleY,
        type: obstacle.type
    }
}
