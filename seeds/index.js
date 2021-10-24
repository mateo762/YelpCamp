const mongoose = require("mongoose");
const Campground = require("../models/campground");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");

mongoose.connect("mongodb://localhost:27017/yelp-camp", { useNewUrlParser: true, useUnifiedTopology: true });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; ++i) {
        const random1000 = Math.floor((Math.random() * 1000));
        const price = Math.round((Math.random() * 20 + 10) * 100) / 100;
        const camp = await new Campground({
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: [
                {
                    url: 'https://res.cloudinary.com/b32bwew/image/upload/v1634646944/YelpCamp/zxy3gkrn0e1msgjs0bvo.jpg',
                    filename: 'YelpCamp/zxy3gkrn0e1msgjs0bvo',
                },
                {
                    url: 'https://res.cloudinary.com/b32bwew/image/upload/v1634646944/YelpCamp/ogu89qgkvxse8hecntqo.jpg',
                    filename: 'YelpCamp/ogu89qgkvxse8hecntqo',
                },
                {
                    url: 'https://res.cloudinary.com/b32bwew/image/upload/v1634646944/YelpCamp/xjv9grxdkya6hx25gpam.jpg',
                    filename: 'YelpCamp/xjv9grxdkya6hx25gpam',
                },
                {
                    url: 'https://res.cloudinary.com/b32bwew/image/upload/v1634646944/YelpCamp/lkmhtsobk3lc7ksliwkt.jpg',
                    filename: 'YelpCamp/lkmhtsobk3lc7ksliwkt',
                },
                {
                    url: 'https://res.cloudinary.com/b32bwew/image/upload/v1634646944/YelpCamp/nlez0s9csskbmlfprofn.jpg',
                    filename: 'YelpCamp/nlez0s9csskbmlfprofn',
                }
            ],
            geometry: {
                type: 'Point', coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            description: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem atque placeat blanditiis harum soluta ea modi doloribus laudantium, dicta iure mollitia porro natus. Aspernatur ducimus quidem amet, blanditiis doloribus officiis",
            price,
            author: "616c52f4f32448310227a226"
        })
        await camp.save();
    }
}

seedDB().then(() => {
    console.log("Elements were inserted succesfully");
    mongoose.connection.close();
}).catch((err) => {
    console.log("Something went wrong:", err);
    mongoose.connection.close();
});