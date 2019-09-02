const Note = require('../models/note.model')

exports.create = (req, res) => {
    // Validate request
    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can not be empty"
        })
    }

    const note = new Note({
        title: req.body.title || "Untitled Note",
        content: req.body.content
    })

    note.save()
        .then((data) => {
            res.send(data)
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occured"
            })
        })
}

exports.findAll = (req, res) => {
    Note.find()
        .then((notes) => {
            res.send(notes)
        }).catch((err) => {
            res.status(500).send({
                message: err.message || "Something went wrong!"
            })
        })
}

exports.findOne = (req, res) => {
    Note.findById(req.params.noteId)
        .then((note) => {
            if (!note)
                return res.status(404).send({
                    message: "No data found!"
                })
            res.send(note)
        })
        .catch(err => {
            if (err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "Note not found with id"
                })
            }
            return res.status(500).send({
                message: "Error retriving note"
            })
        })

}

exports.update = (req, res) => {

    if (!req.body.content) {
        return res.status(400).send({
            message: "Note content can't be empty"
        })
    }

    Note.findByIdAndUpdate(req.params.noteId, {
        title: req.body.title || "Untitle Note",
        content: req.body.content
    }, { new: true })
        .then((note) => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id"
                })
            }
            res.send(note)
        })
        .catch(err => {
            if (err.kind == "ObjectId") {
                return res.status(404).send({
                    message: "Note not found with id"
                })
            }
            return res.status(500).send({
                message: "error found"
            })
        })
}

exports.delete = (req, res) => {

    Note.findByIdAndRemove(req.params.noteId)
        .then(note => {
            if (!note) {
                return res.status(404).send({
                    message: "Note not found with id " + req.params.noteId
                });
            }
            res.send({ message: "Note deleted successfully!" });
        })
        .catch(err => {
            if (err.kind == 'ObjectId' || err.name == "NotFound") {
                return res.status(404).send({
                    message: "Not found"
                })
            }
            return res.status(500).send({
                message: "could not complete your request!"
            })
        })
}