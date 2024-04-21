export const timeToMilliseconds = (timeString)=> {
    var timeParts = timeString.split(":");
    var hours = parseInt(timeParts[0]);
    var minutes = parseInt(timeParts[1]);
    return ((hours * 3600) + (minutes * 60) ) * 1000;
}


export const millisecondsToTime = (milliseconds) =>{
    var totalSeconds = Math.abs(milliseconds) / 1000;
    var hours = Math.floor(totalSeconds / 3600);
    var minutes = Math.floor((totalSeconds % 3600) / 60);
   return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes ;
}

export const getDiffTime = (time1,time2)=>{
    let time1Millis = timeToMilliseconds(time1);
    let time2Millis = timeToMilliseconds(time2);
    return millisecondsToTime(time1Millis - time2Millis);
    
}

