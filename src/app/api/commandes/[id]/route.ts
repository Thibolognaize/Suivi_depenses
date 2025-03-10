// app/api/commandes/[id]/route.ts
import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
// Recupération de la commande
export async function GET(_request: Request, { params }: { params: { id: string } }) {
    try {
        const commande = await prisma.commande.findUnique({
            where: { id: Number(params.id) },
            include: {
                entite: true,
                fournisseur: true,
                categorie: true,
                user_commande_utilisateurIdToUser: true,
            },
        });

        if (!commande) {
            return NextResponse.json({ error: 'Commande non trouvée' }, { status: 404 });
        }

        return NextResponse.json(commande, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la récupération de la commande:', error);
        return NextResponse.json({ error: 'Erreur lors de la récupération de la commande' }, { status: 500 });
    }
}
// Modification de la commande
export async function PUT(request: Request, { params }: { params: { id: string } }) {
    try {
        const { libelle, quantite, montant, etat, entiteId, fournisseurId, categorieId, utilisateurId } = await request.json();

        const commande = await prisma.commande.update({
            where: { id: Number(params.id) },
            data: {
                libelle,
                quantite,
                montant,
                etat,
                entiteId,
                fournisseurId,
                categorieId,
                utilisateurId,
            },
        });

        return NextResponse.json(commande, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la commande:', error);
        return NextResponse.json({ error: 'Erreur lors de la mise à jour de la commande' }, { status: 500 });
    }
}