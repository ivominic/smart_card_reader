var cardreader = require("card-reader");

cardreader.on("device-activated", function (reader) {
  console.log(reader);
  console.log(reader.reader.name);
  console.log(`Device '${reader.reader.name}' activated`);
});

cardreader.on("device-deactivated", function (reader) {
  console.log(`Device '${reader}' deactivated`);
});

cardreader.on("card-removed", function (reader) {
  console.log(`Card removed from '${reader.name}' `);
});

cardreader.on("command-issued", function (reader, command) {
  console.log(`Command '${command}' issued to '${reader.name}' `);
});

cardreader.on("response-received", function (reader, response, command) {
  console.log(`Response '${response}' received from '${reader.name}' in response to '${command}'`);
});

cardreader.on("error", function (message) {
  console.log(`Error '${message}' received`);
});

cardreader.on("card-inserted", function (reader, status) {
  console.log(`Card inserted into '${reader.reader.name}' `);
  // issue a command...

  // ...either callback style
  cardreader.issueCommand("00A404000E315041592E5359532E4444463031", function (err, response) {
    if (err) {
      console.error(err);
    } else {
      console.log(`Response '${response.toString("hex")}`);
    }
  });

  // ...or as a promise
  /*cardreader
    .issueCommand("00A404000E315041592E5359532E4444463031")
    .then(function (response) {
      console.log(`Response '${response.toString("hex")}`);
    })
    .catch(function (error) {
      console.error(error);
    });*/
});
