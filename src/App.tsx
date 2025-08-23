import { useState } from 'react';
import { InputField } from './components/InputField';
import { DataTable, type Column } from './components/DataTable';
import './index.css';

function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("light");

  interface Person { id: number; name: string; age: number; role: string }
  const [tableLoading, setTableLoading] = useState(false);
  const [selectedPeople, setSelectedPeople] = useState<Person[]>([]);
  const people: Person[] = [
    { id: 1, name: "Kiran", age: 21, role: "Engineer" },
    { id: 2, name: "Jack", age: 14, role: "Designer" },
    { id: 3, name: "Xor", age: 35, role: "Manager" },
    { id: 4, name: "Bob", age: 28, role: "Engineer" },
  ];
  const columns: Column<Person>[] = [
    { key: 'name', title: 'Name', dataIndex: 'name', sortable: true },
    { key: 'age', title: 'Age', dataIndex: 'age', sortable: true },
    { key: 'role', title: 'Role', dataIndex: 'role', sortable: true },
  ];

  return (
    <div className={theme === "dark" ? "bg-gray-900 text-white min-h-screen p-6" : "bg-white text-black min-h-screen p-6"}>
      <section className="space-y-6 max-w-5xl mx-auto">
        {/* Theme Toggle */}
        <div className="flex items-center gap-3">
          <button
            className="px-4 py-2 border rounded"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            Switch to {theme === "light" ? "Dark" : "Light"} Theme
          </button>
        </div>

        {/* Inputs Section */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Input Fields</h2>
          <InputField
            label="Username"
            placeholder="Enter your username"
            helperText="This will be your login name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            variant="outlined"
            size="md"
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            variant="filled"
            size="md"
          />
          <InputField
            label="Disabled Input"
            placeholder="Can't type here"
            disabled
            variant="ghost"
            size="sm"
          />
          <div>
            <InputField
              label="Loading Input"
              placeholder="Wait for data..."
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              loading={loading}
            />
            <button
              className="mt-2 px-3 py-1 border rounded"
              onClick={() => setLoading(!loading)}
            >
              Toggle Input Loading
            </button>
          </div>
        </div>

        {/* Data Table Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-xl font-semibold m-0">People Table</h2>
            <button
              className="px-3 py-1 border rounded"
              onClick={() => setTableLoading(l => !l)}
            >
              {tableLoading ? 'Stop Table Loading' : 'Simulate Table Loading'}
            </button>
          </div>
          <DataTable<Person>
            data={people}
            columns={columns}
            loading={tableLoading}
            selectable
            onRowSelect={rows => setSelectedPeople(rows)}
          />
          <div className="text-sm text-gray-600">
            Selected: {selectedPeople.length === 0 ? 'None' : selectedPeople.map(p => p.name).join(', ')}
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;