import React, { useReducer } from 'react';
import  {Game} from './components/Game';
import './App.scss';
import * as Interface from './reducer/types';
import {Canvas} from '@react-vertex/core';
import {INITIAL_STATE, reducer, addBoulder, removeObstacle} from './reducer';
import { GridControl } from './components/Controls/GridControl/GridControl';


const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const gridClickHandler = (p:Interface.Position) => {
    console.log(`add boulder at ${p.row} ${p.column}`);
    dispatch(removeObstacle(p));
    dispatch(addBoulder(p));
  }
  return (
    <div className="world camera">
      <div className="scene">
        <div className="screen">
          <div className="game-pane">
            <div className="canvas">
              <Canvas width={400} height={400} clearColor={[0,0,0,0.1]}>
                <Game {...state}></Game>
              </Canvas>
            </div>
            <GridControl {...state.grid} width={400} height={400} onClick={p => gridClickHandler(p)}></GridControl>
          </div>

          <div className="controls-pane">
            <div className="with-geometry fill-parent">
              Hi this is controls for the game
            </div>

            <div className="with-structure shelf">
              <button className="button _cancel"></button>
              <button className="button _ok"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
