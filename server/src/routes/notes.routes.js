import express from 'express';
import { 
  createTextNote, 
  uploadFileNote, 
  getNotes, 
  updateNote, 
  deleteNote 
} from '../controllers/notes.controller.js';
import { protect } from '../middleware/auth.js';
import { upload } from '../middleware/upload.js';

const router = express.Router();

router.use(protect);

router.post('/text', createTextNote);
router.post('/upload', upload.single('file'), uploadFileNote);
router.get('/', getNotes);
router.put('/:noteId', updateNote);
router.delete('/:noteId', deleteNote);

export default router;
