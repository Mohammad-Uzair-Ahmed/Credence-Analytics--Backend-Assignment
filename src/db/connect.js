const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/bookstore", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => {
    console.log("Database Successfully Connected....")
}).catch((e) =>{
    console.log(`DB Error: ${e.message}`);
})