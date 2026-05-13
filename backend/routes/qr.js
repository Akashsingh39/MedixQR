const express = require('express');
const router = express.Router();
const QRCode = require('qrcode');
const { protect } = require('../middleware/auth');
const MedicalProfile = require('../models/MedicalProfile');

// ─── GET /api/qr/generate ─────────────────────────────────────
// Generate QR code for logged-in user
router.get('/generate', protect, async (req, res) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile) {
      return res.status(404).json({ success: false, message: 'Please create your medical profile first' });
    }

    // QR links to the public scan page with user ID
    const profileUrl = `${req.protocol}://${req.get('host')}/pages/scan.html?uid=${req.user._id}`;

    const qrDataUrl = await QRCode.toDataURL(profileUrl, {
      width: 300,
      margin: 2,
      color: { dark: '#0A2540', light: '#FFFFFF' }
    });

    // Save QR to profile
    profile.qrCodeData = qrDataUrl;
    await profile.save();

    res.json({ success: true, qrCode: qrDataUrl, profileUrl });
  } catch (err) {
    res.status(500).json({ success: false, message: 'QR generation failed', error: err.message });
  }
});

// ─── GET /api/qr/my ──────────────────────────────────────────
// Get stored QR code
router.get('/my', protect, async (req, res) => {
  try {
    const profile = await MedicalProfile.findOne({ user: req.user._id });
    if (!profile || !profile.qrCodeData) {
      return res.status(404).json({ success: false, message: 'No QR code found. Generate one first.' });
    }
    res.json({ success: true, qrCode: profile.qrCodeData });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
  }
});

module.exports = router;
