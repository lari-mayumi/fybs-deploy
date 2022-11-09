const Sequelize = require('sequelize');

const sequelize = new Sequelize('fybs', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb'
});

sequelize.authenticate()
.then(function(){
    console.log("Conexão com o banco realizada.");
}).catch(function(){
    console.log("Conexão com o banco não realizada.");
});

module.exports = sequelize;