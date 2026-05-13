const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const MedicalProfile = require('../models/MedicalProfile');

// ─── GET /api/profile ─────────────────────────────────────────
// Get logged-in user's profile
router.get('/', protect, async (req, res) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Profile not found. Please create one.' });
    }
    res.json({ success: true, profile });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ─── POST /api/profile ───────────────────────────────────────
// Create or Update profile
router.post('/', protect, async (req, res) => {
  try {
    const {
      fullName, dateOfBirth, gender, bloodGroup, phone, address,
      allergies, medications, medicalConditions, surgeries, vaccinations,
      emergencyContact, primaryDoctor
    } = req.body;

    let profile = await MedicalProfile.findOne({ user: req.user._id });

    const profileData = {
      user: req.user._id,
      fullName, dateOfBirth, gender, bloodGroup, phone, address,
      allergies:         Array.isArray(allergies) ? allergies : (allergies ? allergies.split(',').map(s => s.trim()).filter(Boolean) : []),
      medications:       Array.isArray(medications) ? medications : (medications ? medications.split(',').map(s => s.trim()).filter(Boolean) : []),
      medicalConditions: Array.isArray(medicalConditions) ? medicalConditions : (medicalConditions ? medicalConditions.split(',').map(s => s.trim()).filter(Boolean) : []),
      surgeries:         Array.isArray(surgeries) ? surgeries : (surgeries ? surgeries.split(',').map(s => s.trim()).filter(Boolean) : []),
      vaccinations:      Array.isArray(vaccinations) ? vaccinations : (vaccinations ? vaccinations.split(',').map(s => s.trim()).filter(Boolean) : []),
      emergencyContact,
      primaryDoctor
    };

    if (profile) {
      Object.assign(profile, profileData);
      await profile.save();
      return res.json({ success: true, message: 'Profile updated successfully', profile });
    } else {
      profile = await MedicalProfile.create(profileData);
      return res.status(201).json({ success: true, message: 'Profile created successfully', profile });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

// ─── GET /api/profile/view/:userId ───────────────────────────
// Public endpoint — viewed when QR is scanned
router.get('/view/:userId', async (req, res) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.params.userId })
      .populate('user', 'name email');

    if (!profile) {
      return res.status(404).json({ success: false, message: 'Medical profile not found' });
    }

    // Return only safe public fields
    const publicData = {
      fullName:          profile.fullName,
      dateOfBirth:       profile.dateOfBirth,
      gender:            profile.gender,
      bloodGroup:        profile.bloodGroup,
      allergies:         profile.allergies,
      medications:       profile.medications,
      medicalConditions: profile.medicalConditions,
      emergencyContact:  profile.emergencyContact,
      primaryDoctor:     profile.primaryDoctor,
      lastUpdated:       profile.updatedAt
    };

    res.json({ success: true, profile: publicData });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
