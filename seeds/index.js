const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});


const sample = array => array[Math.floor(Math.random() * array.length)];
const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '6202c8616ae01f5b824e4b64',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus veniam accusamus sint possimus molestiae vel eligendi fuga repudiandae doloribus! Quam recusandae quaerat quasi mollitia ex quia adipisci expedita, alias fugiat.',
            price,
            images: [
                {
                    url: 'https://res.cloudinary.com/mohit1909/image/upload/v1645162171/YelpCamp/y4l1pyu6pje6vbg7wnq6.jpg',
                    filename: 'YelpCamp/y4l1pyu6pje6vbg7wnq6',
                }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})