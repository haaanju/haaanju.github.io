const container = document.getElementById("container");

// 외부 JSON 파일에서 데이터를 가져옵니다.
async function fetchColors() {
  const response = await fetch("colors.json");
  const json = await response.json();
  displayColors(json.colors);
}

function toTitleCase(str) {
  return str
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

// colorGroup 내에서 하위 애이템이 있는지 확인합니다.
function hasColorItems(colorGroup) {
  return Object.values(colorGroup).some(item => {
    return item.type === "color" || hasColorItems(item);
  });
}

// JSON 데이터의 컬러 값을 화면에 표시합니다.
function displayColors(colorGroup, groupName = "") {
  // 섹션에 하위 아이템이 없으면 숨김
  if (!hasColorItems(colorGroup)) {
    return;
  }

  const sectionId = groupName.replace(/[^a-zA-Z0-9]/g, "-");
  let section = document.getElementById(sectionId);

  // 섹션 생성
  if (!section) {
    section = document.createElement("div");
    section.id = sectionId;
    section.classList.add("section");

    const sectionTitle = document.createElement("h2");
    sectionTitle.classList.add("section-title");
    sectionTitle.textContent = toTitleCase(groupName);
    section.appendChild(sectionTitle);

    container.appendChild(section);
  }

  // 섹션에 컬러 아이템을 채웁니다.
  for (const key in colorGroup) {
    const color = colorGroup[key];
    if (color.type === "color") {
      const colorItem = document.createElement("div");
      colorItem.classList.add("color-item");

      const colorName = document.createElement("span");
      colorName.textContent = key.charAt(0).toUpperCase() + key.slice(1);
      colorItem.appendChild(colorName);

      const colorBox = document.createElement("div");
      colorBox.classList.add("color-box");
      colorBox.style.backgroundColor = color.value;
      colorItem.appendChild(colorBox);

      const colorHex = document.createElement("span");
      colorHex.textContent = String(color.value);
      colorItem.appendChild(colorHex);

      section.appendChild(colorItem);
    } else {
      displayColors(color, groupName ? groupName + " / " + key : key);
    }
  }
}

fetchColors();