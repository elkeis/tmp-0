import React from 'react';

import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import { BOULDER_GEOMETRY } from './geometry';
import * as Type from '../types';

export const Boulder:React.FC<Type.RenderObject> = props => {
    const position = useVector3(props.x, props.y, 0);
    const scale = [props.scaleX, props.scaleY, props.scaleY];

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
