const Certificate = require("../models/certificate");

// Membuat Certificate baru
exports.createCertificate = async (req, res) => {
  try {
    const { name, issued_by, date, employee_id, time } = req.body;
    if (!name || !issued_by || !date || !employee_id || !time) {
      return res.status(400).json({ message: "Harus diisi" });
    }

    const newCertificate = new Certificate({
      name,
      issued_by,
      date,
      employee_id,
      time,
    });
    const savedCertificate = await newCertificate.save();

    res
      .status(201)
      .json({ message: "Certificate berhasil dibuat", data: savedCertificate });
  } catch (error) {
    console.error("Gagal membuat certificate:", error);
    res.status(500).json({ message: "Gagal membuat certificate" });
  }
};

exports.getFile = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.certificateId);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate tidak ditemukan" });
    }

    const username = req.user.username;
    const filename = certificate.filename;
    const path = `public/${username}/certificate/${filename}`;

    res.status(200).sendFile(path);
  } catch (e) {}
};

// Mendapatkan semua Certificate
exports.getAllCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.find();
    res.status(200).json({ data: certificate });
  } catch (error) {
    console.error("Gagal mendapatkan certificate:", error);
    res.status(500).json({ message: "Gagal mendapatkan certificate" });
  }
};

// Mendapatkan Certificate berdasarkan ID
exports.getCertificateByID = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.certificateId);
    if (!certificate) {
      return res.status(404).json({ message: "Certificate tidak ditemukan" });
    }

    res.status(200).json({ data: certificate });
  } catch (error) {
    console.error("Gagal mendapatkan certificate:", error);
    res.status(500).json({ message: "Gagal mendapatkan certificate" });
  }
};

// Memperbarui Certificate berdasarkan ID
exports.updateCertificate = async (req, res) => {
  try {
    const { name, issued_by, date, employee_id, time } = req.body;
    if (!name || !issued_by || !date || !employee_id || !time) {
      return res.status(400).json({ message: "Harus diisi" });
    }
    const updatedCertificate = await Certificate.findByIdAndUpdate(
      req.params.certificateId,
      { name, issued_by, date, employee_id, time },
      { new: true }
    );
    res.status(200).json({
      message: "Certificate berhasil diperbaharui",
      data: updatedCertificate,
    });
  } catch (error) {
    console.error("Gagal memperbarui certificate:", error);
    res.status(500).json({ message: "Gagal memperbarui certificate" });
  }
};

// Menghapus Certificate berdasarkan ID
exports.deleteCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findByIdAndRemove(
      req.params.certificateId
    );
    if (!certificate) {
      return res.status(404).json({ message: "Certificate tidak ditemukan" });
    }

    res.status(200).json({ message: "Certificate berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus certificate:", error);
    res.status(500).json({ message: "Gagal menghapus certificate" });
  }
};
