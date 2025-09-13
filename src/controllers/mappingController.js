import { Mapping } from '../models/Mapping.js';
import  Patient  from '../models/Patient.js';
import { Doctor } from '../models/Doctor.js';

export const createMapping = async (req, res) => {
  try {
    const { patientId, doctorId, notes } = req.body;

    // Check if patient exists and belongs to user
    const patient = await Patient.findOne({
      where: { id: patientId, userId: req.user.id }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    // Check if doctor exists
    const doctor = await Doctor.findByPk(doctorId);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }

    // Check if mapping already exists
    const existingMapping = await Mapping.findOne({
      where: { patientId, doctorId }
    });

    if (existingMapping) {
      return res.status(400).json({ message: 'Doctor already assigned to this patient' });
    }

    const mapping = await Mapping.create({
      patientId,
      doctorId,
      notes
    });

    // Include related data in response
    const mappingWithDetails = await Mapping.findByPk(mapping.id, {
      include: [
        { model: Patient, attributes: ['id', 'name', 'age', 'gender'] },
        { model: Doctor, attributes: ['id', 'name', 'specialization'] }
      ]
    });

    res.status(201).json(mappingWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getMappings = async (req, res) => {
  try {
    const mappings = await Mapping.findAll({
      include: [
        { model: Patient, attributes: ['id', 'name', 'age', 'gender'] },
        { model: Doctor, attributes: ['id', 'name', 'specialization'] }
      ],
      order: [['assignedDate', 'DESC']]
    });
    res.json(mappings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const getPatientMappings = async (req, res) => {
  try {
    const { patient_id } = req.params;

    // Verify patient belongs to user
    const patient = await Patient.findOne({
      where: { id: patient_id, userId: req.user.id }
    });

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const mappings = await Mapping.findAll({
      where: { patientId: patient_id },
      include: [
        { model: Doctor, attributes: ['id', 'name', 'specialization', 'contact', 'hospital'] }
      ],
      order: [['assignedDate', 'DESC']]
    });

    res.json(mappings);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const deleteMapping = async (req, res) => {
  try {
    const mapping = await Mapping.findByPk(req.params.id, {
      include: [{ model: Patient }]
    });

    if (!mapping) {
      return res.status(404).json({ message: 'Mapping not found' });
    }

    // Verify patient belongs to user
    if (mapping.Patient.userId !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await mapping.destroy();
    res.json({ message: 'Mapping deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

