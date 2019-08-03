import React from 'react';

import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import { ObstacleRenderingProperties } from './Obstacles';
import { GRAVEL_GEOMETRY } from './geometry';

export const Gravel:React.FC<ObstacleRenderingProperties> = ({
    x,y,scaleX,scaleY
}) => {

    const position = useVector3(x,y,0);
    const scale = [scaleX, scaleY, scaleY];
    const gravelGeometry = useGeometryElements(GRAVEL_GEOMETRY);

    return (
        <group>
            <geometry position={position} scale={scale} {...gravelGeometry} drawElements={{
                mode: 'LINES',
                count: GRAVEL_GEOMETRY.indices.length
            }}>
            </geometry>
        </group>
    );
}
