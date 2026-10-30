// ==========================================
// DAY 1: COLOR CHANGER
// ==========================================

const colorButton = document.getElementById("colorButton");

colorButton.addEventListener("click", function () {
    const headings = document.querySelectorAll("h1, h2, h3");

    headings.forEach(function (heading) {
        const randomColor =
            "#" +
            Math.floor(Math.random() * 16777216)
                .toString(16)
                .padStart(6, "0");

        heading.style.color = randomColor;
    });
});


// ==========================================
// DAY 2: DYNAMIC ELEMENT CREATOR
// ==========================================

const addParagraphButton = document.getElementById("addParagraphButton");
const paragraphContainer = document.getElementById("paragraphContainer");

let paragraphCount = 0;

addParagraphButton.addEventListener("click", function () {
    paragraphCount++;

    const paragraph = document.createElement("p");

    paragraph.appendChild(
        document.createTextNode("Paragraph " + paragraphCount + " ")
    );

    const deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        paragraph.remove();
    });

    paragraph.appendChild(deleteButton);

    paragraphContainer.appendChild(paragraph);
});


// ==========================================
// DAY 3: IMAGE REMOVER
// ==========================================

const imageButton = document.getElementById("imageButton");

let imagesHidden = false;

imageButton.addEventListener("click", function () {
    const images = document.querySelectorAll("img");

    imagesHidden = !imagesHidden;

    images.forEach(function (image) {
        image.hidden = imagesHidden;
    });

    imageButton.textContent = imagesHidden
        ? "Show Images"
        : "Hide Images";
});


// ==========================================
// DAY 4: CONTENT COPIER
// ==========================================

const copyButton = document.getElementById("copyButton");
const source = document.getElementById("source");
const target = document.getElementById("target");

copyButton.addEventListener("click", function () {
    target.replaceChildren(
        ...Array.from(source.childNodes, function (node) {
            return node.cloneNode(true);
        })
    );
});


// ==========================================
// DAY 5: DARK MODE TOGGLE
// ==========================================

const darkModeButton = document.getElementById("darkModeButton");

// Check whether a theme was previously saved.
const savedTheme = localStorage.getItem("theme");

// Apply the saved theme when the page loads.
if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
}

// Update the button text.
function updateDarkModeButton() {
    const darkModeEnabled = document.body.classList.contains("dark-mode");

    darkModeButton.textContent = darkModeEnabled
        ? "Enable Light Mode"
        : "Enable Dark Mode";
}

updateDarkModeButton();

// Switch between light mode and dark mode.
darkModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");

    const darkModeEnabled = document.body.classList.contains("dark-mode");

    localStorage.setItem(
        "theme",
        darkModeEnabled ? "dark" : "light"
    );

    updateDarkModeButton();
});