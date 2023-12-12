const container = document.getElementById("container");

async function fetchColors() {
  const response = await fetch("colors.json");
  const json = await response.json();
  displayColors(json.colors);
}

function displayColors(colors, parentKey = "") {
  for (const key in colors) {
    const color = colors[key];
    if (color.type === "color") {
      const colorItem = document.createElement("div");
      colorItem.classList.add("color-item");

      const colorName = document.createElement("span");
      colorName.textContent = parentKey + key;
      colorItem.appendChild(colorName);

      const colorBox = document.createElement("div");
      colorBox.classList.add("color-box");
      colorBox.style.backgroundColor = color.value;
      colorItem.appendChild(colorBox);

      container.appendChild(colorItem);
    } else {
      displayColors(color, key + " > ");
    }
  }
}

fetchColors();