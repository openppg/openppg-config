import React from 'react'
import Link from 'next/link'
import * as Serial from '../helpers/serial'
import { Button } from 'reactstrap';

const connectSerial = () => (
  Serial.requestPort().then(selectedPort => {
    console.log(selectedPort);
    //connect();
  }).catch(error => {
    console.log(error);
  })
)

const WebUSB = () => (
  <div id="">
    <Button id="connect-btn" color="primary" onClick={() => connectSerial()}>Connect</Button>

    <style jsx>{`
      connect-btn {
        text-align: center;
      }
    `}</style>
  </div>
)

export default WebUSB
