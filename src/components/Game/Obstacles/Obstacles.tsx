import React from 'react';
import {useBasicSolid } from '@react-vertex/material-hooks';
import { Boulder } from './Boulder';
import { Gravel } from './Gravel';
import {WormholeEntrance} from './WormholeEntrance';
import { WormholeExit } from './WormholeExit';
import * as Type from '../types';

import {ObstacleType} from '../../../models/ObstacleType';

const OBSTACLE_COMPONENTS = {
    [ObstacleType.BOULDER]: Boulder,
    [ObstacleType.GRAVEL]: Gravel,
    [ObstacleType.WORMHOLE_ENTRANCE]: WormholeEntrance,
    [ObstacleType.WORMHOLE_EXIT]: WormholeExit
}

export const ObstaclesGroup: React.FC<Type.Obstacles> = props => {
    const black = useBasicSolid([0,0,0]);

    return (
        <material program={black}>
            {
                props.obstacles.map((o, i) => {
                    const ObstacleToRender = OBSTACLE_COMPONENTS[o.type] || null;
                    return <ObstacleToRender key={i} {...o}></ObstacleToRender>;
                })
            }
        </material>
    )
}
