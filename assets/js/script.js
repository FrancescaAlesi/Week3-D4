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
		dayCellDiv.addEventListener('click', function () {
			unselectAllDays();
			dayCellDiv.classList.add('selected');
			changeMeetingDaySection(i);
            if (appointments[i].length > 0) {
                showAppointments(i);
            } else {
                document.querySelector('#appointments').style.display = 'none';
			}
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

		appointments.push([]);
	}
};

const unselectAllDays = () => {
	const previusSelected = document.querySelector('.selected');
	if(previusSelected) {
		previusSelected.classList.remove('selected');
	}
};

const changeMeetingDaySection = (dayNumber) => {
	const newMeetingDay = document.querySelector('#newMeetingDay');
	newMeetingDay.innerText = dayNumber + 1;
	newMeetingDay.classList.add('hasDay');
};

const showAppointments = (dayNumber) => {
    const dayAppointments = appointments[dayNumber];
    const appointmentsList = document.querySelector('#appointments ul');
    appointmentsList.textContent = '';
    dayAppointments.forEach((appointment) => {
        const newLi = document.createElement('li');
        newLi.innerText = appointment;
        appointmentsList.appendChild(newLi);
    });
    document.querySelector('#appointments').style.display = 'block';
};

const meeetingForm = document.querySelector('form'); 
meeetingForm.addEventListener('submit', formSubmit);

function formSubmit(e) {
	e.preventDefault();
	const selectedDay = document.querySelector('#newMeetingDay').textContent;
	if(selectedDay === 'Clicca su un giorno') {
		alert('Seleziona un giorno prima di inserire l\'evento');
		meeetingForm.reset();
		return;
	}

	const meetingTime = document.querySelector('#newMeetingTime').value;
	const meetingName = document.querySelector('#newMeetingName').value;
	const meetingString = `${meetingTime} - ${meetingName}`;
	const dayIndex = Number(selectedDay) -1;
	appointments[dayIndex].push(meetingString);
	meeetingForm.reset();
	showAppointments(dayIndex);

	const dot = document.createElement('span');
	dot.classList.add('dot');
	const selectedCell = document.querySelector('.selected');
	if(!selectedCell.querySelector('dot')) {
		selectedCell.appendChild(dot);
	}
};