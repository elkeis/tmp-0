import React, { useEffect, useMemo } from 'react';

import {
    useInvertedMatrix,
    usePerspectiveMatrix,
} from '@react-vertex/math-hooks';

import {useRender} from '@react-vertex/core';

import Grid from './Grid';
import {ObstaclesGroup} from './Obstacles';
import { Route } from './Route/Route';

import * as StateType from '../../reducer/interface';
import * as Type from './interface';

export const Game: React.FC<StateType.State> = props => {
    const view = useInvertedMatrix(0, 0, 5.15);
    const projection = usePerspectiveMatrix(22, 1, 1, 1000);
    const renderScene = useRender();

    useEffect(() => {
        renderScene();
    },[props, renderScene]);

    const obstaclesToRender = useMemo(
        () => props.obstacles.map(o => buildObstacleRenderObject(o, props.grid)),
        [ props.obstacles, props.grid]
    );

    const routeToRender = useMemo(() => buildRouteRenderObject(props.route, props.grid), [props.route, props.grid]);

    return (<camera view={view} projection={projection}>
        <Route {...routeToRender}></Route>
        <ObstaclesGroup obstacles={obstaclesToRender}></ObstaclesGroup>
        <Grid {...props.grid}></Grid>
    </camera>);
}

function buildRouteRenderObject(
    route: StateType.Route,
    grid: StateType.Grid
): Type.Route {
    return {
        start: convertPositionToRenderObject(route.start, grid),
        target: convertPositionToRenderObject(route.target, grid),
        locations: route.path.map(l => convertPositionToRenderObject(l, grid))
    }
}

function convertPositionToRenderObject(
    position: StateType.Position,
    grid: StateType.Grid
): Type.RenderObject {
    const scaleX = 1/grid.columnsCount;
    const scaleY = 1/grid.rowsCount;

    return {
        x: (position.column + .5) * scaleX * 2  -1,
        y: -((position.row + .5) * scaleY * 2 -1),
        scaleX,
        scaleY
    }
}

function  buildObstacleRenderObject(
    obstacle: StateType.Obstacle,
    grid: StateType.Grid)
: Type.Obstacle {
    const scaleX = 1/grid.columnsCount;
    const scaleY = 1/grid.rowsCount;
    const x = (obstacle.column + .5) * scaleX * 2  -1;
    const y = -((obstacle.row + .5) * scaleY * 2 -1) ;
    return  {
        x,
        y,
        scaleX,
        scaleY,
        type: obstacle.type
    }
}
