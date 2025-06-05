import Link from 'next/link';
import React from 'react';
import CommandeEtat from './CommandeEtat';
import Image from 'next/image';

interface Commande {
  id: number;
  libelle: string;
  quantite: number;
  montant: number;
  date_creation: Date;
  etat: string;
  entite: { nom: string };
  fournisseur: { nom: string };
  categorie: { nom: string };
  utilisateur: { nom: string; prenom: string };
}

interface CommandeTableProps {
  commandes: Commande[];
  onDelete: (id: number) => void;
}

const CommandeTable: React.FC<CommandeTableProps> = ({ commandes, onDelete }) => {
  const handleDelete = (id: number) => {
    const userConfirmed = window.confirm("Êtes-vous sûr de vouloir supprimer cet élément ?");
    if (userConfirmed) {
      onDelete(id);
    }
  };

  return (
    <div className="bg-white shadow-sm rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Libellé
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Entité
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pour utilisateur
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Montant
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                État
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {commandes.map((commande) => (
              <tr key={commande.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(commande.date_creation).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {commande.libelle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {commande.entite.nom}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {`${commande.utilisateur.prenom} ${commande.utilisateur.nom}`}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Intl.NumberFormat('fr-FR', {
                    style: 'currency',
                    currency: 'EUR'
                  }).format(commande.montant)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <CommandeEtat etat={commande.etat} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className='flex space-x-2'>
                    <Link href={`/edit-commande?id=${commande.id}`}>
                      <Image src="/icons/pencil.svg" alt="Editer" width={20} height={20} className='cursor-pointer'/>
                    </Link>
                    <button onClick={() => handleDelete(commande.id)}>
                      <Image src="/icons/trash.svg" alt="Supprimer" width={20} height={20} />
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CommandeTable;
