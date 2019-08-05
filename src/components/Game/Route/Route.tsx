import React from 'react';
import {useBasicSolid } from '@react-vertex/material-hooks';
import {TargetLocation} from './TargetLocation';
import { StartingLocation } from './StartingLocation';
import { Path} from './Path';
import * as Type from '../interface';

export const Route: React.FC<Type.Route> = props => {
    const white = useBasicSolid([.8,1,1]);
    return (
        <material program={white}>
            <Path locations={props.locations}></Path>
            <TargetLocation {...props.target}></TargetLocation>
            <StartingLocation {...props.start}></StartingLocation>
        </material>
    )
}
