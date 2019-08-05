import React, {useMemo} from 'react';
import * as Interface from '../../../reducer/types';
import './GridControl.scss';

export const GridControl:React.FC<Interface.GridControl> = ({
    rowsCount,
    columnsCount,
    width,
    height,
    onClick
}) => {
    return (
        <div className="grid-control" style={{
            width: `${width}px`,
            height: `${height}px`,
            display: 'grid',
            gridAutoRows: height/rowsCount,
            gridAutoColumns: width/columnsCount
        }}>
            {
                useMemo(() => Array(rowsCount).fill(0).flatMap((v, i) => {
                    return Array(columnsCount).fill(0).map((v, j) => {
                        return <div className="grid-item" onClick={() => onClick({row: i, column: j})} style={{
                            gridRow: i+1,
                            gridColumn: j+1
                        }}></div>
                    })
                }), [rowsCount, columnsCount, onClick])
            }
        </div>
    )
}
