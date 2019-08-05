import React from 'react';
import * as Interface from './interface';

export const RenderObjectFactory:React.FC<Interface.RenderObjectFactory> = props => {
    const scaleX = 1/props.columnsCount;
    const scaleY = 1/props.rowsCount;
    return <>{
         props.render({
            x: (props.column + .5) * scaleX * 2  -1,
            y: -((props.row + .5) * scaleY * 2 -1),
            z: 0.005, // layering
            scaleX,
            scaleY
        })
    }</>;
}
