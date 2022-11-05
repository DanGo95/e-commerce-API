const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;

        /* define endpoints */
        this.paths = {
            auth: '/api/auth',
            category: '/api/category',
            subcategory: '/api/subcategory',
        };

        this.dbConnect();
        this.middlewares();
        this.routes();

    }


    async dbConnect() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(cors());
        /* body parse */
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.category, require('../routes/category'));
        this.app.use(this.paths.subcategory, require('../routes/subcategory'));

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('corriendo en el puerto', this.port);
        });
    }

}

module.exports = Server;