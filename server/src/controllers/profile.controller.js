import { db } from '../config/firebase.js';

export const getProfile = async (req, res) => {
  try {
    const profileDoc = await db.collection('profiles').doc(req.user.uid).get();
    
    if (!profileDoc.exists) {
      return res.status(404).json({ message: 'User not found' });
    }

    const profileData = profileDoc.data();

    res.json({
      success: true,
      profile: {
        id: req.user.uid,
        ...profileData
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const { name, university, semester, branch, avatar } = req.body;

    const updateData = {};
    if (name) updateData.name = name;
    if (university) updateData.university = university;
    if (semester) updateData.semester = semester;
    if (branch) updateData.branch = branch;
    if (avatar) updateData.avatar = avatar;

    const profileRef = db.collection('profiles').doc(req.user.uid);
    await profileRef.update(updateData);

    const updatedDoc = await profileRef.get();
    const profileData = updatedDoc.data();

    res.json({
      success: true,
      profile: {
        id: req.user.uid,
        ...profileData
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
