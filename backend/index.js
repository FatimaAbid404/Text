const connectToMongo=require('./db');
const express = require('express')
var cors = require('cors')

connectToMongo();
const app = express()
const port = 5000
app.use(cors())

// app.get('/', (req, res) => {
//   res.send('Hello World!')
// })
app.use(express.json())

 app.use('/api/auth',require('./routes/auth'))
app.use('/api/keywords',require('./routes/keywords'))
app.use('/api/video', require('./routes/video'));
app.use('/uploads', express.static('uploads'));



app.listen(port, () => {
  console.log(`Video-App listening on port ${port}`)
})
