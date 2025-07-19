const setDoummntTitle = (document, title) =>{
    document.title = title;
}
export  const getcountDown = (endTime) =>{
    const difference = new Date(endTime) - new Date(); // in ms
    if (difference <= 0) {
      return { hours: '00', minutes: '00', seconds: '00' };
    }

    const hours = String(Math.floor((difference / (1000 * 60 * 60)) % 24)).padStart(2, '0');
    const minutes = String(Math.floor((difference / (1000 * 60)) % 60)).padStart(2, '0');
    const seconds = String(Math.floor((difference / 1000) % 60)).padStart(2, '0');

    return { hours, minutes, seconds };

}

export const getUpcomingsales =(endTime) =>{
    const difference = new Date(endTime) - new Date(); // time left in ms
    if (difference <= 0) {
      return { days: '00', hours: '00', minutes: '00', seconds: '00' };
    }
    const  timedata = getcountDown(endTime);
    const days = String(Math.floor(difference / (1000 * 60 * 60 * 24))).padStart(2, '0');
    return {
        day: days,
        hours:timedata.hours,
        minutes:timedata.minutes,
        seconds:timedata.seconds
    }
}
export default setDoummntTitle
