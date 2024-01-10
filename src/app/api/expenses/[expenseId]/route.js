import { prisma } from "@/lib/prisma.js";
import { NextResponse } from "next/server.js";
import { fetchUser } from "@/lib/fetchUser.js";

export async function DELETE(req, res) {
  try {
    const user = await fetchUser();
    const { expenseId } = res.params;

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const expense = await prisma.expense.delete({
      where: {
        id: expenseId,
      },
    });

    return NextResponse.json({ success: true, expense });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}

export async function PUT(req, res) {
  try {
    const user = await fetchUser();
    const { expenseId } = res.params;
    const { name, cost, description, categoryId } = await req.json();

    if (!user.id) {
      return NextResponse.json({ success: false, error: "You must login." });
    }

    const expense = await prisma.expense.update({
      where: {
        id: expenseId,
      },
      data: {
        name,
        cost,
        description,
        categoryId,
      },
    });

    return NextResponse.json({ success: true, expense });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message });
  }
}