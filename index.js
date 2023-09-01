const http = require('http')
const app = require('./server')
const Sequelize_1 = require('sequelize')
const port_1 = 5626;

//NEED TO GO THRIOUGH THIS BECAUSE I CANT USE THIS IN MODULE EXPORTS
const sequeliz = new Sequelize_1('NewDb', 'postgres', '123456', {
    host: 'localhost',
    port:'5432',
    dialect: 'postgres',
    logging: false
})



async function connect() {
    try {
        await sequeliz.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}
connect();


const server = http.createServer(app);

server.listen(port_1, () => {
    console.log('listening on port')
});


module.exports = {sequeliz,Sequelize_1}