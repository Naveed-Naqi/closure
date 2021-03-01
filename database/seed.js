const seedDatabase = () => {
  const csv = require("csv-parser");
  const fs = require("fs");

  fs.createReadStream("ClosedRestaurants.csv")
    .pipe(csv())
    .on("data", (row) => {
      console.log(row);
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
    });
};

seedDatabase();

module.exports = seedDatabase;
