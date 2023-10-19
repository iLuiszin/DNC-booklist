const mongoose = require('../db/conn')
const { Schema } = mongoose

const Book = mongoose.model(
  'Book',
  new Schema(
    {
      id: {
        type: Number,
        required: 'é obrigatório!',
      },
      titulo: {
        type: String,
        required: 'é obrigatório!',
      },
      num_paginas: {
        type: Number,
        required: 'é obrigatório!',
      },
      isbn: {
        type: Number,
        required: 'é obrigatório!',
      },
      editora: {
        type: String,
        required: 'é obrigatório!',
      },
    },
    {
      timestamps: true,
    }
  )
)

module.exports = Book
