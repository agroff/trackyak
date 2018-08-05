const config   = {
    development : {
        //url to be used in link generation
        url      : '',
        //mongodb connection settings
        database : {
            host     : '127.0.0.1',
            port     : '27017',
            user     : 'user',
            password : 'secret',
            db       : 'db_name'
        },
        //server details
        server   : {
            host : '127.0.0.1',
            port : '3001'
        }
    },
    production  : {
        //url to be used in link generation
        url      : '',
        //mongodb connection settings
        database : {
            host     : '127.0.0.1',
            port     : '27017',
            user     : 'user',
            password : 'secret',
            db       : 'db_name'
        },
        //server details
        server   : {
            host : '127.0.0.1',
            port : '3421'
        }
    }
};

module.exports = config;
