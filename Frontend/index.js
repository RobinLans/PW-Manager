//PAGES
const newPwPage = document.querySelector("#newPw");
const homePage = document.querySelector("#home");
const passwordPage = document.querySelector("#pw");

//Buttons
const newPasswordBtn = document.querySelector(".addPw");
const backOneBtn = document.querySelector(".one");
const saveBtn = document.querySelector(".save");
const generateRandomPwBtn = document.querySelector(".generate");
const confirmYesBtn = document.querySelector(".yes");
const confirmNoBtn = document.querySelector(".no");

//Inputs
const nameInput = document.querySelector(".name");
const passwordInput = document.querySelector(".password");

//Other
const linkCointainer = document.querySelector(".box");
const confirmWindow = document.querySelector(".confirm");
const overlay = document.querySelector(".overlay");

async function fetchPasswords() {
    const response = await fetch("http://localhost:8000/api/passwords");
    const data = await response.json();
    console.log(data);

    populateSidebar(data);
}

fetchPasswords();

function populateSidebar(passwordsArr) {
    for (const website of passwordsArr) {
        console.log(website.website);
        const htmlString = `<a href="#" data-target="pw" class="nav-link">${website.website}</a>
        <hr color="#489fb5" />`;

        linkCointainer.innerHTML += htmlString;
    }
}

newPasswordBtn.addEventListener("click", () => {
    nameInput.value = "";
    passwordInput.value = "";
    nameInput.setAttribute("placeholder", "Name");
    passwordInput.setAttribute("placeholder", "Password");

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

generateRandomPwBtn.addEventListener("click", () => {
    console.log("kukens");
    passwordInput.value = randomPW(18);
});

function randomPW(length) {
    let result = "";
    const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$€%&/?+-";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

saveBtn.addEventListener("click", async () => {
    if (nameInput.value.length >= 1 && passwordInput.value.length >= 1) {
        console.log(nameInput.value, passwordInput.value);

        const credentials = {
            website: nameInput.value,
            password: passwordInput.value,
        };

        console.log(credentials);

        const response = await fetch("http://localhost:8000/api/newPass", {
            method: "POST",
            body: JSON.stringify(credentials),
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();
        console.log(data);

        const nameTag = document.createElement("a");

        nameTag.classList.add("nav-link");
        nameTag.setAttribute("data-target", "pw");
        nameTag.setAttribute("href", "#");
        nameTag.innerHTML = nameInput.value;

        const line = document.createElement("hr");
        line.setAttribute("color", "#489fb5");

        linkCointainer.appendChild(nameTag);
        linkCointainer.appendChild(line);

        nameInput.setAttribute("placeholder", "Name");
        passwordInput.setAttribute("placeholder", "Password");
        nameInput.value = "";
        passwordInput.value = "";
        backToHome();
    } else {
        if (!nameInput.value.length >= 1 && !passwordInput.value.length >= 1) {
            nameInput.setAttribute("placeholder", "Write Something");
            passwordInput.setAttribute("placeholder", "Write Something");
        } else if (!passwordInput.value.length >= 1) {
            passwordInput.setAttribute("placeholder", "Write Something");
        } else if (!nameInput.value.length) {
            nameInput.setAttribute("placeholder", "Write Something");
        }
    }
});

linkCointainer.addEventListener("click", async (e) => {
    if (e.target.classList.contains("nav-link")) {
        const password = await getPassword(e.target.innerHTML);
        toggleExitAnimtation();

        setTimeout(function () {
            newPwPage.classList.remove("active");
            homePage.classList.remove("active");
            passwordPage.classList.add("active");
            toggleExitAnimtation();

            const htmlString = `<h1 id="websiteName">${e.target.innerHTML}</h1>
            <div class="myPw">
                <div class="value"><p id="myPass">${password}</p></div>
                <button class="copy"><i class="fas fa-copy"></i></button>
            </div>
            <div class="btnContainer">
                <button class="back two nav-link" data-target="newPw">
                    Back
                </button>
                <button class="delete">Delete</button>`;
            passwordPage.innerHTML = htmlString;
            const copyBtn = document.querySelector(".copy");
            const backTwoBtn = document.querySelector(".two");
            backTwoBtn.addEventListener("click", backToHome);
            const deleteBtn = document.querySelector(".delete");

            copyBtn.addEventListener("click", () => {
                const textToCopy = document.getElementById("myPass").innerText;
                const elem = document.createElement("textarea");
                document.body.appendChild(elem);
                elem.value = textToCopy;
                elem.select();
                document.execCommand("copy");
                document.body.removeChild(elem);

                const copyBox = document.querySelector(".copyBox");
                copyBox.classList.remove("hiddenCopy");

                setTimeout(() => {
                    copyBox.classList.add("hiddenCopy");
                }, 1000);
            });

            deleteBtn.addEventListener("click", () => {
                confirmWindow.classList.remove("hidden");
                overlay.classList.remove("hidden");
            });
        }, 1000);
    }
});

function toggleExitAnimtation() {
    passwordPage.classList.toggle("animate__fadeOutUp");
    homePage.classList.toggle("animate__fadeOutUp");
    newPwPage.classList.toggle("animate__fadeOutUp");
}

confirmNoBtn.addEventListener("click", () => {
    confirmWindow.classList.add("hidden");
    overlay.classList.add("hidden");
});

confirmYesBtn.addEventListener("click", async () => {
    const website = document.querySelector("#websiteName").innerText;

    const response = await fetch(
        `http://localhost:8000/api/deletePassword/${website}`,
        {
            method: "DELETE",
            body: "",
            headers: {
                "Content-Type": "application/json",
            },
        }
    );
    const data = await response.json();
    if (data) {
        location.href = "http://localhost:8000";
    }
});

async function getPassword(website) {
    const response = await fetch(`http://localhost:8000/api/${website}`, {
        method: "POST",
        body: "",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();

    console.log(data);

    return data;
}
