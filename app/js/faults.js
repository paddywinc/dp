var mybyte = new Uint16Array(64);
var comms_flasher = 0; // to maybe be used later
var modbus_text = ""; //Global variable used to get the data  from the Comms function
//Functions blocks below
function myFunction() {

var myvalue = 0;
// Read the data  and split the values
getText(); // function in the "comms.js" file , common to all
if (modbus_text !== "0") {
var res = modbus_text.split(", "); // split into an array
for (i = 0; i < 32; i++) {
mybyte[i] = parseInt(res[i]);
}
if (comms_flasher === 1){
comms_flasher = 0;
} else {
comms_flasher = 1;
}
}
modbus_text = "0";
// Air Blower ON
if ((mybyte[2] & Math.pow(2, 14)) > 0) {
document.getElementById("ipled1").classList.add('active');
document.getElementById("status1").textContent = "ON";
} else {
document.getElementById("ipled1").classList.add('inactive');
document.getElementById("status1").textContent = "OFF";
}
// Water Valve Open
if ((mybyte[3] & Math.pow(2, 3)) > 0) {
document.getElementById("ipled2").classList.add('active');
document.getElementById("status2").textContent = "OPEN";
} else {
document.getElementById("ipled2").classList.add('inactive');
document.getElementById("status2").textContent = "CLOSED";
}
// Water Pump On
if ((mybyte[2] & Math.pow(2, 10)) > 0) {
document.getElementById("ipled3").classList.add('active');
document.getElementById("status3").textContent = "ON";
} else {
document.getElementById("ipled3").classList.add('inactive');
document.getElementById("status3").textContent = "OFF";
}
// Water Pressure OK
if ((mybyte[1] & Math.pow(2, 2)) > 0) {
document.getElementById("ipled4").classList.add('active');
document.getElementById("status4").textContent = "OK";
} else {
document.getElementById("ipled4").classList.add('inactive');
document.getElementById("status4").textContent = "NONE";
}
// Tower Flow OK
if ((mybyte[1] & Math.pow(2, 0)) > 0) {
document.getElementById("ipled5").classList.add('active');
document.getElementById("status5").textContent = "ON";
} else {
document.getElementById("ipled5").classList.add('inactive');
document.getElementById("status5").textContent = "OFF";
}
// Cross Jet OK
if ((mybyte[1] & Math.pow(2, 1)) > 0) {
document.getElementById("ipled6").classList.add('active');
document.getElementById("status6").textContent = "ON";
} else {
document.getElementById("ipled6").classList.add('inactive');
document.getElementById("status6").textContent = "OFF";
}
// ******* Second column ************
// FMS Powered ON
if ((mybyte[3] & Math.pow(2, 1)) > 0) {
document.getElementById("ipled7").classList.add('active');
document.getElementById("status7").textContent = "ON";
} else {
document.getElementById("ipled7").classList.add('inactive');
document.getElementById("status7").textContent = "OFF";
}
// PSH401 OK
if ((mybyte[1] & Math.pow(2, 4)) > 0) {
document.getElementById("ipled8").classList.add('active');
document.getElementById("status8").textContent = "OK";
} else {
document.getElementById("ipled8").classList.add('inactive');
document.getElementById("status8").textContent = "---";
}
// FMS Started OK
if ((mybyte[1] & Math.pow(2, 7)) > 0) {
document.getElementById("ipled9").classList.add('active');
document.getElementById("status9").textContent = "ON";
} else {
document.getElementById("ipled9").classList.add('inactive');
document.getElementById("status9").textContent = "OFF";
}
// Fuel Gas Valve Open
if ((mybyte[0] & Math.pow(2, 3)) > 0) {
document.getElementById("ipled10").classList.add('active');
document.getElementById("status10").textContent = "OPEN";
} else {
document.getElementById("ipled10").classList.add('inactive');
document.getElementById("status10").textContent = "CLOSED";
}
// Temperature OK
if ((mybyte[0] & Math.pow(2, 14)) > 0) {
document.getElementById("ipled11").classList.add('active');
document.getElementById("status11").textContent = "OK";
} else {
document.getElementById("ipled11").classList.add('inactive');
document.getElementById("status11").textContent = "---";
}
// Process Online
if (((mybyte[2] & Math.pow(2, 8)) > 0) || ((mybyte[2] & Math.pow(2, 9)) > 0)|| ((mybyte[2] & Math.pow(2, 11)) > 0) || ((mybyte[2] & Math.pow(2, 12)) > 0)) {
document.getElementById("ipled12").classList.add('active');
document.getElementById("status12").textContent = "ONLINE";
} else {
document.getElementById("ipled12").classList.add('inactive');
document.getElementById("status12").textContent = "OFLINE";
}
}
setInterval(myTimer, 250);
getText();
function myTimer() {
myFunction();
}
