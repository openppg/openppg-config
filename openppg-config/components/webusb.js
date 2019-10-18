import React, { useState } from 'react';
import Link from 'next/link'
import * as Serial from '../helpers/serial'
import { Button } from 'reactstrap';
let port;

function WebUSB() {
  let [status, setStatus] = useState(0);

  const connectSerial = () => {
    if (port) {
      port.disconnect();
      connectButton.textContent = 'Connect';
      statusDisplay.textContent = '';
      setStatus(status = "disconnected")
      port = null;
    } else {
      Serial.requestPort().then(selectedPort => {
        port = selectedPort;
        console.log(port)
        // connect();
        setStatus(status = "connecting")

      }).catch(e => {
        setStatus(status = e.message)
      });
    }
  }
  return (
    <div>
      <Button id="connect-btn" color="primary" onClick={() => connectSerial()}>Connect</Button>
      <div>Status: <code>{status || "..."}</code></div>
      <style jsx>{`
        connect-btn {
          text-align: center;
        }
      `}</style>
    </div>
  );
}

export default WebUSB
