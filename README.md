<div align="center">
<h1>Uzence Design System</h1>
<p>Made Two deliverable Components as per the assigned work.</p>
</div>

## 🛠 Tech Stack

React 19 • TypeScript • Vite 7 • Storybook 9 • Tailwind CSS 4 • ESLint / typescript-eslint

Made with </> using Vite & Storybook.


## 🗂 Folder Structure

```
uzence-design/
├─ .storybook/  
├─ public/  
├─ src/
│  ├─ components/   
│  │  ├─ DataTable.tsx			//component 2
│  │  └─ InputField.tsx			//component 1
│  ├─ stories/  
│  │  ├─ DataTable.stories.tsx		//component {2}storybook
│  │  └─ InputField.stories.tsx		//component {1}storybook
│  ├─ App.tsx   
│  ├─ main.tsx  
│  ├─ index.css   
│  └─ vite-env.d.ts
├─ eslint.config.js   
├─ vite.config.ts   
├─ tsconfig*.json   
├─ package.json
└─ README.md
```

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the development app

```bash
npm run dev
```

Visit: http://localhost:5173

### 3. Launch Storybook

```bash
npm run storybook
```

Visit: http://localhost:6006

### 4. Build production bundles

```bash
npm run build      # Library / app build
npm run build-storybook  # Static Storybook
```

### 5. Preview production build locally

```bash
npm run preview
```

## 🧩 Components Overview

### InputField

Props (selected): `label`, `placeholder`, `helperText`, `variant`, `size`, `disabled`, `loading`, `value`, `onChange`.

Usage:

```tsx
<InputField
  label="Username"
  placeholder="Enter your username"
  helperText="Visible to others"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  variant="outlined"
  size="md"
/>
```

### DataTable (generic)

```ts
interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}
interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;
  onRowSelect?: (selected: T[]) => void;
  emptyMessage?: string;
  getRowKey?: (row: T, index: number) => React.Key;
}
```

Usage:

```tsx
type Person = { id: number; name: string; age: number; role: string };
const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: true },
];
<DataTable<Person>
  data={people}
  columns={columns}
  selectable
  onRowSelect={(rows) => console.log(rows)}
/>;
```

## 📝 Description of My Approach

For  **Component 1 (InputField)** , I focused on making a reusable input that can handle different states and styles. I started by defining clear props (`label`, `placeholder`, `errorMessage`, etc.) so the component is flexible. I used Tailwind classes to manage **sizes** (`sm`, `md`, `lg`) and **variants** (`filled`, `outlined`, `ghost`). I also added state handling for  **disabled** ,  **invalid** , and **loading** (showing a spinner near the label). Extra features like  **clear button** make the component feel more practical. This helped me understand how to combine TypeScript types with React props to keep things strongly typed.

For  **Component 2 (DataTable)** , my idea was to create a generic table that works with any type of data. I used a `columns` config to define how data should be displayed, instead of hardcoding. Sorting is done by clicking on column headers if `sortable` is true. Row selection is supported through checkboxes (single or multiple), and I call back the parent with the selected rows. I also added **loading** and **empty state** handling so the table feels complete.

During this, I learned how to use **TypeScript generics** (`<T>`) to make the table reusable for any dataset. I referred to React and TypeScript documentation and also used AI tools for guidance while building the components..
