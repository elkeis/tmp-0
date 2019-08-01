import React from 'react';

import {useBasicSolid } from '@react-vertex/material-hooks';
import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import { ObstacleRenderingProperties } from './Obstacle';
import { BOULDER_GEOMETRY } from './geometry';

export const Boulder:React.FC<ObstacleRenderingProperties> = ({
    x,y,scaleX,scaleY
}) => {

    const black = useBasicSolid([0,0,0]);
    const position = useVector3(x,y,0);
    const scale = [scaleX, scaleY, scaleY];
    const stoneGeometry = useGeometryElements(BOULDER_GEOMETRY);

    return (
        <material program={black}>
            <geometry position={position} scale={scale} {...stoneGeometry} drawElements={{
                mode: 'LINE_STRIP',
                count: BOULDER_GEOMETRY.indices.length
            }}>
            </geometry>
        </material>
    );
}
