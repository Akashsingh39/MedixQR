const mongoose = require('mongoose');

const MedicalProfileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },

  // Personal Info
  fullName:    { type: String, required: true, trim: true },
  dateOfBirth: { type: String },
  gender:      { type: String, enum: ['Male', 'Female', 'Other'] },
  bloodGroup:  { type: String, enum: ['A+','A-','B+','B-','AB+','AB-','O+','O-','Unknown'] },
  phone:       { type: String },
  address:     { type: String },

  // Medical Info
  allergies:         [{ type: String }],
  medications:       [{ type: String }],
  medicalConditions: [{ type: String }],
  surgeries:         [{ type: String }],
  vaccinations:      [{ type: String }],

  // Emergency Contact
  emergencyContact: {
    name:         { type: String },
    relationship: { type: String },
    phone:        { type: String }
  },

  // Doctor Info
  primaryDoctor: {
    name:    { type: String },
    hospital:{ type: String },
    phone:   { type: String }
  },

  // QR Code (base64 stored)
  qrCodeData: { type: String },

  updatedAt: { type: Date, default: Date.now }
});

// Auto-update timestamp on save
MedicalProfileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('MedicalProfile', MedicalProfileSchema);
