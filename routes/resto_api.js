// const request = require('request');

// let myUrl = 'https://developers.zomato.com/api/v2.1/search?sort=rating&order=dsc';
// const Fetchresto = function(callback) {
//   request(myUrl, (error, response, body) => {
//     if (error) {
//     console.log(error);
//     } else {
//       const data = JSON.parse(body);
//       for (let i = 0; i < data.length; i++) {
//         console.log(data)
//         if (data.length === 0) {
//           console.log("not found")
//         } else {
//         const data1 = JSON.stringify(data[i].description);
//       }
//     });
//   }
