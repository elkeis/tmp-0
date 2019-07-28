import React, {useState} from 'react';
import './App.scss';

const App: React.FC = () => {
  // const [gridState, setGridState] = useState({
  //   rowCount: 10,
  //   columnCount: 10,
  //   obstacles: [{
  //     location: {
  //       row: 4,
  //       column: 3
  //     },
  //     type: ObstacleType.BOULDER
  //   }]
  // });

  // const w: any = window;
  // w.THREE = _THREE;

  return (
    <div className="world camera
    with-geometry fill-parent
    with-structure no-overflow
    with-material night">

      <div className="
      with-geometry fill-parent
      with-structure zero-gravity
      with-effect view-angle">

        <div className="
        with-geometry box-500x700
        with-structure shelf _cosmic
        with-material sunset
        with-effect light comics-outline">

          <div className="
          with-geometry fill-parent
          with-structure padded-box
          with-material glass
          with-effect comics-outline flying">
            Here will be the game
          </div>

          <div className="
          with-structure stack
          with-material glass
          with-effect comics-outline flying-slightly">

            <div className="
            with-geometry fill-parent">
              Hi this is controls for the game
            </div>

            <div className="
              with-structure shelf
            ">

              <button className="button _cancel
              with-material glass
              with-effect comics-outline"></button>

              <button className="button _ok
              with-material glass _green
              with-effect comics-outline"></button>
            </div>
          </div>


        </div>
      </div>
    </div>
  );
}

export default App;
