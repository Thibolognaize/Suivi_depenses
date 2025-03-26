'use client';
import { useState, useEffect } from 'react';
import Header from '@/app/components/Header1';
import Filters from '@/app/components/Filters';
import CommandeTable from '@/app/components/CommandeTable';
import Button from './components/ButtonAdd';
import ProtectedRoute from '@/lib/ProtectedRoute';

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

export default function DepensesPage() {
  const [commandes, setCommandes] = useState<Commande[]>([]);
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([]);
  const [entites, setEntites] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/commandes');
        if (!response.ok) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`);
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }

        setCommandes(data);
        setFilteredCommandes(data);

        const uniqueEntites = Array.from(new Set(data.map((c: Commande) => c.entite.nom)));
        setEntites(uniqueEntites as string[]);
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSort = (field: string) => {
    const sorted = [...filteredCommandes].sort((a, b) => {
      switch (field) {
        case 'date':
          return new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime();
        case 'montant':
          return b.montant - a.montant;
        case 'entite':
          return a.entite.nom.localeCompare(b.entite.nom);
        default:
          return 0;
      }
    });
    setFilteredCommandes(sorted);
  };

  const handleFilterEntite = (entite: string) => {
    if (!entite) {
      setFilteredCommandes(commandes);
      return;
    }

    const filtered = commandes.filter(c => c.entite.nom === entite);
    setFilteredCommandes(filtered);
  };

  const handleFilterDate = (startDate: string, endDate: string) => {
    let filtered = [...commandes];

    if (startDate) {
      filtered = filtered.filter(c =>
        new Date(c.date_creation) >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(c =>
        new Date(c.date_creation) <= new Date(endDate)
      );
    }

    setFilteredCommandes(filtered);
  };
  
  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/commandes/delete/${id}`, {
        method: 'DELETE',
      });
      setCommandes(commandes.filter((commande) => commande.id !== id));
      setFilteredCommandes(filteredCommandes.filter((commande) => commande.id !== id));
    } catch (error) {
      console.error('Failed to delete commande:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">Chargement...</div>
        </main>
      </div>
    );
  }


  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 relative">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Filters
            onSort={handleSort}
            onFilterEntite={handleFilterEntite}
            entites={entites}
            onFilterDate={handleFilterDate}
          />
          <CommandeTable commandes={filteredCommandes} onDelete={handleDelete}/>
          <Button href="/insert-item" title='Ajouter une commande'></Button>
        </main>
      </div>
    </ProtectedRoute>
  );
}
