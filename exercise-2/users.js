// users.js
const https = require("https");

function getUsers() {
  return new Promise((resolve, reject) => {
    https
      .get("https://jsonplaceholder.typicode.com/users", (resp) => {
        let data = "";

        // A chunk of data has been received.
        resp.on("data", (chunk) => {
          data += chunk;
        });

        // The whole response has been received.
        resp.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      })
      .on("error", (err) => {
        reject(err);
      });
  });
}

module.exports = { getUsers };
