import React from 'react';
import  {Game} from './components/Game';
import './App.scss';
import {Canvas} from '@react-vertex/core';
import {INITIAL_STATE} from './reducer';


const App: React.FC = () => {

  return (
    <div className="world camera">
      <div className="scene">
        <div className="screen">
          <div className="game-pane">
            <Canvas width={400} height={400} clearColor={[0,0,0,0.1]}>
              <Game {...INITIAL_STATE.game}></Game>
            </Canvas>
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
