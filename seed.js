const Department = require('./models/department'); // Gantilah dengan model yang sesuai
const mongoose = require('mongoose');

async function seedData() {
  try {
    await mongoose.connect('mongodb+srv://mlkihfzh123:<password>@yayasan-prawitama.iqyur60.mongodb.net/?retryWrites=true&w=majority<database>', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

    const sampleDepartments = [
      { name: 'Departemen A', details: 'Detail Departemen A' },
      { name: 'Departemen B', details: 'Detail Departemen B' },
      // Tambahkan data lainnya sesuai kebutuhan
    ];

    await Department.insertMany(sampleDepartments);

    console.log('Data telah diisi ke database.');
  } catch (error) {
    console.error('Seeder Error:', error);
  } finally {
    mongoose.connection.close();
  }
}

seedData();
