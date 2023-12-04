import bcrypt from "bcryptjs";
import SignUpDb from "../../Model/SignupModel/SignupModel.js";

export async function userSignup(req, res, next) {
  try {
    const data = req.body;
    const role = data.role;
    const email = data.email;
    const salt = await bcrypt.genSaltSync(10);
    const existUser = await SignUpDb.findOne({ email: data.email });

    const password = await data.password;
    const details = {
      role: data.role,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      password: bcrypt.hashSync(password, salt),
      location: data.location,
      departmentName: data.departmentName,
    };

    if (existUser) {
      res.status(409).json({
        message: "user already exist",
        data: existUser,
      });
    } else {
      const createUser = await SignUpDb.create(details);
      res.status(201).json({
        message: "User Created Successfully",
        data: createUser,
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}

export async function getEmployee(req, res, next) {
  try {
    const getEmployeeList = await SignUpDb.find();
    res.status(200).json({
      message: "get successfully..",
      data: getEmployeeList,
    });
  } catch (err) {
    next();
  }
}

export async function getoneUser(req, res, next) {
  try {
    const userId = req.params.id;
    console.log("studentId", userId);
    const getoneuser = await SignUpDb.findById(userId);
    res.status(200).json({
      message: "get Successfully",
      data: getoneuser,
    });
  } catch (e) {
    next();
  }
}

export async function updatedepartmentName(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;

    const details = {
      departmentName: data.departmentName,
    };
    const updateList = await SignUpDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "Update successfully",
      data: updateList,
    });
  } catch (err) {
    next();
  }
}

export async function deleteUser(req, res, next) {
  try {
    const data = req.params;
    const employeeId = data.id;
    const DeleteUser = await SignUpDb.findByIdAndDelete(employeeId);
    res.status(200).json({
      message: "Deleted Successfully",
      data: DeleteUser,
    });
  } catch (error) {
    next();
  }
}

export async function userLogin(req, res, next) {
  try {
    const data = req.body;
    console.log("req.body", req.body);
    const existUser = await SignUpDb.findOne({
      email: data.email,
    });
    console.log("email", existUser);
    if (existUser) {
      bcrypt
        .compare(data.password, existUser.password)
        .then((checkPassword) => {
          if (checkPassword) {
            res.status(200).json({
              message: "user login successfully",
              userName: existUser.name,
              data: existUser,
              status: "Successful",
            });
          } else {
            res.status(400).json({
              message: "password not matched",
              status: "Failed",
            });
          }
        });
    } else {
      res.status(400).json({
        message: "user not found",
        status: "Failed",
      });
    }
  } catch (err) {
    console.log(err);
    next();
  }
}
