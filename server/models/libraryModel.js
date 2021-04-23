// Requires in pool from postgres

const { Pool } = require('pg');

const PG_URI = 'postgres://abikfmrq:NIHfqlcmFxri4yozuO_EQ0JEPBIJJ9BB@queenie.db.elephantsql.com:5432/abikfmrq'

// create new instance of pool using connection URL above

const pool = new Pool({
  connectionString: PG_URI
})

// Notes about the database will go here 

// ElephantSQL
// url: postgres://abikfmrq:NIHfqlcmFxri4yozuO_EQ0JEPBIJJ9BB@queenie.db.elephantsql.com:5432/abikfmrq
// pw:  NIHfqlcmFxri4yozuO_EQ0JEPBIJJ9BB
// user & default db: abikfmrq
// API key: 7a1c3b8d-9a8a-4fa7-9fb9-feb1373a3b29

// Tables Created:

// Users                          // Book List            
// -----------------              // -------------------
// _id : primary key              // _id : primary key
// user_name                      // book_id : taken from Books Primary Key
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


// Temp data currently stored in database: 
// USERS - (_id: 1, user_name: 'hello')
// BOOKS:
// (_id: 1, title: 'test title', author: 'author', page_count: 20, cover_url: 'coverurl', isbn: 12345)
// (_id: 2, title: 'second title', author: 'second author', page_count: 25, cover_url: 'coverurl', isbn: 54321)
// (_id: 3, title: 'third title', author: 'third author', page_count: 45, cover_url: 'coverurl', isbn: 87654)

// BOOK LIST :
// (_id: 1, book_id: 1, user_id: 1, status: 'in progress', page_number: 10)
// (_id: 2, book_id: 2, user_id: 1, status: 'to be read', page_number: 0)
// (_id: 3, book_id: 3, user_id: 1, status: 'completed', page_number: 0)

// REVIEW LIST - (_id: 1, book_id: 3, user_id: 1, stars: 4, review: 'great')

// export database to be used in controllers 

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
}