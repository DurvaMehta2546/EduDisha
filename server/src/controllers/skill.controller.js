import { db } from '../config/firebase.js';

export const createOrUpdateSkills = async (req, res) => {
  try {
    const { canTeach, wantToLearn, availability } = req.body;

    const skillRef = db.collection('skills').doc(req.user.uid);
    const skillDoc = await skillRef.get();

    const skillData = {
      userId: req.user.uid,
      canTeach: canTeach || [],
      wantToLearn: wantToLearn || [],
      availability: availability || { days: [], timeSlots: [] },
      verified: false,
      updatedAt: new Date().toISOString()
    };

    if (skillDoc.exists) {
      const existingData = skillDoc.data();
      if (canTeach) skillData.canTeach = canTeach;
      if (wantToLearn) skillData.wantToLearn = wantToLearn;
      if (availability) skillData.availability = availability;
      skillData.verified = existingData.verified || false;
      skillData.createdAt = existingData.createdAt;
      
      await skillRef.update(skillData);
    } else {
      skillData.createdAt = new Date().toISOString();
      await skillRef.set(skillData);
    }

    res.json({
      success: true,
      skills: {
        id: req.user.uid,
        ...skillData
      }
    });
  } catch (error) {
    console.error('Create/Update skills error:', error);
    res.status(500).json({ message: 'Server error managing skills' });
  }
};

export const getMySkills = async (req, res) => {
  try {
    const skillDoc = await db.collection('skills').doc(req.user.uid).get();

    if (!skillDoc.exists) {
      return res.json({
        success: true,
        skills: null
      });
    }

    res.json({
      success: true,
      skills: {
        id: req.user.uid,
        ...skillDoc.data()
      }
    });
  } catch (error) {
    console.error('Get my skills error:', error);
    res.status(500).json({ message: 'Server error fetching skills' });
  }
};

export const findMatches = async (req, res) => {
  try {
    const mySkillDoc = await db.collection('skills').doc(req.user.uid).get();

    if (!mySkillDoc.exists || !mySkillDoc.data().wantToLearn || mySkillDoc.data().wantToLearn.length === 0) {
      return res.json({
        success: true,
        matches: []
      });
    }

    const mySkills = mySkillDoc.data();
    const skillsIWantToLearn = mySkills.wantToLearn.map(s => s.skill);
    const skillsICanTeach = mySkills.canTeach.map(s => s.skill);

    const allSkillsSnapshot = await db.collection('skills').get();
    
    const matches = [];

    for (const doc of allSkillsSnapshot.docs) {
      if (doc.id === req.user.uid) continue;

      const skillData = doc.data();
      const userId = doc.id;

      const profileDoc = await db.collection('profiles').doc(userId).get();
      if (!profileDoc.exists) continue;

      const profileData = profileDoc.data();

      const canTeachMe = skillData.canTeach?.filter(s => 
        skillsIWantToLearn.includes(s.skill)
      ).map(s => s.skill) || [];

      const wantToLearnFromMe = skillData.wantToLearn?.filter(s => 
        skillsICanTeach.includes(s.skill)
      ).map(s => s.skill) || [];

      if (canTeachMe.length > 0 || wantToLearnFromMe.length > 0) {
        let matchType = 'none';
        let matchingSkills = [];

        if (canTeachMe.length > 0 && wantToLearnFromMe.length > 0) {
          matchType = 'mutual';
          matchingSkills = [...new Set([...canTeachMe, ...wantToLearnFromMe])];
        } else if (canTeachMe.length > 0) {
          matchType = 'teacher';
          matchingSkills = canTeachMe;
        } else if (wantToLearnFromMe.length > 0) {
          matchType = 'learner';
          matchingSkills = wantToLearnFromMe;
        }

        matches.push({
          user: {
            id: userId,
            name: profileData.name,
            email: profileData.email,
            avatar: profileData.avatar,
            university: profileData.university,
            semester: profileData.semester,
            branch: profileData.branch
          },
          matchType,
          matchingSkills,
          availability: skillData.availability
        });
      }
    }

    res.json({
      success: true,
      matches
    });
  } catch (error) {
    console.error('Find matches error:', error);
    res.status(500).json({ message: 'Server error finding matches' });
  }
};

export const getAllSkills = async (req, res) => {
  try {
    const skillsSnapshot = await db.collection('skills').get();
    
    const skills = [];

    for (const doc of skillsSnapshot.docs) {
      const skillData = doc.data();
      const userId = doc.id;

      const profileDoc = await db.collection('profiles').doc(userId).get();
      if (!profileDoc.exists) continue;

      const profileData = profileDoc.data();

      skills.push({
        id: userId,
        user: {
          id: userId,
          name: profileData.name,
          email: profileData.email,
          avatar: profileData.avatar,
          university: profileData.university,
          semester: profileData.semester,
          branch: profileData.branch
        },
        canTeach: skillData.canTeach || [],
        wantToLearn: skillData.wantToLearn || [],
        availability: skillData.availability || { days: [], timeSlots: [] },
        verified: skillData.verified || false
      });
    }

    res.json({
      success: true,
      skills
    });
  } catch (error) {
    console.error('Get all skills error:', error);
    res.status(500).json({ message: 'Server error fetching skills' });
  }
};
