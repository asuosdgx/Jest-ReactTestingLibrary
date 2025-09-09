import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NovaTarefa from '@/components/NovaTarefa';

describe('NovaTarefa', () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  it('Renderiza o Input e o Botão', () => {
    render(<NovaTarefa onAddTask={mockOnAddTask} />);
    expect(screen.getByPlaceholderText('Digite uma nova tarefa')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar tarefa/i })).toBeInTheDocument();
  });

  it('chama a função onAddTask com função trim()', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('Digite uma nova tarefa');
    const button = screen.getByRole('button', { name: /adicionar tarefa/i });

    await user.type(input, '  Nova Tarefa  ');
    await user.click(button);

    expect(mockOnAddTask).toHaveBeenCalledWith('Nova Tarefa');
    expect(input).toHaveValue('');
  });

  it('nao chama a função onAddTask se o input estiver vazio', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAddTask={mockOnAddTask} />);
    const button = screen.getByRole('button', { name: /adicionar tarefa/i });

    await user.click(button);

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('valida o input e o formulário', () => {
    render(<NovaTarefa onAddTask={mockOnAddTask} />);
    const form = screen.getByRole('form');
    const input = screen.getByPlaceholderText('Digite uma nova tarefa');

    fireEvent.submit(form);

    expect(mockOnAddTask).not.toHaveBeenCalled();
    expect(input).toHaveValue('');
  });
});
