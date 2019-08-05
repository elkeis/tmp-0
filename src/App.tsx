import React, { useReducer, useEffect } from 'react';
import  {Game} from './components/Game';
import './App.scss';
import * as Interface from './reducer/interface';
import {GridActionTypeKeys} from './reducer/interface';
import {Canvas} from '@react-vertex/core';
import {INITIAL_STATE, reducer, createGridAction, createToggleGridControlAction, updatePath} from './reducer';
import { GridControl } from './components/Controls/GridControl/GridControl';
import {Switch} from './components/Controls/Switch/Switch';
import {solve} from './services/solver';


const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const gridClickHandler = (p:Interface.Position) => {
    if (state.gridControlAction ) {
      dispatch(createGridAction(Interface.GridActionTypeKeys.REMOVE_OBSTACLE, p));
      dispatch(createGridAction(state.gridControlAction, p));
    }
  }

  useEffect(() => {
    const path = solve(state);
    dispatch(updatePath(path));
  }, [state]);

  const toggleGridControlAction = (key: Interface.GridActionTypeKeys, isOn) => {
    console.log(`dispatch, ${isOn}, ${createToggleGridControlAction(key)}`);
    if (isOn) {
      dispatch(createToggleGridControlAction(key));
    } else {
      dispatch(createToggleGridControlAction(undefined));
    }
  }

  return (
    <div className="world camera">
      <div className="scene">
        <div className="screen">
          <div className="game-pane">
            <div className="canvas">
              <Canvas width={500} height={500} clearColor={[0,0,0,0.1]}>
                <Game {...state}></Game>
              </Canvas>
            </div>
            <GridControl {...state.grid} width={500} height={500} onClick={p => gridClickHandler(p)}></GridControl>
          </div>

          <div className="controls-pane">
            <div className="with-geometry fill-parent">
              Please fill the game with stuff:

              <Switch
                isOn={state.gridControlAction === GridActionTypeKeys.ADD_BOULDER}
                onToggle={isOn => toggleGridControlAction(GridActionTypeKeys.ADD_BOULDER, isOn)}>
                Boulder
              </Switch>
              <Switch
                isOn={state.gridControlAction === GridActionTypeKeys.ADD_GRAVEL}
                onToggle={isOn => toggleGridControlAction(GridActionTypeKeys.ADD_GRAVEL, isOn)}>
                Gravel
              </Switch>
              <Switch
                isOn={state.gridControlAction === GridActionTypeKeys.ADD_WORMHOLE_ENTRANCE}
                onToggle={isOn => toggleGridControlAction(GridActionTypeKeys.ADD_WORMHOLE_ENTRANCE, isOn)}>
                Wormhole Ent.
              </Switch>
              <Switch
                isOn={state.gridControlAction === GridActionTypeKeys.ADD_WORMHOLE_EXIT}
                onToggle={isOn => toggleGridControlAction(GridActionTypeKeys.ADD_WORMHOLE_EXIT, isOn)}>
                Wormhole Ex.
              </Switch>
              <Switch
                isOn={state.gridControlAction === GridActionTypeKeys.ADD_START_LOCATION}
                onToggle={isOn => toggleGridControlAction(GridActionTypeKeys.ADD_START_LOCATION, isOn)}>
                Start
              </Switch>
              <Switch
                isOn={state.gridControlAction === GridActionTypeKeys.ADD_TARGET_LOCATION}
                onToggle={isOn => toggleGridControlAction(GridActionTypeKeys.ADD_TARGET_LOCATION, isOn)}>
                Target
              </Switch>
              <Switch
                isOn={state.gridControlAction === GridActionTypeKeys.REMOVE_OBSTACLE}
                onToggle={isOn => toggleGridControlAction(GridActionTypeKeys.REMOVE_OBSTACLE, isOn)}>
                Remove
              </Switch>
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
