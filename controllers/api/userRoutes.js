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
        res.status(400).render('error');
    }
});

router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({ where: { email: req.body.email } });

        if (!userData) {
            res.status(400).render('error');
            return;
        }

        const validPassword = await userData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).render('error');
            return;
        }

        req.session.save(() => {
            req.session.user_id = userData.id;
            req.session.logged_in = true;

            res.redirect('/')
        });

    } catch (err) {
        res.status(400).render('error');
    }
});

router.get('/logout', (req, res) => {

    try {
        if (req.session.logged_in) {
            req.session.destroy(() => {
                res.status(204).redirect('/login');
            });
        } else {
            res.status(400).render('error');
        }
    } catch (error) {
        res.status(400).render('error');
    }

});

module.exports = router;
