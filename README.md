# Telegram nini app and Web app of the company structure

## Project description:

A flow-chart to observe information about your colleagues

## The app can be started at Telegram by the bot direct link:

[https://t.me/reactflowtestingbot/flowchart/](https://t.me/reactflowtestingbot/flowchart/)

## The app is deployed at GitHub Pages by the following link:

[https://timurisrafilov.github.io/react-flow-tg/](https://timurisrafilov.github.io/react-flow-tg/)

## Build commands:

clone repository

```bash
git clone https://github.com/TimurIsrafilov/react-flow-tg.git
```

go to project folder

```bash
cd react-flow-tg
```

install dependencies

```bash
npm i
```

## Commands for app run:

run dev mode

```bash
npm start
```

Open [http://localhost:3000](http://localhost:3000)

run prod mode

```bash
npm run build
```

run prod mode

```bash
npm run build
```

## Stack of technologies used:

- <img src="https://github.com/devicons/devicon/blob/master/icons/react/react-original.svg" title="reactjs" alt="reactjs" width="20" height="20"/> - **ReactJS** - библиотека JavaScript [https://react.dev/](https://react.dev/)
- <img src="https://github.com/devicons/devicon/blob/master/icons/typescript/typescript-original.svg" title="typescript" alt="typescript" width="20" height="20"/> - **TypeScript** - система статической типизации для JS [https://www.typescriptlang.org/](https://www.typescriptlang.org/)
- <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpHj4UwTW4ANSlNjzQOiiOqfDa6kal9RpF0A&s" title="zustand" alt="zustand" width="20" height="20"/> - **Zustand** - стейт-менеджер [https://zustand.docs.pmnd.rs](https://zustand.docs.pmnd.rs)

## Implemented functionality:

- штатная структура построена на основе моковых данных
- можно скрыть и показать сотрудников
- можно посмотреть детальную информацию о сотруднике
- приложение можно запустить как в телеграмме так и в веб приложении
- при использовании в телеграмме должны автоматически подтягиваться данные пользователя и цветовая тема

## What can be improved:

- применена библиотаке dagre, которая высчитывает оптимальное раположение сотрудников на рабчем пространстве,
  что влияет на пересчет расположения сотрудников при отключении / включении группы сотрудников
  желательно изменить подход для создании приложения с более корретным отражениея изменений
