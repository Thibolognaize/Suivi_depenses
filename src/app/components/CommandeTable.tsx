import Link from 'next/link';
import React from 'react';
import CommandeEtat from './CommandeEtat';

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
  user_commande_utilisateurIdToUser: { nom: string; prenom: string };
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
                  {`${commande.user_commande_utilisateurIdToUser.prenom} ${commande.user_commande_utilisateurIdToUser.nom}`}
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
                      <img src="/icons/pencil.svg" alt="Editer" className='h-5 w-5 cursor-pointer'/>
                    </Link>
                    <button onClick={() => handleDelete(commande.id)}>
                      <img src='/icons/trash.svg' alt='Supprimer' className="h-5 w-5" />
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
