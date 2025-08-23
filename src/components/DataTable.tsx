import React, { useMemo, useState } from 'react';

export interface Column<T> {
  key: string;          
  title: string;        
  dataIndex: keyof T;   
  sortable?: boolean;   
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: boolean;              
  onRowSelect?: (selectedRows: T[]) => void; 
  emptyMessage?: string;             
  getRowKey?: (row: T, index: number) => React.Key; 
}

type SortState<T> = {
  key: keyof T | null;
  direction: 'asc' | 'desc' | null;
};

function compareValues(a: unknown, b: unknown) {
  if (a == null && b == null) return 0;
  if (a == null) return -1;
  if (b == null) return 1;
  if (typeof a === 'number' && typeof b === 'number') return a - b;
  return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' });
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  loading = false,
  selectable = false,
  onRowSelect,
  emptyMessage = 'No data available.',
  getRowKey,
}: DataTableProps<T>) {
  const [sort, setSort] = useState<SortState<T>>({ key: null, direction: null });
  const [selectedKeys, setSelectedKeys] = useState<Set<React.Key>>(new Set());

  const resolveRowKey = (row: T, index: number) =>
    getRowKey ? getRowKey(row, index) : (row.id as React.Key ?? index);

  const toggleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    setSort(prev => {
      if (prev.key !== col.dataIndex) return { key: col.dataIndex, direction: 'asc' };
      if (prev.direction === 'asc') return { key: col.dataIndex, direction: 'desc' };
      if (prev.direction === 'desc') return { key: null, direction: null };
      return { key: col.dataIndex, direction: 'asc' };
    });
  };

  const sortedData = useMemo(() => {
    if (!sort.key || !sort.direction) return data;
    const clone = [...data];
    clone.sort((a, b) => {
      const result = compareValues(a[sort.key!], b[sort.key!]);
      return sort.direction === 'asc' ? result : -result;
    });
    return clone;
  }, [data, sort]);

  const allSelected = selectable && sortedData.length > 0 && selectedKeys.size === sortedData.length;

  const emitSelection = (next: Set<React.Key>) => {
    if (!onRowSelect) return;
    const rows = sortedData.filter((r, idx) => next.has(resolveRowKey(r, idx)));
    onRowSelect(rows);
  };

  const toggleSelectAll = () => {
    if (!selectable) return;
    const next = new Set<React.Key>();
    if (!allSelected) sortedData.forEach((r, idx) => next.add(resolveRowKey(r, idx)));
    setSelectedKeys(next);
    emitSelection(next);
  };

  const toggleRow = (row: T, idx: number) => {
    if (!selectable) return;
    const key = resolveRowKey(row, idx);
    const next = new Set(selectedKeys);
    if (next.has(key)) next.delete(key); else next.add(key);
    setSelectedKeys(next);
    emitSelection(next);
  };

  return (
    <div className="relative border rounded-lg overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-100">
          <tr>
            {selectable && (
              <th className="px-3 py-2 text-left w-10">
                <input
                  type="checkbox"
                  aria-label="Select all rows"
                  checked={allSelected}
                  onChange={toggleSelectAll}
                  disabled={loading || sortedData.length === 0}
                />
              </th>
            )}
            {columns.map(col => {
              const isSorted = sort.key === col.dataIndex && sort.direction;
              const ariaSort: 'none' | 'ascending' | 'descending' = !isSorted
                ? 'none'
                : sort.direction === 'asc'
                  ? 'ascending'
                  : 'descending';
              return (
                <th
                  key={col.key}
                  scope="col"
                  aria-sort={ariaSort}
                  className={`px-4 py-2 font-medium text-left select-none ${col.sortable ? 'cursor-pointer hover:bg-gray-200' : ''}`}
                  onClick={() => toggleSort(col)}
                >
                  <span className="inline-flex items-center gap-1">
                    {col.title}
                    {col.sortable && (
                      <span className="text-xs text-gray-500">
                        {isSorted ? (sort.direction === 'asc' ? '▲' : '▼') : '⇅'}
                      </span>
                    )}
                  </span>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody className="divide-y">
          {loading && (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={columns.length + (selectable ? 1 : 0)}>
                <div className="flex items-center justify-center gap-3">
                  <div className="h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  <span>Loading...</span>
                </div>
              </td>
            </tr>
          )}
          {!loading && sortedData.length === 0 && (
            <tr>
              <td className="px-4 py-6 text-center text-gray-500" colSpan={columns.length + (selectable ? 1 : 0)}>
                {emptyMessage}
              </td>
            </tr>
          )}
          {!loading && sortedData.map((row, idx) => {
            const key = resolveRowKey(row, idx);
            const selected = selectedKeys.has(key);
            return (
              <tr
                key={key}
                className={`hover:bg-gray-50 ${selectable ? 'cursor-pointer' : ''} ${selected ? 'bg-blue-50' : ''}`}
                onClick={() => toggleRow(row, idx)}
              >
                {selectable && (
                  <td className="px-3 py-2">
                    <input
                      type="checkbox"
                      aria-label="Select row"
                      checked={selected}
                      onChange={() => toggleRow(row, idx)}
                      onClick={e => e.stopPropagation()}
                    />
                  </td>
                )}
                {columns.map(col => (
                  <td key={col.key} className="px-4 py-2 whitespace-nowrap">
                    {String(row[col.dataIndex] ?? '')}
                  </td>
                ))}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;