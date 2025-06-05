import { PrismaClient } from '@prisma/client'
import * as fs from 'fs'
import * as readline from 'readline'

const prisma = new PrismaClient()

// Fonction pour obtenir une réponse Y/N de l'utilisateur
function askForConfirmation(question: string): Promise<boolean> {
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    })
  
    return new Promise((resolve) => {
      rl.question(`${question} (Y/N): `, (answer) => {
        rl.close()
        resolve(answer.toLowerCase() === 'y')
      })
    })
}

// Fonction de nettoyage de la base
async function cleanDatabase() {
    console.log('Nettoyage de la base de données...')
    try {
            // Demande de confirmation avec message d'avertissement
        const isConfirmed = await askForConfirmation(
            "\n⚠️  Attention: Cette action va supprimer toutes les données de la base. Continuer?")
            // Si l'utilisateur n'a pas confirmé, on arrête
            if (!isConfirmed) {
            console.log('❌ Opération annulée')
            return false
            }

        await prisma.validation.deleteMany({})
        await prisma.commande.deleteMany({})
        await prisma.user.deleteMany({})
        await prisma.categorie.deleteMany({})
        await prisma.fournisseur.deleteMany({})
        await prisma.entite.deleteMany({})
        
        // Réinitialisation des auto-increments
        await prisma.$executeRaw`ALTER TABLE validation AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE commande AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE user AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE categorie AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE fournisseur AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE entite AUTO_INCREMENT = 1;`
        
        console.log('Base de données nettoyée avec succès')
    } catch (error) {
        console.error('Erreur lors du nettoyage:', error)
        process.exit(1)
    }
}

// Fonction pour séparer le nom complet en prénom et nom
function splitFullName(fullName: string): { prenom: string; nom: string } {
  const parts = fullName.split(' ')
  return {
    prenom: parts[0],
    nom: parts.slice(1).join(' ').trim()
  }
}
// Nettoie le nom d'utilisateur en retirant les suffixes comme "(Partagée)"
function cleanUserName(name: string): string {
    return name.replace(/\s*\([^)]*\)/, '').trim()
}

async function importData() {
    try {
    await cleanDatabase()

    console.log('Lecture du fichier JSON...')
    const jsonData = fs.readFileSync('./src/data/data.json', 'utf8')
    const data = JSON.parse(jsonData)

    console.log('Import des entités...')
    for (const entite of data.entite) {
      await prisma.entite.create({
        data: { nom: entite.nom }
      })
    }

    console.log('Import des fournisseurs...')
    for (const fournisseur of data.fournisseur) {
      await prisma.fournisseur.create({
        data: { nom: fournisseur.nom }
      })
    }

    console.log('Import des catégories...')
    for (const categorie of data.categorie) {
      await prisma.categorie.create({
        data: { nom: categorie.nom }
      })
    }

    // Création d'un mapping des utilisateurs pour une recherche plus efficace
    const userMap = new Map()

    console.log('Import des utilisateurs...')
    for (const userData of data.utilisateur) {
      try {
        const entite = await prisma.entite.findUnique({
          where: { nom: userData.entite }
        })
        
        if (!entite) {
          console.error(`⚠️ Entité non trouvée: ${userData.entite} pour ${userData.email}`)
          continue
        }

        const { prenom, nom } = splitFullName(userData.nom)
        
        const user = await prisma.collaborateur.create({
          data: {
            prenom,
            nom,
            email: userData.email,
            role: userData.role,
            entiteId: entite.id,
            isActive: userData.isActive
          }
        })

        // Stocke l'utilisateur dans le mapping pour une recherche rapide
        userMap.set(userData.nom, user)
        userMap.set(cleanUserName(userData.nom), user) // Version nettoyée aussi

        console.log(`✅ Utilisateur créé: ${userData.email}`)
      } catch (error) {
        console.error(`❌ Erreur lors de la création de l'utilisateur ${userData.email}:`, error)
      }
    }

    console.log('Import des commandes...')
    for (const cmdData of data.commande) {
      try {
        // Recherche des références nécessaires
        const [entite, fournisseur, categorie] = await Promise.all([
          prisma.entite.findUnique({ where: { nom: cmdData.entite } }),
          prisma.fournisseur.findUnique({ where: { nom: cmdData.fournisseur } }),
          prisma.categorie.findUnique({ where: { nom: cmdData.categorie } })
        ])

        if (!entite || !fournisseur || !categorie) {
          console.error(`⚠️ Références manquantes pour la commande ${cmdData.libelle}:`)
          if (!entite) {
            console.error(`  - Entité: ${cmdData.entite}`)
          }
          if (!fournisseur) {
            console.error(`  - Fournisseur: ${cmdData.fournisseur}`)
          }
          if (!categorie) {
            console.error(`  - Catégorie: ${cmdData.categorie}`)
          }
          continue
        }

        // Recherche des utilisateurs avec le mapping
        const initiateur = userMap.get(cleanUserName(cmdData.initiateur))
        const collaborateur = userMap.get(cleanUserName(cmdData.utilisateur))

        if (!initiateur || !collaborateur) {
          console.error(`⚠️ Utilisateurs non trouvés pour la commande ${cmdData.libelle}:`)
          if (!initiateur) {
            console.error(`  - Initiateur: ${cmdData.initiateur}`)
          }
          if (!collaborateur) {
            console.error(`  - Utilisateur: ${cmdData.collaborateur}`)
          }
          continue
        }

        // Création de la commande
        const commande = await prisma.commande.create({
          data: {
            libelle: cmdData.libelle,
            quantite: cmdData.quantite,
            montant: cmdData.montant,
            ref_facture: cmdData.ref_facture,
            commentaire: cmdData.commentaire,
            date_creation: new Date(cmdData.date_creation),
            entiteId: entite.id,
            fournisseurId: fournisseur.id,
            categorieId: categorie.id,
            initiateurId: initiateur.id,
            utilisateurId: collaborateur.id,
            etat: cmdData.etat,
            validation: cmdData.validation ? {
              create: {
                statut: cmdData.validation.statut,
                date_validation: new Date(cmdData.validation.date_validation),
                validateur_id: initiateur.id,
                commentaire: null
              }
            } : undefined
          }
        })

        console.log(`✅ Commande créée: ${commande.libelle}`)
      } catch (error) {
        console.error(`❌ Erreur lors de la création de la commande ${cmdData.libelle}:`, error)
      }
    }

    console.log('Import terminé avec succès!')
  } catch (error) {
    console.error('Erreur lors de l\'import:', error)
  } finally {
    await prisma.$disconnect()
  }
}

async function main() {
  try {
      await importData();
  } catch (error) {
      console.error('Erreur dans main:', error);
      process.exit(1);
  }
}
// Exécuter la fonction principale
main();