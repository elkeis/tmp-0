import * as Interface from '../reducer/interface';
import {ObstacleType} from '../models/ObstacleType';



const buildPath = (targetNode, path = []) => {
    if (targetNode.previousNode) {
        path.unshift(targetNode.position);
        return buildPath(targetNode.previousNode, path);
    } else if (path.length > 0) {
        path.unshift(targetNode.position);
    }
    return path;
}


export const solve = (
    grid: Interface.Grid,
    obstacles: Array<Interface.Obstacle>,
    start: Interface.Position,
    target: Interface.Position
) => {
    const nodes:Array<Array<Node>> = Array(grid.rowsCount).fill(0).map(v =>
                                        Array(grid.columnsCount).fill(undefined));
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


    const nodeDistanceMap: Array<Array<Node>> = Array(grid.columnsCount * grid.rowsCount);

    const popNext = () => {
        const firstEntry = nodeDistanceMap.find(v => v && v.length > 0);
        if (firstEntry) {
            return firstEntry.pop();
        }
    }

    const put = (distance: number, node: Node) => {
        const array = nodeDistanceMap[distance];
        if (array) {
            array.push(node);
        } else {
            nodeDistanceMap[distance] = [node];
        }
    }

    const solveRecursively = (currentNode:Node, targetNode: Node) => {
        if (currentNode === targetNode) {
            return;
        } else if (currentNode.siblings.length === 0) {
            addSiblings(currentNode);
        }
        const distanceIncrement = getDistanceIncrease(currentNode);
        currentNode.siblings.forEach(s => {
            const nextDistance = currentNode.minimalDistance + distanceIncrement;
            if (s.minimalDistance > nextDistance && nextDistance < targetNode.minimalDistance) {
                s.minimalDistance = nextDistance;
                s.previousNode = currentNode;
                put(s.minimalDistance, s);
            }
        });
        const next = popNext();
        if (next) {
            solveRecursively(next, targetNode);
        }
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
