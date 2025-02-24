import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
    const entites = await prisma.entite.findMany();
    return NextResponse.json(entites);
  } catch (error) {
    console.error('Erreur lors de la récupération des entités:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des données' },
      { status: 500 }
    );
  }
}
