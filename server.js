const express = require('express');
const session = require('express-session');
const routes = require('./controllers');
const exphbs = require('express-handlebars');
const path = require('path');
const cors = require('cors')


const helpers = require('./helpers/utils');

const hbs = exphbs.create({ helpers });
const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);


const app = express();
const PORT = process.env.PORT || 3001;
app.use(express.static(path.join(__dirname, './public')))
app.use(cors())

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

const sess = {
    secret: 'Super secret secret',
    cookie: {},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};


app.use(express.static(path.join(__dirname, '/public')))
app.use(session(sess));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));



app.use(routes);
app.get('*', (req, res) => {
    res.render('error')
})
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
});
