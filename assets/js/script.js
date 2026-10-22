const monthNames = [
	'Gennaio',
	'Febbraio',
	'Marzo',
	'Aprile',
	'Maggio',
	'Giugno',
	'Luglio',
	'Agosto',
	'Settembre',
	'Ottobre',
	'Novembre',
	'Dicembre',
];

const dayNames = [
	'Domenica',
	'Lunedì',
	'Martedì',
	'Mercoledì',
	'Giovedì',
	'Venerdì',
	'Sabato',
];


const now = new Date();
const getYear = now.getFullYear();
const getMonth = now.getMonth();
const appointments = [];

// NOME DEL MESE
const printCurrentMonth = () => {
	const title = document.querySelector('h1');
	const currentMonth = monthNames[getMonth];
	title.innerText = currentMonth;
};

window.onload = (e) => {
	printCurrentMonth();
	createDays(dayInThisMonth());
};

// CALCOLO NUMERO GIORNI 
const dayInThisMonth = () => {
	const lastDayInMonth = new Date(getYear, getMonth + 1, 0);
	const numberOfDays = lastDayInMonth.getDate();
	return numberOfDays;
};

// GRIHGLIA
const createDays = (daysNumber) => {
	const calendarDiv = document.querySelector('#calendar');
	for (let i = 0; i < daysNumber; i++) {
		const dayCellDiv = document.createElement('div');
		dayCellDiv.classList.add('day');
		// le celle dovranno essere cliccabili
		dayCellDiv.addEventListener('click', function () {
		});
		const cellValue = document.createElement('h3');
		const thisDate = i + 1;
		if (thisDate == now.getDate()) {
			dayCellDiv.classList.add('currentDay');
		}
		let thisDay = new Date(now.getFullYear(), now.getMonth(), thisDate);
		if (thisDay.getDay() === 0) {
			cellValue.classList.add('sunday');
		}
		let dayNumber = thisDay.getDay();
		let dayName = dayNames[dayNumber];
		cellValue.innerText = `${dayName} ${i + 1}`;
		dayCellDiv.appendChild(cellValue);
		calendarDiv.appendChild(dayCellDiv);
	}
};