const express = require('express');
const Property = require('../models/property');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// إعداد التخزين للصور والنماذج
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.fieldname === 'model3d') cb(null, 'uploads/models');
    else if (file.fieldname === 'panorama') cb(null, 'uploads/panoramas');
    else cb(null, 'uploads/images');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname.replace(/\s+/g, '_'));
  }
});
const upload = multer({ storage });

// رفع ملفات (صورة، بانوراما، نموذج 3D)
router.post('/upload', upload.fields([
  { name: 'images', maxCount: 10 },
  { name: 'panorama', maxCount: 1 },
  { name: 'model3d', maxCount: 1 }
]), (req, res) => {
  const files = req.files;
  res.json({
    images: files.images ? files.images.map(f => `/uploads/images/${f.filename}`) : [],
    panorama: files.panorama ? `/uploads/panoramas/${files.panorama[0].filename}` : '',
    model3d: files.model3d ? `/uploads/models/${files.model3d[0].filename}` : ''
  });
});

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.json(properties);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get property by ID
router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ error: 'Not found' });
    res.json(property);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Create property
router.post('/', async (req, res) => {
  try {
    const property = new Property(req.body);
    await property.save();
    res.status(201).json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Update property
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) return res.status(404).json({ error: 'Not found' });
    res.json(property);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete property
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).json({ error: 'Not found' });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
