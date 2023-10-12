const calendar = document.querySelector(".calendar"),
      date = document.querySelector(".date"),
      daysContainer = document.querySelector(".days"),
      prev = document.querySelector(".prev"),
      next = document.querySelector(".next"),
      todayBtn = document.querySelector('.today-btn'),
      gotoBtn = document.querySelector('.goto-btn'),
      dateInput = document.querySelector('.date-input');

let today = new Date();
let activeDay;
let month = today.getMonth();
let year = today.getFullYear();

const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
];

//function to add days - works procedually

function initCalendar() {
    //to get prev month days and current month all days and rem next month days
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const prevLastDay = new Date(year, month, 0);
    const prevDays = prevLastDay.getDate();
    const lastDate = lastDay.getDate();
    const day = firstDay.getDay();
    const nextDays = 7 - lastDay.getDay() - 1;

    //Update date top of calendar
    date.innerHTML = months[month] + ' ' + year;

    //Adding days on DOM
    let days = "";
    //Prev month days
    for (let x = day; x > 0; x--) {
        days += `<div class="day prev-date">${prevDays - x + 1}</div>`;
    }
    
    //Current month days
    for (let i = 1; i <= lastDate; i++) {
        
        //if day is today, add class today
        if (i === new Date().getDate() 
            && year === new Date().getFullYear() 
            && month === new Date().getMonth()) 
        {
            days += `<div class="day today">${i}</div>`
        }
        else 
        {
            //Add remaining days
            days += `<div class="day">${i}</div>`
        }
    }

    //Next month days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`
    }

    daysContainer.innerHTML = days;
}

initCalendar();

// Previous Month
function prevMonth() {
    month--;
    if (month < 0) {
        month = 11;
        year--;
    }
    initCalendar();
}

// Next Month
function nextMonth() {
    month++;
    if (month > 11) {
        month = 0;
        year++;
    }
    initCalendar();
}

//Add eventlistener on prev and next functions
prev.addEventListener('click', prevMonth);
next.addEventListener('click', nextMonth);


// Our calendar is ready
// Lets add goto date and goto today functionality
todayBtn.addEventListener('click', () => {
    today = new Date();
    month = today.getMonth();
    year = today.getFullYear();
    initCalendar();
})

dateInput.addEventListener('input', (e) => {
    //Allow only numbers, remove anything else
    dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
    if (dateInput.value.length === 2
            && !dateInput.value.includes('/')) {
        //Add a slash if 2 numbers entered
        dateInput.value += "/";
    }
    //MINE
    if (dateInput.value.length === 3 
            && (!dateInput.value.includes('/')))
            // && (/^\/$/.test(dateInput.value))) 
    {
        const lastChar = dateInput.value.slice(-1);
        if (lastChar !== '/') {
            dateInput.value = dateInput.value.slice(0, -1) + '/' + lastChar;
        }
    }
    if (dateInput.value.length > 7) {
        //Don't allow more than 7 characters
        dateInput.value = dateInput.value.slice(0, 7);
    }
    // If we remove until slash, it doesn't remove
    // If backspace pressed
    if (e.inputType === "deleteContentBackward") {
        if (dateInput.value.length === 3) {
            dateInput.value = dateInput.value.slice(0, 2);
        }
    }
})

gotoBtn.addEventListener('click', gotoDate);

function gotoDate() {
    const dateArr = dateInput.value.split('/');
    if (dateArr.length === 2) {
        if (dateArr[0] > 0 && dateArr[0] < 13 && dateArr[1].length === 4) {
            month = dateArr[0] - 1;
            year = dateArr[1];
            initCalendar();
            return;
        }
    }
    alert("Invalid date");
}