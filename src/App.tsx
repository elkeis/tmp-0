import React, {useState, useEffect} from 'react';
import GameScene, { GameSceneState, ObstacleProperties } from './components/GameScene/GameScene';
import './App.scss';
import {Canvas} from '@react-vertex/core';
import { ObstacleType } from './reducer/models/ObstacleType';

const App: React.FC = () => {
  const obstacles:Array<ObstacleProperties> = [
    {row: 1, column: 0, type: ObstacleType.BOULDER},
    {row: 2, column: 3, type: ObstacleType.BOULDER},
    {row: 5, column: 6, type: ObstacleType.BOULDER},
    {row: 5, column: 5, type: ObstacleType.BOULDER},
    {row: 7, column: 4, type: ObstacleType.BOULDER},
    {row: 9, column: 1, type: ObstacleType.BOULDER},
  ];
  const [s, ss] = useState<GameSceneState>({
    gridProperties: {
      columnsCount: 10,
      rowsCount: 10,
      color: [1,1,1]
    },
    obstacles
  });

  useEffect(() => {
    setInterval(() => {
      ss({
        gridProperties: {
          columnsCount: 10,
          rowsCount: 10,
          color: [1,1,1]
        },
        obstacles: [...obstacles]
      });
    },100);
  }, []);

  return (
    <div className="world camera">
      <div className="scene">
        <div className="screen">
          <div className="game-pane">
            <Canvas width={400} height={400} clearColor={[0,0,0,0.1]}>
              <GameScene {...s}></GameScene>
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
