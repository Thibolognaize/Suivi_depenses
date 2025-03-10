import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(_request: NextRequest, context: { params: Promise<{ id: string }> }) {
    try {
        // Attendre les paramètres avant de les utiliser
        const { id } = await context.params;

        // Vérifiez que id est défini et est une chaîne de caractères
        if (!id) {
            return NextResponse.json({ error: 'ID de commande manquant' }, { status: 400 });
        }

        const commande = await prisma.commande.delete({
            where: { id: parseInt(id, 10) },
        });

        return NextResponse.json(commande, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la suppression de la commande:', error);
        return NextResponse.json(
            { error: 'Erreur lors de la suppression de la commande' },
            { status: 500 }
        );
    }
}
