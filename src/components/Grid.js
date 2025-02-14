import React from "react";
import Tile from "./Tile";

const Grid = ({ grid, onTileClick }) => {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(10, 30px)` }}>
      {grid.map((row, rowIndex) =>
        row.map((tile, colIndex) => (
          <Tile key={`${rowIndex}-${colIndex}`} tile={tile} onClick={() => onTileClick(rowIndex, colIndex)} />
        ))
      )}
    </div>
  );
};

export default Grid;
