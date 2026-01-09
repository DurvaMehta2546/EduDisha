import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { skillsService, SkillsData } from '@/services/skills.service';
import { toast } from 'sonner';

export const useSkills = () => {
  const queryClient = useQueryClient();

  const { data: mySkills, isLoading: isLoadingMySkills } = useQuery({
    queryKey: ['mySkills'],
    queryFn: () => skillsService.getMySkills()
  });

  const { data: matches, isLoading: isLoadingMatches } = useQuery({
    queryKey: ['skillMatches'],
    queryFn: () => skillsService.findMatches()
  });

  const { data: allSkills, isLoading: isLoadingAllSkills } = useQuery({
    queryKey: ['allSkills'],
    queryFn: () => skillsService.getAllSkills()
  });

  const saveSkills = useMutation({
    mutationFn: (data: SkillsData) => skillsService.createOrUpdateSkills(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['mySkills'] });
      queryClient.invalidateQueries({ queryKey: ['skillMatches'] });
      queryClient.invalidateQueries({ queryKey: ['allSkills'] });
      toast.success('Skills saved successfully');
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || 'Failed to save skills');
    }
  });

  return {
    mySkills: mySkills?.skills,
    matches: matches?.matches || [],
    allSkills: allSkills?.skills || [],
    isLoadingMySkills,
    isLoadingMatches,
    isLoadingAllSkills,
    saveSkills
  };
};
