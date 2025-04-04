import { PrismaClient } from '@prisma/client';
import { NextRequest, NextResponse } from 'next/server';

const prisma = new PrismaClient();

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
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

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const { id } = await params;
    const data = await request.json();

    // Convertir les champs nécessaires en nombres
    data.montant = parseFloat(data.montant);
    data.fournisseurId = parseInt(data.fournisseurId);

    console.log('Updating commande with id:', id);
    console.log('Data received:', data);

    const updatedCommande = await prisma.commande.update({
      where: { id: parseInt(id) },
      data,
    });

    console.log('Commande mise à jour:', updatedCommande);
    return NextResponse.json(updatedCommande, { status: 200 });
  } catch (error) {
    console.error('Error updating commande:', error);
    return NextResponse.json({ error: 'Erreur lors de la mise à jour de la commande' }, { status: 500 });
  }
}
