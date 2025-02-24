import React from 'react';

interface FiltersProps {
  onSort: (field: string) => void;
  onFilterEntite: (entite: string) => void;
  entites: string[];
  onFilterDate: (startDate: string, endDate: string) => void;
}

const colorChoices = "text-gray-500";

const Filters: React.FC<FiltersProps> = ({ onSort, onFilterEntite, entites, onFilterDate }) => (
  <div className="bg-white shadow-sm p-4 mb-6 rounded-lg space-y-4">
    <div className="flex flex-wrap gap-4">
      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Trier par
        </label>
        <select
          onChange={(e) => onSort(e.target.value)}
          className="w-full border rounded-md p-2 text-gray-300"
        >
          <option value="date" className={colorChoices}>Date</option>
          <option value="montant" className={colorChoices}>Montant</option>
          <option value="entite" className={colorChoices}>Entité</option>
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Filtrer par entité
        </label>
        <select
          onChange={(e) => onFilterEntite(e.target.value)}
          className="w-full border rounded-md p-2 text-gray-300"
        >
          <option value="">Toutes</option>
          {entites.map((entite) => (
            <option key={entite} value={entite} className={colorChoices}>{entite}</option>
          ))}
        </select>
      </div>

      <div className="flex-1 min-w-[200px]">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Période
        </label>
        <div className="flex gap-2 text-gray-300">
          <input
            type="date"
            className="border rounded-md p-2"
            onChange={(e) => onFilterDate(e.target.value, '')}
          />
          <input
            type="date"
            className="border rounded-md p-2"
            onChange={(e) => onFilterDate('', e.target.value)}
          />
        </div>
      </div>
    </div>
  </div>
);

export default Filters;
