import React from 'react';
import {useBasicSolid } from '@react-vertex/material-hooks';
import {LocationRenderingProperties, TargetLocation} from './TargetLocation';
import { StartingLocation } from './StartingLocation';
import { Path, Location } from './Path';


export type RouteRenderingProperties = {
    start: LocationRenderingProperties
    target: LocationRenderingProperties,
    path: Array<Location>
}

export const Route: React.FC<RouteRenderingProperties> = ({
    start,
    target,
    path
}) => {
    const white = useBasicSolid([1,1,1]);
    return (
        <material program={white}>
            <Path locations={path}></Path>
            <TargetLocation {...target}></TargetLocation>
            <StartingLocation {...start}></StartingLocation>
        </material>
    )
}
