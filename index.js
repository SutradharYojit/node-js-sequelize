const http = require('http')
const app = require('./server')
const Sequelize = require('sequelize')
const port_1 = 5626;


const user = 'postgres'
const host = 'localhost'
const database = 'NewDb'
const password = '123456'
const port = '5432'

const sequelize = new Sequelize(database, user, password, {
    host,
    port,
    dialect: 'postgres',
    logging: false
})


async function connect() {
    try {
        await sequelize.authenticate();
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


