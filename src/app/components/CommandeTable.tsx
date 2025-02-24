import React from 'react';

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
}

const CommandeTable: React.FC<CommandeTableProps> = ({ commandes }) => (
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
              Utilisateur
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Montant
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              État
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
                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                  ${commande.etat === 'recu' ? 'bg-green-100 text-green-800' :
                  commande.etat === 'expedie' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-gray-100 text-gray-800'}`}>
                  {commande.etat}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default CommandeTable;
