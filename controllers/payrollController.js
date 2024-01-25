import Payroll from "../models/payroll.js";

export async function getPayroll(req, res) {
  try {
    const payroll = await Payroll.find();
    res.status(200).json({ data: payroll });
  } catch (error) {
    console.error("Gagal mendapatkan payroll:", error);
    res.status(500).json({ message: "Gagal mendapatkan payroll" });
  }
}

export async function getPayrollById(req, res) {
  try {
    const payroll = await Payroll.findById(req.params.payrollId);
    if (!payroll) {
      return res.status(404).json({ message: "Payroll tidak ditemukan" });
    }

    res.status(200).json({ data: payroll });
  } catch (error) {
    console.error("Gagal mendapatkan payroll:", error);
    res.status(500).json({ message: "Gagal mendapatkan payroll" });
  }
}

export async function getPayrollByEmployeeId(req, res) {
  try {
    const payroll = await Payroll.find({ employee_id: req.params.employeeId });
    if (!payroll) {
      console.log("bjir");
      return res.status(404).json({ message: "Payroll tidak ditemukan" });
    }

    console.log(payroll);
    return res.status(200).json({ payroll });
  } catch (error) {
    console.log("Gagal mendapatkan payroll:", error);
    res.status(500).json({ message: "Gagal mendapatkan payroll" });
  }
}

export async function updatePayroll(req, res) {
  try {
    const { status } = req.body;
    if (!status) {
      return res.status(400).json({ message: "Status harus diisi" });
    }

    const updatedPayroll = await Payroll.findByIdAndUpdate(
      req.params.payrollId,
      { status },
      { new: true }
    );
    if (!updatedPayroll) {
      return res.status(404).json({ message: "Payroll tidak ditemukan" });
    }

    res.status(200).json({ message: "Berhasil", data: updatedPayroll });
  } catch (error) {
    console.error("Gagal memperbarui payroll:", error);
    res.status(500).json({ message: "Gagal memperbarui payroll" });
  }
}
