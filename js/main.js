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

// Variables for errors display
const firstNameError = document.getElementById('firstNameError');
const lastNameError = document.getElementById('lastNameError');
const emailError = document.getElementById('emailError');
const serviceError = document.getElementById('serviceError');
const policyError = document.getElementById('policyError');

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
    let price = calculatePrice(serviceType, services);

    clearValidation();
    
    invalidCode.classList.add('d-none');
    const enteredPromoCode = promoCode.value.trim();
    if (enteredPromoCode !== '') {
        if (isPromoCodeValid(enteredPromoCode, discountCodes)) {
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

    // Name validation
    if (firstNameValue === '') {
        firstName.classList.add('is-invalid');
        firstNameError.innerHTML = 'Il campo Nome è obbligatorio.';
        valid = false;
    } else if (containsNumbers(firstNameValue)) {
        firstName.classList.add('is-invalid');
        firstNameError.innerHTML = 'Il campo Nome non può contenere numeri.';
        valid = false;
    } else {
        firstName.classList.remove('is-invalid');
        firstName.classList.add('is-valid');
    }

    // Last name validation
    if (lastNameValue === '') {
        lastName.classList.add('is-invalid');
        lastNameError.innerHTML = 'Il campo Cognome è obbligatorio.';
        valid = false;
    } else if (containsNumbers(lastNameValue)) {
        lastName.classList.add('is-invalid');
        lastNameError.innerHTML = 'Il campo Cognome non può contenere numeri.';
        valid = false;
    } else {
        lastName.classList.remove('is-invalid');
        lastName.classList.add('is-valid');
    }

    // Email validation
    if (emailValue === '') {
        email.classList.add('is-invalid');
        emailError.innerHTML = 'Il campo Email è obbligatorio.';
        valid = false;
    } else {
        email.classList.remove('is-invalid');
        email.classList.add('is-valid');
    }

    // Service validation
    if (serviceValue === '') {
        serviceSelect.classList.add('is-invalid');
        serviceError.innerHTML = 'Il campo Tipo di Lavoro è obbligatorio.';
        valid = false;
    } else {
        serviceSelect.classList.remove('is-invalid');
        serviceSelect.classList.add('is-valid');
    }

    // Policy check validation
    if (!checkBox.checked) {
        checkBox.classList.add('is-invalid');
        policyError.innerHTML = 'Devi accettare la Privacy Policy.';
        valid = false;
    } else {
        checkBox.classList.remove('is-invalid');
        checkBox.classList.add('is-valid');
    }

    return valid;
}

// Calculate the full price
function calculatePrice(serviceType, servicesList) {
    for (let i = 0; i < servicesLength; i++) {
        if (servicesList[i].name.toLowerCase() === serviceType) {
            return servicesList[i].servicePrice * 10;
        }
    }
    return 0;
};

// Promo code validator
function isPromoCodeValid(code, codes) {
    code = code.toLowerCase();
    for (let i = 0; i < discountCodesLength; i++) {
        if (codes[i].toLowerCase() === code) {
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

// Clear validation fields
function clearValidation() {
    firstName.classList.remove('is-invalid', 'is-valid');
    lastName.classList.remove('is-invalid', 'is-valid');
    email.classList.remove('is-invalid', 'is-valid');
    serviceSelect.classList.remove('is-invalid', 'is-valid');
    checkBox.classList.remove('is-invalid');
}