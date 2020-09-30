function getText(){
   /* // read text from URL location
    var request = new XMLHttpRequest();
    //request.open('GET', 'http://127.0.0.1:3000/1', true);
    request.open('GET', 'http://127.0.0.1:3000/read');
    request.responseType = 'text';
    request.onload = function () {
      if (request.readyState === request.DONE) {
        modbus_text = request.responseText;
      }
    };
    request.onerror = function() {
        alert("Request failed");
    };
    request.send(null);*/

    //uncomment if you wish to simulate data and comment above
    modbus_text = "21041, 5, 21041, 5, 1, 0, 1, 20, 65519, 65428, 65518, 65428, 5, 1300, 600, 0, 0, 4404, 58, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0"
  }