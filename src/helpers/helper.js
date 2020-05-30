
/**
 * Function to toggle div display property
 * 
 * @param {String} id 
 */
export const showHide = (id) => {
    const div = document.getElementById(id);
    div.style.display = (div.style.display === 'flex') ? 'none' : 'flex';
}

/**
 * function that returns the number of days that exist from one date to another date
 * @param {string} startDate 
 * @param {string} finishDate 
 */
export const getDays = (startDate, finishDate) => {
    let start = new Date(startDate + ' 9:00:00')
    const finish = new Date(finishDate + ' 9:00:00')
    let days = 0
    if(start.getMonth() === finish.getMonth()) {
        days = finish.getDate() - start.getDate()
    }
    else { //diff months
        const monthdays = new Date(start.getFullYear(), start.getMonth() + 1, 0).getDate()
        const startdays = monthdays - start.getDate()
        days = startdays + finish.getDate() + 1
    }

    return days
}

/**
 * function that returns the number of hours between 2 times
 * @param {string} date 
 * @param {string} startTime 
 * @param {string} finishTime 
 */
export const getHours = (date, startTime, finishTime) => {
        const startDate = new Date(date + ' ' + startTime)
        const startMinutes  = (startDate.getHours() * 60)  + startDate.getMinutes()
        const finishDate = new Date(date + ' ' + finishTime)
        const finishMinutes  = (finishDate.getHours() * 60) + finishDate.getMinutes()
        const hours = (finishMinutes - startMinutes) / 60
        return hours.toFixed(2) 
    }

/**
 * function that formats an string for proper format:
 *  a. to render it in an input type date (forInput = true)
 *  b. to send it to the server (forInput = false)
 * @param {string} date 
 * @param {boolean} forInput 
 */
export const formatDate = (date, forInput) => {
    const newDate = new Date(date + " 00:00:00")
    
    const year = (newDate.getFullYear()).toString()
    
    const month = newDate.getMonth() + 1
    const strMonth = month < 10 ? '0' + month.toString() : month.toString()
    
    const day = newDate.getDate()
    const strDay = day < 10 ? '0' + day.toString() : day.toString()
    
    return forInput ? `${year}-${strMonth}-${strDay}` : `${strMonth}/${strDay}/${year}`
}

/**
 * function to format a time string to HH:mm:ss
 * @param {string} time 
 */
export const formatTime = (time) => {
    return time.length === 5 ? time + ':00' : time
}

/**
 * function to format a days string to DD
 * @param {string} days 
 */
export const formatDays = (days) => {
    const strDays = days.toString()
    return strDays.length === 1  ? '0' + strDays : strDays
}