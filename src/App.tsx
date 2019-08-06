import React, { useReducer } from 'react';
import  {Game} from './components/Game';
import './App.scss';
import * as Interface from './reducer/interface';
import {GridActionTypeKeys} from './reducer/interface';
import {Canvas} from '@react-vertex/core';
import {INITIAL_STATE, reducer, createGridAction, toggleGridControlAction, updatePath, clearAll, setSolved} from './reducer';
import { GridControl } from './components/Controls/GridControl/GridControl';
import {Switch} from './components/Controls/Switch/Switch';
import {solve} from './services/solver';


const GRID_EDITOR_NAMES = {
  [GridActionTypeKeys.ADD_BOULDER]: 'Boulder',
  [GridActionTypeKeys.ADD_GRAVEL]: 'Gravel',
  [GridActionTypeKeys.ADD_START_LOCATION]: 'Start',
  [GridActionTypeKeys.ADD_TARGET_LOCATION]: 'Target',
  [GridActionTypeKeys.ADD_WORMHOLE_ENTRANCE]: 'Wormhole Ent.',
  [GridActionTypeKeys.ADD_WORMHOLE_EXIT]: 'Wormhole Exit',
  [GridActionTypeKeys.REMOVE_OBSTACLE]: 'Clear'
}

const App: React.FC = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);

  const gridClickHandler = (p:Interface.Position) => {
    if (state.gridControlAction ) {
      dispatch(createGridAction(Interface.GridActionTypeKeys.REMOVE_OBSTACLE, p));
      dispatch(createGridAction(state.gridControlAction, p));
    }
  }

  const toggleGridAction = (key: Interface.GridActionTypeKeys, isOn) => {
    if (isOn) {
      dispatch(toggleGridControlAction(key));
    } else {
      dispatch(toggleGridControlAction(undefined));
    }
  }

  const clear = () => {
    dispatch(clearAll());
  }

  const buildRoute = () => {
    const grid = state.grid;
    const obstacles = state.obstacles;
    const start = state.route.start;
    const target = state.route.target;
    const path = solve(grid, obstacles, start, target);
    dispatch(updatePath(path));
    dispatch(setSolved(true));
  }

  const isSolvable = () => {
    return !!(state.route.start && state.route.target);
  }

  const isRouteNotFound = () => {
    return !!(state.solved && state.route.path.length === 0);
  }

  return (
    <div className="world camera">
      <div className="scene">
        <div className="screen">
          <div className="game-pane">
            <div className={['not-found ', isRouteNotFound() ? 'show' : 'hide'].join(' ')}>route was not found</div>
            <div className="canvas">
              <Canvas width={500} height={500} clearColor={[0,0,0,0.1]}>
                <Game {...state}></Game>
              </Canvas>
            </div>
            <GridControl disabled={state.solved} {...state.grid} width={500} height={500} onClick={p => gridClickHandler(p)}></GridControl>
          </div>

          <div className="controls-pane">
            <div className="with-geometry fill-parent">
              Please fill the field using:
              {
                Object.values(GridActionTypeKeys).map(key => (
                  <Switch
                    disabled={state.solved}
                    isOn={state.gridControlAction === key}
                    onToggle={isOn => toggleGridAction(key, isOn)}>
                    { GRID_EDITOR_NAMES[key] }
                  </Switch>
                ))
              }
            </div>

            <div className="with-structure shelf">
              <button className="button" onClick={() => clear()}>clear</button>
              <button disabled={!isSolvable() || state.solved } className="button" onClick={() => buildRoute()}>solve</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
