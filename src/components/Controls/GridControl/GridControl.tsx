import React, {useMemo} from 'react';
import * as Interface from '../../../reducer/types';
import './GridControl.scss';

export const GridControl:React.FC<Interface.GridControl> = props => {
    const clickHandler = (row, column) => {
        props.onClick({row, column});
    }
    return (
        <div className="grid-control" style={{
            width: `${props.width}px`,
            height: `${props.height}px`,
            display: 'grid',
            gridAutoRows: props.height/props.rowsCount,
            gridAutoColumns: props.width/props.columnsCount
        }}>
            {
                useMemo(() => Array(props.rowsCount).fill(0).flatMap((v, i) => {
                    return Array(props.columnsCount).fill(0).map((v, j) => {
                        return <div className="grid-item" onClick={() => clickHandler(i,j)} style={{
                            gridRow: i+1,
                            gridColumn: j+1
                        }}></div>
                    })
                }), [props.rowsCount, props.columnsCount])
            }
        </div>
    )
}
