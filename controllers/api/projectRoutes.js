const router = require('express').Router();
const { Project } = require('../../models/index');

const withAuth = (req, res, next) => {
    if (req.session.logged_in) {
        next()
    } else {
        res.redirect('/login')
    }
}
router.post('/', withAuth, async (req, res) => {
    try {
        const newProject = await Project.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        // res.redirect('/');
        res.status(200).json(newProject);
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/delete/:id', withAuth, async (req, res) => {
    try {
        const projectData = await Project.destroy({
            where: {
                id: req.params.id
            },
        });

        if (!projectData) {
            res.status(404).json({ message: 'No project found with this id!' });
            return;
        }
        res.redirect('/');
        // res.status(200).json(projectData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, (req, res) => {
    Project.update(
        {
            hr: req.body.hr,
            min: req.body.min,
            sec: req.body.sec
        },
        {
            where: {
                id: req.params.id,
            }
        }
    )
        .then((projectData) => {
            if (!projectData) {
                res.status(404).json({ message: "No project found with this id" });
                return;
            }
            res.json(projectData);
        })
        .catch((err) => {
            console.log(err);
            res.status(500).json(err);
        });
});
router.get('/projects', async (req, res) => {
    try {
        const response = await Project.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['name']
        })
        const projects = response.map((project) => project.get({ plain: true }));
        var projectNames = projects.map(function (item) {
            return item['name'];
        });
        const response2 = await Project.findAll({
            where: {
                user_id: req.session.user_id
            },
            attributes: ['min']
        })
        const projectTime = response2.map((project) => project.get({ plain: true }));
        var projectTimes = projectTime.map(function (item) {
            return item['min'];
        });
        res.status(200).send({ time: projectTimes, name: projectNames })
    } catch (error) {
        res.status(500).json({ message: error })
    }

})

module.exports = router;