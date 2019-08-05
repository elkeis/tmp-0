import { ObstacleType } from "../../models";

export interface Location {
    x: number,
    y: number,
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
