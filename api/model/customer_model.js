const Sequelize = require('sequelize')



// NEED TO GO THROUGH THIS BECAUSE ITS NOT WORKING (circular dependency)
const sequelize = new Sequelize('NewDb', 'postgres', '123456', {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
    logging: false
})


const Customer = sequelize.define('Customer', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    }
});

sequelize.sync();

module.exports = Customer;