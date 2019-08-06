import React, { useEffect } from 'react';

import {
    useInvertedMatrix,
    usePerspectiveMatrix,
} from '@react-vertex/math-hooks';

import {useRender} from '@react-vertex/core';
import Grid from './Grid';

import * as StateType from '../../reducer/interface';
import {useBasicSolid } from '@react-vertex/material-hooks';
import { RenderObjectFactory } from './RenderObjectFactory';
import { Obstacle } from './Obstacle';
import { LocationsFactory } from './LocationsFactory';
import { Path } from './Route/Path';
import { StartingLocation } from './Route/StartingLocation';
import { TargetLocation } from './Route/TargetLocation';

export const Game: React.FC<StateType.State> = props => {
    const view = useInvertedMatrix(0, 0, 5.15);
    const projection = usePerspectiveMatrix(22, 1, 1, 1000);
    const renderScene = useRender();

    const pathColor = useBasicSolid([.8,1,1]);

    useEffect(() => {
        renderScene();
    });

    return (<camera view={view} projection={projection}>
        {
            props.obstacles.map((o, i) => (
            <RenderObjectFactory key={i} {...o} {...props.grid} render={renderObject => (
                <Obstacle {...renderObject} type={o.type}></Obstacle>
            )} ></RenderObjectFactory>))
        }

        <material program={pathColor}>
            <LocationsFactory {...props.route} {...props.grid} render={locationsObject => (
                <Path {...locationsObject}></Path>
            )}></LocationsFactory>

            {
                props.route.start ? <RenderObjectFactory {...props.route.start} {...props.grid} render={renderObject => (
                    <StartingLocation {...renderObject}></StartingLocation>
                )}></RenderObjectFactory> : null
            }
            {
                props.route.target ? <RenderObjectFactory {...props.route.target} {...props.grid} render={renderObject => (
                    <TargetLocation {...renderObject}></TargetLocation>
                )}></RenderObjectFactory> : null
            }

        </material>

        <Grid {...props.grid}></Grid>
    </camera>);
}
