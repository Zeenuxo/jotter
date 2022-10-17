//JS Logic for Date & Time

//Paramters for toLocaleDateString()
const date_settings = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
};



//clock function wrapped inside a setInterval
setInterval(() => {
    

    
const currentTime = new Date();

//Extract Date & Time Infor from Date() constructor and convert in specified format, 'clock_settings', using toLocaleDateString
let date = currentTime.toLocaleDateString(undefined, date_settings);


//Display Time by Concatenating Hrs + Min + Secs
let time = currentTime.getHours() + ':' + currentTime.getMinutes() + ':' + currentTime.getSeconds();


//Change element ID with Date & Time information
document.getElementById('time').innerHTML = time;
document.getElementById('date').innerHTML = date;

}, 1000);