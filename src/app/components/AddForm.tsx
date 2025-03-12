import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

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

const Form: React.FC = () => {
  const [libelle, setLibelle] = useState('');
  const [quantite, setQuantite] = useState(1);
  const [montant, setMontant] = useState('');
  const [refFacture, setRefFacture] = useState('');
  const [commentaire, setCommentaire] = useState('');

  const [entiteId, setEntiteId] = useState(0);
  const [fournisseurId, setFournisseurId] = useState(0);
  const [initiateurId, setInitiateurId] = useState(0);
  const [utilisateurId, setUtilisateurId] = useState(0);
  const [categorieId, setCategorieId] = useState(0);

  const [entites, setEntites] = useState<Entite[]>([]);
  const [fournisseurs, setFournisseurs] = useState<Fournisseur[]>([]);
  const [utilisateurs, setUtilisateurs] = useState<Utilisateur[]>([]);
  const [categories, setCategories] = useState<Categorie[]>([]);

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const fetchEntites = await fetch('/api/entites').then(res => res.json() as Promise<Entite[]>);
      const fetchFournisseurs = await fetch('/api/fournisseurs').then(res => res.json() as Promise<Fournisseur[]>);
      const fetchUtilisateurs = await fetch('/api/utilisateurs').then(res => res.json() as Promise<Utilisateur[]>);
      const fetchCategories = await fetch('/api/categories').then(res => res.json() as Promise<Categorie[]>);

      const sortedUtilisateurs = fetchUtilisateurs.sort((a, b) => a.nom.localeCompare(b.nom));

      setEntites(fetchEntites);
      setFournisseurs(fetchFournisseurs);
      setUtilisateurs(sortedUtilisateurs);
      setCategories(fetchCategories);
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch('/api/commandes/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        libelle,
        quantite,
        montant: parseFloat(montant),
        ref_facture: refFacture,
        commentaire,
        entiteId,
        fournisseurId,
        initiateurId,
        utilisateurId,
        categorieId,
      }),
    });

    if (response.ok) {
      alert('Commande créée avec succès !');
      // Réinitialiser les champs du formulaire
      setLibelle('');
      setQuantite(1);
      setMontant('');
      setRefFacture('');
      setCommentaire('');
      setEntiteId(0);
      setFournisseurId(0);
      setInitiateurId(0);
      setUtilisateurId(0);
      setCategorieId(0);

      // Rediriger vers la page d'accueil
      router.push('/');
    } else {
      // Lire le corps de la réponse pour obtenir plus de détails sur l'erreur
      const errorData = await response.json();
      alert(`Échec de la création de la commande:\n${errorData.error}`);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded-lg shadow-md border border-gray-300 w-full max-w-md"
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Formulaire de Création de Commande
        </h2>
        <div className="mb-4">
          <label htmlFor="libelle" className="block text-gray-700">
            Libellé:
          </label>
          <input
            type="text"
            id="libelle"
            value={libelle}
            onChange={(e) => setLibelle(e.target.value)}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="quantite" className="block text-gray-700">
            Quantité:
          </label>
          <input
            type="number"
            id="quantite"
            value={quantite}
            onChange={(e) => setQuantite(Number(e.target.value))}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="montant" className="block text-gray-700">
            Montant (HT):
          </label>
          <input
            type="number"
            id="montant"
            value={montant}
            onChange={(e) => setMontant(e.target.value)}
            pattern='\d*'
            title="Veuillez entrer uniquement des chiffres."
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="refFacture" className="block text-gray-700">
            Référence Facture:
          </label>
          <input
            type="text"
            id="refFacture"
            value={refFacture}
            onChange={(e) => setRefFacture(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="commentaire" className="block text-gray-700">
            Commentaire:
          </label>
          <input
            type="text"
            id="commentaire"
            value={commentaire}
            onChange={(e) => setCommentaire(e.target.value)}
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="entiteId" className="block text-gray-700">
            Entité:
          </label>
          <select
            id="entiteId"
            value={entiteId}
            onChange={(e) => setEntiteId(Number(e.target.value))}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Sélectionnez une entité</option>
            {entites.map((entite) => (
              <option key={entite.id} value={entite.id}>
                {entite.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="fournisseurId" className="block text-gray-700">
            Fournisseur:
          </label>
          <select
            id="fournisseurId"
            value={fournisseurId}
            onChange={(e) => setFournisseurId(Number(e.target.value))}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Sélectionnez un fournisseur</option>
            {fournisseurs.map((fournisseur) => (
              <option key={fournisseur.id} value={fournisseur.id}>
                {fournisseur.nom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="initiateurId" className="block text-gray-700">
            Initiateur:
          </label>
          <select
            id="initiateurId"
            value={initiateurId}
            onChange={(e) => setInitiateurId(Number(e.target.value))}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Sélectionnez un initiateur</option>
            {utilisateurs.map((utilisateur) => (
              <option key={utilisateur.id} value={utilisateur.id}>
                {utilisateur.nom} {utilisateur.prenom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="utilisateurId" className="block text-gray-700">
            Utilisateur:
          </label>
          <select
            id="utilisateurId"
            value={utilisateurId}
            onChange={(e) => setUtilisateurId(Number(e.target.value))}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Sélectionnez un utilisateur</option>
            {utilisateurs.map((utilisateur) => (
              <option key={utilisateur.id} value={utilisateur.id}>
                {utilisateur.nom} {utilisateur.prenom}
              </option>
            ))}
          </select>
        </div>
        <div className="mb-4">
          <label htmlFor="categorieId" className="block text-gray-700">
            Catégorie:
          </label>
          <select
            id="categorieId"
            value={categorieId}
            onChange={(e) => setCategorieId(Number(e.target.value))}
            required
            className="mt-1 p-2 border border-gray-300 rounded-md w-full"
          >
            <option value="">Sélectionnez une catégorie</option>
            {categories.map((categorie) => (
              <option key={categorie.id} value={categorie.id}>
                {categorie.nom}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Soumettre
        </button>
      </form>
    </div>
  );
};

export default Form;
