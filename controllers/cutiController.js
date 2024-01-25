import Cuti from "../models/cuti.js";
import Employee from "../models/employee.js";
import Allowance from "../models/allowance.js";
import AllowanceTypes from "../models/allowanceTypes.js";
import jwt from "jsonwebtoken";
import allowanceTypes from "../models/allowanceTypes.js";

export async function createCuti(req, res) {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET);
    const employee_id = decoded._id;
    const { target_id, date, notes, type, department, reason, name } = req.body;

    const prev = await Employee.findOne({ user_id: employee_id });

    const targetEmployee = await Employee.findOne({ _id: target_id });

    const employee = await Employee.findByIdAndUpdate(prev._id, {
      days_off: prev.days_off - 1,
    });

    if (!employee || !targetEmployee) {
      return res.status(404).json({ message: "Karyawan tidak ditemukan" });
    }

    const cuti = new Cuti({
      name: prev.name,
      employee_id: prev._id,
      target_id,
      date,
      notes,
      type,
      department,
      reason,
    });

    await cuti.save();
    return res.status(201).json({ message: "Berhasil membuat cuti" });
  } catch (error) {
    console.log("Gagal membuat cuti:", error);
    return res.status(500).json({ message: "Gagal membuat cuti" });
  }
}

export async function getCuti(req, res) {
  try {
    const cuti = await Cuti.find({ status: "Diterima" });
    res.status(200).json(cuti);
  } catch (error) {
    console.error("Gagal mendapatkan cuti:", error);
    res.status(500).json({ message: "Gagal mendapatkan cuti" });
  }
}

export async function getUserCuti(req, res) {
  try {
    const userId = req.params.userId;
    const employee = await Employee.findById(userId);

    const cuti = await Cuti.find({ employee_id: userId });

    res.status(200).json(cuti);
  } catch (error) {
    console.error("Gagal mendapatkan cuti:", error);
    res.status(500).json({ message: "Gagal mendapatkan cuti" });
  }
}

export async function approveCuti(req, res) {
  try {
    const { cutiId } = req.params;
    const { status } = req.body;
    const cutis = await Cuti.findById(cutiId);
    const allowance = await Allowance.findOne({
      employee_id: cutis.target_id,
      type: "Lembur/Cuti",
    });

    if (!allowance) {
      const allowances = await AllowanceTypes.findOne({ type: "Lembur/Cuti" });

      await Allowance.create({
        employee_id: cutis.target_id,
        type: allowances.type,
        amount: allowances.amount,
      });
    } else if (allowance) {
      await Allowance.findOneAndUpdate(
        { employee_id: cutis.target_id, type: "Lembur/Cuti" },
        {
          amount: allowance.amount + 1,
        }
      );
    }

    const cuti = await Cuti.findByIdAndUpdate(cutiId, {
      status: status,
    });
    if (!cutis) {
      return res.status(404).json({ message: "Cuti tidak ditemukan" });
    }
    res.status(200).json({ message: "Berhasil mengubah status cuti" });
  } catch (error) {
    console.log("Gagal menerima cuti:", error);
    res.status(500).json({ message: "Gagal menerima cuti" });
  }
}

export async function rejectCuti(req, res) {
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
}

export async function deleteCuti(req, res) {
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
}

export async function approveCutiAdmin(req, res) {
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
}

export async function getTargetCuti(req, res) {
  try {
    const userId = req.params.id;

    const cuti = await Cuti.find({ target_id: userId, status: "Menunggu" });
    if (!cuti) {
      return res.status(404).json({ message: "Tidak ada Cuti" });
    }
    res.status(200).json(cuti);
  } catch (error) {
    console.error("Gagal mendapatkan cuti:", error);
    res.status(500).json({ message: "Gagal mendapatkan cuti" + error });
  }
}

export async function getCutiByID(req, res) {
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
}
