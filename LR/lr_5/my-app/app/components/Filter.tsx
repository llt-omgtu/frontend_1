'use client';

type FilterProps = {
    currentFilter: 'all' | 'completed' | 'active';
    onFilterChange: (filter: 'all' | 'completed' | 'active') => void;
};

export default function Filter({ currentFilter, onFilterChange }: FilterProps) {
    return (
        <div className="flex gap-4 mb-6 p-3 bg-gray-50 rounded-lg">
            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="filter"
                    checked={currentFilter === 'all'}
                    onChange={() => onFilterChange('all')}
                    className="h-4 w-4"
                />
                <span>Все задачи</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="filter"
                    checked={currentFilter === 'active'}
                    onChange={() => onFilterChange('active')}
                    className="h-4 w-4"
                />
                <span>Активные</span>
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
                <input
                    type="radio"
                    name="filter"
                    checked={currentFilter === 'completed'}
                    onChange={() => onFilterChange('completed')}
                    className="h-4 w-4"
                />
                <span>Выполненные</span>
            </label>
        </div>
    );
}