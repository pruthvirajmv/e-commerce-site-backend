const express = require('express');


const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello Express app!')
});

  
const Port = process.env.PORT || 5000

app.listen(Port, () => {
console.log(`server started @ ${Port}`);
});