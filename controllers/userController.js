const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const Client = require('../models/clientModel');
const router = require("express").Router()
const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

const loginUser = async (req, res) => {
  const { username, password } = req.body
  try {
    const user = await User.login(username, password)
    // create a token

    const token = createToken(user._id)
    const role = user.role
    res.status(200).json({ username, token, role, id: user._id, subject: user.subject })
  } catch (error) {
    res.status(400).send(`${error}`)

  }
}
const signupUser = async (req, res) => {
  const { username, password, name, lastname, number, subject } = req.body
  console.log(req.body)
  try {
    const user = await User.signup(username, password, name, lastname, number, subject)

    // create a token
    const token = createToken(user._id)
    console.log(token)
    const role = user.role
    res.status(200).json({ username, token, role, id: user._id, name, lastname, subject })
  } catch (error) {
    res.status(400).send(`${error}`)
  }
}

const getUsers = async (req, res) => {



  try {
    const users = await User.find();


    res.send(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error retrieving users");
  }
}
const getSingleUser = async (req, res) => {
  try {
    const userid = req.params.id;
    if (!userid) {
      return res.status(400).send("Invalid client ID");
    }
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).send("client not found");
    }

    let array = await Client.find({ teacherid: userid })

    const data = {
      user,
      array
    }

    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating client");
  }
}
const updateUser = async (req, res) => {
  try {
    const userid = req.params.id;
    const { username, name, lastname, number } = req.body
    if (!userid) {
      return res.status(400).send("Invalid client ID");
    }

    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).send("client not found");
    }

    user.name = name ? name : user.name
    user.username = username ? username : user.username
    user.lastname = lastname ? lastname : user.lastname
    user.number = number ? number : user.number

    await user.save();

    res.status(200).send(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating client");
  }
}
const deleteUser = async (req, res) => {
  const userid = req.params.id;
  const user = await User.findById(userid);
  if (!userid) {
    return res.status(400).send("Invalid client ID");
  } else if (!user) {
    return res.status(404).send("user topilmadi!");
  }
  let isUser = await Client.findOne({ teacher: user.username })
  let isName = isUser?.name ? true : false
  try {
    if (isName) {
      return res.status(404).send(`${user.username}ning hali o'quvchisi bor, oldin shularni o'chiring`);
    } else {
      const user = await User.findByIdAndDelete(userid);
      res.status(200).send(`${user.username}ni o'chirildi`);
    }
  } catch (error) {
    return res.status(401).send(`${user.username}ning hali o'quvchisi bor, oldin shularni o'chiring`);
  }
}

const getStaticUser = async (req, res) => {
  try {
    const userid = req.params.id;

    if (!userid) {
      return res.status(400).send("Invalid client ID");
    }
    const user = await User.findById(userid);

    if (!user) {
      return res.status(404).send("client not found");
    }

    let array = await Client.find({ teacherid: userid })

    const data = {
      user,
      array
    }


    res.status(200).send(data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error updating client");
  }
}

module.exports = { signupUser, loginUser, getUsers, updateUser, deleteUser, getSingleUser, getStaticUser }