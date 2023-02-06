const User = require('./User');
const Project = require('./Project');
const NotePad = require('./Notepad');


User.hasMany(Project, {
    foreignKey: 'user_id'
});
Project.belongsTo(User, {
    foreignKey: 'user_id'
});

Project.hasOne(NotePad, {
    foreignKey: 'project_id'
})

module.exports = { User, Project, NotePad };
