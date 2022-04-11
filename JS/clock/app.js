const myName = document.querySelector('#myName');
const clock = document.querySelector('#myClock');


function greeting() {
  const person = prompt('Please enter your name below...');
    
  if (person == null || person == "") {
    text = "Misafir";
  } else {
    text = person;
  }
  myName.innerHTML = text;
} 

function showTime() {
  let date = new Date(); 
  const weekday = ["Pazar","Pazartesi","Sali","Carsamba","Persembe","Cuma","Cumartesi"];
  
  let hour = date.getHours();
  let min = date.getMinutes();
  let sec = date.getSeconds();
  let day = weekday[date.getDay()]
  
  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);
  clock.innerHTML = hour + ":" + min + ":" + sec + "-" + day;

  let time = setTimeout(showTime, 1000)
}

function updateTime(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

greeting();
showTime() ;