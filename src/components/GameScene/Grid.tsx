import React from 'react';
import { useBasicSolid } from '@react-vertex/material-hooks';
import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';

export type GridProperties = {
    rowsCount: number;
    columnsCount: number;
    color: [number, number, number]
}

const CLIP_SPACE = {
    from: -1,
    to: 1,
    size: 2
}

const Grid: React.FC<any> = (props: GridProperties) => {

    const program = useBasicSolid(props.color);
    const position = useVector3(0,0,0);

    const lines = Array(props.columnsCount + 1).fill(0).map((v, i) => {
        const x = CLIP_SPACE.from + CLIP_SPACE.size * i/props.columnsCount;
        return [
            [x, CLIP_SPACE.from, 0],
            [x, CLIP_SPACE.to, 0]
        ]
    }).concat(Array(props.rowsCount + 1).fill(0).map((v, i) => {
        const y = CLIP_SPACE.from + CLIP_SPACE.size * i/props.rowsCount;
        return [
            [CLIP_SPACE.from, y, 0],
            [CLIP_SPACE.to, y, 0]
        ];
    }));

    const vertices = lines.flat();

    const indices = vertices.map((v, i) => i);
    const geometry = useGeometryElements({
        vertices: vertices.flat(),
        indices,
        normals: [],
        uvs: []
    });

    return (<group>
        <material program={program}>
            <geometry
                position={position}
                {...geometry}
                drawElements={{
                    mode: 'LINES',
                    count: indices.length
                }}
            > </geometry>
        </material>
    </group>)
}

export default Grid;
