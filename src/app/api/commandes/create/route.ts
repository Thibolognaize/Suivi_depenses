import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

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
    return NextResponse.json(
      { error: 'Erreur lors de la création de la commande' },
      { status: 500 }
    );
  }
}
