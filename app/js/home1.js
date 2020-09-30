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
        if (comms_flasher === 1) {
            comms_flasher = 0;
        } else {
            comms_flasher = 1;
        }
    }

    modbus_text = "0";

    myvalue = (mybyte[14]);
    document.getElementById("AD1").innerHTML = myvalue.toFixed(0).toString();
    myvalue = (mybyte[13]);
    document.getElementById("AD2").innerHTML = myvalue.toFixed(0).toString();
    myvalue = (mybyte[15]);
    document.getElementById("AD3").innerHTML = comms_flasher; // myvalue.toFixed(0).toString();
}

setInterval(myTimer, 1000);
getText();

function myTimer() {
    myFunction();

}