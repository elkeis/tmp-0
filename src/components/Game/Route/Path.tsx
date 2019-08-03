import React, { useMemo } from 'react';
import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';


export type Location = {
    x: number,
    y: number,
}

export type PathRenderingProperties = {
    locations: Array<Location>
}


export const Path: React.FC<PathRenderingProperties> = ({
    locations
}) => {
    const position = useVector3(0,0,0);
    const pathGeometryData = useMemo( () => buildPathGeometry(locations), [locations]);
    const pathGeometry = useGeometryElements(pathGeometryData);

    return (
        <group>
            <geometry position={position} {...pathGeometry} drawElements={{
                mode: 'LINES',
                count: pathGeometryData.indices.length
            }}>
            </geometry>
        </group>
    );
}


function buildPathGeometry(locations) {
    const vertices = locations.flatMap((l, i) => {
        const v = [l.x, l.y, 0];
        return (i === 0 || i === locations.length - 1) ? [v] : [v , v];
    });

    return {
        vertices: vertices.flat(),
        indices: vertices.map((v,i) => i),
        normals: [],
        uvs: []
    };
}
