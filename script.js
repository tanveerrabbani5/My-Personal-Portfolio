const text = "Tanveer Rabbani";
const element = document.querySelector(".typing-name");

if (element) {

let index = 0;
let deleting = false;

function animateText() {

if (!deleting) {

element.innerHTML = text.substring(0, index + 1);
index++;

if (index === text.length) {

setTimeout(() => {
deleting = true;
}, 2000);

}

} else {

element.innerHTML = text.substring(0, index - 1);
index--;

if (index === 0) {
deleting = false;
}

}

setTimeout(
animateText,
deleting ? 60 : 120
);

}

animateText();

}

/* SHARE BUTTON */

const shareBtn = document.getElementById("shareBtn");

if (shareBtn) {

shareBtn.addEventListener("click", async () => {

try {

if (navigator.share) {

await navigator.share({
title: "Tanveer Rabbani Portfolio",
url: window.location.href
});

} else {

await navigator.clipboard.writeText(window.location.href);

alert("Portfolio link copied!");

}

} catch (err) {

console.log(err);

}

});

}

/* BACK TO TOP */

const backToTop = document.getElementById("backToTop");

if (backToTop) {

backToTop.addEventListener("click", () => {

window.scrollTo({
top: 0,
behavior: "smooth"
});

});

}

/* Typing Animation For Journey */

const journeyTexts = [

"My DevOps Journey",
"Learning DevOps Everyday",
"Building My Future"

];

const journeyTyping =
document.querySelector(".typing-journey");

let journeyTextIndex = 0;
let journeyCharIndex = 0;
let journeyDeleting = false;

function typeJourney(){

const current =
journeyTexts[journeyTextIndex];

if(!journeyDeleting){

journeyTyping.textContent =
current.substring(0, journeyCharIndex++);

if(journeyCharIndex > current.length){

journeyDeleting = true;

setTimeout(typeJourney, 1500);

return;
}

}
else{

journeyTyping.textContent =
current.substring(0, journeyCharIndex--);

if(journeyCharIndex < 0){

journeyDeleting = false;

journeyTextIndex =
(journeyTextIndex + 1)
%
journeyTexts.length;

}

}

setTimeout(
typeJourney,
journeyDeleting ? 50 : 100
);

}

typeJourney();