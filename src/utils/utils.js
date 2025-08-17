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


export function convertISOToDateTime(isoString) {
  const date = new Date(isoString);  // Parse the ISO timestamp

  // Get date and time parts
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  // Combine into readable format
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

// Example usage
const isoString = "2025-07-25T09:38:20.844584Z";
console.log(convertISOToDateTime(isoString));
// Output (in your local time): "2025-07-25 15:08:20"  (for IST)


export function saveStoreSlug(storeName){
  localStorage.setItem('storeName', JSON.stringify(storeName))
}

export function getStoreName(){
  return JSON.parse(localStorage.getItem('storeName'));
}

export function getUserId(){
  const token = JSON.parse(localStorage.getItem('token'));
  console.log(token.userId, 'token');
  return token?.userId
}