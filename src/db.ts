import mongoose, { ConnectOptions } from 'mongoose';

mongoose
  .connect('mongodb+srv://madhurgera2:EODnsgJUE3UA6wOO@cluster0.ajjzvs1.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true
  } as ConnectOptions)
  .then(() => {
    console.log('Connection successful');
  })
  .catch((error) => {
    console.log('Connection error:', error);
  });

mongoose.connection;