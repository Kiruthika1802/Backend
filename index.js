const router = require("./routes/index");
const db = require("./database/index")

const express = require('express');
const app = express();
app.use(express.json());

const cors = require('cors');
app.use(cors());

const dotenv = require('dotenv');
dotenv.config();



app.get('/', (req, res) => {
    res.send('Hello World');
})
app.use("/ToDo", router);


const port = process.env.PORT;
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});