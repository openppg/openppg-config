(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', e => {
    let connectButton = document.querySelector("#connect");
    let statusDisplay = document.querySelector('#status');
    let port;

    $('#form1 input').on('change', function() {
      var orientation = $('input[name=orientation]:checked', '#form1').val();
      var baro_calibration = $("input#seaPressureInput").val();
      var metric_temp = $("#units-temp").prop("checked");
      var metric_alt = $("#units-alt").prop("checked");

      var usb_json = {
          "major_v" : 4,
          "minor_v" : 1,
          "screen_rot": orientation,
          "sea_pressure": parseFloat(baro_calibration),
          "metric_temp": metric_temp,
          "metric_alt": metric_alt
        }
      console.log("sending", usb_json);
      port.send(new TextEncoder('utf-8').encode(JSON.stringify(usb_json)));
      $("#saved-status").show().delay(2500).fadeOut(300);
    });

    document.querySelector("button#bl").addEventListener('click', function(){
      var bl_command_json = {
        "command": "rbl"
      }
      console.log("sending", bl_command_json);
      port.send(new TextEncoder('utf-8').encode(JSON.stringify(bl_command_json)));
      disconnect();
    });

    function connect() {
      port.connect().then(() => {
        statusDisplay.textContent = '';
        connectButton.textContent = 'Disconnect';

        port.onReceive = data => {
          let textDecoder = new TextDecoder();
          var usb_input = textDecoder.decode(data);
          if (usb_input.length < 5) { return };
          var usb_parsed = JSON.parse(usb_input); // TODO figure out why empty data is sent
          $("#armedTime").text(display(usb_parsed["armed_time"]));
          $("#deviceId").text(usb_parsed["device_id"]);
          $("#orientation-lh").prop("checked", usb_parsed["screen_rot"] == 2);
          $("#orientation-rh").prop("checked", usb_parsed["screen_rot"] == 0);
          $("#units-temp").prop("checked", usb_parsed["metric_temp"]);
          $("#units-alt").prop("checked", usb_parsed["metric_alt"]);
          $("#seaPressureInput").val(usb_parsed["sea_pressure"]);
          console.log("received", usb_input);
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
        disconnect();
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

    function disconnect(){
      port.disconnect();
      connectButton.textContent = 'Connect';
      statusDisplay.textContent = '';
      port = null;
    }
  });
})();
