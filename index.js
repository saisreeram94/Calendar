var month_array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var globalEventStore = {};
window.onload = function() {

// On page load we have to show the current Month and Year
var dateObj = new Date();
var current_month = month_array[dateObj.getMonth()];
var current_year = dateObj.getFullYear();
//document.getElementsByClassName('present-month')[0].innerText = current_month + ' ' + current_year;

//load Current month as default
loadSelectedMonth(current_month,current_year);

}

var bindElements = document.getElementsByClassName('update-month');
for(var i=0; i<bindElements.length; i++){
    addEvent('click', bindElements[i], changeView);
};


function changeView(e){
    var month_year_details = document.getElementsByClassName('present-month')[0].innerText.split(' ');
    var current_month = month_year_details[0];
    var current_year = month_year_details[1];
    if(e.target.classList.contains('slider-left') || e.target.classList.contains('previous-month')) {
        if(month_array.indexOf(current_month) === 0) {
            current_month = month_array[11];
            current_year--;
        }
        else {
            current_month = month_array[month_array.indexOf(current_month)-1];
        }
        loadSelectedMonth(current_month,current_year);
    }
    else if (e.target.classList.contains('slider-right')||e.target.classList.contains('next-month')) {
        if(month_array.indexOf(current_month) === 11) {
            current_month = month_array[0];
            current_year++;
        }
        else {
            current_month = month_array[month_array.indexOf(current_month)+1];
        }
        loadSelectedMonth(current_month,current_year);
    }
}

function addEvent(evnt, elem, func) {
    if (elem.addEventListener)  // W3C DOM
       elem.addEventListener(evnt,func,false);
    else if (elem.attachEvent) { // IE DOM
       elem.attachEvent("on"+evnt, func);
    }
    else { // No much to do
       elem[evnt] = func;
    }
 }



// Load the calender based upon the month and year selected
function loadSelectedMonth(current_month, current_year) {
    document.getElementsByClassName('present-month')[0].innerText = current_month + ' ' + current_year;
    var element_to_be_removed = document.getElementsByClassName('dynamic-calendar-container')[0];
    element_to_be_removed.parentNode.removeChild(element_to_be_removed);
    var dynamic_calendar_container = document.createElement('div');
    dynamic_calendar_container.classList.add('dynamic-calendar-container');
    var dateObj = new Date('1 ' + current_month + ' ' + current_year);
    var current_month_first_date = new Date('1 ' + current_month + ' ' + current_year);
    var current_month_first_day = current_month_first_date.getDay();
    var number_of_days_in_a_month = new Date(current_year, dateObj.getMonth()+1, 0).getDate();
    var count=1;
    var prev_month_count_start = new Date(current_year, dateObj.getMonth(), 0).getDate() - current_month_first_day + 1;
    var next_month_count_start = 1;
    for(var j=0; j<6; j++) {
        var parent_row = document.createElement('div');
        parent_row.classList.add("calendar-row");
        for(var i=0; i<7; i++) { 
            var child_cell = document.createElement('div');
            child_cell.classList.add("calendar-cell");
            if(j===0 && i<current_month_first_day) {
                child_cell.innerText = prev_month_count_start;
                child_cell.classList.add("previous-month");
                child_cell.classList.add("update-dynamic-month");
                prev_month_count_start++;
            }else if(count>number_of_days_in_a_month) {
                child_cell.innerText = next_month_count_start;
                child_cell.classList.add("next-month");
                child_cell.classList.add("update-dynamic-month");
                next_month_count_start++;
            }
            else {
                child_cell.innerText = count;
                child_cell.classList.add("current-month");
                child_cell.setAttribute("data-date", count);
                count++;
            }
        parent_row.appendChild(child_cell);
        }
    dynamic_calendar_container.appendChild(parent_row);
    document.getElementsByClassName('calendar-table')[0].appendChild(dynamic_calendar_container);
    }
    var bindElements = document.getElementsByClassName('update-dynamic-month');
    for(var i=0; i<bindElements.length; i++){
        addEvent('click', bindElements[i], changeView);
    };
    var bindElements = document.getElementsByClassName('current-month');
    for(var i=0; i<bindElements.length; i++){
        addEvent('click', bindElements[i], function(){
            var selected_day = this.getAttribute('data-date');
            selected_day = new Date(selected_day + ' ' + current_month + ' '+ current_year);
            displayEvent(selected_day);
        });
    };

}


// Function to create an event on that particular selected day
function createEvent(selected_day) {
    globalEventStore[selected_day.toString()] = globalEventStore[selected_day.toString()] || [];
    var createField = document.getElementsByClassName('add-event-text-field')[0];
    createField.classList.remove('hide');
    var createButton = document.getElementsByClassName('primary-button')[0];
    addEvent('click',createButton,function(){
       var event_description =  document.getElementsByClassName('event-value')[0].value;
       if(event_description.trim(' ').length > 0){
        globalEventStore[selected_day.toString()].push(event_description);
        createField.classList.add('hide');
        displayEvent(selected_day);
       }
    })
}

// function to edit an event on that particular day
function editEvent(selected_day) {

}

//function to delete an event on that particular day 
function deleteEvent(selected_day) {

}

// function to display an event on that particular day
function displayEvent(selected_day) {
    var modal = document.getElementsByClassName('calendar-modal')[0];
    modal.classList.remove('hide');
    var modalHeading = document.getElementsByClassName('modal-heading')[0];
    modalHeading.innerText = selected_day.getDate() + ' ' + month_array[selected_day.getMonth()] + ' ' + selected_day.getFullYear();
    var addIcon = document.getElementsByClassName('add-icon')[0];
    addEvent('click', addIcon, function(){
        createEvent(selected_day);
    })
    if(globalEventStore[selected_day.toString()] !== undefined) {
        // display event
        var tempDiv;
        for(var i=0; i<globalEventStore[selected_day.toString()].length; i++){
           tempDiv = document.createElement('div');
           tempDiv.innerText = globalEventStore[selected_day.toString()][i];
           modal.appendChild(tempDiv);
        }
    }
    else {
        //display nothing
        
    }
}