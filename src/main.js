import "./style.css";
import randomColor from "randomcolor";

// const randomColor = require("randomcolor"); // import the script
// const color = randomColor();

// console.log(document.querySelector("#gridColumn"));
// console.log(document.querySelector("#gridRow"));
// console.log(document.querySelector("#gridColors"));

const numberOfColumnsAndRows = [];
numberOfColumnsAndRows.length = 0;
const staticGrid = document.querySelector("section:nth-child(2)");
const gridPlayground = document.querySelector("section:nth-child(3)");

document.querySelector("form").onsubmit = function (e) {
  e.preventDefault();

  numberOfColumnsAndRows.push({
    columns: document.querySelector("#gridColumn").value,
    rows: document.querySelector("#gridRow").value,
    colors: document.querySelector("#gridColors").value,
  });

  // console.log(numberOfColumnsAndRows);
  const columnsNumber = numberOfColumnsAndRows[0].columns;
  const rowsNumber = numberOfColumnsAndRows[0].rows;
  const colorNumber = numberOfColumnsAndRows[0].colors;
  // console.log(columnsNumber);
  // console.log(rowsNumber);
  // console.log(colorNumber);
  const colorsArray = [];
  colorsArray.length = 0;
  // push  chosen number of colors in Array
  for (let i = 0; i < colorNumber; i++) {
    colorsArray.push(randomColor());
  }

  // console.log(colorsArray);

  const gridColors = [];
  gridColors.length = 0;
  for (let i = 0; i < columnsNumber * rowsNumber; i++) {
    // push randomly colors from our palette Array into the gird in new array
    gridColors.push(
      colorsArray[Math.floor(Math.random() * colorsArray.length)]
    );
    gridPlayground.innerHTML += `<div style="background-color:${
      gridColors[gridColors.length - 1]
    };"></div>`;
  }
  // console.log(gridColors);
  // count static grid colors from gridColors array
  const staticGridColors = gridColors.reduce(
    (acc, color) => (acc[color] = (acc[color] || 0) + 1) && acc,
    {}
  );
  // console.log(staticGridColors);
  // console.log(colorsArray);

  // static section >> compare staticGridColors and colorsArray( our palette color array)
  for (let j = 0; j < colorsArray.length; j++) {
    const colorCount = staticGridColors[colorsArray[j]]
      ? staticGridColors[colorsArray[j]]
      : 0;
    staticGrid.innerHTML += `
      <div style="background-color:${colorsArray[j]}"></div>
      <p>${colorCount} times</p>`;
  }
  // playground grid styling
  gridPlayground.style.display = "grid";
  gridPlayground.style.gridTemplateColumns = `repeat(${columnsNumber}, 1fr)`;
  gridPlayground.style.gridTemplateRows = `repeat(${rowsNumber}, 1fr)`;
  gridPlayground.style.gap = "1rem";
  gridPlayground.style.padding = "1rem";

  // static grid styling
  staticGrid.style.display = "grid";
  staticGrid.style.gap = "1rem";
  staticGrid.style.justifyContent = "center";
  staticGrid.style.padding = "1rem";
  staticGrid.style.gridTemplateColumns = "1fr 1fr";
};
