import React from "react";

const Tile = ({ tile, onClick }) => {
  const getTileStyle = () => {
    if (tile.isStart) return { backgroundColor: "green" };       // Start tile
    if (tile.isEnd) return { backgroundColor: "red" };           // End tile
    if (tile.isPath) return { backgroundColor: "yellow" };       // Path tile
    if (tile.isTraversed) return { backgroundColor: "lightblue" };  // Traversed tile
    if (tile.isWall) return { backgroundColor: "black" };        // Wall tile
    return { backgroundColor: "white" };                         // Default tile
  };

  return (
    <div
      onClick={onClick}
      style={{
        width: 30,
        height: 30,
        border: "1px solid black",
        ...getTileStyle(),
      }}
    />
  );
};

export default Tile;
