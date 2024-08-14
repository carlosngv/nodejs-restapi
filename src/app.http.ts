import http from 'http';
import fs from 'fs';

const server = http.createServer( ( req, res ) => {


    // res.writeHead(200, { 'Content-Type': 'text/html' } );
    // res.write('<h1>Hola mundo</h1>');
    // res.end();

    if( req.url === '/' ) {
        const htmlFile = fs.readFileSync('./public/index.html', 'utf-8');
        res.writeHead(200, { 'Content-Type' : 'text/html' } );
        res.end( htmlFile );
        return
    }

    if( req.url?.endsWith('.js') ) {
        res.writeHead(200, { 'Content-Type' : 'application/javascript' } );
    }

    if( req.url?.endsWith('.css') ) {
        res.writeHead(200, { 'Content-Type' : 'text/css' } );
    }
    const responseFile = fs.readFileSync(`./public${ req.url }`, 'utf-8');
    res.end( responseFile );


});


server.listen( 3000, () => {
    console.log('Server running on port 3000')
} );
