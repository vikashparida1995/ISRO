require('dotenv').config();
mongoose = require('mongoose');

mongoose.connection.once('open', (err) => {
  console.error('MongoDB connection Ready state:', mongoose.connection.readyState);  
});

mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);    
});

async function mongoConnect() {
 await mongoose.connect(process.env.MONGO_URI,
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false
    }
  )
}


async function mongoDisconnect() {
  await mongoose.disconnect();  
  console.log('Disconnected from MongoDB');
}

  module.exports = {
    mongoConnect,
    mongoDisconnect
  };