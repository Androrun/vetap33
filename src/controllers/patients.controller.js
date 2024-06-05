import { pool } from "../db.js";

// Obtener todos los pacientes
export const getAllPatients = async (req, res, next) => {
  try {
    const result = await pool.query("SELECT id, name, breed, species, weight, birth_date, color, size, reproductive_status, created_at, client_id FROM patients");
    res.json(result.rows);
  } catch (error) {
    next(error);
  }
};

// Obtener un paciente por su ID
export const getPatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const result = await pool.query("SELECT id, name, breed, species, weight, birth_date, color, size, reproductive_status, client_id FROM patients WHERE id = $1", [patientId]);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: 'Paciente no encontrado' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Crear un nuevo paciente
export const createPatient = async (req, res, next) => {
  try {
    const { name, breed, species, weight, birth_date, color, size, reproductive_status, client_id } = req.body;

    console.log('Datos recibidos del paciente:', { name, breed, species, weight, birth_date, color, size, reproductive_status, client_id });

    const result = await pool.query(
      "INSERT INTO patients (name, breed, species, weight, birth_date, color, size, reproductive_status, client_id) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
      [name, breed, species, weight, birth_date, color, size, reproductive_status, client_id]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    next(error);
  }
};

// Actualizar información de un paciente
export const updatePatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;
    const { name, breed, species, weight, birth_date, color, size, reproductive_status, client_id } = req.body;

    await pool.query(
      "UPDATE patients SET name = $1, breed = $2, species = $3, weight = $4, birth_date = $5, color = $6, size = $7, reproductive_status = $8, client_id = $9 WHERE id = $10",
      [name, breed, species, weight, birth_date, color, size, reproductive_status, client_id, patientId]
    );

    res.json({ message: 'Paciente actualizado exitosamente.' });
  } catch (error) {
    next(error);
  }
};

// Eliminar un paciente
export const deletePatient = async (req, res, next) => {
  try {
    const { patientId } = req.params;

    await pool.query("DELETE FROM patients WHERE id = $1", [patientId]);

    res.json({ message: 'Paciente eliminado exitosamente.' });
  } catch (error) {
    next(error);
  }
};
