import React from 'react';

import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import { GRAVEL_GEOMETRY } from './geometry';
import * as Type from '../interface';

export const Gravel:React.FC<Type.RenderObject> = props => {
    const position = useVector3(props.x, props.y, 0);
    const scale = [props.scaleX, props.scaleY, props.scaleY];
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
