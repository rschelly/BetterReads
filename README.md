# Better Reads

This project is designed to create an application that will allow users easy access to a personal library of books of their choice. It will contain sections for books a user has yet to read, books they are currently reading, and books they have finished. There will also be a profile page and a search page.

## Link to Scratch Project Brief:

https://docs.google.com/document/d/15telzd4SDhsxvyHEwnYUFwexR_krPoOo9mw4fx1i3so/edit

## What was the original vision for the project:

A site to keep track of books you're currently reading, want to read, and have completed. There should be a login page, and your account will hold all of your book information.

## If the project has strayed from the original vision, why?

N/A

## How far has the project progressed?

## What are some current issues/roadblocks?

Authenticatoin is not working yet. There is no way to add a user to the mongo database without using postman. The verification middleware is not working,

## What are some suggestions for iterating on this project?

### Create an Account

- [✅ ] Section on log in page to create an account with input boxes
- [✅ ] Store username and passwords in database using postman. Bcrypt.
- [✅ ] Store username and password from server.
- [✅ ] Set up mongoose schema for user
- [✅ ] Route handler for submission of form data to database

### Log into Account

- [✅ ] Section on log in page to log in with previously saved username and password
- [ ] Access and verify username and passwords from database. Bcrypt? Plain text? - Route handler for submission of form data to database

### Search for Book

- [✅ ] Search bar/page that passes query to database or API
- [✅ ] Displays results returned from database or API
- [✅ ] Route handler for query to pass to either database if book already exists or fetch from API - Return results from query to front end in appropriate format

### Add Book to To Be Read

- [✅ ] Display result from search has "add" button that places the book into the To Be Read list.
- [✅ ] Route Handler to retrieve book information from add button and places book information into database and return updated list

### My Books

- [✅ ] On my books list, book has a button to mark as Complete
- [✅ ] On my books list, book has a button to update Page Num
- [✅ ] On my books list, book has a button to remove from list
- [✅ ] Route handler to update book status in database and add page number/chapter

### Give Book Rating / Review

- [✅ ] When marking book as read, option is presented to leave a star review.
- [✅ ] When marking book as read, option is presented to leave a text review
- [✅ ] Route handler to pass star rating from front end to database
- [✅ ] Route handler to pass text review rating from front end to database

### Access Completed List

- [✅ ] Page with each book marked as completed displayed with book info
- [✅ ] Provide route handler to provide completed list from database to front end when list is selected

### Access Reviews List

- [✅ ] Page with each book reviewed displayed with star rating and text review
- [✅ ] Provide route handler to provide review list from database to front end when list is selected

### Access To Be Read List

- [✅ ] Page with each book added to to be read list displayed with book info
- [✅ ] On to be read list, book has button to mark as In Progress or Remove
- [✅ ] Provide route handler to provide to be read list from database to front end when list is selected
