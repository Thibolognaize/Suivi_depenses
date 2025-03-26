import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    console.log('Fetching commande with id:', id);

    const commande = await prisma.commande.findUnique({
      where: { id: parseInt(id) },
    });

    if (!commande) {
      console.log('Commande non trouvée');
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    }

    console.log('Commande trouvée:', commande);
    return NextResponse.json(commande, { status: 200 });
  } catch (error) {
    console.error('Error fetching commande:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération de la commande' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Converti les champs nécessaires en nombres
    data.montant = parseFloat(data.montant);
    data.fournisseurId = parseInt(data.fournisseurId);
    data.quantite = parseInt(data.quantite);
    data.entiteId = parseInt(data.entiteId);
    data.utilisateurId = parseInt(data.utilisateurId);
    data.categorieId = parseInt(data.categorieId);

    // Vérifie que les champs nécessaires sont présents et valides
    if (isNaN(data.montant) || isNaN(data.fournisseurId) || isNaN(data.quantite) ||
        isNaN(data.entiteId) || isNaN(data.utilisateurId) || isNaN(data.categorieId)) {
      return NextResponse.json({ error: 'Données invalides' }, { status: 400 });
    }

    console.log('Updating commande with id:', id);
    console.log('Data received:', data);

    const updatedCommande = await prisma.commande.update({
      where: { id: parseInt(id) },
      data: {
        libelle: data.libelle,
        quantite: data.quantite,
        montant: data.montant,
        ref_facture: data.ref_facture,
        commentaire: data.commentaire,
        date_modification: new Date().toISOString(), // Mettre à jour la date de modification
        entiteId: data.entiteId,
        fournisseurId: data.fournisseurId,
        initiateurId: data.initiateurId,
        utilisateurId: data.utilisateurId,
        categorieId: data.categorieId,
        etat: data.etat,
      },
    });

    console.log('Commande mise à jour:', updatedCommande);
    return NextResponse.json(updatedCommande, { status: 200 });
  } catch (error) {
    console.error('Error updating commande:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de la commande' }, { status: 500 });
  }
}