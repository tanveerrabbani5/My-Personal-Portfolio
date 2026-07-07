let allRepos = [];
let currentPage = 1;
const reposPerPage = 9;

const githubUser = "tanveerrabbani5";


async function loadRepos() {

const response =
await fetch(
`https://api.github.com/users/${githubUser}/repos?sort=updated`
);

const repos = await response.json();

document.getElementById("repoCount")
.innerHTML =
`${repos.length} repositories from GitHub`;

allRepos = repos;

renderRepos(repos);

}

loadRepos();

const texts = [

"Projects & Crafts",
"Cloud & DevOps Projects",
"Infrastructure & Automation",
"Repositories From GitHub"

];

const typing =
document.querySelector(".typing-projects");

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

document
.getElementById("searchInput")
.addEventListener("input",e=>{

const search =
e.target.value.toLowerCase();

document
.querySelectorAll(".repo-card")
.forEach(card=>{

card.style.display =
card.innerText
.toLowerCase()
.includes(search)
?
"block"
:
"none";

});

});

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

/* repository rendering */

function renderRepos(repositories) {

    allRepos = repositories;

    const start =
        (currentPage - 1) * reposPerPage;

    const end =
        start + reposPerPage;

    const paginatedRepos =
        repositories.slice(start, end);

    const repoGrid =
        document.getElementById("repoGrid");

    repoGrid.innerHTML = "";

    paginatedRepos.forEach((repo, index) => {

        repoGrid.innerHTML += `

        <div class="repo-card">

            <div class="repo-number">
                ${start + index + 1}
            </div>

            <h3>${repo.name}</h3>

            <p>
            ${repo.description || "No description available"}
            </p>

            <span class="repo-language">
            ${repo.language || "Code"}
            </span>

            <div class="repo-buttons">

                <a href="${repo.html_url}"
                target="_blank"
                class="source-btn">

                <i class="fab fa-github"></i>
                Source Code

                </a>

            </div>

        </div>

        `;
    });

    createPagination(repositories.length);
}


/* pagination */

function createPagination(totalRepos){

    const pageCount =
        Math.ceil(totalRepos / reposPerPage);

    const pagination =
        document.getElementById("pagination");

    pagination.innerHTML = "";

    if(pageCount <= 1) return;

    if(currentPage > 1){

        pagination.innerHTML +=
        `
        <button onclick="changePage(${currentPage-1})">
        <-
        </button>
        `;
    }

    for(let i=1;i<=pageCount;i++){

        pagination.innerHTML +=
        `
        <button
        class="${i===currentPage ? 'active-page':''}"
        onclick="changePage(${i})">

        ${i}

        </button>
        `;
    }

    if(currentPage < pageCount){

        pagination.innerHTML +=
        `
        <button onclick="changePage(${currentPage+1})">
        ->
        </button>
        `;
    }
}

/* page function */

function changePage(page){

    currentPage = page;

    renderRepos(allRepos);

    window.scrollTo({
        top:0,
        behavior:"smooth"
    });
}