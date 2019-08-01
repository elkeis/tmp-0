import React from 'react';
import {useBasicSolid } from '@react-vertex/material-hooks';
import {LocationRenderingProperties, TargetLocation} from './TargetLocation';


export type RouteRenderingProperties = {
    start: LocationRenderingProperties
    target: LocationRenderingProperties,
    path: Array<any>
}

export const Route: React.FC<RouteRenderingProperties> = ({
    start,
    target,
    path
}) => {
    const white = useBasicSolid([1,1,1]);

    return (
        <material program={white}>
            <TargetLocation {...target}></TargetLocation>
        </material>
    )
}
