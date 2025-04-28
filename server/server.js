const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const loginRoute = require("./routes/login");
const adminMedicinesRoutes = require('./routes/adminmedicines');
const updateRoutes = require('./routes/update');
const newMedModalRoute = require("./routes/newmedmodal");
const updateMedicine = require('./routes/updatemedicine');
const manufacturerRoutes = require('./routes/manufacturer');
const orderRoutes = require("./routes/orders");
const db = require("./db");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/login",loginRoute);
app.use('/api/adminmedicines', adminMedicinesRoutes);
app.use("/api/newmed",newMedModalRoute);
app.use('/update',updateRoutes);
app.use('/api/updatemed',updateMedicine);
app.use('/api/manufacturer',manufacturerRoutes);
app.use('/api/orders',orderRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT,() => {
    console.log(`Server running on port ${PORT}`);
});