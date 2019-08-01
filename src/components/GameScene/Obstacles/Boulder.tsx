import React from 'react';

import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import { ObstacleRenderingProperties } from './Obstacles';
import { BOULDER_GEOMETRY } from './geometry';

export const Boulder:React.FC<ObstacleRenderingProperties> = ({
    x,y,scaleX,scaleY
}) => {

    const position = useVector3(x,y,0);
    const scale = [scaleX, scaleY, scaleY];
    const stoneGeometry = useGeometryElements(BOULDER_GEOMETRY);

    return (
        <group>
            <geometry position={position} scale={scale} {...stoneGeometry} drawElements={{
                mode: 'LINE_STRIP',
                count: BOULDER_GEOMETRY.indices.length
            }}>
            </geometry>
        </group>
    );
}
