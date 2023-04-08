const express = require('express')
const path = require('path')
const apiRoutes = require('./routes/apiroutes')
const htmlRoutes = require('./routes/htmlroutes')
const fs = require('fs')
const notes = ('./db/db.json')

const PORT = 3001

const app = express()

//creating middleware for parsing json
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//app.use for api routes
app.get('/api/notes', (req, res) =>{
    res.json(notes.slice(1))
})


// app.use('/api', apiRoutes)
app.use('/', htmlRoutes)
app.use(express.static('public'))

//function to create a note 
function createNote(body, arrayNote) {
    const note = body
    arrayNote.push(newNote)
    fs.writeFileSync(
        path.join(__dirname, './db/db.json'),
        JSON.stringify(arrayNote, null, 2)
    )
    return note
}

//function to delete note
function deleteNote(id, arrayNote) {
    for (var i = 0; i < arrayNote.length; i++) {
        let notePosition = arrayNote[i]

        if (notePosition.id === id) {
            arrayNote.splice(i, 1)
            fs.writeFileSync(
                path.join(__dirname, './db/db.json'),
                JSON.stringify(arrayNote, null, 2)
            )

            break
        }
    }
}

app.delete('/api/notes/:id', (req,res) => {
    deleteNote(req.params.id, notes)
    res.json(true)
})

app.listen(PORT, () =>
    console.log(`app listening at http://localhost:${PORT}`)
)