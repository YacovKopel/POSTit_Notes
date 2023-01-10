const notes = require('express').Router();
const { json } = require('express');
const fs = require('fs');
const uuid = require('../helpers/uuid');

notes.get('/', async(req, res) => {
    let data= fs.readFileSync(`db/db.json`, "utf8")
    console.log("line 8", data)
    data=JSON.parse(data)
    console.log("line 10", data)
    res.json(data)

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
        id: uuid(),
      };

      fs.readFile(`db/db.json`, "utf8", (err,data)=>{
        const fileData=JSON.parse(data);
        fileData.push(newNote);
        console.log(fileData)
        // Write the string to a file
        fs.writeFile(`db/db.json`,JSON.stringify(fileData, null, 4), (err) =>
        err
          ? console.error(err)
          : console.log(
              `Review for ${newNote.title} has been written to JSON file`
            )
      );
     
  
      const response = {
        status: 'success',
        body: newNote,
      };
  
      console.log(response);
      res.status(201).json(response);
    })
    } else {
      res.status(500).json('Error in posting review');
    }
  });

  module.exports= notes;