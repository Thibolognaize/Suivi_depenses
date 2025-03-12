import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {
    const {
      libelle,
      quantite,
      montant,
      ref_facture,
      commentaire,
      entiteId,
      fournisseurId,
      initiateurId,
      utilisateurId,
      categorieId,
    } = await request.json();

    // Vérifiez si une commande avec la même ref_facture existe déjà
    const existingCommande = await prisma.commande.findUnique({
      where: { ref_facture: ref_facture }
    });

    if (existingCommande) {
      return NextResponse.json(
        { error: 'Une commande avec cette référence de facture existe déjà!' },
        { status: 400 }
      );
    }

    // Créez la nouvelle commande
    const commande = await prisma.commande.create({
      data: {
        libelle,
        quantite,
        montant,
        ref_facture,
        commentaire,
        entiteId,
        fournisseurId,
        initiateurId,
        utilisateurId,
        categorieId,
      },
    });

    return NextResponse.json(commande, { status: 201 });
  } catch (error) {
    console.error('Erreur lors de la création de la commande:', error);

    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      // Gérez les erreurs spécifiques de Prisma
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
    }

    // Gérez les autres erreurs
    return NextResponse.json(
      { error: 'Une erreur inattendue est survenue.' },
      { status: 500 }
    );
  }
}
