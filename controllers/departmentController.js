// controllers/departmentController.js
import Department from "../models/department.js";

// Membuat departemen baru
export async function createDepartment(req, res) {
  try {
    const { name, details, salary } = req.body;
    if (!name || !details || !salary) {
      return res.status(400).json({ message: "Nama dan detail harus diisi" });
    }

    const newDepartment = new Department({ name, details });
    const savedDepartment = await newDepartment.save();

    res
      .status(201)
      .json({ message: "Departemen berhasil dibuat", data: savedDepartment });
  } catch (error) {
    console.error("Gagal membuat departemen:", error);
    res.status(500).json({ message: "Gagal membuat departemen" });
  }
}

// Mendapatkan semua departemen
export async function getAllDepartments(req, res) {
  try {
    const departments = await Department.find();
    res.status(200).json({ data: departments });
  } catch (error) {
    console.error("Gagal mendapatkan departemen:", error);
    res.status(500).json({ message: "Gagal mendapatkan departemen" });
  }
}

// Mendapatkan departemen berdasarkan ID
export async function getDepartmentById(req, res) {
  try {
    const department = await Department.findById(req.params.departmentId);
    if (!department) {
      return res.status(404).json({ message: "Departemen tidak ditemukan" });
    }

    res.status(200).json({ data: department });
  } catch (error) {
    console.error("Gagal mendapatkan departemen:", error);
    res.status(500).json({ message: "Gagal mendapatkan departemen" });
  }
}

// Memperbarui departemen berdasarkan ID
export async function updateDepartment(req, res) {
  try {
    const { name, details, salary } = req.body;
    if (!name || !details || !salary) {
      return res.status(400).json({ message: "Nama dan detail harus diisi" });
    }

    const updatedDepartment = await Department.findByIdAndUpdate(
      req.params.departmentId,
      { name, details },
      { new: true }
    );

    res.status(200).json({
      message: "Departemen berhasil diperbarui",
      data: updatedDepartment,
    });
  } catch (error) {
    console.error("Gagal memperbarui departemen:", error);
    res.status(500).json({ message: "Gagal memperbarui departemen" });
  }
}

// Menghapus departemen berdasarkan ID
export async function deleteDepartment(req, res) {
  try {
    const department = await Department.findByIdAndRemove(
      req.params.departmentId
    );
    if (!department) {
      return res.status(404).json({ message: "Departemen tidak ditemukan" });
    }

    res.status(200).json({ message: "Departemen berhasil dihapus" });
  } catch (error) {
    console.error("Gagal menghapus departemen:", error);
    res.status(500).json({ message: "Gagal menghapus departemen" });
  }
}

export async function generateDepartment(req, res) {
  try {
    const roles = [
      "Koordinator Beasiswa",
      "Koordinator Pengelolaan Server dan K3",
      "Koordinator Pengelolaan Alumni",
      "Koordinator Program Kewirausahaan",
      "Koordinator Program Pembinaan Karir dan Konseling",
      "Kepala Laboratorium Program Keahlian TJKT",
      "Kepala Laboratorium Program Keahlian DKV",
      "Kepala Laboratorium Program Keahlian PPLG",
      "Kepala Laboratorium Program Keahlian MPLB",
      "Kepala Laboratorium Program Keahlian PMN",
      "Kepala Laboratorium Program Keahlian KLN",
      "Kepala Laboratorium Program Keahlian HTL",
      "Pelaksana Urusan Administrasi Kepegawaian",
      "Pelaksana Urusan Administrasi Keuangan",
      "Pelaksana Urusan Administrasi Kesiswaan",
      "Pelaksana Urusan Administrasi Kurikulum",
      "Pelaksana Urusan Administrasi Sarana dan Prasarana",
      "Pembina Akhlak Mulia",
      "Pembina Pramuka Putra",
      "Pembina Pramuka Putri",
      "Pembina Organisasi Siswa Intra Sekolah (OSIS)",
      "Koordinator Program Gizi dan Nutrisi",
      "Koordinator Keamanan, Ketertiban dan Kedisiplinan",
      "Koordinator Education for Sustainable Development (ESD)",
      "Pelaksana Urusan Perpustakaan",
      "Pelaksana Urusan Administrasi Hubungan Sekolah dan Masyarakat",
      "Petugas Layanan Khusus",
      "Laboran Program Keahlian MPLB",
      "Laboran Program Keahlian PPLG",
      "Wakasek Bidang Kurikulum dan Pembelajaran",
      "Wakasek Bidang Kesiswaan",
      "Wakasek Bidang Sarana dan Prasarana",
      "Wakasek Bidang Hubungan Masyarakat dan Industri",
      "Kepala Tenaga Administrasi Sekolah",
      "Kepala Perpustakaan",
      "Koordinator Pengembangan Keprofesian Berkelanjutan (PKB)",
      "Manajer Pengelolaan Data dan Informasi",
      "Manajer Kesejahteraan Pegawai",
      "Manajer Bantuan Sekolah",
      "Manajer Perawatan Sarana dan Prasarana",
      "Ketua Program Keahlian Manajemen Perkantoran dan Layanan Bisnis",
      "Ketua Program Keahlian Pengembangan Perangkat Lunak dan Gim",
      "Ketua Program Keahlian Teknik Jaringan Komputer dan Telekomunikasi",
      "Ketua Program Keahlian Desain Komunikasi Visual",
      "Ketua Program Keahlian Pemasaran",
      "Ketua Program Keahlian Perhotelan",
      "Ketua Program Keahlian Kuliner",
      "Ketua Lembaga Sertifikasi Profesi (LSP) P1",
      "Ketua Tim Satgas Literasi",
      "Pembina Usaha Kesehatan Sekolah (UKS)",
      "Pembina Ekstrakurikuler",
    ];

    for (let i = 0; i < roles.length; i++) {
      const newDepartment = new Department({
        name: "Guru",
        details: roles[i],
      });
      await newDepartment.save();
    }
    res.status(201).json({ message: "Departemen berhasil dibuat" });
  } catch (error) {
    console.error("Gagal membuat departemen:", error);
    res.status(500).json({ message: "Gagal membuat departemen" });
  }
}
