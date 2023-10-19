const express = require('express')
const router = express.Router()
const BookController = require('../controllers/BookController')

router
  .route('/livros')
  .get(BookController.listAll)
  .post(BookController.createBook)
router
  .route('/livros/:id')
  .put(BookController.updateBook)
  .delete(BookController.deleteBook)
  .get(BookController.getBookById)

module.exports = router
