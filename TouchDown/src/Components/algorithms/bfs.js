export function bfs(grid,startNode,finishNode,diagonalallowed){
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const queue = [startNode];
  while (!!queue.length){
    const closestNode = queue.shift();
    if (closestNode.isWall) continue ;
    if (closestNode.distance === Infinity) return visitedNodesInOrder;
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode === finishNode) return visitedNodesInOrder;
    const unvisitedNeighbors = getUnvisitedNeighbors(closestNode, grid,diagonalallowed);
    for (const neighbor of unvisitedNeighbors){
      neighbor.previousNode = closestNode;
      neighbor.isVisited = true;
      neighbor.distance = closestNode.distance + 1;
      queue.push(neighbor);
    }

  }
}
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node, grid,diagonalallowed) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  if (diagonalallowed){
    if (row > 0 && col > 0) neighbors.push(grid[row-1][col-1]);
    if (row > 0 && col < grid[0].length - 1) neighbors.push(grid[row-1][col+1]);
    if (row <  grid.length - 1 && col > 0 ) neighbors.push(grid[row+1][col-1]);
    if (row <  grid.length - 1 && col < grid[0].length - 1) neighbors.push(grid[row+1][col+1]);
    
  }
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid) {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}

