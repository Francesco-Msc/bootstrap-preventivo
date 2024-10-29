const myForm = document.getElementById('myForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const textArea = document.getElementById('textArea');
const promoCode = document.getElementById('promoCode');
const displayPrice = document.getElementById('displayPrice');
const showPrice = document.getElementById('showPrice');
const serviceSelect = document.getElementById('service');
const invalidCode = document.getElementById('invalidCode');
const checkBox = document.getElementById('policyBox');

// Discount percentage and codes
const discountPercentage = 25;
const discountCodes = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];
const discountCodesLength = discountCodes.length;

// Services and prices
const services = [
    { name: 'Backend Development', servicePrice: 20.50 },
    { name: 'Frontend Development', servicePrice: 15.30 },
    { name: 'Project Analysis', servicePrice: 33.60 }
];

// Add options in services selection
for (const element of services) {
    const option = document.createElement('option');
    option.value = element.name.toLowerCase();
    option.textContent = element.name;
    serviceSelect.appendChild(option);
};
const servicesLength = serviceSelect.length;

myForm.addEventListener('submit', function (event){
    event.preventDefault();

    if (!validateForm()) {
        return;
    }

    const serviceType = serviceSelect.value.toLowerCase();
    let price = calculatePrice(serviceType);
    
    invalidCode.classList.add('d-none');
    const enteredPromoCode = promoCode.value.trim();
    if (enteredPromoCode !== '') {
        if (isPromoCodeValid(enteredPromoCode)) {
            price = applyDiscount(price);
        } else {
            invalidCode.innerHTML = 'Il codice promozionale inserito non è valido, il prezzo non ha sconto applicato.';
            invalidCode.classList.remove('d-none');
        }
    };

    // Display price in HTML
    const priceFormatted = price.toFixed(2).split('.');
    showPrice.innerHTML = `€<span class="fs-4">${priceFormatted[0]}</span><span class="text-body-tertiary">,${priceFormatted[1]}</span>`;
    displayPrice.classList.remove('d-none');
    
    clearForm();
});

/********
FUNCTIONS
********/

// Verify if string contains numbers
function containsNumbers(str) {
    for (let i = 0; i < str.length; i++) {
        if (!isNaN(str[i]) && str[i] !== ' ') {
            return true;
        }
    }
    return false;
}

// Form validator
function validateForm() {
    const firstNameValue = firstName.value.trim();
    const lastNameValue = lastName.value.trim();
    const emailValue = email.value.trim();
    const serviceValue = serviceSelect.value;

    let valid = true;
    let message = '';

    if (firstNameValue === '') {
        message += 'Il campo Nome è obbligatorio. <br>';
        valid = false;
    } else if (containsNumbers(firstNameValue)) {
        message += 'Il campo Nome non può contenere numeri. <br>';
        valid = false;
    }
    if (lastNameValue === '') {
        message += 'Il campo Cognome è obbligatorio. <br>';
        valid = false;
    } else if (containsNumbers(lastNameValue)) {
        message += 'Il campo Cognome non può contenere numeri. <br>';
        valid = false;
    }
    if (emailValue === '') {
        message += 'Il campo Email è obbligatorio. <br>';
        valid = false;
    }
    if (serviceValue === '') {
        message += 'Il campo tipo di lavoro è obbligatorio. <br>';
        valid = false;
    }
    if (!checkBox.checked) {
        message += 'Accetta la privacy policy. <br>';
        valid = false;
    }

    if (!valid) {
        invalidCode.innerHTML = message;
        invalidCode.classList.remove('d-none');
    }

    return valid;
}

// Calculate the full price
function calculatePrice(serviceType) {
    for (let i = 0; i < servicesLength; i++) {
        if (services[i].name.toLowerCase() === serviceType) {
            return services[i].servicePrice * 10;
        }
    }
    return 0;
};

// Promo code validator
function isPromoCodeValid(code) {
    code = code.toLowerCase();
    for (let i = 0; i < discountCodesLength; i++) {
        if (discountCodes[i].toLowerCase() === code) {
            return true;
        }
    }
    return false;
}

// Discount apply
function applyDiscount(price) {
    const discountAmount = (price * discountPercentage) / 100;
    return price - discountAmount;
}

// Clear form from input values
function clearForm(){
    firstName.value = '';
    lastName.value = '';
    email.value = '';
    serviceSelect.value = '';
    textArea.value = '';
    promoCode.value = '';
    checkBox.checked = false;
};