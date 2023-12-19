const express = require("express");
const fs = require("fs");
const Joi = require("joi");

const app = express();
const PORT = 3000;

app.use(express.json());

const filePath = "./users.json";

const userSchema = Joi.object({
  name: Joi.string().required(),
  secondName: Joi.string().required(),
  city: Joi.string().required(),
  age: Joi.number().integer().min(0).required(),
});

app.get("/users", (req, res) => {
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  res.json(users);
});

app.post("/users", (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const maxId = Math.max(users.map((user) => user.id));
  const newUser = {
    id: maxId + 1,
    name: req.body.name,
    secondName: req.body.secondName,
    city: req.body.city,
    age: req.body.age,
  };

  users.push(newUser);
  fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
  res.json({ id: newUser.id });
});

app.put("/users/:id", (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) {
    return res.status(400).json({ error: error.details[0].message });
  }
  const userId = req.params.id;
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const userExists = users.some((user) => user.id === userId);
  if (!userExists) {
    res.status(404).json({ error: "User not found" });
  } else {
    users.forEach((user) => {
      if (user.id === userId) {
        user.name = req.body.name;
        user.secondName = req.body.secondName;
        user.city = req.body.city;
        user.age = req.body.age;
      }
    });
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2));
    res.json(users);
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const users = JSON.parse(fs.readFileSync(filePath, "utf-8"));
  const updatedUsers = users.filter((user) => user.id !== userId);
  fs.writeFileSync(filePath, JSON.stringify(updatedUsers, null, 2));
  res.json(updatedUsers);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
