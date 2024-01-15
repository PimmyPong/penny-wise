import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function POST(req, res) {
  try {
    const user = await fetchUser();
    const { name, cost, categoryId, budgetId } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    if (!name || !cost) {
      return NextResponse.json({
        success: false,
        error: "You must provide a name and cost.",
      });
    }

    const expense = await prisma.expense.create({
      data: {
        name,
        cost,
        categoryId,
        userId: user.id,
        budgetId,
      },
    });

    return NextResponse.json({ success: true, expense });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}
