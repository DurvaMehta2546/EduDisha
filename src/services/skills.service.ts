import api from './api';

export interface SkillToTeach {
  skill: string;
  proficiency: 'beginner' | 'intermediate' | 'advanced';
  description?: string;
}

export interface SkillToLearn {
  skill: string;
  priority: 'low' | 'medium' | 'high';
  reason?: string;
}

export interface Availability {
  days: string[];
  timeSlots: string[];
}

export interface SkillsData {
  canTeach?: SkillToTeach[];
  wantToLearn?: SkillToLearn[];
  availability?: Availability;
}

export const skillsService = {
  createOrUpdateSkills: async (data: SkillsData) => {
    const response = await api.post('/skills', data);
    return response.data;
  },

  getMySkills: async () => {
    const response = await api.get('/skills/my-skills');
    return response.data;
  },

  findMatches: async () => {
    const response = await api.get('/skills/matches');
    return response.data;
  },

  getAllSkills: async () => {
    const response = await api.get('/skills/all');
    return response.data;
  }
};
