import type { Meta, StoryObj } from "@storybook/react";
import { DataTable } from "../components/DataTable";
import type { Column } from "../components/DataTable";

interface Person {
  id: number;
  name: string;
  age: number;
  role: string;
}

const sampleData: Person[] = [
  { id: 1, name: "Kiran", age: 21, role: "Engineer" },
  { id: 2, name: "Jack", age: 14, role: "Designer" },
  { id: 3, name: "Xor", age: 35, role: "Manager" },
  { id: 4, name: "Bob", age: 28, role: "Engineer" },
];

const columns: Column<Person>[] = [
  { key: "name", title: "Name", dataIndex: "name", sortable: true },
  { key: "age", title: "Age", dataIndex: "age", sortable: true },
  { key: "role", title: "Role", dataIndex: "role", sortable: true },
];

const meta: Meta<typeof DataTable<Person>> = {
  title: "Components/DataTable",
  component: DataTable,
  tags: ["autodocs"],
  argTypes: {
    loading: { control: "boolean" },
    selectable: { control: "boolean" },
  },
};
export default meta;

type Story = StoryObj<typeof DataTable<Person>>;

export const Basic: Story = {
  args: {
    data: sampleData,
    columns,
  },
};

export const SortableAndSelectable: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
  },
};

export const Loading: Story = {
  args: {
    data: [],
    columns,
    loading: true,
  },
};

export const Empty: Story = {
  args: {
    data: [],
    columns,
  },
};

export const WithSelectionCallback: Story = {
  args: {
    data: sampleData,
    columns,
    selectable: true,
    onRowSelect: (rows: Person[]) => {
      // eslint-disable-next-line no-console
      console.log("Selected rows", rows);
    },
  },
};
