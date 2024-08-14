import express, { Router } from 'express';
import path from 'path';

interface Options {
    port: number;
    routes: Router;
    publicPath: string;
}

export class Server {

    private app = express();
    private readonly port: number;
    private readonly publicPath: string;
    private readonly routes: Router;

    constructor( options: Options ) {
        this.port = options.port;
        this.publicPath = options.publicPath;
        this.routes = options.routes;
    }

    async start() {


        // ? Middlewares

        // ! middleware para serializar "body" como json
        this.app.use( express.json() );

        // ! middleware para serializar peticiones "x-www-form-urlencoded" como json
        this.app.use( express.urlencoded({ extended: true}) );

        // ? Public folder
        this.app.use( express.static( this.publicPath ) );

        // ? Routes
        this.app.use( this.routes );



        // ! Ruta comodín para no interferir con el router de la SPA
        this.app.get('*', ( req, res ) => {

            const indexPath = path.join( __dirname + `../../../${ this.publicPath }/index.html` );
            res.sendFile( indexPath );

        });

        this.app.listen( this.port, () => {
            console.log(`Server running on port ${ this.port }`);
        } );


    }

}
