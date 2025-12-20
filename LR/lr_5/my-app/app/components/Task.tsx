'use client';

import { useState } from 'react';

type TaskProps = {
    task: {
        id: number;
        title: string;
        completed: boolean;
    };
    onDelete: (id: number) => void;
    onToggleComplete: (id: number) => void;
    onUpdate: (id: number, newTitle: string) => void;
};

export default function Task({ task, onDelete, onToggleComplete, onUpdate }: TaskProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const handleSave = () => {
        if (editTitle.trim()) {
            onUpdate(task.id, editTitle);
            setIsEditing(false);
        }
    };

    return (
        <li className={`flex items-center gap-3 p-4 rounded-lg ${task.completed ? 'bg-green-50' : 'bg-gray-50'}`}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id)}
                className="h-5 w-5 cursor-pointer"
            />

            {isEditing ? (
                <div className="flex-1 flex gap-2">
                    <input
                        type="text"
                        value={editTitle}
                        onChange={(e) => setEditTitle(e.target.value)}
                        className="flex-1 px-3 py-1 border rounded"
                        autoFocus
                    />
                    <button
                        onClick={handleSave}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Сохранить
                    </button>
                </div>
            ) : (
                <span className={`flex-1 ${task.completed ? 'line-through text-gray-500' : ''}`}>
          {task.title}
        </span>
            )}

            <div className="flex gap-2">
                {!isEditing && (
                    <button
                        onClick={() => setIsEditing(true)}
                        className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
                    >
                        Изменить
                    </button>
                )}
                <button
                    onClick={() => onDelete(task.id)}
                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Удалить
                </button>
            </div>
        </li>
    );
}