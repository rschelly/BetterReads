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


// Temp data currently stored in database: 
// USERS - (_id: 1, user_name: 'hello')
// BOOKS:
// (title: 'test title', author: 'author', page_count: 20, cover_url: 'coverurl', isbn: 12345)
// (title: 'second title', author: 'second author', page_count: 25, cover_url: 'coverurl', isbn: 54321)
// (title: 'third title', author: 'third author', page_count: 45, cover_url: 'coverurl', isbn: 87654)

// BOOK LIST :
// (book_id: 1, user_id: 1, status: 'in progress', page_number: 10)
// (book_id: 2, user_id: 1, status: 'to be read', page_number: 0)
// (book_id: 3, user_id: 1, status: 'completed', page_number: 0)

// REVIEW LIST - (book_id: 3, user_id: 1, stars: 4, review: 'great')

// export database to be used in controllers 

module.exports = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  }
}