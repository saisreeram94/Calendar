var month_array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
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
                prev_month_count_start++;
            }else if(count>number_of_days_in_a_month) {
                child_cell.innerText = next_month_count_start;
                child_cell.classList.add("next-month");
                next_month_count_start++;
            }
            else {
                child_cell.innerText = count;
                count++;
            }
        parent_row.appendChild(child_cell);
        }
    dynamic_calendar_container.appendChild(parent_row);
    document.getElementsByClassName('calendar-table')[0].appendChild(dynamic_calendar_container);
    }
}
