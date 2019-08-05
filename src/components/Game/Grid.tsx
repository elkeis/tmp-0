import React, {useMemo} from 'react';
import {useBasicSolid } from '@react-vertex/material-hooks';
import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import * as Type from '../../reducer/types';

const CLIP_SPACE = {
    from: -1,
    to: 1,
    size: 2
}

const Grid: React.FC<Type.Grid> = props => {
    const program = useBasicSolid([1,.8,.8]);
    const position = useVector3(0,0,0);

    const lines = useMemo(() => Array(props.columnsCount + 1).fill(0).map((v, i) => {
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
    })), [props.columnsCount, props.rowsCount]);

    const geometryProps = useMemo(() => ({
        vertices: lines.flat(2),
        indices: lines.flat().map((v, i) => i),
        normals: lines.flat().map(vert => [0, Math.sign(vert[1]), 40]).flat(),
        uvs: []
    }), [lines]);

    const geometry = useGeometryElements(geometryProps);

    return (<group>
        <material program={program}>
            <geometry
                position={position}
                {...geometry}
                drawElements={{
                    mode: 'LINES',
                    count: geometryProps.indices.length
                }}
            > </geometry>
        </material>
    </group>)
}

export default Grid;
