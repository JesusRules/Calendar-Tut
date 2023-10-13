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

//Default events array
const eventsArr = [
    {
        month: 3,
        day: 20,
        year: 2023,
        events: [
            {
                title: 'Event 1 - Praise Jesus all day!!',
                time: '3:30 PM',
            },
            {
                title: 'Event 2 - Go swimming with family!',
                time: '6:30 PM'
            }
        ]
    }
]


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
        // Check if event present on current day
        let event = false;
        eventsArr.forEach((eventObj) => {
            if (eventObj.day === i &&
                eventObj.month === month + 1 &&
                eventObj.year === year) {
                //if event found
                event = true;
                console.log('TRUE!!')
            }
        })

        //if day is today, add class today
        if (i === new Date().getDate() 
            && year === new Date().getFullYear() 
            && month === new Date().getMonth()) 
        {
            if (!event) {
                days += `<div class="day today">${i}</div>`
            } else {
                days += `<div class="day event today">${i}</div>`
            }
        }
        else 
        {
            //Add remaining days
            if (!event) {
                days += `<div class="day">${i}</div>`
            } else {
                days += `<div class="day event">${i}</div>`
            }
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
    const slashCount = (dateInput.value.match(/\//g) || []).length;
    if (slashCount > 1) {
        // If there are more than one colons, remove the last colon
        e.target.value = dateInput.value.slice(0, -1);
    }
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

const addEventOpenBtn = document.querySelector('.add-event-open-btn'),
      addEventContainer = document.querySelector('.add-event-wrapper'),
      addEventCloseBtn = document.querySelector('.close'),

      addEventTitle = document.querySelector('.event-name'),
      addEventFrom = document.querySelector('.event-time-from'),
      addEventTo = document.querySelector('.event-time-to');

      addEventOpenBtn.addEventListener('click', () => {
    addEventContainer.classList.toggle('active');
});
addEventCloseBtn.addEventListener('click', () => {
    addEventContainer.classList.remove('active');
});

document.addEventListener('click', (e) => {
    //If click outside!!!
    if (e.target !== addEventOpenBtn && !addEventContainer.contains(e.target)) {
        addEventContainer.classList.remove('active');
    }
})


//Allow only 50 characters in title
addEventTitle.addEventListener('input', (e) => {
    addEventTitle.value = addEventTitle.value.slice(0, 50);
});

//Time format in from and to time
addEventFrom.addEventListener('input', (e) => {
    //Only 1 :!!!
    const colonCount = (addEventFrom.value.match(/:/g) || []).length;
    if (colonCount > 1) {
        // If there are more than one colons, remove the last colon
        e.target.value = addEventFrom.value.slice(0, -1);
    }
    //Only numbers
    addEventFrom.value = addEventFrom.value.replace(/[^0-9:]/g, '');
    //If 2 numbers, add ':'
    if (addEventFrom.value.length === 2
        && !addEventFrom.value.includes(':')) 
    {
        addEventFrom.value += ":";
    }
    //MINE
    if (addEventFrom.value.length === 3 
        && (!addEventFrom.value.includes(':')))
    {
        const lastChar = addEventFrom.value.slice(-1);
        if (lastChar !== ':') {
            addEventFrom.value = addEventFrom.value.slice(0, -1) + ':' + lastChar;
        }
    }
    //Dont allow more then 5 characters
    if (addEventFrom.value.length > 5) {
        addEventFrom.value = addEventFrom.value.slice(0, 5);   
    }
    if (e.inputType === "deleteContentBackward") {
        if (addEventFrom.value.length === 3) {
            addEventFrom.value = addEventFrom.value.slice(0, 2);
        }
    }
})


// Same with time
addEventTo.addEventListener('input', (e) => {
    //Only 1 :!!!
    const colonCount = (addEventTo.value.match(/:/g) || []).length;
    if (colonCount > 1) {
        // If there are more than one colons, remove the last colon
        e.target.value = addEventTo.value.slice(0, -1);
    }
    //Only numbers
    addEventTo.value = addEventTo.value.replace(/[^0-9:]/g, '');
    //If 2 numbers, add ':'
    if (addEventTo.value.length === 2
        && !addEventTo.value.includes(':')) 
    {
        addEventTo.value += ":";
    }
    //MINE
    if (addEventTo.value.length === 3 
        && (!addEventTo.value.includes(':')))
    {
        const lastChar = addEventTo.value.slice(-1);
        if (lastChar !== ':') {
            addEventTo.value = addEventTo.value.slice(0, -1) + ':' + lastChar;
        }
    }
    //Dont allow more then 5 characters
    if (addEventTo.value.length > 5) {
        addEventTo.value = addEventTo.value.slice(0, 5);   
    }
    if (e.inputType === "deleteContentBackward") {
        if (addEventTo.value.length === 3) {
            addEventTo.value = addEventTo.value.slice(0, 2);
        }
    }
})