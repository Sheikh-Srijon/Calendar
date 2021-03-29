"use strict";
function DatePicker(id, callback) {
    this.id = id;
    this.callback = callback;

}

//prototype render because all instances should have it 
DatePicker.prototype.render = function (date) {
    let parent = document.getElementById(this.id);
    //metadata 

    //get monthName
    let month = date.getMonth();
    let year = date.getFullYear();
    var options = { month: 'long' };
    let monthName = new Intl.DateTimeFormat('en-US', options).format(date);

    //top bar  with buttons, month and year 
    let topBar = document.createElement('DIV');
    topBar.setAttribute('class', 'topBar');//add css
    let thisMonth = document.createElement('DIV');
    thisMonth.textContent = monthName + " " + year;
    parent.appendChild(topBar);
    let leftBtn = document.createElement('BUTTON');
    let rightBtn = document.createElement('BUTTON');

    let calendar = document.createElement('DIV');
    //for centering
    let box = document.createElement('box');
    calendar.setAttribute('class', 'grid-container');
    box.setAttribute('class', 'box');
    parent.appendChild(box);
    //parent.appendChild(calendar);
    box.appendChild(calendar);
    
    leftBtn.textContent = "<";
    rightBtn.textContent = ">";
    //calendar 
    function completeCalendar(date, id, callback) {
        function getNumDays(month, year) {
            let numDays = 0;
            let longMonth = [0, 2, 4, 6, 7, 9, 11]; //calculate if current month is 31 days or 30
            numDays = longMonth.includes(month) ? 31 : 30;
            //leap year 
            if (month === 1) {
                numDays = (year % 4 === 0) ? 29 : 28;
            }
            return numDays;
        }

        let daysInString = { 0: "Su", 1: "Mo", 2: "Tu", 3: "We", 4: "Th", 5: "Fr", 6: "Sa" };
        for (let i = 0; i <= 6; i++) {
            let dayText = document.createElement('DIV');
            dayText.setAttribute('class', 'week');
            // dayText.setAttribute('class', 'day');
            dayText.textContent = daysInString[i];
            calendar.appendChild(dayText);
        }
        let thisMonth = date.getMonth();
        let thisYear = date.getFullYear();
        let numDays = getNumDays(thisMonth, thisYear);
        let firstDay = date.getDay();
        let firstNum = date.getDate();
        let startOffset = firstDay;
        let endOffset = 7 - (startOffset + numDays) % 7;
        endOffset = (endOffset === 7) ? 0 : endOffset;
        let totalDays = startOffset + numDays + endOffset;
        //get last months size
        let lastMonth = 0;
        lastMonth = (thisMonth !== 0) ? thisMonth - 1 : 11;
        let lastMonthDays = getNumDays(lastMonth, thisYear);
        //fill prev month remnants
        for (let i = lastMonthDays - startOffset + 1; i <= lastMonthDays; i++) {
            let dateDiv = document.createElement('DIV');
            dateDiv.setAttribute('class', 'day');
            dateDiv.textContent = i.toString();

            calendar.appendChild(dateDiv);
            dateDiv.setAttribute('class', 'dim');
        }
        //current month
        for (let i = 1; i <= numDays; i++) {
            let dateDiv = document.createElement('DIV');
            dateDiv.setAttribute('class', 'day');
            dateDiv.textContent = i.toString();
            const dateObject = { month: thisMonth + 1, day: i, year: thisYear };
            console.log("test thisMonth value change", thisMonth, thisYear);
            dateDiv.addEventListener("click", function () { callback(id, dateObject); });
            calendar.appendChild(dateDiv);
        }
        //fill next month remnants 
        for (let i = 1; i <= endOffset; i++) {
            let dateDiv = document.createElement('DIV');
            dateDiv.setAttribute('class', 'day');
            dateDiv.textContent = i.toString();
            calendar.appendChild(dateDiv);
            dateDiv.setAttribute('class', 'dim');
        }
    }
    leftBtn.addEventListener('click', () => {

        if (month !== 0) {
            let newDate = new Date(year, month - 1);
            monthName = new Intl.DateTimeFormat('en-US', options).format(newDate);
            thisMonth.textContent = monthName + " " + year;
            calendar.innerHTML = "";//clear out old grid
            completeCalendar(newDate,this.id,this.callback);
            month = month - 1;
        }

        else if (month === 0) {
            year = year - 1;
            month = 11;
            let newDate = new Date(year, month);
            monthName = new Intl.DateTimeFormat('en-US', options).format(newDate);
            thisMonth.textContent = monthName + " " + year;
            calendar.innerHTML = "";//clear out old grid
            completeCalendar(newDate,this.id, this.callback);
        }
    });

    rightBtn.addEventListener('click', () => {
        if (month !== 11) {
            month = month + 1;
            let newDate = new Date(year, month);
            monthName = new Intl.DateTimeFormat('en-US', options).format(newDate);
            thisMonth.textContent = monthName + " " + year;
            calendar.innerHTML = "";//clear out old grid
            completeCalendar(newDate,this.id,this.callback);
        }
        else if (month === 11) {
            year = year + 1;
            month = 0;
            let newDate = new Date(year, month);
            monthName = new Intl.DateTimeFormat('en-US', options).format(newDate);
            thisMonth.textContent = monthName + " " + year;
            calendar.innerHTML = "";//clear out old grid
            completeCalendar(newDate,this.id,this.callback);
        }
    });
    topBar.appendChild(leftBtn);
    topBar.appendChild(thisMonth);
    topBar.appendChild(rightBtn);





    completeCalendar(date, this.id, this.callback);
};