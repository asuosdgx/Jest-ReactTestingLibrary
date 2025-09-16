import { renderHook } from '@testing-library/react';
import { useContadorDeTarefas } from '@/hooks/useContadorDeTarefas';

describe('useContadorDeTarefas', () => {
  it('retorna 0 se o array estiver vazio', () => {
    const { result } = renderHook(() => useContadorDeTarefas([]));
    expect(result.current).toBe(0);
  });

  it('retorna o tamanho do array', () => {
    const tarefas = ['Tarefa 1', 'Tarefa 2', 'Tarefa 3'];
    const { result } = renderHook(() => useContadorDeTarefas(tarefas));
    expect(result.current).toBe(3);
  });

  it('atualiza quado o array é alterado', () => {
    const { result, rerender } = renderHook(
      ({ tarefas }) => useContadorDeTarefas(tarefas),
      { initialProps: { tarefas: ['Tarefa 1'] } },
    );
    expect(result.current).toBe(1);

    rerender({ tarefas: ['Tarefa 1', 'Tarefa 2'] });
    expect(result.current).toBe(2);
  });
});
