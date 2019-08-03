import gravelGeometryValues from './gravel.geometry.json';
import pyramidGeometryValues from './pyramid.geometry.json';

export const BOULDER_GEOMETRY = {
    vertices: pyramidGeometryValues.vertices.flat(),
    indices: pyramidGeometryValues.vertices.map((v,i) => i),
    normals: pyramidGeometryValues.normals.flat(),
    uvs: []
}

export const GRAVEL_GEOMETRY = {
    vertices: gravelGeometryValues.vertices.flat(),
    indices: gravelGeometryValues.vertices.map((v,i) => i),
    normals: gravelGeometryValues.normals.flat(),
    uvs: []
}

export const BLACK_HOLE_GEOMETRY = (() => {
    const radius = .9;
    const radius2 = .2;
    const segments = 7;
    const vertices = Array(segments).fill(0).map((v, i) => {
        const next = i+1;
        return [
            [ 0, 0, 0 ],
            [
                radius2*Math.cos(2*Math.PI/segments * i),
                radius2*Math.sin(2*Math.PI/segments * i),
                0
            ],
            [
                radius2*Math.cos(2*Math.PI/segments * next),
                radius2*Math.sin(2*Math.PI/segments * next),
                0
            ],
            [
                radius2*Math.cos(2*Math.PI/segments * i),
                radius2*Math.sin(2*Math.PI/segments * i),
                0
            ],
            [
                radius2*Math.cos(2*Math.PI/segments * next),
                radius2*Math.sin(2*Math.PI/segments * next),
                0
            ],
            [
                radius*Math.cos(2*Math.PI/segments * i),
                radius*Math.sin(2*Math.PI/segments * i),
                0
            ],
        ]
    }).flat();

    return {
        vertices: vertices.flat(),
        indices: vertices.map((v,i) => i),
        normals: [],
        uvs: []
    }
})();

export const SQUARE_OUTLINE_GEOMETRY = {
    vertices: [
        -1,-1,0,
        -1,1,0,
        1,1,0,
        1,-1,0
    ],
    indices: [0,1,1,2,2,3,3,0],
    normals: [],
    uvs: []
}

export const WORMHOLE_EXIT_GEOMETRY = (() => {
    const radius = .7;
    const radius2 = .6;
    const segments = 14;
    const vertices = Array(segments).fill(0).map((v, i) => {
        const next = i+1;
        return [
            [
                radius*Math.cos(2*Math.PI/segments * i),
                radius*Math.sin(2*Math.PI/segments * i),
                .5
            ],
            [
                radius2*Math.cos(2*Math.PI/segments * next),
                radius2*Math.sin(2*Math.PI/segments * next),
                0
            ],
        ]
    }).flat();

    return {
        vertices: vertices.flat(),
        indices: vertices.map((v,i) => i),
        normals: [],
        uvs: []
    }
})();
