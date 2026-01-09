import api from './api';

export interface ProfileUpdateData {
  name?: string;
  university?: string;
  semester?: string;
  branch?: string;
  avatar?: string;
}

export const profileService = {
  getProfile: async () => {
    const response = await api.get('/profile');
    return response.data;
  },

  updateProfile: async (data: ProfileUpdateData) => {
    const response = await api.put('/profile', data);
    return response.data;
  }
};
