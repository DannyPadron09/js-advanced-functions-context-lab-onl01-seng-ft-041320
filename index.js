/* Your Code Here */
let createEmployeeRecord = function(array) {
    return {
        firstName: array[0],
        familyName: array[1],
        title: array[2],
        payPerHour: array[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

let createEmployeeRecords = function(arrayOfEmployees) {
    return arrayOfEmployees.map(function(array) {
        return createEmployeeRecord(array)
    })
}

let createTimeInEvent = function(dateStamp) {
    let [date, time] = dateStamp.split(' ')
    this.timeInEvents.push({
        type: 'TimeIn',
        hour: parseInt(time, 10),
        date, 
    })
    return this 
}

let createTimeOutEvent = function(dateStamp) {
    let [date, time] = dateStamp.split(' ')
    this.timeOutEvents.push({
        type: 'TimeOut',
        hour: parseInt(time, 10),
        date,
    })
    return this 
}

let hoursWorkedOnDate = function(dateStamp) {
    let startTime = this.timeInEvents.find(function(e) {
        return e.date === dateStamp 
    })
    let endTime = this.timeOutEvents.find(function(e) {
        return e.date === dateStamp 
    })
    return (endTime.hour - startTime.hour) / 100
}

let wagesEarnedOnDate = function(dateStamp) {
    let hoursWorked = hoursWorkedOnDate.call(this, dateStamp)
    let moneyMade = hoursWorked * this.payPerHour 
    return moneyMade 
}
/*
 We're giving you this function. Take a look at it, you might see some usage
 that's new and different. That's because we're avoiding a well-known, but
 sneaky bug that we'll cover in the next few lessons!

 As a result, the lessons for this function will pass *and* it will be available
 for you to use if you need it!
 */

let allWagesFor = function () {
    let eligibleDates = this.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate.call(this, d)
    }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

    return payable
}

let findEmployeeByFirstName = function(srcArray, firstName) {
    return srcArray.find(function(employee) {
        return employee.firstName === firstName 
    })
}

let calculatePayroll = function(array) {
    return array.reduce(function(memo, employee) {
        return memo + allWagesFor.call(employee)
    }, 0)
}