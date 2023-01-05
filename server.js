const express = require('express');
const path = require('path');
// const api = require('./routes/index.js');
const fs = require('fs');

const PORT = process.env.port || 3001;

const app = express();


// // Middleware for parsing JSON and urlencoded form data
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // use this so you can have accees to routes on line 4
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/notes.html'))
);

//  if anything thats not notes or predefined
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, 'public/index.html'))
);
app.get('/api/notes', (req, res) => {
    readFromFile('/db/db.json').then((data) => res.json(JSON.parse(data)));
  
    // Log our request to the terminal
    console.info(`${req.method} request received to get reviews`);
  });

// POST request to add a note
app.post('/api/reviews', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (text && title) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
      };

      fs.readFile(`./db/reviews.json`, "utf-8", (err,data)=>{
        const fileData=JSON.parse(data);
        fileData.push(newNote);
        // Write the string to a file
        fs.writeFile(`./db.json`,JSON.stringify(fileData, null, 4), (err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote.product} has been written to JSON file`
            )
      );
      })
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    } else {
      res.status(500).json('Error in posting review');
    }
  });

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);