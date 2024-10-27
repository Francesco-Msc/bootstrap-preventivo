const myForm = document.getElementById('myForm');
const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const textArea = document.getElementById('textArea');
const promoCode = document.getElementById('promoCode');
const displayPrice = document.getElementById('displayPrice');
const showPrice = document.getElementById('showPrice');
const serviceSelect = document.getElementById('service');
const unvalidCode = document.getElementById('unvalidCode');
const checkBox = document.getElementById('policyBox');

// Discount percentage and codes
const discountPercentage = 25;
const discountCodes = ['YHDNU32', 'JANJC63', 'PWKCN25', 'SJDPO96', 'POCIE24'];
const discountCodesLength = discountCodes.length;

// Services and prices
const services = [
    { name: 'Backend Development,', servicePrice: 20.50 },
    { name: 'Frontend Development', servicePrice: 15.30 },
    { name: 'Project Analysis', servicePrice: 33.60 }
];