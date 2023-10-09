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


const User = sequelize.define('Users', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    last_name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, {
    timestamps: true
});

const ContactInfo = sequelize.define('ContactInfos', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    phone: {
        type: Sequelize.STRING,
        allowNull: false,
    },

}, {
    freezeTableName: true,
    timestamps: true
});

const Tweet = sequelize.define('Tweets', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    title: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false,
    },

}, {
    timestamps: true
});

//hasOne,belongsTo,hasMany,BelongsToMany



User.hasOne(ContactInfo, {
    foriegnKey: {
        allowNull: false
    }
});// This show that User table is sharing the Users Id with contact info
ContactInfo.belongsTo(User); // this show that COntact info is belongs to user table

User.hasOne(Tweet, {
    foriegnKey: {
        allowNull: false
    }
})
Tweet.belongsTo(User);    

User.belongsToMany(User,{as: "User",foreignKey:"UserId",through:"Follow"});
User.belongsToMany(User,{as: "Followed",foreignKey:"follwerId",through:"Follow"});

sequelize.sync();  

module.exports = { Customer, User, ContactInfo, Tweet };