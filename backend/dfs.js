const isEqual = (tile1, tile2) =>
  tile1.row === tile2.row && tile1.col === tile2.col;

const getUntraversedNeighbors = (grid, tile) => {
  const neighbors = [];
  const directions = [
    { row: -1, col: 0 }, // moving up
    { row: 1, col: 0 }, // moving down
    { row: 0, col: -1 }, // movinf left
    { row: 0, col: 1 }, // moving right
  ];

  directions.forEach(({ row, col }) => {
    const newRow = tile.row + row;
    const newCol = tile.col + col;
    if (
      grid[newRow] &&
      grid[newRow][newCol] &&
      !grid[newRow][newCol].isTraversed &&
      !grid[newRow][newCol].isWall
    ) {
      neighbors.push(grid[newRow][newCol]);
    }
  });

  return neighbors;
};

const dfs = (grid, startTile, endTile) => {
  // traversedTiles keeps track of all the tiles that have been visited
  const traversedTiles = [];
  const base = grid[startTile.row][startTile.col];
  base.distance = 0; // starting at distance 0
  const untraversedTiles = [base]; //acts as a stack

  // this loop will be continued until the stack is empty or end id found
  while (untraversedTiles.length > 0) {
    const currentTile = untraversedTiles.pop(); // last tile in the stack
    if (currentTile.isWall) continue; // if wall has infinite distance its skipped
    if (currentTile.distance === Infinity) break;
    currentTile.isTraversed = true;
    traversedTiles.push(currentTile); // adding the traversed tile in the traversed Tiles

    if (isEqual(currentTile, endTile)) break; // if its the end line loop breaks

    // funvtion to find all the valid neighbours and then it will be pushed to the stack
    const neighbors = getUntraversedNeighbors(grid, currentTile);
    neighbors.forEach((neighbor) => {
      if (!neighbor.parent) {
        neighbor.distance = currentTile.distance + 1;
        neighbor.parent = currentTile;
        untraversedTiles.push(neighbor);
      }
    });
  }

  // this block will used for the acktracking in reverse starting from end line

  const path = [];
  let current = grid[endTile.row][endTile.col];
  while (current) {
    path.unshift(current);
    current = current.parent;
  }

  return { traversedTiles, path };
};

module.exports = dfs;
