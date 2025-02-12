import { create } from 'zustand';
import { users } from './mockUsers';
import { TypeUser, TypeUserTg } from '../types/types';

interface Node {
  id: string;
  position: { x: number; y: number };
  type: string;
  data: {
    id: string;
    first_name: string;
    last_name: string;
    photo: string;
    position: string;
    grade: number;
    bossId: string;
  };
}

interface Edge {
  id: string;
  source: string;
  target: string;
}

interface StoreState {
  user: TypeUser;
  telegramData: any | null;
  setTelegramData: (data: any) => void;
  userTg: TypeUserTg | null;
  colorThemeTg: 'light' | 'dark';
  setColorThemeTg: (theme: 'light' | 'dark') => void;
  setUser: (newUser: TypeUser) => void;
  storeNodes: Node[];
  storeEdges: Edge[];
  hiddenNodes: string[];
  toggledNodes: string[];
  sortedIds: string[];
  toggleVisibilityById: (id: string) => void;
  setNodes: (newNodes: Node[]) => void;
  setEdges: (newEdges: Edge[]) => void;
}

export const useStore = create<StoreState>((set, get) => {
  //@ts-ignore
  let tg = window.Telegram?.WebApp;
  const userData = tg ? tg.initDataUnsafe.user : null;
  const colorScheme = tg ? tg.colorScheme : null;

  const initialNodes: Node[] = [];
  const initialEdges: Edge[] = [];

  const initialUser: TypeUser = userData
    ? {
        id: userData.id,
        first_name: userData.first_name || '',
        last_name: userData.last_name || '',
        gender: userData.gender || '',
        position: userData.position || '',
        grade: userData.grade || 0,
        bossId: userData.bossId || 0,
        photo: userData.photo_url || '',
      }
    : {
        id: 0,
        first_name: '',
        last_name: '',
        gender: '',
        position: '',
        grade: 0,
        bossId: 0,
        photo: '',
      };

  users.forEach((item) => {
    const isMainUser = item.bossId === null;

    initialNodes.push({
      id: item.id.toString(),
      position: { x: 0, y: 0 },
      type: 'user_card',
      data: {
        id: `${item.id}`,
        first_name:
          isMainUser && userData ? userData.first_name : item.first_name,
        last_name: isMainUser && userData ? userData.last_name : item.last_name,
        photo:
          isMainUser && userData
            ? userData.photo_url
            : `https://randomuser.me/api/portraits/${item.gender}/${item.id}.jpg`,
        position: item.position,
        grade: item.grade,
        bossId: `${item.bossId || 'null'}`,
      },
    });

    if (item.bossId !== null) {
      initialEdges.push({
        id: `e${item.id}-${item.bossId}`,
        source: `${item.id}`,
        target: `${item.bossId}`,
      });
    }
  });

  const getAllSubordinatesToHide = (id: string): string[] => {
    const getSubordinates = (bossId: string): string[] => {
      const subordinates = users
        .filter((user) => `${user.bossId}` === bossId)
        .map((user) => `${user.id}`);
      return subordinates.reduce<string[]>((acc, subordinateId) => {
        return acc.concat(subordinateId, getSubordinates(subordinateId));
      }, []);
    };

    return getSubordinates(id);
  };

  const toggleVisibilityById = (id: string) => {
    set((state) => {
      const isAlreadyToggled = state.toggledNodes.includes(id);
      const updatedToggledNodes = isAlreadyToggled
        ? state.toggledNodes.filter((item) => item !== id)
        : [...state.toggledNodes, id];

      const subordinatesToHide = getAllSubordinatesToHide(id);
      const updatedHiddenNodes = isAlreadyToggled
        ? state.hiddenNodes.filter((node) => !subordinatesToHide.includes(node))
        : [...state.hiddenNodes, ...subordinatesToHide];

      const filteredNodes = initialNodes.filter(
        (node) => !updatedHiddenNodes.includes(node.id) || node.id === '11'
      );

      const filteredEdges = initialEdges.filter(
        (edge) =>
          filteredNodes.some((node) => node.id === edge.source) &&
          filteredNodes.some((node) => node.id === edge.target)
      );

      return {
        sortedIds: updatedToggledNodes,
        storeNodes: filteredNodes,
        storeEdges: filteredEdges,
        hiddenNodes: updatedHiddenNodes,
        toggledNodes: updatedToggledNodes,
      };
    });
  };

  return {
    user: initialUser,
    telegramData: null,
    setTelegramData: (data) => set({ telegramData: data }),
    userTg: userData ?? users[0],
    colorThemeTg: colorScheme,
    setColorThemeTg: (theme) => set({ colorThemeTg: theme }),
    setUser: (newUser: TypeUser) => set(() => ({ user: newUser })),
    storeNodes: initialNodes,
    storeEdges: initialEdges,
    hiddenNodes: [],
    toggledNodes: [],
    sortedIds: [],
    toggleVisibilityById,
    setNodes: (newNodes: Node[]) => set(() => ({ storeNodes: newNodes })),
    setEdges: (newEdges: Edge[]) => set(() => ({ storeEdges: newEdges })),
  };
});
