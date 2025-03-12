"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Commande {
  id: number;
  libelle: string;
  quantite: number;
  montant: number;
  etat: string;
  entiteId: number;
  fournisseurId: number;
  categorieId: number;
  utilisateurId: number;
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
    etat: '',
    entiteId: 0,
    fournisseurId: 0,
    categorieId: 0,
    utilisateurId: 0,
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (id) {
      fetchCommande(id);
    } else {
      console.error("No ID provided");
      setLoading(false);
    }
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/commandes/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/commandes');
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
          <input
            type="text"
            name="etat"
            value={formData.etat}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Entité ID:</label>
          <input
            type="number"
            name="entiteId"
            value={formData.entiteId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Fournisseur ID:</label>
          <input
            type="number"
            name="fournisseurId"
            value={formData.fournisseurId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Catégorie ID:</label>
          <input
            type="number"
            name="categorieId"
            value={formData.categorieId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
        </div>
        <div>
          <label className="block text-gray-700">Utilisateur ID:</label>
          <input
            type="number"
            name="utilisateurId"
            value={formData.utilisateurId}
            onChange={handleChange}
            className="mt-1 p-2 w-full border rounded-md"
          />
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
