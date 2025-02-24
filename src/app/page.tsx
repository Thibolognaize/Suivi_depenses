'use client'
import { useState, useEffect } from 'react'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { PrismaClient } from '@prisma/client'
import React from 'react'
import Image from 'next/image'
// Types pour nos données
interface Commande {
  id: number
  libelle: string
  quantite: number
  montant: number
  date_creation: Date
  etat: string
  entite: { nom: string }
  fournisseur: { nom: string }
  categorie: { nom: string }
  user_commande_utilisateurIdToUser: { nom: string; prenom: string }
}

// Composant pour l'en-tête de la page
const Header = () => (
  <div className="bg-white shadow">
    <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
      <div className="flex items-center">
        <Image 
          src={"/logo/logo-GLPI-250-black.png"}
          alt="Logo ECS" 
          width={128} 
          height={128}
          className="mr-4 object-contain"
        />
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Suivi des dépenses informatiques
        </h1>
      </div>
    </div>
  </div>
)
const colorChoices = "text-gray-500"
// Composant pour les filtres
const Filters = ({ 
  onSort, 
  onFilterEntite, 
  entites,
  onFilterDate 
}: { 
  onSort: (field: string) => void
  onFilterEntite: (entite: string) => void
  entites: string[]
  onFilterDate: (startDate: string, endDate: string) => void
}) => (
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
)

// Composant principal
export default function DepensesPage() {
  const [commandes, setCommandes] = useState<Commande[]>([])
  const [filteredCommandes, setFilteredCommandes] = useState<Commande[]>([])
  const [entites, setEntites] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)

  // Chargement initial des données
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/api/commandes')
        if (!response.ok ) {
          throw new Error(`Erreur HTTP! statut: ${response.status}`)
        }
        const data = await response.json()
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array')
        }
        
        setCommandes(data)
        setFilteredCommandes(data)
        
        // Extraire les entités uniques
        const uniqueEntites = Array.from(new Set(data.map((c: Commande) => c.entite.nom)))
        setEntites(uniqueEntites as string[])
      } catch (error) {
        console.error('Erreur lors du chargement des données:', error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [])

  // Fonction de tri
  const handleSort = (field: string) => {
    const sorted = [...filteredCommandes].sort((a, b) => {
      switch (field) {
        case 'date':
          return new Date(b.date_creation).getTime() - new Date(a.date_creation).getTime()
        case 'montant':
          return b.montant - a.montant
        case 'entite':
          return a.entite.nom.localeCompare(b.entite.nom)
        default:
          return 0
      }
    })
    setFilteredCommandes(sorted)
  }

  // Fonction de filtrage par entité
  const handleFilterEntite = (entite: string) => {
    if (!entite) {
      setFilteredCommandes(commandes)
      return
    }
    
    const filtered = commandes.filter(c => c.entite.nom === entite)
    setFilteredCommandes(filtered)
  }

  // Fonction de filtrage par date
  const handleFilterDate = (startDate: string, endDate: string) => {
    let filtered = [...commandes]
    
    if (startDate) {
      filtered = filtered.filter(c => 
        new Date(c.date_creation) >= new Date(startDate)
      )
    }
    
    if (endDate) {
      filtered = filtered.filter(c => 
        new Date(c.date_creation) <= new Date(endDate)
      )
    }
    
    setFilteredCommandes(filtered)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">Chargement...</div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Filters 
          onSort={handleSort}
          onFilterEntite={handleFilterEntite}
          entites={entites}
          onFilterDate={handleFilterDate}
        />

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
                {filteredCommandes.map((commande) => (
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
      </main>
    </div>
  )
}