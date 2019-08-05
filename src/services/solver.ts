import * as Interface from '../reducer/interface';
import {ObstacleType} from '../models/ObstacleType';



const buildPath = (targetNode, path = []) => {
    path.unshift(targetNode.position);
    if (targetNode.previousNode) {
        return buildPath(targetNode.previousNode, path);
    } else {
        return path;
    }
}


export const solve = (
    state: Interface.State,
) => {
    const start = state.route.start;
    const target = state.route.target;
    const obstacles = state.obstacles;
    const grid = state.grid;
    const nodes:Array<Array<Node>> = Array(state.grid.rowsCount).fill(0).map(v =>
                                        Array(state.grid.columnsCount).fill(undefined));
    const startNode = {
        position: start,
        minimalDistance: 0,
        previousNode: undefined,
        siblings: []
    }
    const targetNode = {
        position: target,
        minimalDistance: Infinity,
        previousNode: undefined,
        siblings: []
    }

    nodes[start.row][start.column] = startNode;
    nodes[target.row][target.column] = targetNode;

    const containsObstacle = (position: Interface.Position, obstacleType: ObstacleType) => {
        return obstacles.some(o => {
            return o.type === obstacleType
                && o.row === position.row
                && o.column === position.column;
        });
    }

    const isValidPosition = (
        position: Interface.Position,
    ) => {
        return !(
            position.column < 0
            || position.row < 0
            || position.column >= grid.columnsCount
            || position.row >= grid.rowsCount
            || containsObstacle(position, ObstacleType.BOULDER)
        );
    }

    const isWormholeEntrance = (node: Node) => {
        return containsObstacle(node.position, ObstacleType.WORMHOLE_ENTRANCE);
    }

    const addSiblings = (node: Node) => {
        const possiblePositions = [
            {row: node.position.row+1, column: node.position.column },
            {row: node.position.row, column: node.position.column+1 },
            {row: node.position.row-1, column: node.position.column },
            {row: node.position.row, column: node.position.column-1 },
        ].filter(p => isValidPosition(p));

        if (isWormholeEntrance(node)) {
            const wormholeExits = obstacles.filter(o => o.type === ObstacleType.WORMHOLE_EXIT);
            possiblePositions.push(...wormholeExits);
        }

        possiblePositions.forEach(p => {
            let siblingNode:Node = nodes[p.row][p.column];
            if (!siblingNode) {
                siblingNode = {
                    position: p,
                    minimalDistance: Infinity,
                    previousNode: undefined,
                    siblings: []
                }
                nodes[p.row][p.column] = siblingNode;
            }
            node.siblings.push(siblingNode);
        })
    }

    const getDistanceIncrease = (node:Node) => {
        return containsObstacle(node.position, ObstacleType.GRAVEL) ? 2 : 1;
    }

    const solveRecursively = (currentNode:Node, targetNode: Node) => {
        if (currentNode.minimalDistance > targetNode.minimalDistance) {
            return;
        } else if (currentNode === targetNode) {
            return;
        } else if (currentNode.siblings.length === 0) {
            addSiblings(currentNode);
        }
        const distanceIncrement = getDistanceIncrease(currentNode);
        currentNode.siblings.forEach(s => {
            if (s.minimalDistance > currentNode.minimalDistance + distanceIncrement) {
                s.minimalDistance = currentNode.minimalDistance + distanceIncrement
                s.previousNode = currentNode;
                solveRecursively(s, targetNode);
            }
        });
    }

    solveRecursively(startNode, targetNode);
    return buildPath(targetNode);
}


interface Node {
    position: Interface.Position,
    minimalDistance: number,
    previousNode: Node,
    siblings: Array<Node>,
}
