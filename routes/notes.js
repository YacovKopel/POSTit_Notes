const notes = require('express').Router();
const fs = require('fs');
const uuid = require('../helpers/uuid');

notes.get('/', async(req, res) => {
    const data= fs.readFileSync(`db/db.json`, "utf-8")
    console.log(data)
    res.json(JSON.parse(data))

    // Log our request to the terminal
    console.info(`${req.method} request received to get reviews`);
  });

// POST request to add a note
notes.post('/', (req, res) => {
    // Log that a POST request was received
    console.info(`${req.method} request received to add a review`);
  console.log(req.body)
    // Destructuring assignment for the items in req.body
    const { title, text } = req.body;
  
    // If all the required properties are present
    if (text && title) {
      // Variable for the object we will save
      const newNote = {
        title,
        text,
        note_id: uuid(),
      };

      fs.readFile(`db/db.json`, "utf-8", (err,data)=>{
        const fileData=JSON.parse(data);
        fileData.push(newNote);
        // Write the string to a file
        fs.writeFile(`db/db.json`,JSON.stringify(fileData, null, 4), (err) =>
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

  module.exports= notes;