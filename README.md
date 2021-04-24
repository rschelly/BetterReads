# Better Reads

This  project is designed to create an application that will allow users easy access to a  personal library of books of their choice. It will contain sections for books a user has yet to read, books they are currently reading, and books they have finished. There will also be a profile page and a search page. 

To Be Started - 
### Create an Account
 -  [ ] Front End:
    - Section on log in page to create an account with input boxes
 - [ ] Back End: 
    - Store username and passwords in database. Bcrypt? Or plain text? 
    ✅ Set up mongoose schema for user
    - Route handler for submission of form data to database 

### Log into Account 
- ✅ Front End:
        - Section on log in page to log in with previously saved username and password
- [ ] Back End: 
        - Access and verify username and passwords from database. Bcrypt? Plain text? 
        - Route handler for submission of form data to database 

    
### Search for Book
 - [ ] Front End:
        - Search bar/page that passes query to database or API 
        - Displays results returned from database or API
 - [ ] Back End:
        - Route handler for query to pass to either database if book already exists or fetch from API
        - Return results from query to front end in appropriate format


### Add Book to To Be Read

- [ ] Front End:
     - Display result from search has "add" button that places the book into the To Be Read list.
     - To Be Read list updates automatically once book has been added
- [ ] Back End:
     - Route Handler to retrieve book information from add button and places book information into database and return updated list
     - Create database schema for books (if Mongoose): Title, Author, Page Count, Start Date?, Finished Date?, Current Page?

### Mark Book from TBR as read
- [ ] Front End:
      - On to be read list, book has toggle switch(? or something) to mark as Read
- [ ] Back End:
      - 
- [ ] Mark Book from TBR as currently reading / page number or chapter?
- [ ] Front End:
      - On to be read list, book has toggle switch(? or something) to mark as In Progress
      - Section to add page number currently on? Chapter? 
- [ ] Back End:
      - Route handler to update book status in database and add page number/chapter

### Give Book Rating
 - [ ] Front End:
        - When marking book as read, option is presented to leave a star review. 
 - [ ] Back End:
        - Route handler to pass star rating from front end to database 

### Leave Review for Book
 - [ ] Front End:
        - When marking book as read, option is presented to leave a text review
 - [ ] Back End:
        - Route handler to pass text review rating from front end to database 

  ### Access Completed List
- [ ] Front End:
        - Page with each book marked as read displayed with book info, star rating, and review if applicable.
- [ ] Back End:
        - Provide route handler to provide completed list from database to front end when list is selected

###  Access To Be Read List
- [ ] Front End:
        - Page with each book added to to be read list displayed with book info and toggle switch(or whatever) to mark as read once complete
- [ ] Back End:
        - Provide route handler to provide completed list from database to front end when list is selected
