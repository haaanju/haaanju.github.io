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
      colorName.textContent = key;
      colorItem.appendChild(colorName);

      const colorBox = document.createElement("div");
      colorBox.classList.add("color-box");
      colorBox.style.backgroundColor = color.value;
      colorItem.appendChild(colorBox);

      const sectionId = parentKey.replace(/[^a-zA-Z0-9]/g, "-");
      let section = document.getElementById(sectionId);
      if (!section) {
        section = document.createElement("div");
        section.id = sectionId;
        section.classList.add("section");

        const sectionTitle = document.createElement("h2");
        sectionTitle.classList.add("section-title");
        sectionTitle.textContent = parentKey;
        section.appendChild(sectionTitle);

        container.appendChild(section);
      }
      section.appendChild(colorItem);
    } else {
      displayColors(color, parentKey + key + " > ");
    }
  }
}

fetchColors();