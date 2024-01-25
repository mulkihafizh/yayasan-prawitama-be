import Employee from "../models/employee.js";
import Partner from "../models/partner.js";
import Children from "../models/children.js";
import User from "../models/user.js";
import Payroll from "../models/payroll.js";
import Department from "../models/department.js";
import jwt from "jsonwebtoken";

export async function createEmployee(req, res) {
  try {
    const {
      email,
      password,
      name,
      religion,
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
      department,
      employment_type,
      education_histoty,
      work_history,
      address,
      phone_number,
      is_married,
      partner,
      gender,
      children,
    } = req.body;

    if (
      !email ||
      !password ||
      !name ||
      !id_pegawai ||
      !reg_number ||
      !certi_number ||
      !nik ||
      !birth_date ||
      !birth_place ||
      !duty_start_date ||
      !sk_number ||
      !graduation_date ||
      !blood_type ||
      !employment_type ||
      !address ||
      !phone_number
    ) {
      return res.status(400).json({ message: "Harus diisi" });
    }

    const age = new Date().getFullYear() - new Date(birth_date).getFullYear();
    const createUser = await User.create({
      username: name,
      email,
      password,
    });

    const departmentData = await Department.findById(department);

    const user = await User.findOne({ email });

    const newEmployee = new Employee({
      user_id: user._id,
      email,
      password,
      name,
      id_pegawai,
      reg_number,
      certi_number,
      nik,
      religion,
      birth_date,
      birth_place,
      age,
      duty_start_date,
      sk_number,
      graduation_date,
      blood_type,
      department: departmentData,
      employment_type,
      education_histoty,
      work_history,
      address,
      phone_number,
      is_married,
      gender,
      children: children.length,
    });

    const savedUser = await createUser.save();
    const savedEmployee = await newEmployee.save();

    return res
      .status(201)
      .json({ message: "Berhasil", data: savedEmployee, savedUser });
  } catch (error) {
    console.error("Gagal membuat data karyawan:", error);
    const user = await User.findOneAndDelete({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User tidak ditemukan" });
    }
    user.save();
    return res.status(500).json({ message: "Gagal", error: error });
  }
}

// Mendapatkan semua data karyawan
export async function getAllEmployees(req, res) {
  try {
    const employees = await Employee.find();
    res.status(200).json({ data: employees });
  } catch (error) {
    console.error("Gagal mendapatkan data karyawan:", error);
    res.status(500).json({ message: "Gagal mendapatkan data karyawan" });
  }
}

// Mendapatkan karyawan berdasarkan ID
export async function getEmployeeById(req, res) {
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
}

// Memperbarui karyawan berdasarkan ID
export async function updateEmployee(req, res) {
  try {
    const {
      email,
      password,
      name,
      religion,
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
      gender,
    } = req.body;
    if (
      !email ||
      !password ||
      !name ||
      !id_pegawai ||
      !reg_number ||
      !certi_number ||
      !nik ||
      !birth_date ||
      !birth_place ||
      !age ||
      !duty_start_date ||
      !sk_number ||
      !graduation_date ||
      !blood_type ||
      !department ||
      !employment_type ||
      !education_histoty ||
      !work_history ||
      !address ||
      !phone_number ||
      !is_married ||
      !children
    ) {
      return res.status(400).json({ message: "Harus diisi" });
    }

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.employeeId,
      {
        email,
        password,
        name,
        id_pegawai,
        reg_number,
        certi_number,
        nik,
        birth_date,
        religion,
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
        gender,
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
}

// Menghapus karyawan berdasarkan ID
export async function deleteEmployee(req, res) {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    const user = await User.findById(employee.user_id);

    await Employee.findByIdAndDelete(req.params.employeeId);
    await User.findByIdAndDelete(employee.user_id);

    return res.status(200).json({ message: "Data karyawan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus data karyawan:", error);
    return res.status(500).json({ message: "Gagal menghapus data karyawan" });
  }
}

export async function getEmployees(req, res) {
  try {
    let employeeData = [];
    const token = req.headers.authorization.split(" ")[1];
    const userId = jwt.verify(token, process.env.SECRET)._id;
    const user = await User.find();
    for (let i = 0; i < user.length; i++) {
      const employee = await Employee.findOne({ user_id: user[i]._id });
      if (employee) {
        if (employee.user_id != userId) {
          employeeData.push(employee);
        }
      }
    }

    res.status(200).json({ data: employeeData });
  } catch (error) {
    console.error("Gagal mendapatkan data karyawan:", error);
    res.status(500).json({ message: "Gagal mendapatkan data karyawan" });
  }
}

export async function attendance(req, res) {
  try {
    const employeeId = req.body.id;

    const employee = await Employee.findById(employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    const attendance = {
      last: new Date(
        Date().toLocaleString("id-ID", { timeZone: "Asia/Jakarta" })
      ),
      total: employee.attendance.total + 1,
    };

    employee.attendance = attendance;

    await employee.save();

    return res.status(200).json({ message: "Berhasil", data: employee });
  } catch (error) {
    console.error("Gagal mengisi absensi:", error);
    return res.status(500).json({ message: "Gagal mengisi absensi" });
  }
}
