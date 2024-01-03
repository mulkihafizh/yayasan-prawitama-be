const Cuti = require("../models/cuti");
const Employee = require("../models/employee");

exports.createCuti = async (req, res) => {
  try {
    const {
      employee_id,
      target_id,
      date,
      notes,
      type,
      status,
      department,
      reason,
    } = req.body;

    const employee = await Employee.findByIdAndUpdate(employee_id, {
      $push: { cuti: employee.cuti - 1 },
    });

    if (!employee || !targetEmployee) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    const cuti = new Cuti({
      employee_id,
      target_id,
      date,
      notes,
      type,
      status,
      department,
      reason,
    });

    await cuti.save();
    res.status(201).json({ message: "Berhasil membuat cuti" });
  } catch (error) {
    console.error("Gagal membuat cuti:", error);
    res.status(500).json({ message: "Gagal membuat cuti" });
  }
};

exports.getCuti = async (req, res) => {
  try {
    const userId = req.params.id;
    const cuti = Cuti.find({ employee_id: userId });
    res.status(200).json(cuti);
  } catch (error) {
    console.error("Gagal mendapatkan cuti:", error);
    res.status(500).json({ message: "Gagal mendapatkan cuti" });
  }
};

exports.approveCuti = async (req, res) => {
  try {
    const { id } = req.params;
    const cuti = await Cuti.findByIdAndUpdate(id, {
      status: "Diterima",
    });
    if (!cuti) {
      return res.status(404).json({ message: "Cuti tidak ditemukan" });
    }
    res.status(200).json({ message: "Berhasil menerima cuti" });
  } catch (error) {
    console.error("Gagal menerima cuti:", error);
    res.status(500).json({ message: "Gagal menerima cuti" });
  }
};

exports.rejectCuti = async (req, res) => {
  try {
    const { id } = req.params;
    const cuti = await Cuti.findByIdAndUpdate(id, {
      status: "Ditolak",
    });
    const employee = await Employee.findByIdAndUpdate(employee_id, {
      $push: { cuti: employee.cuti + 1 },
    });
    if (!cuti) {
      return res.status(404).json({ message: "Cuti tidak ditemukan" });
    }
    res.status(200).json({ message: "Berhasil menolak cuti" });
  } catch (error) {
    console.error("Gagal menolak cuti:", error);
    res.status(500).json({ message: "Gagal menolak cuti" });
  }
};

exports.deleteCuti = async (req, res) => {
  try {
    const { id } = req.params;
    const cuti = await Cuti.findByIdAndDelete(id);

    const employee = await Employee.findByIdAndUpdate(employee_id, {
      $push: { cuti: employee.cuti + 1 },
    });

    if (!cuti) {
      return res.status(404).json({ message: "Cuti tidak ditemukan" });
    }
    res.status(200).json({ message: "Berhasil menghapus cuti" });
  } catch (error) {
    console.error("Gagal menghapus cuti:", error);
    res.status(500).json({ message: "Gagal menghapus cuti" });
  }
};

exports.approveCutiAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const cuti = await Cuti.findByIdAndUpdate(id, {
      status: "Disetujui Admin",
    });
    if (!cuti) {
      return res.status(404).json({ message: "Cuti tidak ditemukan" });
    }
    res.status(200).json({ message: "Berhasil menerima cuti" });
  } catch (error) {
    console.error("Gagal menerima cuti:", error);
    res.status(500).json({ message: "Gagal menerima cuti" });
  }
};

exports.getTargetCuti = async (req, res) => {
  try {
    const userId = req.params.id;
    const cuti = Cuti.find({ target_id: userId });
    res.status(200).json(cuti);
  } catch (error) {
    console.error("Gagal mendapatkan cuti:", error);
    res.status(500).json({ message: "Gagal mendapatkan cuti" });
  }
};

exports.getCutiByID = async (req, res) => {
  try {
    const cuti = await Cuti.findById(req.params.cutiId);
    if (!cuti) {
      return res.status(404).json({ message: "Cuti tidak ditemukan" });
    }

    res.status(200).json({ data: cuti });
  } catch (error) {
    console.error("Gagal mendapatkan cuti:", error);
    res.status(500).json({ message: "Gagal mendapatkan cuti" });
  }
};
