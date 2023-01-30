const e = require("express");
const Employee = require("../model/Employee");

// get Employees

const getAllEmployees = async (req, res) => {
  const employees = await Employee.find();

  if (!employees)
    return res.status(204).json({ message: " no employees found" });
  res.json(employees);
};

//create Employee

const createNewEmployee = async (req, res) => {
  if (!req.body.firstname || !req.body.lastname) {
    return res.status(400).json({ message: "First and Last names required" });
  }

  try {
    const result = await Employee.create({
      firstname: req.body.firstname,
      lastname: req.body.lastname,
    });
  } catch (error) {
    console.log(error);
  }
};

// update  Employee code jS

const uopdateEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ message: "ID parameter is required " });
  }

  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: ` NO Employee matches ID ${req.body.id}` });
  }

  if (req.body?.firstname) {
    employee.firstname = req.body.firstname;
  }
  if (req.body?.lastname) {
    employee.lastname = req.body.lastname;
  }

  const result = await employee.save();

  res.json(result);
};

//Delete employee

const deleteEmployee = async (req, res) => {
  if (!req?.body?.id) {
    return res.status(400).json({ "message ": " employee ID required " });
  }
  const employee = await Employee.findOne({ _id: req.body.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: ` NO Employee matches ID ${req.body.id}` });
  }

  const result = await employee.deleteOne({ _id: req.body.id });
  res.json(data.result);
};

//get Employees

const getEmployee = async (req, res) => {
  if (!req.params?.id)
    return res.status(400).json({ message: " Emloyee ID required" });

  const employee = await Employee.findOne({ _id: req.params.id }).exec();

  if (!employee) {
    return res
      .status(204)
      .json({ message: ` NO Employee matches ID ${req.params.id}` });
  }
  res.json({ id: req.params.id, firstname: req.params.firstname });
};

module.exports = {
  getAllEmployees,
  createNewEmployee,
  uopdateEmployee,
  deleteEmployee,
  getEmployee,
};
