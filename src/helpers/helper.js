
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

export const formatDate = (date, forInput) => {
    const newDate = new Date(date + " 00:00:00")
    
    const year = (newDate.getFullYear()).toString()
    
    const month = newDate.getMonth() + 1
    const strMonth = month < 10 ? '0' + month.toString() : month.toString()
    
    const day = newDate.getDate()
    const strDay = day < 10 ? '0' + day.toString() : day.toString()
    
    return forInput ? `${year}-${strMonth}-${strDay}` : `${strMonth}/${strDay}/${year}`
}

export const formatTime = (time) => {
    return time.length === 5 ? time + ':00' : time
}

export const formatDays = (days) => {
    const strDays = days.toString()
    return strDays.length === 1  ? '0' + strDays : strDays
}