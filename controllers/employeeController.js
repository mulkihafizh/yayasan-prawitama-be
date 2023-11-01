const Employee = require("../models/employee.js");
const UserController = require("./userController.js");

exports.createEmployee = async (req, res) => {
  try {
    const {
      email,
      name,
      id_pegawai,
      reg_number,
      certi_number,
      nik,
      birth_date,
      birth_place,
      duty_start_date,
      sk_number,
      graduation_date,
      blood_type,
      employment_type,
      education_histoty,
      work_history,
      address,
      department,
      phone_number,
      is_married,
      children,
      password,
    } = req.body;
    if (
      (!email,
      !name,
      !id_pegawai,
      !reg_number,
      !certi_number,
      !nik,
      !birth_date,
      !birth_place,
      !duty_start_date,
      !sk_number,
      !graduation_date,
      !blood_type,
      !employment_type,
      !address,
      !phone_number)
    ) {
      return res.status(400).json({ message: "Harus diisi" });
    }

    const age = new Date().getFullYear() - new Date(birth_date).getFullYear();

    const newUser = await UserController.createEmployee({
      email,
      password,
      name,
    });

    console.log(newUser);

    const newEmployee = new Employee({
      email,
      name,
      id_pegawai,
      reg_number,
      certi_number,
      nik,
      birth_date,
      birth_place,
      age,
      duty_start_date,
      sk_number,
      graduation_date,
      blood_type,
      department,
      employment_type,
      education_histoty,
      work_history,
      address,
      phone_number,
      is_married,
      children,
      user_id: newUser._id,
    });
    const savedEmployee = await newEmployee.save();

    res.status(201).json({ message: "Berhasil", data: savedEmployee });
  } catch (error) {
    console.error("Gagal membuat karyawan:", error);
    res.status(500).json({ message: "Gagal" });
  }
};

// Mendapatkan semua karyawan
exports.getAllEmployees = async (req, res) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ data: employees });
  } catch (error) {
    console.error("Gagal mendapatkan data karyawan:", error);
    res.status(500).json({ message: "Gagal mendapatkan data karyawan" });
  }
};

// Mendapatkan karyawan berdasarkan ID
exports.getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res
        .status(404)
        .json({ message: " Data karyawan tidak ditemukan" });
    }

    res.status(200).json({ data: employee });
  } catch (error) {
    console.error("Gagal mendapatkan data karyawan:", error);
    res.status(500).json({ message: "Gagal mendapatkan data karyawan" });
  }
};

// Memperbarui karyawan berdasarkan ID
exports.updateEmployee = async (req, res) => {
  try {
    const {
      email,
      name,
      id_pegawai,
      reg_number,
      certi_number,
      nik,
      birth_date,
      birth_place,
      age,
      duty_start_date,
      sk_number,
      graduation_date,
      blood_type,
      Employee,
      employment_type,
      education_histoty,
      work_history,
      address,
      phone_number,
      is_married,
      children,
    } = req.body;
    if (
      (!email,
      !name,
      !id_pegawai,
      !reg_number,
      !certi_number,
      !nik,
      !birth_date,
      !birth_place,
      !age,
      !duty_start_date,
      !sk_number,
      !graduation_date,
      !blood_type,
      !Employee,
      !employment_type,
      !education_histoty,
      !work_history,
      !address,
      !phone_number,
      !is_married,
      !children)
    ) {
      return res.status(400).json({ message: "Harus diisi" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.employeeId,
      {
        email,
        name,
        id_pegawai,
        reg_number,
        certi_number,
        nik,
        birth_date,
        birth_place,
        age,
        duty_start_date,
        sk_number,
        graduation_date,
        blood_type,
        Employee,
        employment_type,
        education_histoty,
        work_history,
        address,
        phone_number,
        is_married,
        children,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Data karyawan berhasil diperbarui",
      data: updatedEmployee,
    });
  } catch (error) {
    console.error("Gagal memperbarui data karyawan:", error);
    res.status(500).json({ message: "Gagal memperbarui data karyawan" });
  }
};

// Menghapus karyawan berdasarkan ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndRemove(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    res.status(200).json({ message: "Data aryawan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus data karyawan:", error);
    res.status(500).json({ message: "Gagal menghapus data karyawan" });
  }
};
