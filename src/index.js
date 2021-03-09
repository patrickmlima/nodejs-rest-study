const customExpress = require('./config/customExpress');
const dbconnection = require('./db/connection');
const Tables = require('./db/tables');

dbconnection.connect((err) => {
    if (err) {
        console.error(`Error on DB connection: [${err}]`);
        return;
    }
    
    console.log('Stablished connection with database');
    Tables.init(dbconnection);
    
    const app = customExpress();
    app.listen(3000, () => console.log('Server running on port 3000'));
});
