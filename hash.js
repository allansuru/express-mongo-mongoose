const bcrypt = require('bcrypt');

async function run() {
    const salt = await bcrypt.genSalt(10);
    // salt.then(x => {
    //     console.log('SALT: ', x);    
    // }); 
     const hashed = await bcrypt.hash('1234', salt);
     console.log('SALT: ', salt);
     console.log('HASH: ', hashed);       
}


run();