const container = document.getElementById("container");

async function fetchColors() {
  const response = await fetch("colors.json");
  const json = await response.json();
  displayColors(json.colors);
}

function displayColors(colors) {
  for (const key in colors) {
    const color = colors[key];
    if (color.type === "color") {
      const colorBox = document.createElement("div");
      colorBox.classList.add("color-box");
      colorBox.style.backgroundColor = color.value;
      container.appendChild(colorBox);
    } else {
      displayColors(color);
    }
  }
}

fetchColors();