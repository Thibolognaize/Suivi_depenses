// app/api/commandes/delete/[id]/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(_request: NextRequest, { params }: {params: { id: string}}) {
    try {
        const commande = await prisma.commande.delete({
            where: { id: parseInt(params.id) },
    });
    return NextResponse.json(commande, { status: 200 });
    } catch (error) {
        console.error('Erreur lors de la suppression de la commande:', error)
        return NextResponse.json(
            { error: 'Erreur lors de la suppression de la commande' },
            { status: 500 }
        )
    }
}