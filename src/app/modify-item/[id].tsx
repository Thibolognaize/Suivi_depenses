'use client';

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

const ModifyItem = ({ params }: { params: { id: string } }) => {
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

  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await fetch(`/api/commandes/${params.id}`);       
        const data = await response.json();
        setCommande(data);
        setFormData(data);
      } catch (error) {
        console.error('Erreur lors de la récupération de la commande:', error);
        
      }
    };

    fetchCommande();
  }, [params.id]);

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
      const response = await fetch(`/api/commandes/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/commandes'); // Rediriger vers la liste des commandes après la modification
      } else {
        const errorData = await response.json();
        console.error('Erreur lors de la mise à jour de la commande:', errorData);
      }
    } catch (error) {
      console.error('Erreur lors de la mise à jour de la commande:', error);
    }
  };

  if (!commande) {
    return <div>Chargement...</div>;
  }

  return (
    <div>
      <h1>Modifier la commande</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Libellé:</label>
          <input type="text" name="libelle" value={formData.libelle} onChange={handleChange} />
        </div>
        <div>
          <label>Quantité:</label>
          <input type="number" name="quantite" value={formData.quantite} onChange={handleChange} />
        </div>
        <div>
          <label>Montant:</label>
          <input type="number" step="0.01" name="montant" value={formData.montant} onChange={handleChange} />
        </div>
        <div>
          <label>État:</label>
          <input type="text" name="etat" value={formData.etat} onChange={handleChange} />
        </div>
        <div>
          <label>Entité ID:</label>
          <input type="number" name="entiteId" value={formData.entiteId} onChange={handleChange} />
        </div>
        <div>
          <label>Fournisseur ID:</label>
          <input type="number" name="fournisseurId" value={formData.fournisseurId} onChange={handleChange} />
        </div>
        <div>
          <label>Catégorie ID:</label>
          <input type="number" name="categorieId" value={formData.categorieId} onChange={handleChange} />
        </div>
        <div>
          <label>Utilisateur ID:</label>
          <input type="number" name="utilisateurId" value={formData.utilisateurId} onChange={handleChange} />
        </div>
        <button type="submit">Mettre à jour</button>
      </form>
    </div>
  );
};

export default ModifyItem;
