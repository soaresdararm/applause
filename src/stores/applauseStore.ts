import { create } from "zustand";
import { apiService } from "../services/api";
import { ApplausePost, RecognitionType, User } from "../types";

interface ApplauseStore {
  // Feed state
  posts: ApplausePost[];
  feedLoading: boolean;
  feedError: string | null;
  currentPage: number;
  hasNextPage: boolean;

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
