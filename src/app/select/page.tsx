'use client';

import MultiSelect from '@/components/select/multiselect/multiselect';
import ProtectedRoute from '@/guard/ProtectedRoute';
import { useState } from 'react';

const options = [
  { label: 'Option One', value: 'one' },
  { label: 'Option Two', value: 'two' },
  { label: 'Option Three', value: 'three' },
];

export default function Select() {
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);

  const handleSelectionChange = (values: string[]) => {
    setSelectedOptions(values);
    console.log('Selected values:', values);
  };

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">MultiSelect Example</h1>
      <MultiSelect options={options} onChange={handleSelectionChange} />
      <div className="mt-6">
        <strong>Selected:</strong> {selectedOptions.join(', ') || 'None'}
      </div>
    </main>
  );
}
