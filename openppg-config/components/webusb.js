import React from 'react'
import Link from 'next/link'
import * as Serial from '../helpers/serial'

const connectSerial = () => (
  Serial.requestPort().then(selectedPort => {
    console.log(selectedPort);
    //connect();
  }).catch(error => {
    console.log(error);
  })
)

const WebUSB = () => (
  <div>
    <button onClick={() => connectSerial()}>Connect</button>

    <style jsx>{`
      :global(body) {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, Avenir Next, Avenir,
          Helvetica, sans-serif;
      }
      nav {
        text-align: center;
      }
      ul {
        display: flex;
        justify-content: space-between;
      }
      nav > ul {
        padding: 4px 16px;
      }
      li {
        display: flex;
        padding: 6px 8px;
      }
      a {
        color: #067df7;
        text-decoration: none;
        font-size: 13px;
      }
    `}</style>
  </div>
)

export default WebUSB
