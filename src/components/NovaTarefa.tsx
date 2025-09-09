'use client';

import { useState } from 'react';

interface NovaTarefaProps {
  onAddTask: (task: string) => void;
}

export default function NovaTarefa({ onAddTask }: NovaTarefaProps) {
  const [task, setTask] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (task.trim()) {
      onAddTask(task.trim());
      setTask('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <input
        type="text"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        placeholder="Digite uma nova tarefa"
        className="border p-2 mr-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Adicionar Tarefa
      </button>
    </form>
  );
}
