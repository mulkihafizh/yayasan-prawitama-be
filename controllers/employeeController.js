const Employee = require("../models/employee.js");
const Partner = require("../models/partner.js");
const Children = require("../models/children.js");

exports.createEmployee = async (req, res) => {
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

    const newEmployee = new Employee({
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
      department,
      employment_type,
      education_histoty,
      work_history,
      address,
      phone_number,
      is_married,
      gender,
      children,
    });

    if (is_married) {
      // Jika karyawan menikah, tambahkan data partner (mitra)
      const partner = {
        name: partner.name,
        birth_date: partner.birth_date,
        job: partner.job,
      };

      // Jika memiliki anak, tambahkan data anak karyawan
      const children = children.map((child) => ({
        name: child.name,
        birth_date: child.birth_date,
        birth_place: child.birth_place,
      }));
      partner = new Partner(partner);
      partner = await partner.save();

      children = new Children(children);
      children = await children.save();
    }

    const savedEmployee = await newEmployee.save();

    res.status(201).json({ message: "Berhasil", data: savedEmployee });
  } catch (error) {
    console.error("Gagal membuat data karyawan:", error);
    res.status(500).json({ message: "Gagal" });
  }
};

// Mendapatkan semua data karyawan
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
};

// Menghapus karyawan berdasarkan ID
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await Employee.findByIdAndRemove(req.params.employeeId);
    if (!employee) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    res.status(200).json({ message: "Data karyawan berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus data karyawan:", error);
    res.status(500).json({ message: "Gagal menghapus data karyawan" });
  }
};
