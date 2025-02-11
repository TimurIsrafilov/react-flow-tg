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
        bossId: `${item.bossId}`, // Преобразуем bossId в строку
      },
    });

    if (item.bossId) {
      initialEdges.push({
        id: `e${item.id}-${item.bossId}`,
        source: `${item.id}`,
        target: `${item.bossId}`,
      });
    }
  });

  // Рекурсивная функция для получения всех подчинённых
  const getSubordinates = (bossId) => {
    const subordinates = users
      .filter((user) => `${user.bossId}` === `${bossId}`) // Преобразуем оба в строки
      .map((user) => `${user.id}`); // id как строка

    return subordinates.reduce((acc, subordinateId) => {
      return acc.concat(subordinateId, getSubordinates(subordinateId)); // Рекурсивно добавляем подчинённых
    }, []);
  };

  // Функция для удаления сотрудников с учетом их подчинённых
  const getAllSubordinatesToHide = (id) => {
    const subordinatesToHide = getSubordinates(id); // Получаем всех подчинённых для выбранного босса
    const subordinatesWithBossId = users.filter((user) =>
      subordinatesToHide.includes(`${user.bossId}`)
    ); // Сотрудники, чьи bossId есть в списке подчинённых

    // Добавляем этих сотрудников в список для удаления и рекурсивно добавляем их подчинённых
    const finalSubordinatesToHide = subordinatesWithBossId.reduce(
      (acc, user) => {
        return acc.concat(`${user.id}`, getSubordinates(user.id)); // Добавляем их и их подчинённых
      },
      subordinatesToHide
    );

    return finalSubordinatesToHide;
  };

  const toggleVisibilityById = (id) => {
    set((state) => {
      const updatedSortedIds = state.sortedIds.includes(id)
        ? state.sortedIds.filter((item) => item !== id) // Убираем из списка
        : [...state.sortedIds, id]; // Добавляем в список

      // Получаем окончательный список подчинённых для выбранного босса и его подчинённых
      const subordinatesToHide = getAllSubordinatesToHide(id);

      // Логируем для проверки
      console.log('Subordinates to hide:', subordinatesToHide);

      // Добавляем новые скрытые сотрудники в список, не очищая его
      const updatedHiddenNodes = [...state.hiddenNodes, ...subordinatesToHide];

      // Фильтруем узлы:
      const filteredNodes = initialNodes.filter(
        (node) => !updatedHiddenNodes.includes(node.id) // id должно быть строкой
      );

      // Фильтруем рёбра (edges), удаляя те, которые связаны с удалёнными сотрудниками:
      const filteredEdges = initialEdges.filter(
        (edge) =>
          filteredNodes.some((node) => node.id === edge.source) &&
          filteredNodes.some((node) => node.id === edge.target)
      );

      // Логируем для проверки
      console.log('Filtered nodes:', filteredNodes);
      console.log('Filtered edges:', filteredEdges);

      return {
        sortedIds: updatedSortedIds,
        storeNodes: filteredNodes, // Обновляем только видимые узлы
        storeEdges: filteredEdges, // Обновляем только видимые рёбра
        hiddenNodes: updatedHiddenNodes, // Сохраняем новые скрытые узлы
      };
    });
  };

  return {
    user: {},
    setUser: (newUser) => set(() => ({ user: newUser })),
    storeNodes: initialNodes,
    storeEdges: initialEdges,
    hiddenNodes: [], // Начальный пустой список скрытых узлов
    sortedIds: [], // Массив для сортировки сотрудников
    toggleVisibilityById, // Функция для сортировки/показа сотрудников
    setNodes: (newNodes) => set(() => ({ nodes: newNodes })),
    setEdges: (newEdges) => set(() => ({ edges: newEdges })),
  };
});
