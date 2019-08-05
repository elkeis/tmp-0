import { ObstacleType } from "../../models";
import * as Interface from '../../reducer/interface';

export interface Location {
    x: number,
    y: number,
    z: number
}

export interface Locations {
    locations: Array<Location>
}

export interface Scale {
    scaleX: number,
    scaleY: number
}

export interface RenderObject extends Location, Scale {};


export interface Obstacle extends RenderObject {
    type: ObstacleType
}

export interface Obstacles {
    obstacles: Array<Obstacle>
}

export interface Route extends Locations {
    start: RenderObject,
    target: RenderObject,
}

export interface RenderObjectFactory extends Interface.Position, Interface.Grid {
    render: React.FC<RenderObject>
}

export interface LocationsFactory extends Interface.Grid, Interface.Path {
    render: React.FC<Locations>
}
