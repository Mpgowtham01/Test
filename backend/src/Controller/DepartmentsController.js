import DepartmentsDb from "../Model/DepartmentsModel.js";

export async function createDepartmentname(req, res, next) {
  try {
    const data = req.body;
    const details = {
      departmentName: data.departmentName,
    };
    const create = await DepartmentsDb.create(details);
    res.status(201).json({
      message: "Department Created Successfully",
      data: create,
    });
  } catch (err) {
    console.log(err);
    next();
  }
}
// get
export async function getDepartmentname(req, res, next) {
  try {
    const getDepartment = await DepartmentsDb.find();
    res.status(200).json({
      message: "get successfully..",
      data: getDepartment,
    });
  } catch (err) {
    next();
  }
}

//delete
export async function deleteDepartmentName(req, res, next) {
  try {
    const data = req.params;
    const Id = data.id;
    const deletedetails = await DepartmentsDb.findByIdAndDelete(Id);
    res.status(200).json({
      message: "Deleted Successfully",
      data: deletedetails,
    });
  } catch (error) {
    next();
  }
}

//update
export async function updateDepartmentName(req, res, next) {
  try {
    const data = req.body;
    const id = req.params.id;
    const details = {
      departmentName: data.departmentName,
    };
    const updateList = await DepartmentsDb.findByIdAndUpdate(id, details, {
      new: true,
    });
    res.status(200).json({
      message: "Updated successfully",
      data: updateList,
    });
  } catch (err) {
    next();
  }
}
