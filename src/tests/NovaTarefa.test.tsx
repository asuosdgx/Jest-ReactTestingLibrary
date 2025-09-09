import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NovaTarefa from '@/components/NovaTarefa';

describe('NovaTarefa', () => {
  const mockOnAddTask = jest.fn();

  beforeEach(() => {
    mockOnAddTask.mockClear();
  });

  it('renders input and button', () => {
    render(<NovaTarefa onAddTask={mockOnAddTask} />);
    expect(screen.getByPlaceholderText('Digite uma nova tarefa')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /adicionar tarefa/i })).toBeInTheDocument();
  });

  it('calls onAddTask with trimmed text on submit', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAddTask={mockOnAddTask} />);
    const input = screen.getByPlaceholderText('Digite uma nova tarefa');
    const button = screen.getByRole('button', { name: /adicionar tarefa/i });

    await user.type(input, '  Nova Tarefa  ');
    await user.click(button);

    expect(mockOnAddTask).toHaveBeenCalledWith('Nova Tarefa');
    expect(input).toHaveValue('');
  });

  it('does not call onAddTask if input is empty', async () => {
    const user = userEvent.setup();
    render(<NovaTarefa onAddTask={mockOnAddTask} />);
    const button = screen.getByRole('button', { name: /adicionar tarefa/i });

    await user.click(button);

    expect(mockOnAddTask).not.toHaveBeenCalled();
  });

  it('validates input on form submit', () => {
    render(<NovaTarefa onAddTask={mockOnAddTask} />);
    const form = screen.getByRole('form');
    const input = screen.getByPlaceholderText('Digite uma nova tarefa');

    fireEvent.submit(form);

    expect(mockOnAddTask).not.toHaveBeenCalled();
    expect(input).toHaveValue('');
  });
});
