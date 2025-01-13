require('dotenv').config();

const config = {
    database: {
        host: process.env.DB_HOST || 'localhost',       
        user: process.env.DB_USER || 'root',           
        password: process.env.DB_PASSWORD || '',       
        database: process.env.DB_NAME || 'database',   
        port: process.env.DB_PORT || 3306,             
        connectionLimit: 10                            
    },
    server: {
        host: process.env.SERVER_HOST || 'localhost',  
        port: process.env.SERVER_PORT || 3000          
    }
};

module.exports = config;
