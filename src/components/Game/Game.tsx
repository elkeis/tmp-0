import React, { useEffect, useMemo } from 'react';

import {
    useInvertedMatrix,
    usePerspectiveMatrix,
} from '@react-vertex/math-hooks';

import {useRender} from '@react-vertex/core';

import Grid from './Grid';
import {ObstaclesGroup, ObstacleRenderingProperties} from './Obstacles';
import { Route, RouteRenderingProperties } from './Route/Route';
import {Location} from './Route/Path';

import * as t from '../../reducer/types';

export const Game: React.FC<t.Game> = ({
    grid,
    obstacles,
    route
}) => {
    const view = useInvertedMatrix(0, 0, 5.65);
    const projection = usePerspectiveMatrix(22, 1, 1, 1000);
    const renderScene = useRender();

    useEffect(() => {
        renderScene();
    },[grid, renderScene]);

    const obstaclesToRender = useMemo(
        () => obstacles.map(o => buildObstacleRenderProperties(o, grid)),
        [
            ...obstacles.flatMap(o => [o.column, o.row, o.type]),
            grid.columnsCount,
            grid.rowsCount
        ]
    );

    const routeRenderingProperties = useMemo(
        () => buildRouteRenderingProperties(route, grid),
        [route, grid]
    );

    return (<camera view={view} projection={projection}>
        <Route {...routeRenderingProperties}></Route>
        <ObstaclesGroup obstacles={obstaclesToRender}></ObstaclesGroup>
        <Grid {...grid}></Grid>
    </camera>);
}

function buildRouteRenderingProperties(
    route: t.Route,
    grid: t.Grid
): RouteRenderingProperties {

    const scaleX = 1/grid.columnsCount;
    const scaleY = 1/grid.rowsCount;

    return {
        start: {
            ...convertGridLocationToRenderingLocation(route.start, grid),
            scaleX,
            scaleY
        },
        target: {
            ...convertGridLocationToRenderingLocation(route.target, grid),
            scaleX,
            scaleY
        },
        path: route.path.map(l => convertGridLocationToRenderingLocation(l, grid))
    }
}

function convertGridLocationToRenderingLocation(
    position: t.Position,
    grid: t.Grid
): Location {
    const scaleX = 1/grid.columnsCount;
    const scaleY = 1/grid.rowsCount;

    return {
        x: (position.column + .5) * scaleX * 2  -1,
        y: (position.row + .5) * scaleY * 2 -1,
    }
}

function  buildObstacleRenderProperties(
    obstacle: t.Obstacle,
    grid: t.Grid)
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
