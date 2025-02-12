import { create } from 'zustand';
import { users } from './mockUsers.ts';

export const useStore = create((set, get) => {
  // Заполняем начальные данные
  const initialNodes = [];
  const initialEdges = [];

  users?.forEach((item) => {
    initialNodes.push({
      id: `${item.id}`, // id всегда строка
      position: { x: 0, y: 0 },
      type: 'user_card',
      data: {
        id: `${item.id}`, // Преобразуем id в строку
        name: item.name,
        surname: item.surname,
        photo: `https://randomuser.me/api/portraits/${item.gender}/${item.id}.jpg`,
        position: item.position,
        grade: item.grade,
        bossId: `${item.bossId || 'null'}`, // Преобразуем null в строку
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

  // Функция для удаления сотрудников с учетом их подчинённых
  const getAllSubordinatesToHide = (id) => {
    const getSubordinates = (bossId) => {
      const subordinates = users
        .filter((user) => `${user.bossId}` === `${bossId}`)
        .map((user) => `${user.id}`);
      return subordinates.reduce((acc, subordinateId) => {
        return acc.concat(subordinateId, getSubordinates(subordinateId));
      }, []);
    };

    const subordinatesToHide = getSubordinates(id);
    const finalSubordinatesToHide = subordinatesToHide.reduce((acc, userId) => {
      return acc.concat(userId, getSubordinates(userId));
    }, subordinatesToHide);
    return finalSubordinatesToHide;
  };

  const toggleVisibilityById = (id) => {
    set((state) => {
      // Проверка, добавлен ли уже id в toggledNodes
      const isAlreadyToggled = state.toggledNodes.includes(id);

      const updatedToggledNodes = isAlreadyToggled
        ? state.toggledNodes.filter((item) => item !== id) // Убираем из массива
        : [...state.toggledNodes, id]; // Добавляем в массив

      // Получаем всех подчинённых, которых нужно скрыть
      const subordinatesToHide = getAllSubordinatesToHide(id);

      // Обновляем список скрытых узлов
      const updatedHiddenNodes = isAlreadyToggled
        ? state.hiddenNodes.filter((node) => !subordinatesToHide.includes(node))
        : [...state.hiddenNodes, ...subordinatesToHide];

      // Фильтруем узлы:
      const filteredNodes = initialNodes.filter(
        (node) => !updatedHiddenNodes.includes(node.id) || node.id === '11' // Главный пользователь всегда видим
      );

      // Фильтруем рёбра:
      const filteredEdges = initialEdges.filter(
        (edge) =>
          filteredNodes.some((node) => node.id === edge.source) &&
          filteredNodes.some((node) => node.id === edge.target)
      );

      return {
        sortedIds: updatedToggledNodes, // обновляем список сортировки
        storeNodes: filteredNodes, // обновляем узлы
        storeEdges: filteredEdges, // обновляем рёбра
        hiddenNodes: updatedHiddenNodes, // обновляем скрытые узлы
        toggledNodes: updatedToggledNodes, // обновляем массив toggledNodes
      };
    });
  };

  return {
    user: {},
    setUser: (newUser) => set(() => ({ user: newUser })),
    storeNodes: initialNodes,
    storeEdges: initialEdges,
    hiddenNodes: [], // Начальный пустой список скрытых узлов
    toggledNodes: [], // Новый массив для отслеживания нажатых узлов
    sortedIds: [], // Массив для сортировки сотрудников
    toggleVisibilityById, // Функция для сортировки/показа сотрудников
    setNodes: (newNodes) => set(() => ({ nodes: newNodes })),
    setEdges: (newEdges) => set(() => ({ edges: newEdges })),
  };
});
