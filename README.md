## Gute.tech Frontend

## Содержание

- [О проекте](#о-проекте)
- [Технологии](#технологии)
- [Структура проекта](#структура-проекта)
- [Система лейаутов](#система-лейаутов)
- [Сборка](#сборка)

## О проекте

Веб-приложение для сети облачных сайтов автозапчастей Gute.tech

## Технологии

- [React](https://reactjs.org/)
- [Next.js](https://nextjs.org/) - Фреймворк, предоставляющий удобный SSR и SSG
- [Material ui](https://mui.com/) - Библиотека стилизованных компонентов для более удобной и быстрой верстки и разработки
- [TypeScript](https://www.typescriptlang.org/)

## Структура проекта

```bash
.
├── README.md
├── components
│   ├── base - **Папка base содержит компоненты, являющиеся составными блоками страниц**
│   │   └── main **main - название страницы**
│   │       └── CategoryCard **CategoryCard - компонент-блок, использующийся на главной странице**
│   │           ├── CategoryCard.module.css **Модульные стили**
│   │           ├── CategoryCard.tsx **Сам компонент**
│   │           │── index.tsx **index файл для экспорта**
│   │           └── types.ts **Типы**
│   ├── main **Папка main содержит компоненты, являющиейся составными блоками лейаутов**
│   │   ├── Footer
│   │   └── Header
│   └── ui **Атомарные компоненты**
│       ├── Button
│       └── Slider
├── layouts **Лейауты**
│   └── index.tsx
├── mock **Фейковые данные для отладки и тестирования**
├── pages **Нативная папка next.js. Как работает структура next проекта можно посмотреть в документации Next.
├── public
├── styles **Стили**
│   └── globals.css
├── next.config.js **Конфиг Next проекта**
└── tsconfig.json **Конфиг TS*
```

## Система лейаутов

Изначально все страницы отрисовываются в main layout.
Для того чтобы поменять лейаут для страницы PageName на, например, ExampleLayout необходимо добавить к компоненту PageName добавить свойство PageLayout

```js
  /// PageName.tsx
  import { ExampleLayout } from 'layouts/ExampleLayout'

  const PageName: React.FC = () => (...)

  PageName.PageLayout = ExampleLayout

  export default PageName
```

## Сборка

Проект собирается командой

```bash
npm run dev
```
