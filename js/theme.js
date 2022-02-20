const root = document.querySelector(":root");
const changeTheme = document.querySelector("header button");
const changeThemeBtnImg = document.querySelector("header button img");

const bgDark = "#202d36";
const bgCardDark = "#2b3743";
const bgFontColorDark = "white";

const bgDay = "whitesmoke";
const bgCardDay = "white";
const bgFontColorDay = "black";

let mode = "day";

changeTheme.onclick = () => {
  if (mode == "day") {
    root.style.setProperty("--bg-color", bgDark);
    root.style.setProperty("--bg-card-color", bgCardDark);
    root.style.setProperty("--font-color", bgFontColorDark);
    changeTheme.innerHTML = `
        <img src="./images/sun.svg" alt="light-mode" />Light Mode`;
    mode = "night";
  } else {
    root.style.setProperty("--bg-color", bgDay);
    root.style.setProperty("--bg-card-color", bgCardDay);
    root.style.setProperty("--font-color", bgFontColorDay);
    changeTheme.innerHTML = `<img src="./images/moon.svg" alt="dark-mode" />Dark Mode`;
    mode = "day";
  }
};
