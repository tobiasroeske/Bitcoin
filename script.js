const API_KEY = 'MEWKNOV5M39ZH5MX';


async function loadCourse() {
    let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=${API_KEY}`
    let response = await fetch('currentCurrency.json'); // 'JSON.js' um API requests zu sparen;
    let responseAsJson = await response.json();
    let currentCourse = Math.round(responseAsJson['Realtime Currency Exchange Rate']['5. Exchange Rate']);
    displayCourse(currentCourse);
    loadMonthlyCourse();

}

function displayCourse(course) {
    let currentCourse = document.getElementById('course');
    currentCourse.innerHTML = /*html*/`
        <b>${course} €</b>
    `;
}

async function loadMonthlyCourse() {
    let url = `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_MONTHLY&symbol=BTC&market=EUR&apikey=${API_KEY}`;
    let response = await fetch('monthlyCourse.json');
    let responseAsJson = await response.json();

}
















