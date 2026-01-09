import express from 'express';
import { 
  createOrUpdateSkills, 
  getMySkills, 
  findMatches,
  getAllSkills
} from '../controllers/skill.controller.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.use(protect);

router.post('/', createOrUpdateSkills);
router.get('/my-skills', getMySkills);
router.get('/matches', findMatches);
router.get('/all', getAllSkills);

export default router;
