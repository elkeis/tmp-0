import React from 'react';

import {useBasicSolid } from '@react-vertex/material-hooks';
import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import { ObstacleRenderingProperties } from './Obstacle';
import { GRAVEL_GEOMETRY } from './geometry';

export const Gravel:React.FC<ObstacleRenderingProperties> = ({
    x,y,scaleX,scaleY
}) => {

    const black = useBasicSolid([0,0,0]);
    const position = useVector3(x,y,0);
    const scale = [scaleX, scaleY, scaleY];
    const gravelGeometry = useGeometryElements(GRAVEL_GEOMETRY);

    return (
        <material program={black}>
            <geometry position={position} scale={scale} {...gravelGeometry} drawElements={{
                mode: 'LINES',
                count: GRAVEL_GEOMETRY.indices.length
            }}>
            </geometry>
        </material>
    );
}
