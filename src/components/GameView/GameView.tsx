import React, { useEffect, useMemo } from 'react';

import {
    useInvertedMatrix,
    usePerspectiveMatrix,
} from '@react-vertex/math-hooks';

import {useRender} from '@react-vertex/core';

import Grid, {GridProperties} from './Grid';
import {ObstaclesGroup, ObstacleRenderingProperties} from './Obstacles';
import {ObstacleType} from '../../models';

export type GameViewState = {
    gridProperties: GridProperties,
    obstacles: Array<ObstacleProperties>
}

export type ObstacleProperties = {
    row: number,
    column: number,
    type: ObstacleType
}

export const GameView: React.FC<GameViewState> = ({
    gridProperties,
    obstacles
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

    return (<camera view={view} projection={projection}>
        <ObstaclesGroup obstacles={obstaclesToRender}></ObstaclesGroup>
        <Grid {...gridProperties}></Grid>
    </camera>);
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
