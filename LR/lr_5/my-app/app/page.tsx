'use client';

import { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import AddTaskForm from './components/AddTaskForm';
import Filter from './components/Filter';

type TaskType = {
    id: number;
    title: string;
    completed: boolean;
};

export default function Home() {
    const [tasks, setTasks] = useState<TaskType[]>([]);
    const [filter, setFilter] = useState<'all' | 'completed' | 'active'>('all');

    // Загрузка задач из localStorage при загрузке приложения
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Сохранение задач в localStorage при изменении
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    const addTask = (title: string) => {
        const newTask = {
            id: Date.now(),
            title,
            completed: false
        };
        setTasks([...tasks, newTask]);
    };

    const deleteTask = (id: number) => {
        setTasks(tasks.filter(task => task.id !== id));
    };

    const toggleComplete = (id: number) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, completed: !task.completed } : task
        ));
    };

    const updateTask = (id: number, newTitle: string) => {
        setTasks(tasks.map(task =>
            task.id === id ? { ...task, title: newTitle } : task
        ));
    };

    const filteredTasks = tasks.filter(task => {
        if (filter === 'completed') return task.completed;
        if (filter === 'active') return !task.completed;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Список задач</h1>

                <AddTaskForm onAdd={addTask} />

                <Filter currentFilter={filter} onFilterChange={setFilter} />

                <TaskList
                    tasks={filteredTasks}
                    onDelete={deleteTask}
                    onToggleComplete={toggleComplete}
                    onUpdate={updateTask}
                />

                <div className="mt-6 p-4 bg-gray-50 rounded-lg text-center text-gray-600">
                    Всего задач: {tasks.length} |
                    Выполнено: {tasks.filter(t => t.completed).length} |
                    Осталось: {tasks.filter(t => !t.completed).length}
                </div>
            </div>
        </div>
    );
}