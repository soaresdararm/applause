import { create } from "zustand";
import { apiService } from "../services/api";
import { ApplausePost, Mission, RecognitionType, User } from "../types";

interface ApplauseStore {
  // Feed state
  posts: ApplausePost[];
  feedLoading: boolean;
  feedError: string | null;
  currentPage: number;
  hasNextPage: boolean;

  // Missions state
  missions: Mission[];
  missionsLoading: boolean;
  missionsError: string | null;

  // Users state
  users: User[];
  usersLoading: boolean;
  usersError: string | null;
  usersPage: number;
  usersHasNextPage: boolean;

  // Recognition types
  recognitionTypes: RecognitionType[];
  recognitionTypesLoading: boolean;

  // Form state
  isSubmitting: boolean;
  submitError: string | null;

  // Actions
  loadFeed: (refresh?: boolean) => Promise<void>;
  loadMoreFeed: () => Promise<void>;
  loadMissions: () => Promise<void>;
  loadUsers: (search?: string, refresh?: boolean) => Promise<void>;
  loadMoreUsers: (search?: string) => Promise<void>;
  loadRecognitionTypes: () => Promise<void>;
  createApplause: (data: {
    recipientId: string;
    recognitionTypeId: string;
    message: string;
    image?: string;
  }) => Promise<void>;
  reset: () => void;
}

export const useApplauseStore = create<ApplauseStore>((set, get) => ({
  // Initial state
  posts: [],
  feedLoading: false,
  feedError: null,
  currentPage: 0,
  hasNextPage: true,

  missions: [],
  missionsLoading: false,
  missionsError: null,

  users: [],
  usersLoading: false,
  usersError: null,
  usersPage: 0,
  usersHasNextPage: true,

  recognitionTypes: [],
  recognitionTypesLoading: false,

  isSubmitting: false,
  submitError: null,

  // Actions
  loadFeed: async (refresh = false) => {
    const state = get();

    if (state.feedLoading) return;

    set({ feedLoading: true, feedError: null });

    try {
      const page = refresh ? 1 : state.currentPage + 1;
      const response = await apiService.getFeed(page);

      set({
        posts: refresh ? response.data : [...state.posts, ...response.data],
        currentPage: page,
        hasNextPage: response.hasNextPage,
        feedLoading: false,
      });
    } catch (error) {
      set({
        feedError:
          error instanceof Error ? error.message : "Erro ao carregar feed",
        feedLoading: false,
      });
    }
  },

  loadMoreFeed: async () => {
    const state = get();
    if (!state.hasNextPage || state.feedLoading) return;

    await state.loadFeed();
  },

  loadMissions: async () => {
    const state = get();

    if (state.missionsLoading || state.missions.length > 0) return;

    set({ missionsLoading: true, missionsError: null });

    try {
      // Mock data - em produção seria uma chamada à API
      const mockMissions: Mission[] = [
        {
          id: "1",
          title: "Missão Ativação de PDV",
          points: 455,
          completedBy: 16,
          completedDate: "8 de novembro",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          post: {
            author: {
              id: "1",
              name: "Raul Macedo",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face",
              email: "raul@example.com",
            },
            timeAgo: "às 20:35",
            action: "Mufatto Avenida das Torres, Curitiba",
          },
        },
        {
          id: "2",
          title: "Missão Excelência no Atendimento",
          points: 320,
          completedBy: 23,
          completedDate: "10 de novembro",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          post: {
            author: {
              id: "2",
              name: "Ana Silva",
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b647?w=100&h=100&fit=crop&crop=face",
              email: "ana@example.com",
            },
            timeAgo: "às 18:20",
            action: "Mufatto Shopping Mueller, Curitiba",
          },
        },
        {
          id: "3",
          title: "Missão Ativação de PDV",
          points: 455,
          completedBy: 16,
          completedDate: "8 de novembro",
          image:
            "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop",
          post: {
            author: {
              id: "3",
              name: "Carlos Oliveira",
              avatar:
                "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face",
              email: "carlos@example.com",
            },
            timeAgo: "às 16:45",
            action: "Mufatto Batel, Curitiba",
          },
        },
        {
          id: "4",
          title: "Missão Excelência no Atendimento",
          points: 320,
          completedBy: 23,
          completedDate: "10 de novembro",
          image:
            "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=300&fit=crop",
          post: {
            author: {
              id: "4",
              name: "Maria Santos",
              avatar:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face",
              email: "maria@example.com",
            },
            timeAgo: "às 14:30",
            action: "Mufatto Centro, Curitiba",
          },
        },
      ];

      set({
        missions: mockMissions,
        missionsLoading: false,
      });
    } catch (error) {
      set({
        missionsError:
          error instanceof Error ? error.message : "Erro ao carregar missões",
        missionsLoading: false,
      });
    }
  },

  loadUsers: async (search?: string, refresh = false) => {
    const state = get();

    if (state.usersLoading) return;

    set({ usersLoading: true, usersError: null });

    try {
      const page = refresh ? 1 : state.usersPage + 1;
      const response = await apiService.getUsers(page, 20, search);

      set({
        users: refresh ? response.data : [...state.users, ...response.data],
        usersPage: page,
        usersHasNextPage: response.hasNextPage,
        usersLoading: false,
      });
    } catch (error) {
      set({
        usersError:
          error instanceof Error ? error.message : "Erro ao carregar usuários",
        usersLoading: false,
      });
    }
  },

  loadMoreUsers: async (search?: string) => {
    const state = get();
    if (!state.usersHasNextPage || state.usersLoading) return;

    await state.loadUsers(search);
  },

  loadRecognitionTypes: async () => {
    const state = get();

    if (state.recognitionTypesLoading || state.recognitionTypes.length > 0)
      return;

    set({ recognitionTypesLoading: true });

    try {
      const types = await apiService.getRecognitionTypes();
      set({ recognitionTypes: types, recognitionTypesLoading: false });
    } catch {
      set({ recognitionTypesLoading: false });
    }
  },

  createApplause: async (data) => {
    const state = get();

    if (state.isSubmitting) return;

    set({ isSubmitting: true, submitError: null });

    try {
      const newPost = await apiService.createApplause(data);
      set({
        posts: [newPost, ...state.posts],
        isSubmitting: false,
      });
    } catch (error) {
      set({
        submitError:
          error instanceof Error ? error.message : "Erro ao criar aplauso",
        isSubmitting: false,
      });
    }
  },

  reset: () => {
    set({
      posts: [],
      feedLoading: false,
      feedError: null,
      currentPage: 0,
      hasNextPage: true,
      missions: [],
      missionsLoading: false,
      missionsError: null,
      users: [],
      usersLoading: false,
      usersError: null,
      usersPage: 0,
      usersHasNextPage: true,
      isSubmitting: false,
      submitError: null,
    });
  },
}));
