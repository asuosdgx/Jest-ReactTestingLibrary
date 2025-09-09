import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/app/page';

describe('Home Page', () => {
  it('renders the page with initial tasks', async () => {
    render(<Home />);

    expect(screen.getByText('Lista de Tarefas')).toBeInTheDocument();
    expect(screen.getByText('Total de tarefas:')).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText('Tarefa 1')).toBeInTheDocument();
      expect(screen.getByText('Tarefa 2')).toBeInTheDocument();
    });

    expect(screen.getByText('Total de tarefas: 2')).toBeInTheDocument();
  });

  it('renders NovaTarefa component', () => {
    render(<Home />);
    expect(screen.getByPlaceholderText('Digite uma nova tarefa')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar tarefa/i })).toBeInTheDocument();
  });
});
