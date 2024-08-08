const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Get properties with pagination
router.get('/', async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  try {
    const properties = await Property.find().skip(skip).limit(limit).lean();
    const total = await Property.countDocuments();
    res.json({ properties, total });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// Get a single property by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    return res.status(400).json({ message: 'Invalid property ID' });
  }

  try {
    const property = await Property.findById(id).lean();
    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }
    res.json(property);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
