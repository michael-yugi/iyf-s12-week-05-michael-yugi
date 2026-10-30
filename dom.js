const check = (label, ok) => console.log(`${ok ? "✓" : "✗"} ${label}`);

// ============================================
// STEP 1 — Task 9.1: Select elements
// ============================================

const heading = document.querySelector("h1");
const contents = document.querySelectorAll(".content");
const contactForm = document.getElementById("contact-form");
const emailInput = contactForm.querySelector('input[type="email"]');
const navItems = document.querySelectorAll("nav li");
const firstNavLink = document.querySelector(".nav-link");
const lastArticleParagraph = document.querySelector("article p:last-of-type");
const submitButton = document.querySelector('button[type="submit"]');
const mainHeadings = document.querySelectorAll("main h2");
const footer = document.querySelector("footer");

console.log(heading);
console.log(contents);
console.log(contactForm);
console.log(emailInput);
console.log(navItems);
console.log(firstNavLink);
console.log(lastArticleParagraph);
console.log(submitButton);
console.log(mainHeadings);
console.log(footer);

console.log(document.querySelector(".does-not-exist")); // null

const navTexts = [...navItems].map(item => item.textContent.trim());
console.log(navTexts);

// ============================================
// STEP 2 — Task 9.2: Traverse elements
// ============================================

const header = document.querySelector("header");
const navInsideHeader = header.querySelector("nav");

const parentListItem = firstNavLink.parentElement;

const article = document.querySelector("article");
const nextSection = article.nextElementSibling;

const list = document.querySelector("ul");
const childListItems = list.children;

const bodyFromFooter = footer.closest("body");

const headerFromLink = firstNavLink.closest("header");

console.log(navInsideHeader);
console.log(parentListItem);
console.log(nextSection);
console.log(childListItems);
console.log(bodyFromFooter);
console.log(headerFromLink);

// ============================================
// STEP 3 — Task 9.3: Change elements
// ============================================

// Change the heading
heading.textContent = "Welcome to My Website";

// Update the first navigation link
firstNavLink.href = "https://developer.mozilla.org";
firstNavLink.target = "_blank";
firstNavLink.rel = "noopener";

// Read and update article data attributes
console.log(article.dataset.id);
console.log(article.dataset.category);

article.dataset.status = "reviewed";

// Change classes without using element.style
contents[0].classList.add("highlight");
contents[1].classList.toggle("accent");

// Injection demo
const userInput = `<img src="x" onerror="alert('hacked!')">`;

document.getElementById("unsafe").innerHTML = userInput;
document.getElementById("safe").textContent = userInput;

// Use textContent for a user's comment because it displays
// the input as text instead of interpreting it as HTML.

// ============================================
// STEP 4 — Task 9.4: Create, remove and clone
// ============================================

// Create and append a navigation item
function addNavItem(text, href) {
    const li = document.createElement("li");
    const link = document.createElement("a");

    link.classList.add("nav-link");
    link.href = href;
    link.textContent = text;

    li.appendChild(link);
    document.querySelector(".nav-list").appendChild(li);
}

addNavItem("Blog", "#blog");
addNavItem("Portfolio", "#portfolio");

// Create a paragraph before the article's first paragraph
const newParagraph = document.createElement("p");
newParagraph.textContent = "This paragraph was created using JavaScript.";

article.insertBefore(newParagraph, article.querySelector("p"));

// Clone the first navigation list item
const firstNavItem = document.querySelector(".nav-list li");
const clonedItem = firstNavItem.cloneNode(true);

clonedItem.querySelector("a").textContent = "Cloned";
document.querySelector(".nav-list").prepend(clonedItem);

// Remove the footer
document.querySelector("footer").remove();