import React, { useEffect } from 'react';
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
import Obstacle, { ObstacleRenderingProperties } from './Obstacle';
import { ObstacleType } from '../../reducer/models/ObstacleType';

export type GameSceneState = {
    gridProperties: GridProperties,
    obstacles: Array<ObstacleProperties>
}

export type ObstacleProperties = {
    row: number,
    column: number,
    type: ObstacleType
}

const GameScene: React.FC<GameSceneState> = ({
    gridProperties,
    obstacles
}) => {
    const view = useInvertedMatrix(0, 0, 5.65);
    const projection = usePerspectiveMatrix(22, 1, 1, 1000);
    const renderScene = useRender();

    const colorRed = useVector3(1,.8,.8);
    const p = useVector3(-1,5,2);
    const p2 = useVector3(-9, 3, 9);
    const colorCounterRed = useVector3(.8,1,1);
    const p3 = useVector3(1.5,-3,6);

    usePointLight(colorRed, p);
    // usePointLight(colorRed, p2);
    usePointLight(colorCounterRed, p3);
    renderScene();
    useEffect(() => {
        renderScene();
    },[gridProperties]);

    // console.log(obstacles);
    return (<camera view={view} projection={projection}>
        {obstacles.map((o, i) => {
            return <Obstacle key={i} {...buildObstacleRenderProperties(o,gridProperties)}></Obstacle>
        })}
        <Grid {...gridProperties}></Grid>
    </camera>);
}

export default GameScene;


function  buildObstacleRenderProperties(
    obstacle: ObstacleProperties,
    grid: GridProperties)
: ObstacleRenderingProperties {
    const cellWidth = 2/grid.columnsCount;
    const cellHeight = 2/grid.rowsCount;
    const x = (obstacle.column + .5) * cellWidth  -1;
    const y = (obstacle.row + .5) * cellHeight -1 ;
    return  {
        x,
        y,
        width: cellWidth,
        height: cellHeight,
        type: obstacle.type
    }
}
