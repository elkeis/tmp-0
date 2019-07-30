import React, { useReducer, useEffect, DOMElement } from 'react';
import {
    useLambertSolid,
    useBasicSolid,
    usePhongSolid,
    usePhongAttenuated
 } from '@react-vertex/material-hooks';
import { useGeometryElements} from '@react-vertex/geometry-hooks';
import {useVector3} from '@react-vertex/math-hooks';
import {
    useCanvas,
    useTexture2d,
} from '@react-vertex/core';
import tiles from './white_bricks.jpg';

enum ObstacleType {
    BOULDER,
    GRAVEL,
    WORMHOLE_ENTRANCE,
    WORMHOLE_EXIT
}

export type ObstacleRenderingProperties = {
    x: number,
    y: number,
    width: number,
    height: number,
    type: ObstacleType
}

const Obstacle: React.FC<ObstacleRenderingProperties>  = ({
    x,y, width,height, type,
}) => {
    const blueStoneMaterial = usePhongSolid();
    const [texture] = useTexture2d(tiles);
    // const program = usePhongAttenuated([-1,5,4], texture);
    const basic = useBasicSolid();
    const vertices = [
        [-width/2, -height/2, 0.0],
        [width/2, -height/2, 0.0],
        [0, 0, height],

        [-width/2, -height/2, 0.0],
        [-width/2, height/2, 0.0],
        [0, 0, height],

        [-width/2, height/2, 0.0],
        [width/2, height/2, 0.0],
        [0, 0, height],

        [width/2, height/2, 0.0],
        [width/2, -height/2, 0.0],
        [0, 0, height],
    ];
    const indices = vertices.map((v,i) => i);
    const normals = [
        [0, -1, .5],
        [0, -1, .5],
        [0, -1, .5],

        [-1, 0, .5],
        [-1, 0, .5],
        [-1, 0, .5],

        [0, 1, .5],
        [0, 1, .5],
        [0, 1, .5],

        [1, 0, .5],
        [1, 0, .5],
        [1, 0, .5],
    ]

    // const normals = [
    //     [0, 0, 1],
    //     [0, 0, 1],
    //     [0, 0, 1],

    //     [0, 0, 1],
    //     [0, 0, 1],
    //     [0, 0, 1],

    //     [0, 0, 1],
    //     [0, 0, 1],
    //     [0, 0, 1],

    //     [0, 0, 1],
    //     [0, 0, 1],
    //     [0, 0, 1],
    // ]

    const tMap = [
        [0, 0],
        [.2, 0],
        [.2, .1],
        [.2, 0],
        [.4, 0],
        [.4, .1],
        [.4, 0],
        [.6, 0],
        [.6, .1],
        [.6, 0],
        [.8, 0],
        [.8, .1],

    ]

    const normalsToDraw = vertices.map((v,i) => {
        const n = normals[i];
        return [
            [...v],
            [v[0]+n[0], v[1]+n[1], v[2]+n[2]]
        ];
    }).flat();



    const position = useVector3(x,y,0);
    const stoneGeometry = useGeometryElements({
        vertices: vertices.flat(),
        indices,
        normals: normals.flat(),
        uvs: tMap.flat()
    });

    const normG = useGeometryElements({
        vertices: normalsToDraw.flat(),
        indices: normalsToDraw.map((n, i) => i),
        normals: [],
        uvs: []
    })

    return (<group>
        <material program={blueStoneMaterial}>
            <geometry position={position} {...stoneGeometry} drawElements={{
                mode: 'TRIANGLES',
                count: indices.length
            }}>
            </geometry>
        </material>

        {/* <material program={basic}>
            <geometry position={position} {...normG} drawElements={{
                mode: 'LINES',
                count: normalsToDraw.length
            }}></geometry>
        </material> */}
    </group>);
}

export default Obstacle;
