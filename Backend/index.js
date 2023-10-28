const express = require("express");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const { Sequelize, DataTypes } = require("sequelize");

require('dotenv').config();

const sequelize = new Sequelize(process.env.PostgreSQLURL, {
  dialect: 'postgres',
});

// ascendlogindata model
const Ascendmodel = sequelize.define('ascendlogindata', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

//todoinfo model
const todomodel = sequelize.define('todoinfo', {
  listNo: {
    type: DataTypes.STRING,
  },
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true
  },
});

const Award = sequelize.define('award', {
  award: {
    type: DataTypes.STRING,
  },
  year: {
    type: DataTypes.INTEGER,
  },
});

todomodel.hasMany(Award);

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  console.log("Welcome to Home Page");
  res.send("Welcome to the Home Page");
});

// Create a new TODO item
app.post("/tododata", async (req, res) => {
  const { id } = req.body;
  await todomodel.create({ id });
  res.sendStatus(201); // Created
});

// Retrieve the list of TODO items along with associated awards
app.get("/todolist", async (req, res) => {
  const todolist = await todomodel.findAll({ include: [Award] });
  console.log(todolist);
  res.send(todolist);
});

// Add a new award to an existing TODO item
app.post("/textdata", async (req, res) => {
  const { id, text } = req.body;
  const newAward = {
    award: text,
  };

  try {
    const todo = await todomodel.findByPk(id);
    if (todo) {
      await Award.create(newAward);
      await todo.addAward(newAward);
      res.sendStatus(201); // Created
    } else {
      res.status(404).send("Todo not found.");
    }
  } catch (err) {
    console.error('Error updating document', err);
    res.status(500).send("Internal Server Error");
  }
});

// Delete an award associated with a TODO item
app.post("/tododelete", async (req, res) => {
  const { id, _id } = req.body;
  try {
    const award = await Award.findByPk(_id);
    if (award) {
      await award.destroy();
      res.sendStatus(204); // No Content
    } else {
      res.status(404).send("Award not found.");
    }
  } catch (err) {
    console.error('Error deleting award', err);
    res.status(500).send("Internal Server Error");
  }
});

// Handle the drag-and-drop functionality for awards between TODO items
app.post("/dro", async (req, res) => {
  const { id, dropid, dragtext, dragid } = req.body;
  const newAward = {
    award: dragtext,
  };

  try {
    const award = await Award.findByPk(id);
    if (award) {
      await award.destroy();
      const todo = await todomodel.findByPk(dropid);
      if (todo) {
        await todo.addAward(newAward);
        res.sendStatus(200); // OK
      } else {
        res.status(404).send("Todo not found.");
      }
    } else {
      res.status(404).send("Award not found.");
    }
  } catch (err) {
    console.error('Error updating document', err);
    res.status(500).send("Internal Server Error");
  }
});

// User login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Ascendmodel.create({ email, password });
    const token = jwt.sign({ foo: user.id }, 'token');
    res.send(token);
  } catch (err) {
    console.error('Error creating user', err);
    res.status(500).send('Internal Server Error');
  }
});

sequelize.sync().then(() => {
  app.listen(8000, () => {
    console.log("Server is running on port 8000");
  });
});
