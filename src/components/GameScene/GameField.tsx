import React from 'react';
export type GameFieldProperties = {
    field: {
        columnsCount: number,
        rowsCount: number,
    }

    obstacles: {
        boulders: Array<any>
    }
}



const GameField:React.FC<GameFieldProperties> = () =>  {
    return (<group>

    </group>);
}


export default GameField;
