var express = require('express');
var Sequelize = require('sequelize');

var db = new Sequelize('tuhi', 'sqlite-user', null, {
    dialect: 'sqlite',
    storage: 'test.db'
});

var User = db.define('user', {
    username: {
        type: Sequelize.STRING,
        primaryKey: true,
        allowNull: false
    },
    password: {
        type: Sequelize.CHAR,
        allowNull: false
    }
}, {
    timestamps: false, // suppress Sequelize's createdAt and updateAt
});

var Note = db.define('note', {
    // Sequelize gives us an 'id' field by default. This is n_sync_id.
    date_created: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    packaging_method: {
        type: Sequelize.STRING,
        allowNull: false
    },
    type: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false, // suppress Sequelize's createdAt and updateAt
});
Note.belongsTo(User, {foreignKey: 'username'});

var NoteContent = db.define('note_content', {
    // Sequelize gives us an 'id' field by default. This is nc_sync_id.
    date_created: {
        type: Sequelize.INTEGER.UNSIGNED,
        allowNull: false
    },
    deleted: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    packaged_data: {
        type: Sequelize.TEXT,
        allowNull: false
    }
}, {
    timestamps: false, // suppress Sequelize's createdAt and updateAt
});
NoteContent.belongsTo(Note, {foreignKey: 'note_id'});

db.sync().then(function() {
    return Note.create({
        date_created: 123,
        packaging_method: 'none',
        type: 'plain'
    });
}).then(function(n) {
    console.log(n.id);
});

var app = express();
var port = 8080;

app.get('/', function(req, res) {
    res.json({ 'hello': 'world' });
});

app.listen(port, function() { 
    console.log('Listening on port: ' + port);
});
