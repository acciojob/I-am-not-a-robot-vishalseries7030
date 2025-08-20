//your code here
const imageClasses = ["img1", "img2", "img3", "img4", "img5"];
let allImages = [];
const imagesDiv = document.getElementById("images");
const resetBtn = document.getElementById("reset");
const verifyBtn = document.getElementById("verify");
const message = document.getElementById("para");
const heading = document.getElementById("h");

let selected = [];

function init() {
  // reset state
  imagesDiv.innerHTML = "";
  message.textContent = "";
  resetBtn.style.display = "none";
  verifyBtn.style.display = "none";
  selected = [];

  // pick random duplicate
  const duplicate = imageClasses[Math.floor(Math.random() * imageClasses.length)];
  allImages = [...imageClasses, duplicate];

  // shuffle
  allImages.sort(() => Math.random() - 0.5);

  // render images
  allImages.forEach((cls, index) => {
    const img = document.createElement("img");
    img.classList.add(cls);
    img.dataset.class = cls;
    img.addEventListener("click", () => handleImageClick(img));
    imagesDiv.appendChild(img);
  });
}

function handleImageClick(img) {
  if (selected.length === 2 || img.classList.contains("selected")) return;

  img.classList.add("selected");
  selected.push(img);

  resetBtn.style.display = "inline-block";

  if (selected.length === 2) {
    verifyBtn.style.display = "inline-block";
  }
}

resetBtn.addEventListener("click", () => {
  init();
});

verifyBtn.addEventListener("click", () => {
  if (selected.length !== 2) return;

  if (selected[0].dataset.class === selected[1].dataset.class) {
    message.textContent = "You are a human. Congratulations!";
  } else {
    message.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
  }

  verifyBtn.style.display = "none";
});

// initialize on page load
init();
 