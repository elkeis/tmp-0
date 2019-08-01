import React, { useEffect, useState, useMemo } from 'react';
import {
    useInvertedMatrix,
    usePerspectiveMatrix,
    useVector3,
} from '@react-vertex/math-hooks';
import {
    useRender,
    usePointLight
} from '@react-vertex/core';
import Grid, {GridProperties} from './Grid';
import {ObstaclesGroup, ObstacleRenderingProperties} from './Obstacles';
import { ObstacleType } from '../../reducer/models/ObstacleType';

export type GameSceneState = {
    gridProperties: GridProperties,
    light: LightProperties,
    obstacles: Array<ObstacleProperties>
}

export type ObstacleProperties = {
    row: number,
    column: number,
    type: ObstacleType
}

export type LightProperties = {
    x: number,
    y: number,
    z: number,
    color: [number, number, number]
}

const GameScene: React.FC<GameSceneState> = ({
    gridProperties,
    obstacles,
    light
}) => {
    const view = useInvertedMatrix(0, 0, 5.65);
    const projection = usePerspectiveMatrix(22, 1, 1, 1000);
    const renderScene = useRender();
    const colorBlue = useVector3(0,.5,.9);

    usePointLight(light.color, [light.x, light.y, light.z]);
    usePointLight(colorBlue, [-light.x, -light.y*3, light.z/2]);

    useEffect(() => {
        renderScene();
    },[gridProperties]);

    const obstaclesToRender = useMemo(
        () => obstacles.map(o => buildObstacleRenderProperties(o, gridProperties)),
        [...obstacles.flatMap(o => [o.column, o.row, o.type])]
    );

    return (<camera view={view} projection={projection}>
        <ObstaclesGroup obstacles={obstaclesToRender}></ObstaclesGroup>
        <Grid {...gridProperties}></Grid>
    </camera>);
}

export default GameScene;


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
