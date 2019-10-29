(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', e => {
    let connectButton = document.querySelector("#connect");
    let statusDisplay = document.querySelector('#status');
    let port;

    $('#form1 input').on('change', function() {
      var orientation = $('input[name=orientation]:checked', '#form1').val();
      var usb_json = {
          "major_v" : 4,
          "minor_v" : 1,
          "screen_rot": orientation
        }
      console.log("sending", usb_json);
      port.send(new TextEncoder('utf-8').encode(JSON.stringify(usb_json)));
    });

    function addLine(linesId, text) {
      var senderLine = document.createElement("div");
      senderLine.className = 'line';
      var textnode = document.createTextNode(text);
      senderLine.appendChild(textnode);
      document.getElementById(linesId).appendChild(senderLine);
      return senderLine;
    }

    let currentReceiverLine;

    function appendLine(linesId, text) {
      if (currentReceiverLine) {
        currentReceiverLine.innerHTML = currentReceiverLine.innerHTML + text;
      } else {
        currentReceiverLine = addLine(linesId, text);
      }
    }

    function connect() {
      port.connect().then(() => {
        statusDisplay.textContent = '';
        connectButton.textContent = 'Disconnect';

        port.onReceive = data => {
          let textDecoder = new TextDecoder();
          var usb_input = textDecoder.decode(data);
          if (usb_input.length < 5) { return };
          var usb_parsed = JSON.parse(usb_input); // TODO figure out why empty data is sent
          console.log("json", usb_parsed);
          $("#armed_time").text(display(usb_parsed["armed_time"]));
          $("#orientation-lh").prop("checked", usb_parsed["screen_rot"] == "l");
          $("#orientation-rh").prop("checked", usb_parsed["screen_rot"] == "r");
          $("#device_id").text(usb_parsed["device_id"]);
          appendLine('receiver_lines', usb_input);
        };
        port.onReceiveError = error => {
          console.error(error);
        };
      }, error => {
        statusDisplay.textContent = error;
      });
    }
    
    function display (minutes) {
      const format = val => `0${Math.floor(val)}`.slice(-2)
      const hours = minutes / 60

      return [hours, minutes % 60].map(format).join(':')
    }

    connectButton.addEventListener('click', function() {
      if (port) {
        port.disconnect();
        connectButton.textContent = 'Connect';
        statusDisplay.textContent = '';
        port = null;
      } else {
        serial.requestPort().then(selectedPort => {
          port = selectedPort;
          connect();
        }).catch(error => {
          statusDisplay.textContent = error;
        });
      }
    });

    serial.getPorts().then(ports => {
      if (ports.length === 0) {
        statusDisplay.textContent = 'No device found.';
      } else {
        statusDisplay.textContent = 'Connecting...';
        port = ports[0];
        connect();
      }
    });
  });
})();
