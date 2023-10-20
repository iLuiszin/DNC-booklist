const Book = require('../models/Book')
const errorHandler = require('../utils/errorHandler')

module.exports = class BookController {
  static async createBook(req, res) {
    try {
      const { id, titulo, num_paginas, isbn, editora } = req.body

      const bookExists = await Book.findOne({ id })

      if (bookExists) {
        return res.status(400).send('Livro já cadastrado!')
      }

      const book = new Book({ id, titulo, num_paginas, isbn, editora })

      await book.save()
      return res.status(201).send('Livro cadastrado com sucesso!')
    } catch (error) {
      console.log(error)
      return errorHandler(res, error)
    }
  }

  static async listAll(req, res) {
    try {
      const books = await Book.find()
      return res.status(200).json(books)
    } catch (error) {
      console.log(error)
      return errorHandler(res, error)
    }
  }

  static async updateBook(req, res) {
    try {
      const { titulo, num_paginas, isbn, editora } = req.body
      const bookId = req.params.id
      const bookUpdated = { titulo, num_paginas, isbn, editora }

      const bookExists = await Book.findOneAndUpdate(
        { id: bookId },
        bookUpdated
      )

      if (!bookExists) {
        return res.status(404).json({
          status: 'Error',
          mensagem: 'Livro não encontrado ou inexistente!',
        })
      }

      return res.status(200).json({
        status: 'Success',
        mensagem: 'Livro atualizado com sucesso!',
      })
    } catch (error) {
      console.log(error)
      return errorHandler(res, error)
    }
  }

  static async getBookById(req, res) {
    try {
      const bookId = req.params.id

      const book = await Book.findOne({ id: bookId })

      if (!book) {
        return res.status(404).json({
          status: 'Error',
          mensagem: 'Livro não encontrado ou inexistente!',
        })
      }

      return res.status(200).json(book)
    } catch (error) {
      console.log(error)
      return errorHandler(res, error)
    }
  }

  static async deleteBook(req, res) {
    try {
      const bookId = req.params.id

      const bookExists = await Book.findOneAndDelete({ id: bookId })

      if (!bookExists) {
        return res.status(404).json({
          status: 'Error',
          mensagem: 'Livro não encontrado ou inexistente!',
        })
      }

      return res.status(200).json({
        status: 'Success',
        mensagem: 'Livro deletado com sucesso!',
      })
    } catch (error) {
      console.log(error)
      return errorHandler(res, error)
    }
  }
}
