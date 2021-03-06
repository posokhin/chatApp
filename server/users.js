class Users {
  constructor () {
    this.users = []
  }

  add (user) {
    this.users.push(user)
  }

  get (id) {
    return this.users.find(user => user.userId === id)
  }

  remove (id) {
    const user = this.get(id)
    if (user) {
      this.users = this.users.filter(user => user.userId !== id)
    }
    return user
  }

  getAll () {
    return this.users
  }
}

module.exports = function () {
  return new Users()
}
