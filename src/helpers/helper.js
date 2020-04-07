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
