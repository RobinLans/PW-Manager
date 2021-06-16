//PAGES
const newPwPage = document.querySelector("#newPw");
const homePage = document.querySelector("#home");
const passwordPage = document.querySelector("#pw");

//Buttons
const newPasswordBtn = document.querySelector(".addPw");
const backOneBtn = document.querySelector(".one");
const saveBtn = document.querySelector(".save");
const generateRandomPwBtn = document.querySelector(".generate");
const copyBtn = document.querySelector(".copy");

//Inputs
const nameInput = document.querySelector(".name");
const passwordInput = document.querySelector(".password");

//Other
const linkCointainer = document.querySelector(".box");

newPasswordBtn.addEventListener("click", () => {
    document.querySelector(".plus").classList.add("fa-spin");
    toggleExitAnimtation();
    setTimeout(function () {
        homePage.classList.remove("active");
        newPwPage.classList.add("active");
        document.querySelector(".plus").classList.remove("fa-spin");
        toggleExitAnimtation();
    }, 1000);
});

backOneBtn.addEventListener("click", backToHome);

function backToHome() {
    toggleExitAnimtation();
    setTimeout(function () {
        newPwPage.classList.remove("active");
        passwordPage.classList.remove("active");
        homePage.classList.add("active");
        toggleExitAnimtation();
    }, 1000);
}

saveBtn.addEventListener("click", () => {
    const nameTag = document.createElement("a");
    nameTag.classList.add("nav-link");
    nameTag.setAttribute("data-target", "pw");
    nameTag.setAttribute("href", "#");
    nameTag.innerHTML = nameInput.value;

    const line = document.createElement("hr");
    line.setAttribute("color", "#489fb5");

    linkCointainer.appendChild(nameTag);
    linkCointainer.appendChild(line);

    backToHome();
});

linkCointainer.addEventListener("click", (e) => {
    console.log(e.target.innerHTML);
    if (e.target.classList.contains("nav-link")) {
        toggleExitAnimtation();
        setTimeout(function () {
            newPwPage.classList.remove("active");
            homePage.classList.remove("active");
            passwordPage.classList.add("active");
            toggleExitAnimtation();

            const htmlString = `<h1>${e.target.innerHTML}</h1>
            <hr color="#FFA62B" />
            <div class="myPw">
                <div class="value"><p>dsd7d2!diafKA923</p></div>
                <button class="copy"><i class="fas fa-copy"></i></button>
            </div>
            <div class="btnContainer">
                <button class="back two nav-link" data-target="newPw">
                    Back
                </button>
                <button class="delete">Delete</button>`;
            passwordPage.innerHTML = htmlString;
            const backTwoBtn = document.querySelector(".two");
            backTwoBtn.addEventListener("click", backToHome);
        }, 1000);
    }
});

function toggleExitAnimtation() {
    passwordPage.classList.toggle("animate__fadeOutUp");
    homePage.classList.toggle("animate__fadeOutUp");
    newPwPage.classList.toggle("animate__fadeOutUp");
}
