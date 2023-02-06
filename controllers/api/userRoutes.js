const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {

    try {
        const userData = await User.create(req.body);

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;
            res.status(200).redirect('/');
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.redirect('/')
        });

    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/logout', (req, res) => {

    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).redirect('/login');
            });
        } else {
            res.status(404).end();
        }
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;
