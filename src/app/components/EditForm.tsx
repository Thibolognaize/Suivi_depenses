"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

enum CommandeEtat {
  COMMANDE = 'commande',
  EXPEDIE = 'expedie',
  RECU = 'recu',
  RETOURNE = 'retourne'
}

// Mapping pour l'affichage avec accents
const etatDisplayMap: Record<CommandeEtat, string> = {
  [CommandeEtat.RECU]: 'Reçu',
  [CommandeEtat.COMMANDE]: 'Commandé',
  [CommandeEtat.EXPEDIE]: 'Expédié',
  [CommandeEtat.RETOURNE]: 'Retourné'
};


interface Commande {
  id: number;
  libelle: string;
  quantite: number;
  montant: number;
  etat: CommandeEtat;
  entiteId: number;
  fournisseurId: number;
  categorieId: number;
  utilisateurId: number;
}

interface Entite {
  id: number;
  nom: string;
}

interface Fournisseur {
  id: number;
  nom: string;
}

interface Utilisateur {
  id: number;
  nom: string;
  prenom: string;
}

interface Categorie {
  id: number;
  nom: string;
}

const EditCommande = () => {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const router = useRouter();

  const [commande, setCommande] = useState<Commande | null>(null);
  const [formData, setFormData] = useState<Commande>({
    id: 0,
    libelle: '',
    quantite: 0,
    montant: 0,
    etat: CommandeEtat.COMMANDE,
    entiteId: 0,
    fournisseurId: 0,
    categorieId: 0,
    utilisateurId: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const [entites, setEntites] = useState<Entite[]>([]);
  const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchEntites = await fetch('/api/entites').then(res => res.json());
        const fetchFournisseurs = await fetch('/api/fournisseurs').then(res => res.json());
        const fetchUtilisateurs = await fetch('/api/utilisateurs').then(res => res.json());
        const fetchCategories = await fetch('/api/categories').then(res => res.json());

        setEntites(fetchEntites);
        setFournisseurs(fetchFournisseurs);
        setUtilisateurs(fetchUtilisateurs);
        setCategories(fetchCategories);

        if (id) {
          await fetchCommande(id);
        } else {
          console.error("No ID provided");
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError('Erreur lors de la récupération des données');
      }
    };

    fetchData();
  }, [id]);

  const fetchCommande = async (id: string) => {
    try {
      const response = await fetch(`/api/commandes/${id}`);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Erreur inconnue');
      }
      const data = await response.json();
      setCommande(data);
      setFormData(data);
    } catch (error) {
      console.error("Error fetching commande:", error);
      setError('Erreur lors de la récupération de la commande');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Affiche les données envoyées dans la console
      console.log('Données envoyées:', JSON.stringify(formData));
  
      const response = await fetch(`/api/commandes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      console.log('Statut de la réponse:', response.status);
      console.log('En-têtes de la réponse:', response.headers.get('Content-Type'));
  
      if (response.ok) {
        router.push('/');
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la mise à jour de la commande:', errorData);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande:', error);
    }
  };
  

  if (loading) {
    return <div className="text-center text-gray-500 mt-10">Chargement...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 mt-10">{error}</div>;
  }

  if (!commande) {
    return <div className="text-center text-gray-500 mt-10">Aucune commande trouvée</div>;
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-md">
      <h1 className="text-2xl font-bold mb-6 text-center">Éditer la commande {commande.id}</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Libellé:</label>
          <input
            type="text"
            name="libelle"
            value={formData.libelle}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Quantité:</label>
          <input
            type="number"
            name="quantite"
            value={formData.quantite}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Montant:</label>
          <input
            type="number"
            step="0.01"
            name="montant"
            value={formData.montant}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">État:</label>
          <select
            name="etat"
            value={formData.etat}
            onChange={(e) => setFormData({ ...formData, etat: e.target.value as CommandeEtat })}
            className="mt-1 p-2 w-full border rounded-md"
          >
            {Object.values(CommandeEtat).map((etat) => (
              <option key={etat} value={etat}>
                {etatDisplayMap[etat]}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Entité:</label>
          <select
            name="entiteId"
            value={formData.entiteId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Sélectionnez une entité</option>
            {entites.map((entite) => (
              <option key={entite.id} value={entite.id}>
                {entite.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Fournisseur:</label>
          <select
            name="fournisseurId"
            value={formData.fournisseurId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Sélectionnez un fournisseur</option>
            {fournisseurs.map((fournisseur) => (
              <option key={fournisseur.id} value={fournisseur.id}>
                {fournisseur.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Catégorie:</label>
          <select
            name="categorieId"
            value={formData.categorieId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.nom}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700">Utilisateur:</label>
          <select
            name="utilisateurId"
            value={formData.utilisateurId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          >
            <option value="">Sélectionnez un utilisateur</option>
            {utilisateurs.map((utilisateur) => (
              <option key={utilisateur.id} value={utilisateur.id}>
                {utilisateur.nom} {utilisateur.prenom}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Mettre à jour
        </button>
      </form>
    </div>
  );
};

export default EditCommande;
