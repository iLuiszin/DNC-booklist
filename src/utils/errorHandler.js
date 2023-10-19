const S = require('string')

const errorHandler = (res, err) => {
  if (String(err).includes(`ValidationError`)) {
    return res.status(400).json({
      status: 'Error',
      mensagem: S(String(err).replace('ValidationError: ', '')).replaceAll(
        ':',
        ''
      ).s,
      answer: String(err),
    })
  }

  if (String(err).includes(`Error:`)) {
    return res.status(400).json({
      status: 'Error',
      mensagem: String(err).replace('Error: ', ''),
      answer: String(err),
    })
  }

  console.log(err)
  return res.status(500).json({
    status: 'Error',
    mensagem: 'Erro interno do servidor',
    answer: String(err),
  })
}

module.exports = errorHandler
