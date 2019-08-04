import React from 'react';
import * as Interface from '../../reducer/types';
import './ControlGrid.scss';

export const ControlGrid:React.FC<Interface.GridControl> = props => {
    const clickHandler = (row, column) => {
        console.log(`clicked on ${row}, ${column}`);
        props.onClick({row, column});
    }
    return (
        <div className="grid-container">
            {
                Array(props.rowsCount).fill(0).flatMap((v, i) => {
                    return Array(props.columnsCount).fill(0).map((v, j) => {
                        return <div className="grid-item" onClick={() => clickHandler(i,j)} style={{
                            gridRow: i+1,
                            gridColumn: j+1
                        }}></div>
                    })
                })
            }
        </div>
    )
}
