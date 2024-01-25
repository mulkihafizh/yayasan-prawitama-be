import User from "../models/user.js";

export function validateEmployeeData(req, res, next) {
  const {
    email,
    password,
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
    education_history,
    work_history,
    address,
    phone_number,
    is_married,
    partner,
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
    !education_history ||
    !work_history ||
    !address ||
    !phone_number ||
    !is_married
  ) {
    return res.status(400).json({ message: "Harus diisi" });
  }

  if (is_married) {
    if (!partner || !partner.name || !partner.birth_date || !partner.job) {
      return res
        .status(400)
        .json({ message: "Data partner harus diisi lengkap" });
    }

    if (children && !Array.isArray(children)) {
      return res.status(400).json({ message: "Data anak harus diisi" });
    }
  }

  // Jika data valid, lanjutkan ke controller
  next();
}

export function checkAuth(req, res, next) {
  if ((req.headers, req.headers.authentication)) {
    // Pengguna sudah masuk, lanjutkan permintaan
    next();
  } else {
    // Pengguna belum masuk, kembalikan pesan kesalahan atau arahkan ke halaman masuk
    return res
      .status(401)
      .json({ message: "Anda harus login terlebih dahulu" });
  }
}

export function checkEmployeeAdmin(req, res, next) {
  if ((req.headers, req.headers.authentication)) {
    const user = findById(req.headers.authentication);
    if (user.role == "employee_admin") return next();
  } else {
    return res.status(403).json({ message: "Anda tak memiliki akses" });
  }
}

export function checkPayrollAdmin(req, res, next) {
  if ((req.headers, req.headers.authentication)) {
    const user = findById(req.headers.authentication);
    if (user.role == "payroll_admin") return next();
  } else {
    return res.status(403).json({ message: "Anda tidak memiliki izin" });
  }
}
