import React from 'react';

interface CommandeEtatProps {
    etat: string;
    }

const CommandeEtat: React.FC<CommandeEtatProps> = ({ etat }) => {
    const getStyles = (etat: string) => {
        switch (etat) {
            case 'commande':
                return 'bg-yellow-100 text-yellow-800';
            case 'expedie':
                return 'bg-blue-100 text-blue-800';
            case 'recu':
                return 'bg-green-100 text-green-800';
            case 'retourne':
                return 'bg-red-100 text-red-800';
            default:
                return 'bg-gray-100 text-gray-800';
        }
    };

    const getText = (etat: string) => {
        switch (etat) {
          case 'recu':
            return 'Reçu';
          case 'expedie':
            return 'Expédié';
          case 'retourne':
            return 'Retourné';
          case 'commande':
            return 'Commandé';
          default:
            return 'État inconnu';
        }
      };

    return (
    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStyles(etat)}`}>
        {getText(etat)}
    </span>
    );
};

export default CommandeEtat;
