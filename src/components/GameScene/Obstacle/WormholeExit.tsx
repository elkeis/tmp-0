import React from 'react';

import {useBasicSolid } from '@react-vertex/material-hooks';
import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import { ObstacleRenderingProperties } from './Obstacle';
import { SQUARE_OUTLINE_GEOMETRY, WORMHOLE_EXIT_GEOMETRY } from './geometry';

export const WormholeExit:React.FC<ObstacleRenderingProperties> = ({
    x,y,scaleX,scaleY
}) => {

    const black = useBasicSolid([0,0,0]);
    const position = useVector3(x,y,0);
    const scale = [scaleX, scaleY, scaleY];
    const outlineGeometry = useGeometryElements(SQUARE_OUTLINE_GEOMETRY);
    const blackWorkGeometry = useGeometryElements(WORMHOLE_EXIT_GEOMETRY);
    return (
        <material program={black}>
            <geometry position={position} scale={scale} {...outlineGeometry} drawElements={{
                mode: 'LINES',
                count: SQUARE_OUTLINE_GEOMETRY.indices.length
            }}>
            </geometry>
            <geometry position={position} scale={scale} {...blackWorkGeometry} drawElements={{
                mode: 'LINE_LOOP',
                count: WORMHOLE_EXIT_GEOMETRY.indices.length
            }}>
            </geometry>
        </material>
    );
}
