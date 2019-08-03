import React from 'react';

import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import * as Type from '../types';

export const StartingLocation:React.FC<Type.RenderObject> = props => {
    const position = useVector3(props.x, props.y, 0);
    const scale = [props.scaleX, props.scaleY, props.scaleY];
    const startingLocationSign = useGeometryElements(STARTING_LOCATION_SIGN_GEOMETRY);

    return (
        <group>
            <geometry position={position} scale={scale} {...startingLocationSign} drawElements={{
                mode: 'LINES',
                count: STARTING_LOCATION_SIGN_GEOMETRY.indices.length
            }}>
            </geometry>
        </group>
    );
}

const STARTING_LOCATION_SIGN_GEOMETRY = (() => {
    const t = {
        w: 1.5,
        h: 1,
        x: 0,
        y: 0
    };

    const triangle = [
        [t.x-t.w/2, t.y-t.h/2, 0],
        [t.x + t.w/2, t.y - t.h/2, 0],
        [t.x, t.y + t.h/2, 0]
    ];


    const vertices = [
        triangle[0],
        triangle[1],
        triangle[1],
        triangle[2],
        triangle[2],
        triangle[0],

        triangle[0].map((v,i) => (i === 1 ? v + t.h/3 : v) ),
        triangle[1].map((v,i) => (i === 1 ? v + t.h/3 : v) ),
        triangle[1].map((v,i) => (i === 1 ? v + t.h/3 : v) ),
        triangle[2].map((v,i) => (i === 1 ? v + t.h/3 : v) ),
        triangle[2].map((v,i) => (i === 1 ? v + t.h/3 : v) ),
        triangle[0].map((v,i) => (i === 1 ? v + t.h/3 : v) ),

        triangle[0].map((v,i) => (i === 1 ? v - t.h/3 : v) ),
        triangle[1].map((v,i) => (i === 1 ? v - t.h/3 : v) ),
        triangle[1].map((v,i) => (i === 1 ? v - t.h/3 : v) ),
        triangle[2].map((v,i) => (i === 1 ? v - t.h/3 : v) ),
        triangle[2].map((v,i) => (i === 1 ? v - t.h/3 : v) ),
        triangle[0].map((v,i) => (i === 1 ? v - t.h/3 : v) ),

    ];

    return {
        vertices: vertices.flat(),
        indices: vertices.map((v, i) => i),
        normals: [],
        uvs: []
    };
})();
