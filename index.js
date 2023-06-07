function createEmployeeRecord(employeeData) {
    return {
        firstName: employeeData[0],
        familyName: employeeData[1],
        title: employeeData[2],
        payPerHour: employeeData[3],
        timeInEvents: [],
        timeOutEvents: []
    };
}

function createEmployeeRecords(arrayOfArrays) {
    return arrayOfArrays.map(employeeData => createEmployeeRecord(employeeData));
}

function createTimeInEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    employeeRecord.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function createTimeOutEvent(employeeRecord, dateTimeString) {
    const [date, hour] = dateTimeString.split(' ');

    employeeRecord.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour),
        date: date
    });
    return employeeRecord;
}

function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
  
    if (timeInEvent && timeOutEvent) {
      const timeInHour = timeInEvent.hour;
      const timeOutHour = timeOutEvent.hour;
      return (timeOutHour - timeInHour) / 100;
    }
  
    return 0;
}

function wagesEarnedOnDate(employeeRecord, date) {
    const hoursWorked = hoursWorkedOnDate(employeeRecord, date);
    const payRate = employeeRecord.payPerHour;
    const wagesEarned = hoursWorked * payRate;

    return wagesEarned;
}

function allWagesFor(employeeRecord) {
    const allDates = employeeRecord.timeInEvents.map(event => event.date);
    let totalWages = 0;

    allDates.forEach(date => {
        totalWages += wagesEarnedOnDate(employeeRecord, date);
    });
    return totalWages;
}

function calculatePayroll(employeeRecords) {
    let totalPayroll = 0;

    employeeRecords.forEach(employeeRecord => {
        totalPayroll += allWagesFor(employeeRecord);
    });
    return totalPayroll;
}
