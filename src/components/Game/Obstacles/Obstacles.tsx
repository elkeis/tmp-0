import React from 'react';
import {useBasicSolid } from '@react-vertex/material-hooks';
import { Boulder } from './Boulder';
import { Gravel } from './Gravel';
import {WormholeEntrance} from './WormholeEntrance';
import { WormholeExit } from './WormholeExit';

import {ObstacleType} from '../../../models/ObstacleType';

const OBSTACLE_COMPONENTS = {
    [ObstacleType.BOULDER]: Boulder,
    [ObstacleType.GRAVEL]: Gravel,
    [ObstacleType.WORMHOLE_ENTRANCE]: WormholeEntrance,
    [ObstacleType.WORMHOLE_EXIT]: WormholeExit
}

export type ObstacleRenderingProperties = {
    x: number,
    y: number,
    scaleX: number,
    scaleY: number,
    type: ObstacleType
}

export type ObstaclesGroupProperties = {
    obstacles: Array<ObstacleRenderingProperties>
}

export const ObstaclesGroup: React.FC<ObstaclesGroupProperties> = ({
    obstacles
}) => {
    const black = useBasicSolid([0,0,0]);

    return (
        <material program={black}>
            {
                obstacles.map((o, i) => {
                    const ObstacleToRender = OBSTACLE_COMPONENTS[o.type] || null;
                    return <ObstacleToRender key={i} {...o}></ObstacleToRender>;
                })
            }
        </material>
    )
}