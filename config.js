require('dotenv').config();

const config = {
    database: {
        host: process.env.DB_HOST || 'host name',       
        user: process.env.DB_USER || 'username',           
        password: process.env.DB_PASSWORD || 'password',       
        database: process.env.DB_NAME || 'database',   
        port: process.env.DB_PORT || 'database port',             
        connectionLimit: 10                            
    },
    server: {
        host: process.env.SERVER_HOST || 'host name',  
        port: process.env.SERVER_PORT || 'server port'          
    }
};

module.exports = config;
