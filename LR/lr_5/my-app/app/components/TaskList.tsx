'use client';

import Task from './Task';

type TaskListProps = {
    tasks: Array<{
        id: number;
        title: string;
        completed: boolean;
    }>;
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onUpdate: (id: number, newTitle: string) => void;
};

export default function TaskList({ tasks, onDelete, onToggleComplete, onUpdate }: TaskListProps) {
    if (tasks.length === 0) {
        return <p className="text-center text-gray-500 py-4">Задач нет. Добавьте первую!</p>;
    }

    return (
        <ul className="space-y-3">
            {tasks.map(task => (
                <Task
                    key={task.id}
                    task={task}
                    onDelete={onDelete}
                    onToggleComplete={onToggleComplete}
                    onUpdate={onUpdate}
                />
            ))}
        </ul>
    );
}