const texts = [

"Contact Me",
"Let's Collaborate",
"Reach Out Anytime",
"Hire Me"

];

const typing =
document.querySelector(".typing-contact");

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeText(){

const current =
texts[textIndex];

if(!deleting){

typing.textContent =
current.substring(0,charIndex++);

if(charIndex > current.length){

deleting = true;

setTimeout(typeText,1500);

return;

}

}

else{

typing.textContent =
current.substring(0,charIndex--);

if(charIndex < 0){

deleting = false;

textIndex =
(textIndex + 1)
%
texts.length;

}

}

setTimeout(
typeText,
deleting ? 50 : 100
);

}

typeText();

const shareBtn =
document.getElementById("shareBtn");

if(shareBtn){

shareBtn.addEventListener("click",async()=>{

if(navigator.share){

await navigator.share({

title:"Tanveer Rabbani Portfolio",

url:window.location.href

});

}else{

navigator.clipboard.writeText(
window.location.href
);

alert("Link Copied");

}

});

}

const backToTop =
document.getElementById("backToTop");

if(backToTop){

backToTop.addEventListener("click",()=>{

window.scrollTo({

top:0,
behavior:"smooth"

});

});

}

