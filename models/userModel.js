const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const Schema = mongoose.Schema


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  number: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: "user"
  },
  permission: {
    type: Boolean,
    default: true
  },

})

userSchema.statics.signup = async function (username, password, name, lastname, number, subject) {

  if (!username || !password, !number, !subject || !name || !lastname) {
    throw Error('Hammasini to`ldiring')
  }
  const exists = await this.findOne({ username })
  if (exists) {
    throw Error('Bu username oldin ro`yhatdan o`tgan, boshqa username kiriting!')
  }

  const salt = await bcrypt.genSalt(10)
  const hash = await bcrypt.hash(password, salt)
  const user = await this.create({ username, password: hash, number, subject, name, lastname })
  return user
}

userSchema.statics.login = async function (username, password) {

  if (!username || !password) {
    throw Error('Hammasini to`ldiring')
  }


  const user = await this.findOne({ username })
  if (!user) {
    throw Error('username xato')
  }
  if (!user.permission) {
    throw Error('saytga kirish uchun ruxsat yo`q')
  }
  const match = await bcrypt.compare(password, user.password)
  if (!match) {
    throw Error('parol xata')
  }

  return user
}

module.exports = mongoose.model('User', userSchema)