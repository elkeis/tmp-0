import React from 'react';

import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import { SQUARE_OUTLINE_GEOMETRY, WORMHOLE_EXIT_GEOMETRY } from './geometry';
import * as Type from '../types';

export const WormholeExit:React.FC<Type.RenderObject> = props => {
    const position = useVector3(props.x, props.y, 0);
    const scale = [props.scaleX, props.scaleY, props.scaleY];

    const outlineGeometry = useGeometryElements(SQUARE_OUTLINE_GEOMETRY);
    const blackWorkGeometry = useGeometryElements(WORMHOLE_EXIT_GEOMETRY);
    return (
        <group>
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
        </group>
    );
}
