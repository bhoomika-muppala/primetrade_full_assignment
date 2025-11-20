// routes/notes.js
const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Note = require('../models/Note');

// GET /api/notes  -> list notes for user (with optional ?q=search)
router.get('/', auth, async (req, res, next) => {
  try {
    const q = req.query.q ? { $or: [{ title: { $regex: req.query.q, $options: 'i' } }, { body: { $regex: req.query.q, $options: 'i' } }] } : {};
    const notes = await Note.find({ user: req.user.id, ...q }).sort({ createdAt: -1 });
    res.json({ notes });
  } catch (err) { next(err); }
});

// POST /api/notes  -> create
router.post('/', auth, async (req, res, next) => {
  try {
    const { title, body } = req.body;
    if (!title) return res.status(400).json({ msg: 'Title required' });
    const note = await Note.create({ user: req.user.id, title, body });
    res.status(201).json({ note });
  } catch (err) { next(err); }
});

// PUT /api/notes/:id  -> update
router.put('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });

    note.title = req.body.title ?? note.title;
    note.body = req.body.body ?? note.body;
    await note.save();
    res.json({ note });
  } catch (err) { next(err); }
});

// DELETE /api/notes/:id
router.delete('/:id', auth, async (req, res, next) => {
  try {
    const note = await Note.findById(req.params.id);
    if (!note) return res.status(404).json({ msg: 'Note not found' });
    if (note.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Not authorized' });
    await note.remove();
    res.json({ msg: 'Note removed' });
  } catch (err) { next(err); }
});

module.exports = router;
