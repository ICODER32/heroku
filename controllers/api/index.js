const router = require('express').Router();
const userRoutes = require('./userRoutes');
const projectRoutes = require('./projectRoutes')
const notepadRoutes = require('./notepadRoutes')


router.use('/users', userRoutes);
router.use('/project', projectRoutes);
router.use('/notepad', notepadRoutes);

module.exports = router;
