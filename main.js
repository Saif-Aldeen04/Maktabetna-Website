const BC = document.querySelector(".bigger-container");
const pay = document.getElementById("pay");
const para = document.getElementById("para");
const visa = document.getElementById("visa");
const cardInput = document.getElementById("card-number");
const errorMsg = document.getElementById("error-msg");

function isValidCardNumber(cardNumber) {
    cardNumber = cardNumber.replace(/\s+/g, "");

    if (!/^\d+$/.test(cardNumber)) return false;

    let sum = 0;
    let shouldDouble = false;

    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i], 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

function showError(message) {
    if (!errorMsg) return;

    errorMsg.innerText = message;
    errorMsg.style.display = "block";

    setTimeout(() => {
        errorMsg.style.display = "none";
    }, 5000);
}

if (cardInput) {
    cardInput.addEventListener("input", () => {
        let value = cardInput.value.replace(/\D/g, "");
        value = value.slice(0, 16);

        const parts = value.match(/.{1,4}/g);
        cardInput.value = parts ? parts.join(" ") : "";
    });
}

if (pay && cardInput && para && visa && BC) {
    pay.addEventListener("click", () => {
        const cardValue = cardInput.value.replace(/\s/g, "");

        if (cardValue === "") {
            showError("Please enter your card number.");
            return;
        }

        if (!isValidCardNumber(cardValue)) {
            showError("Invalid card number.");
            return;
        }

        if (errorMsg) errorMsg.style.display = "none";

        para.style.display = "block";
        visa.style.display = "none";

        setTimeout(() => {
            para.style.display = "none";
            BC.classList.remove("active");
            cardInput.value = "";
        }, 1000);
    });
}

const mode = document.getElementById("dark");
const body = document.getElementById("body");
const card = document.querySelectorAll(".card-body");
const paragraph = document.querySelectorAll(".container");

if (mode && body) {
    mode.addEventListener("click", () => {
        body.classList.toggle("dark");
        card.forEach(item => item.classList.toggle("dark"));

        paragraph.forEach(item => {
            item.style.color = "black";
        });
    });
}

const proContainer = document.getElementById("pro-container");

if (proContainer && BC && para && visa) {
    proContainer.addEventListener("click", (eo) => {
        if (eo.target.classList.contains("js-buy")) {
            eo.preventDefault();
            BC.classList.add("active");
            para.style.display = "none";
            visa.style.display = "block";
        }
    });
}
