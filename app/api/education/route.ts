import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    const education = await prisma.education.findMany({
      orderBy: { order: 'asc' }
    })
    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch education' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const data = await request.json()
    
    const education = await prisma.education.create({
      data,
    })

    return NextResponse.json(education)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to create education' }, { status: 500 })
  }
}
