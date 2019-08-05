import React from 'react';
import * as Interface from './interface';

export const LocationsFactory:React.FC<Interface.LocationsFactory> = props => {
    const scaleX = 1/props.columnsCount;
    const scaleY = 1/props.rowsCount;
    const locations = props.path.map(position => ({
        x: (position.column + .5) * scaleX * 2  -1,
        y: -((position.row + .5) * scaleY * 2 -1),
        z: 0
    }))
    return <>{
         props.render({locations})
    }</>;
}
