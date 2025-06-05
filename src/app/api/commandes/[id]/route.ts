import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(_request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Utiliser await pour accéder aux propriétés de params

    const commande = await prisma.commande.findUnique({
      where: { id: parseInt(id) },
    });

    if (!commande) {
      return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
    }

    return NextResponse.json(commande, { status: 200 });
  } catch (error) {
    console.error('Error fetching commande:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération de la commande' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params; // Utiliser await pour accéder aux propriétés de params
    const data = await request.json();

    // Convertir les champs nécessaires en nombres
    data.montant = parseFloat(data.montant);
    data.fournisseurId = parseInt(data.fournisseurId);
    data.utilisateurId = parseInt(data.utilisateurId);
    data.entiteId = parseInt(data.entiteId);
    data.categorieId = parseInt(data.categorieId);

    const updatedCommande = await prisma.commande.update({
      where: { id: parseInt(id) },
      data,
    });

    return NextResponse.json(updatedCommande, { status: 200 });
  } catch (error) {
    console.error('Error updating commande:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de la commande' }, { status: 500 });
  }
}
