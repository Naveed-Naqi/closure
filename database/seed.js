const { Place, Image } = require("./models");
// const upload = require("./upload");

const seedDatabase = async () => {
  const csv = require("csv-parser");
  const fs = require("fs");

  let len = 0;

  fs.createReadStream("ClosedRestaurants.csv")
    .pipe(csv())
    .on("data", async (row) => {
      const { Name, Address, Picture, Summary } = row;

      len++;

      try {
        const newPlace = await Place.create({
          name: Name,
          address: Address,
          summary: Summary,
        });

        const newImage = await Image.create({
          link: Picture,
          placeId: newPlace.id,
        });
      } catch (err) {
        console.log(err);
      }
    })
    .on("end", () => {
      console.log("CSV file successfully processed");
      console.log(len);
    });
};

seedDatabase();

module.exports = seedDatabase;
