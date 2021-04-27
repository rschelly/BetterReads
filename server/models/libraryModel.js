// Requires in pool from postgres

const { Pool } = require('pg');


const PG_URI = 'postgres://abikfmrq:NIHfqlcmFxri4yozuO_EQ0JEPBIJJ9BB@queenie.db.elephantsql.com:5432/abikfmrq'

// create new instance of pool using connection URL above

const pool = new Pool({
  connectionString: PG_URI
})

// Tables Created:

// Users                          // Book List            
// -----------------              // -------------------
// _id : primary key              // _id : primary key
// username                       // book_id : taken from Books Primary Key
                                  // user_id : taken from User Primary Key
// Books                          // status
// ----------------               // page number
// _id: primary key       
// title                          // Review List
// author                         // ---------------------
// page count                     // _id : primary key
// cover url                      // book_id : taken from Books Primary Key
// isbn                           // user_id : taken from User Primary Key
                                  // stars
                                  // review


// export database to be used in controllers 

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}