import {
    Canvas,
    useRender,
    useCanvas,
    useCanvasSize,
    useWebGLContext,
    useWebGLVersion,
} from '@react-vertex/core';

import {
    usePhongSolid,
    usePhongTextured,
    useBasicSolid,
    useBasicTextured,
    useLambertSolid,
    useLambertTextured,
} from '@react-vertex/material-hooks'

import {
    useVector3,
    useInvertedMatrix,
    usePerspectiveMatrix
} from '@react-vertex/math-hooks';

import {
    boxGeometry,
    useBoxGeometry,
    useBoxElements,

    circleGeometry,
    useCircleGeometry,
    useCircleElements,

    cylinderGeometry,
    useCylinderGeometry,
    useCylinderElements,

    planeGeometry,
    usePlaneGeometry,
    usePlaneElements,

    sphereGeometry,
    useSphereGeometry,
    useSphereElements,

    torusGeometry,
    useTorusGeometry,
    useTorusElements,
} from '@react-vertex/geometry-hooks';

declare module '@react-vertex/core' {
    export {
        Canvas,
        useRender,
        useCanvas,
        useCanvasSize,
        useWebGLContext,
        useWebGLVersion,
    }
}

declare module '@react-vertex/geometry-hooks' {
    export {
        boxGeometry,
        useBoxGeometry,
        useBoxElements,

        circleGeometry,
        useCircleGeometry,
        useCircleElements,

        cylinderGeometry,
        useCylinderGeometry,
        useCylinderElements,

        planeGeometry,
        usePlaneGeometry,
        usePlaneElements,

        sphereGeometry,
        useSphereGeometry,
        useSphereElements,

        torusGeometry,
        useTorusGeometry,
        useTorusElements,

        useGeometryElements
    }
}

declare module '@react-vertex/material-hooks' {
    export {
        usePhongSolid,
        usePhongTextured,
        useBasicSolid,
        useBasicTextured,
        useLambertSolid,
        useLambertTextured,
    }
}


declare module '@react-vertex/math-hooks' {
    export {
        useVector3,
        useInvertedMatrix,
        usePerspectiveMatrix
    }
}


declare global {
    namespace JSX {
        interface IntrinsicElements {
            scene: any,
            geometry:any,
            material:any,
            camera:any,
            group: any
        }
    }
}

