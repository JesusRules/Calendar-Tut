const calendar = document.querySelector(".calendar"),
      date = document.querySelector(".date"),
      daysContainer = document.querySelector(".days"),
      prev = document.querySelector(".prev"),
      next = document.querySelector(".next"),
      todayBtn = document.querySelector('.today-btn'),
      gotoBtn = document.querySelector('.goto-btn'),
      dateInput = document.querySelector('.date-input'),
      eventDay = document.querySelector('.event-day'),
      eventDate = document.querySelector('.event-date'),
      eventsContainer = document.querySelector('.events'),
      addEventSubmit = document.querySelector('.add-event-btn');

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
    },
    {
        month: 3,
        day: 23,
        year: 2023,
        events: [
            {
                title: 'Event 1 - Praise Jesus all day!!',
                time: '3:30 PM',
            },
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
            }
        })

        //if day is today, add class today
        if (i === new Date().getDate() 
            && year === new Date().getFullYear() 
            && month === new Date().getMonth()) 
        {
            activeDay = i;
            getActiveDay(i);
            updateEvents(i);

            //If event found also add event class
            //Add active on today at startup
            if (event) {
                days += `<div class="day event  today">${i}</div>`
            } else {
                days += `<div class="day  today">${i}</div>`
            }
        }
        else 
        {
            //Add remaining days //If event found also add event class
            if (event) {
                days += `<div class="day event">${i}</div>`
            } else {
                days += `<div class="day">${i}</div>`
            }
        }
    }

    //Next month days
    for (let j = 1; j <= nextDays; j++) {
        days += `<div class="day next-date">${j}</div>`
    }

    daysContainer.innerHTML = days;
    // Add listener after calendar initialized
    addListener();
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



document.addEventListener('keydown', (e) => {
    // Check if the Enter key was pressed (key code 13) and an input is in focus
    if (e.key === 'Enter' && document.activeElement === dateInput) {
        gotoDate();
    }
});

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
            month = parseInt(dateArr[0] - 1);
            year = parseInt(dateArr[1]);
            initCalendar();
            return;
        }
    }
    alert("Invalid date");
}

const addEventOpenBtn = document.querySelector('.add-event-open-btn'),
      addEventContainer = document.querySelector('.add-event-wrapper'),
      addEventCloseBtn = document.querySelector('.close'),
      //Event inputs
      addEventTitle = document.querySelector('.event-name'),
      addEventFrom = document.querySelector('.event-time-from'),
      addEventTo = document.querySelector('.event-time-to');

      addEventOpenBtn.addEventListener('click', () => {
    addEventContainer.classList.toggle('active');
});
addEventCloseBtn.addEventListener('click', () => {
    addEventContainer.classList.remove('active');
});



// document.addEventListener('click', (e) => {
//     //If click outside!!!
//     if (e.target !== addEventOpenBtn && !addEventContainer.contains(e.target)) {
//         addEventContainer.classList.remove('active');
//     }
// })


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


//Lets create function to add listener on days after rendered

function addListener() {
    const days = document.querySelectorAll('.day');
    
    days.forEach((day) => {

        day.addEventListener('click', (e) => {
            activeDay = Number(e.target.innerHTML);

            //call active day after click
            getActiveDay(e.target.innerHTML);
            updateEvents(Number(e.target.innerHTML));
            
            //remove current active day
            days.forEach((day) => {
                day.classList.remove('active');
            })

            // If previous month day clicked, goto previous month and add active
            if (e.target.classList.contains('prev-date')) {
                prevMonth();

                //After going to previous month, add active to clicked
                setTimeout(() => {
                    //Select all days of that month - shows only days rendered
                    const days = document.querySelectorAll('.day');
                   
                    days.forEach((day) => {
                        if (!day.classList.contains('prev-date') && day.innerHTML === e.target.innerHTML) {
                            day.classList.add('active');
                        }
                    })
                }, 100);
                //Same with NEXT month days
            } else if (e.target.classList.contains('next-date')) {
                nextMonth();

                setTimeout(() => {
                    const days = document.querySelectorAll('.day');

                    days.forEach((day) => {
                        if (!day.classList.contains('next-date') && day.innerHTML === e.target.innerHTML)
                        {
                            day.classList.add('active');
                        }
                    })
                }, 100);
            }
            else {
                //remaining current month days
                e.target.classList.add('active');
            }

        })
    })
}

//Lets show active day events and date at top
function getActiveDay(date) {
    const day = new Date(year, month, date);
    const dayName = day.toString().split(' ')[0];
    eventDay.innerHTML = dayName;
    eventDate.innerHTML = `${date} ${months[month]} ${year}`;
}

// Function to show events of that day
function updateEvents(date) {
    let events = "";
    eventsArr.forEach((event) => {
        //Get events for active day only
        if (date === event.day && 
            month + 1 === event.month && 
            year === event.year) 
            {
            //Show all events on document
            event.events.forEach((event) => {
                events += `
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">${event.title}</h3>
                    </div>
                    <div class="event-time">
                        ${event.time}
                    </div>
                </div>`
            })
        }
    })
    if (events === '') 
    {
        events = `<div class="no-event">
                <h3>No Events</h3>
            </div>`;
    }
    eventsContainer.innerHTML = events;
}

//Lets create function to add events
addEventSubmit.addEventListener('click', () => {
    const eventTitle = addEventTitle.value;
    const eventTimeFrom = addEventFrom.value;
    const eventTimeTo = addEventTo.value;

    //some validation
    if (eventTitle === '' || eventTimeFrom === '' || eventTimeTo === '') {
        alert('Please fill all the fields');
        return;
    }
    const timeFromArr = eventTimeFrom.split(':');
    const timeToArr = eventTimeTo.split(':');

    if (timeFromArr.length !== 2 || timeToArr.length !== 2 
        || timeFromArr[0] > 23 //hours
        || timeFromArr[1] > 59  //minutes
        || timeToArr[0] > 23 //hours
        || timeToArr[1] > 59)  //minutes
    {
        alert("Invalid Time Format");
        return;
    }
    const timeFrom = convertTime(eventTimeFrom);
    const timeTo = convertTime(eventTimeTo);

    const newEvent = {
        title: eventTitle,
        time: `${timeFrom} - ${timeTo}`,
    };

    let eventAdded = false;

    // Check if eventsArr is not empty
    if (eventsArr.length > 0) {
        // Check if current day has already any event then add to that
        // if (eventsArr.some(item => item.day == activeDay))
        eventsArr.forEach((item) => {
            if (item.day == activeDay &&
                item.month == month + 1 &&
                item.year == year)
            {
                eventAdded = true;
                item.events.push(newEvent);
            }
        })
    }
    // If event array empty or current day has no event, create new
    if (!eventAdded) {
        eventsArr.push({
            day: activeDay,
            month: month + 1,
            year: year,
            events: [ newEvent ]
        });
    }
    //Remove active from add event form
    addEventContainer.classList.remove('active');
    //Clear the fields
    addEventTitle.value = '';
    addEventFrom.value = '';
    addEventTo.value = '';

    //Show current added event
    updateEvents(activeDay);
    //Also add event class to newly added day if not already
    const activeDayElem = document.querySelector('.day.active');
    if (!activeDayElem.classList.contains('event')) {
        activeDayElem.classList.add('event');
    }

    return;
    // const activeDayRem = Number(activeDay);
    // initCalendar(); //get events
    // //Get active
    // const days = document.querySelectorAll('.day');
    // setTimeout(() => {
    //     days.forEach((day) => {
    //         if (!day.classList.contains('next-date') && !day.classList.contains('prev-date') 
    //         && day.innerHTML == activeDayRem)
    //     {
    //         day.classList.add('active');
    //         getActiveDay(activeDayRem);
    //         updateEvents(activeDayRem);
    //         activeDayRem = activeDayRem;
    //     }
    //     })
    // }, 0);

    return;
    // const eventTitle = addEventTitle.value;
    const eventFrom = addEventFrom.value;
    const eventTo = addEventTo.value;
    const eventObj = {
        month: month + 1,
        day: activeDay,
        year: year,
        events: [
            {
                title: eventTitle,
                time: `${eventFrom} to ${eventTo}`
            }
        ]
    }
    eventsArr.push(eventObj);
    const activeDayRem = Number(activeDay);
    initCalendar(); //get events
    //Get active
    const days = document.querySelectorAll('.day');
    setTimeout(() => {
        days.forEach((day) => {
            if (!day.classList.contains('next-date') && !day.classList.contains('prev-date') 
            && day.innerHTML == activeDayRem)
        {
            day.classList.add('active');
            getActiveDay(activeDayRem);
            updateEvents(activeDayRem);
            activeDayRem = activeDayRem;
        }
        })
    }, 0);
})

function convertTime(time) {
    let timeArr = time.split(':');
    let timeHour = timeArr[0];
    let timeMin = timeArr[1];
    let timeFormat = timeHour >= 12 ? "PM" : "AM";
    timeHour = timeHour % 12 || 12;
    time = `${timeHour}:${timeMin} ${timeFormat}`;
    return time;   
}

//Lets create a function to remove events on click