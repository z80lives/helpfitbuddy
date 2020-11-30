const process = require("process");

const app = require("./app/app.js");

const server = app.listen(5000);

// Graceful shutdown of server
const shutdown = () => {
    console.log('\n[server] Shutting down...');
    //app.close();

    server.close(() => {
        console.log('Closed out remaining connections');
        process.exit(0);
    });
    
    setTimeout(() => {
        console.error('Shutdown Failed: forcing shutdown...');
        process.exit(1);
    }, 100);
};



process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
process.on('uncaughtException', (ex)=>{
    console.error(ex);
    shutdown();    
});




