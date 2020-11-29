const path = require('path')
const fs = require('fs')

const uploadPath = 'public/uploads/notes'

function createPrePath(dirs, index) {
    const res = []

    dirs.forEach((dir, i) => {
        if (i < index) {
            res.push(dir)
        }
    })
    return res.join('/')
}

function createDirIfNotExists(relativePath) {
    const dirs = relativePath.split('/').filter(item => item.trim() !== '')
    dirs.forEach((dir, index) => {
        const prePath = createPrePath(dirs, index)
        const absolutePath = path.join(__dirname, prePath, dir)

    })
}

createDirIfNotExists(uploadPath)