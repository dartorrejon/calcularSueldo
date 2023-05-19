function generateCalendar(year, month) {
    var startDate = new Date(year, month, 1);
    var endDate = new Date(year, month + 1, 0);
    
    var calendarHTML = '<table>';
    calendarHTML += '<tr><th colspan="7">' + startDate.toLocaleString('default', { month: 'long', year: 'numeric' }) + '</th></tr>';
    calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    
    var currentDate = startDate;
    while (currentDate <= endDate) {
      if (currentDate.getDay() === 0) {
        calendarHTML += '<tr>';
      }
      calendarHTML += '<td>' + currentDate.getDate() + '</td>';
      if (currentDate.getDay() === 6) {
        calendarHTML += '</tr>';
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    calendarHTML += '</table>';
    return calendarHTML;
  }
  
  // Ejemplo de uso:
  var year = 2023;
  var month = 4;  // El mes se representa en base 0 (0 = enero, 1 = febrero, etc.)
  var calendar = generateCalendar(year, month);
  console.log(calendar);
  body = document.querySelector('body');
  body.innerHTML = calendar;