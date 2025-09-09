import { useMemo } from 'react';

export function useContadorDeTarefas(tarefas: string[]): number {
  return useMemo(() => tarefas.length, [tarefas]);
}
