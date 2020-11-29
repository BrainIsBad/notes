const path = require('path')
const fs = require('fs')
const {Router} = require('express')
const multer = require('multer')
const Note = require('../models/Note')

function checkFileType(file, cb) {
    const fileTypes = /jpeg|jpg|png|gif|svg/

    const extName = fileTypes.test(path.extname(file.originalname))
    const mimeType = fileTypes.test(file.mimetype)

    if (extName && mimeType) {
        return cb(null, true)
    } else {
        cb('Error: images only')
    }
}

const router = Router()
const storage = multer.diskStorage({
    destination: './public/upload/notes',
    filename(req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
    }
})
const upload = multer({
    storage,
    fileFilter(req, file, cb) {
        checkFileType(file, cb)
    }
})

router.get('/:page', async (req, res) => {
    const limit = 5

    let page = +req.params.page

    if (isNaN(page)) page = 1

    const skip = limit * (page - 1)
    const notes = await Note.find().skip(skip).limit(limit)
    const total = await Note.countDocuments()
    const isOver = (total - (limit * (page))) <= 0
    return res.status(200).json({notes, total, isOver})
})

router.post('/create', upload.single('image'), async (req, res) => {
    const note = new Note({...req.body, image: req.file ? req.file.filename : ''})
    return res.status(200).json({note: await note.save()})
})

router.delete('/:id', async (req, res) => {
    const note = await Note.findById(req.params.id)

    if (note) {
        if (note.image) {
            fs.unlink(`../public/upload/notes/${note.image}`, e => null)
        }

        return res.status(200).json({
            success: await note.remove()
        })
    }

    return res.status(404).json({message: 'Note not found'})
})

module.exports = router