
window.onload = function() {

// On page load we have to show the current Month and Year
var dateObj = new Date();
var month_array = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
var current_month = month_array[dateObj.getMonth()];
var current_year = dateObj.getFullYear();
document.getElementsByClassName('present-month')[0].innerText = current_month + ' ' + current_year;

//The days of the month should be loaded with next month's and prev's months in faded
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
document.getElementsByClassName('calendar-table')[0].appendChild(parent_row);
}


}

