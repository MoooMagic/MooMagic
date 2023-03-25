const mongoose = require('mongoose');

module.exports = async () => {
    const connectionParams = {
        useNewUrlParser: true,
        useUnifiedTopology: true
    };

    try {
        await mongoose.connect(process.env.DB_URI, connectionParams);
        console.log('Database connected.....')
    } catch (error) {
        console.log(`Error connecting to database:${error}`);
    }
}