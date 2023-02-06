const router = require('express').Router();
const { NotePad } = require('../../models/index');

router.post('/', async (req, res) => {
    const newNotepad = await NotePad.create({
        ...req.body
    }).then((data) => {
        res.status(200).json(data)
    }).catch(err => {
        res.send(err);
    })
})
module.exports = router