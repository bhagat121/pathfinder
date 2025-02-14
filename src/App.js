import React, { useState } from "react";
import Grid from "./components/Grid";

const createInitialGrid = () => {
  const grid = [];
  for (let row = 0; row < 10; row++) {
    const currentRow = [];
    for (let col = 0; col < 10; col++) {
      currentRow.push({
        row,
        col,
        isTraversed: false,
        isPath: false,
        isStart: false,
        isEnd: false,
        isWall: false,
      });
    }
    grid.push(currentRow);
  }
  return grid;
};

const App = () => {
  const [grid, setGrid] = useState(createInitialGrid());
  const [startTile, setStartTile] = useState(null);
  const [endTile, setEndTile] = useState(null);

  const handleTileClick = (row, col) => {
    const newGrid = [...grid];
    if (!startTile) {
      newGrid[row][col].isStart = true; // Mark the tile as start
      setStartTile({ row, col });
    } else if (!endTile) {
      newGrid[row][col].isEnd = true; // Mark the tile as end
      setEndTile({ row, col });
    }
    setGrid(newGrid);
  };

  const handleRunDFS = async () => {
    if (startTile && endTile) {
      try {
        const response = await fetch("http://localhost:5000/run-dfs", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ grid, startTile, endTile }),
        });

        const { traversedTiles, path } = await response.json();
        visualizePath(traversedTiles, path);
      } catch (error) {
        console.error("Error running DFS:", error);
      }
    }
  };

  const visualizePath = (traversedTiles, path) => {
    let delay = 0;
    traversedTiles.forEach((tile, index) => {
      setTimeout(() => {
        const newGrid = [...grid];
        newGrid[tile.row][tile.col].isTraversed = true;
        setGrid(newGrid);
      }, 20 * index);
    });

    setTimeout(() => {
      path.forEach((tile, index) => {
        setTimeout(() => {
          const newGrid = [...grid];
          newGrid[tile.row][tile.col].isPath = true;
          setGrid(newGrid);
        }, 50 * index);
      });
    }, 20 * traversedTiles.length);
  };

  return (
    <div>
      <h1>DFS Pathfinding Visualization</h1>
      <Grid grid={grid} onTileClick={handleTileClick} />
      <button onClick={handleRunDFS}>Run DFS</button>
    </div>
  );
};

export default App;
