import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    const commandes = await prisma.commande.findMany({
      include: {
        entite: true,
        fournisseur: true,
        categorie: true,
        user_commande_utilisateurIdToUser: true
      },
      orderBy: {
        date_creation: 'desc'
      }
    })
    return NextResponse.json(commandes);
  } catch (error) {
    console.error('Erreur lors de la récupération des commandes:', error)
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    )
  }
}

