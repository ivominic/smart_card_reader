"use strict";

const smartcard = require("smartcard");
const Devices = smartcard.Devices;
const Iso7816Application = smartcard.Iso7816Application;

const devices = new Devices();

devices.on("device-activated", (event) => {
  const currentDevices = event.devices;
  let device = event.device;
  console.log(`Device '${device}' activated, devices: ${currentDevices}`);
  for (let prop in currentDevices) {
    console.log("Devices: " + currentDevices[prop]);
  }

  device.on("card-inserted", (event) => {
    let card = event.card;
    console.log("Kartica");
    console.log(card);
    console.log(`Card '${card.getAtr()}' inserted into '${event.device}'`);

    card.on("command-issued", (event) => {
      console.log(`Command '${event.command}' issued to '${event.card}' `);
    });

    card.on("response-received", (event) => {
      console.log(event);
      console.log(`Response '${event.response}' received from '${event.card}' in response to '${event.command}'`);
    });

    let commandApdu = "80AE8000210000000000000000000000000586000000000005861802020000E44E4B11040001";
    const application = new Iso7816Application(card);
    application
      .issueCommand(commandApdu)
      .then((response) => {
        console.log("AAAAAAAAAAAAAAA");
        console.log(response.meaning());
        console.info(`Select PSE Response: '${response}' '${response.meaning()}'`);
        console.info(`Data only: '${response.getDataOnly()}' '${response.getStatusCode()}'`);
        console.info(`Data only: '${response.isOk()}' '${response.buffer}'`);
      })
      .catch((error) => {
        console.error("Error:", error, error.stack);
      });
  });
  device.on("card-removed", (event) => {
    console.log(`Card removed from '${event.name}' `);
  });
});

devices.on("device-deactivated", (event) => {
  console.log(`Device '${event.device}' deactivated, devices: [${event.devices}]`);
});
