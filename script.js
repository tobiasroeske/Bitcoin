const API_KEY = 'MEWKNOV5M39ZH5MX';
const startDate = new Date('2021-05-31'); // Geben Sie Ihr gewünschtes Startdatum hier an
const endDate = new Date('2024-01-22'); // Geben Sie Ihr gewünschtes Enddatum hier an
const resultArray = generateLastDayOfMonthArray(startDate, endDate);
const dates = [];


async function loadCourse() {
    let url = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=BTC&to_currency=EUR&apikey=${API_KEY}`
    let response = await fetch('currentCurrency.json'); // 'JSON.js' um API requests zu sparen;
    let responseAsJson = await response.json();
    let currentCourse = Math.round(responseAsJson['Realtime Currency Exchange Rate']['5. Exchange Rate']);
    displayCourse(currentCourse);
    loadMonthlyCourse();
    loadChart();
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
    for (let i = 0; i < resultArray.length; i++) {
        const date = resultArray[i];
        currentCurrency = Math.round(responseAsJson['Time Series (Digital Currency Monthly)'][date]['1a. open (EUR)'])
        console.log(currentCurrency);
        dates.push(currentCurrency);
    }

}

function generateLastDayOfMonthArray(startDate, endDate) {
    const result = [];
    const dateFormatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    let currentDate = new Date(startDate);

    while (currentDate <= endDate) {
        const lastDayOfMonth = new Date(
            currentDate.getFullYear(),
            currentDate.getMonth() + 1,
            0
        );

        // Setzen Sie das Enddatum auf das heutige Datum, wenn es nach dem letzten Tag des Monats liegt
        const finalDate = currentDate <= endDate ? lastDayOfMonth : endDate;

        const year = finalDate.getFullYear();
        const month = (finalDate.getMonth() + 1).toString().padStart(2, '0');
        const day = finalDate.getDate().toString().padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;
        result.push(formattedDate);

        // Setzen Sie das Startdatum auf den ersten Tag des nächsten Monats für die nächste Iteration
        currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1);
    }

    result.pop();
    let date = getFormattedTodayDate();
    result.push(date);
    return result;
}

function getFormattedTodayDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
}


function loadChart() {
    const ctx = document.getElementById('myChart');

    new Chart(ctx, {
        type: 'line',
        data: {
            labels: resultArray,
            datasets: [{
              label: 'My First Dataset',
              data: [52908, 34162, 32136, 38021, 43192, 40183, 56212, 52224, 42381, 35274, 39578, 41733, 34507, 29162, 18287, 21363, 18384, 17811, 18790, 15741, 15169, 21206, 21221, 26103, 26807, 24952, 27943, 26806, 23788, 24725, 31765, 34593, 38774],
              fill: false,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.1
            }]
          }
    });
}
















