"use client"
import { useState, useEffect } from 'react';
import NovaTarefa from '@/components/NovaTarefa';
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';

export default function Home() {
  const [tarefas, setTarefas] = useState<string[]>([]);
  const contador = useContadorDeTarefas(tarefas);

  useEffect(() => {
    const loadTarefas = async () => {
      const data = await Promise.resolve(['Tarefa 1', 'Tarefa 2']);
      setTarefas(data);
    };
    loadTarefas();
  }, []);

  const handleAddTask = (task: string) => {
    setTarefas(prev => [...prev, task]);
  };

  return (
    <div className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Lista de Tarefas</h1>
      <p className="mb-4">Total de tarefas: {contador}</p>
      <NovaTarefa onAddTask={handleAddTask} />
      <ul className="list-disc pl-5">
        {tarefas.map((tarefa, index) => (
          <li key={index} className="mb-2">{tarefa}</li>
        ))}
      </ul>
    </div>
  );
}
