const Sequelize = require('sequelize')
const pkg = require('../../package.json')
const DATABASE_URL = `postgres://be_my_voice_user:vKovX0SZWbFe2hETl4erZNPuehFH7Dt9@dpg-ce2ft96n6mpu84q36s4g-a.oregon-postgres.render.com/be_my_voice`

const databaseName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const config = {
  logging: false
};

if(process.env.LOGGING === 'true'){
  delete config.logging
}

//https://stackoverflow.com/questions/61254851/heroku-postgres-sequelize-no-pg-hba-conf-entry-for-host
if(process.env.DATABASE_URL){
  config.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  };
}

const db = new Sequelize(`postgres://be_my_voice_user:vKovX0SZWbFe2hETl4erZNPuehFH7Dt9@dpg-ce2ft96n6mpu84q36s4g-a.oregon-postgres.render.com/be_my_voice`);
//   {
//   // process.env.DATABASE_URL || `postgres://localhost:5432/${databaseName}`, config)
//   database: "be_my_voice",
//   username: "be_my_voice_user",
//   password: "vKovX0SZWbFe2hETl4erZNPuehFH7Dt9",
//   host: "postgres://be_my_voice_user:vKovX0SZWbFe2hETl4erZNPuehFH7Dt9@dpg-ce2ft96n6mpu84q36s4g-a/be_my_voice",
//   port: 5432,
//   dialect: "postgres",
//   dialectOptions: {
//     ssl: {
//       require: true,
//       rejectUnauthorized: false // <<<<<<< YOU NEED THIS
//     }
//   },
// });
module.exports = {db}
