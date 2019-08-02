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

import {
    GameViewState,
    GridLocation,
    GridState,
    RouteProperties,
    ObstacleProperties,
} from '../../reducer';

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
    grid: GridState
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
    gridLocation: GridLocation,
    gridProperties: GridState
): Location {
    const scaleX = 1/gridProperties.columnsCount;
    const scaleY = 1/gridProperties.rowsCount;

    return {
        x: (gridLocation.column + .5) * scaleX * 2  -1,
        y: (gridLocation.row + .5) * scaleY * 2 -1,
    }
}

function  buildObstacleRenderProperties(
    obstacle: ObstacleProperties,
    grid: GridState)
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
