const app = require('express')()
// eslint-disable-next-line import/order
const server = require('http').createServer(app)
const io = require('socket.io')(server)
const users = require('./users')()

io.on('connection', (socket) => {
  // eslint-disable-next-line no-console
  console.log('IO Connected')

  socket.on('userJoin', (data, cb) => {
    if (!data.name) {
      // eslint-disable-next-line standard/no-callback-literal
      return cb('Вы не ввели свое имя')
    }
    socket.join('chat')
    users.remove(socket.id)
    users.add({
      userId: socket.id,
      name: data.name
    })
    // eslint-disable-next-line standard/no-callback-literal
    cb({ userId: socket.id })
    io.to('chat').emit('usersUpdate', users.getAll())
    socket.emit('newMessage', { name: 'system', text: `Привет ${data.name}!` })
    socket.broadcast.to('chat').emit('newMessage', { name: 'system', text: `${data.name} Подключился` })
  })

  socket.on('createMessage', (data, cb) => {
    if (!data) {
      // eslint-disable-next-line standard/no-callback-literal
      return cb('Что то пошло не так!')
    }
    const user = users.get(data.userId)
    if (user) {
      io.to('chat').emit('newMessage', { userId: socket.id, name: data.name, text: data.text })
      cb()
    }
  })

  socket.on('userExit', (id, cb) => {
    const user = users.remove(id)
    if (user) {
      io.to('chat').emit('usersUpdate', users.getAll())
      io.to('chat').emit('newMessage', { name: 'system', text: `${user.name} вышел!` })
    }
    cb()
  })

  socket.on('disconnect', () => {
    const user = users.remove(socket.id)
    if (user) {
      io.to('chat').emit('usersUpdate', users.getAll())
      io.to('chat').emit('newMessage', { name: 'system', text: `${user.name} вышел!` })
    }
  })
})

module.exports = {
  app,
  server
}
