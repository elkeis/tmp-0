import React from 'react';

import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import * as Type from '../types';

export const TargetLocation:React.FC<Type.RenderObject> = props => {
    const position = useVector3(props.x, props.y, 0);
    const scale = [props.scaleX, props.scaleY, props.scaleY];

    const wideCircle = useGeometryElements(WIDE_CIRCLE_GEOMETRY);
    const middleCircle = useGeometryElements(MIDDLE_CIRCLE_GEOMETRY);
    const smallCircle = useGeometryElements(SMALL_CIRCLE_GEOMETRY);

    return (
        <group>
            <geometry position={position} scale={scale} {...wideCircle} drawElements={{
                mode: 'LINE_LOOP',
                count: WIDE_CIRCLE_GEOMETRY.indices.length
            }}>
            </geometry>
            <geometry position={position} scale={scale} {...middleCircle} drawElements={{
                mode: 'LINE_LOOP',
                count: MIDDLE_CIRCLE_GEOMETRY.indices.length
            }}>
            </geometry>
            <geometry position={position} scale={scale} {...smallCircle} drawElements={{
                mode: 'LINE_LOOP',
                count: SMALL_CIRCLE_GEOMETRY.indices.length
            }}>
            </geometry>
        </group>
    );
}

const buildCircleGeometry = (radius = 1, segments = 14) => {
    const vertices = Array(segments).fill(0).map((v, i) => {
        return [
            radius*Math.cos(2*Math.PI/segments * i),
            radius*Math.sin(2*Math.PI/segments * i),
            0
        ];
    });

    return {
        vertices: vertices.flat(),
        indices: vertices.map((v,i) => i),
        normals: [],
        uvs: []
    }
}

const WIDE_CIRCLE_GEOMETRY = buildCircleGeometry(.9, 25);
const MIDDLE_CIRCLE_GEOMETRY = buildCircleGeometry(.6, 19);
const SMALL_CIRCLE_GEOMETRY = buildCircleGeometry(.3, 15);

