import React from 'react';
import {useBasicSolid } from '@react-vertex/material-hooks';
import { Boulder } from './Boulder';
import { Gravel } from './Gravel';
import {WormholeEntrance} from './WormholeEntrance';
import { WormholeExit } from './WormholeExit';
import * as Type from '../interface';

import {ObstacleType} from '../../../models/ObstacleType';

const OBSTACLE_COMPONENTS = {
    [ObstacleType.BOULDER]: Boulder,
    [ObstacleType.GRAVEL]: Gravel,
    [ObstacleType.WORMHOLE_ENTRANCE]: WormholeEntrance,
    [ObstacleType.WORMHOLE_EXIT]: WormholeExit
}

export const Obstacle: React.FC<Type.Obstacle> = props => {
    const black = useBasicSolid([0,0,0]);
    const ObstacleToRender = OBSTACLE_COMPONENTS[props.type] || null;
    return (
        <material program={black}>
            <ObstacleToRender {...props}></ObstacleToRender>
        </material>
    );
}
