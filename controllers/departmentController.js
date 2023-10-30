// controllers/departmentController.js
const Department = require('../models/department');

// Membuat departemen baru
exports.createDepartment = async (req, res) => {
  try {
    const { name, details } = req.body;
    if (!name || !details) {
      return res.status(400).json({ message: 'Nama dan detail harus diisi' });
    }

    const newDepartment = new Department({ name, details });
    const savedDepartment = await newDepartment.save();

    res.status(201).json({ message: 'Departemen berhasil dibuat', data: savedDepartment });
  } catch (error) {
    console.error('Gagal membuat departemen:', error);
    res.status(500).json({ message: 'Gagal membuat departemen' });
  }
};

// Mendapatkan semua departemen
exports.getAllDepartments = async (req, res) => {
  try {
    const departments = await Department.find();
    res.status(200).json({ data: departments });
  } catch (error) {
    console.error('Gagal mendapatkan departemen:', error);
    res.status(500).json({ message: 'Gagal mendapatkan departemen' });
  }
};

// Mendapatkan departemen berdasarkan ID
exports.getDepartmentById = async (req, res) => {
  try {
    const department = await Department.findById(req.params.departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Departemen tidak ditemukan' });
    }

    res.status(200).json({ data: department });
  } catch (error) {
    console.error('Gagal mendapatkan departemen:', error);
    res.status(500).json({ message: 'Gagal mendapatkan departemen' });
  }
};

// Memperbarui departemen berdasarkan ID
exports.updateDepartment = async (req, res) => {
  try {
    const { name, details } = req.body;
    if (!name || !details) {
      return res.status(400).json({ message: 'Nama dan detail harus diisi' });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.departmentId,
      { name, details },
      { new: true }
    );

    res.status(200).json({ message: 'Departemen berhasil diperbarui', data: updatedDepartment });
  } catch (error) {
    console.error('Gagal memperbarui departemen:', error);
    res.status(500).json({ message: 'Gagal memperbarui departemen' });
  }
};

// Menghapus departemen berdasarkan ID
exports.deleteDepartment = async (req, res) => {
  try {
    const department = await Department.findByIdAndRemove(req.params.departmentId);
    if (!department) {
      return res.status(404).json({ message: 'Departemen tidak ditemukan' });
    }

    res.status(200).json({ message: 'Departemen berhasil dihapus' });
  } catch (error) {
    console.error('Gagal menghapus departemen:', error);
    res.status(500).json({ message: 'Gagal menghapus departemen' });
  }
};