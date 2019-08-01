import React from 'react';
import { Boulder } from './Boulder';
import { Gravel } from './Gravel';
import {WormholeEntrance} from './WormholeEntrance';
import { WormholeExit } from './WormholeExit';

enum ObstacleType {
    BOULDER,
    GRAVEL,
    WORMHOLE_ENTRANCE,
    WORMHOLE_EXIT
}

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

const Obstacle: React.FC<ObstacleRenderingProperties>  = (props) => {
    const ObstacleToRender = OBSTACLE_COMPONENTS[props.type];

    return <ObstacleToRender {...props}></ObstacleToRender>;
}

export default Obstacle;
