import { NextRequest, NextResponse } from "next/server";
import { ResourceType } from "@prisma/client";

import { auth } from "@/lib/auth";
import { resourceRepository } from "@/lib/resource-repository";

const RESOURCE_TYPES = new Set(Object.values(ResourceType));

function createSlug(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");
}

export async function POST(request: NextRequest) {
  try {
    const session = await auth();

    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    const body = await request.json();

    const {
      title,
      author,
      language,
      description,
      categoryId,
      type,
      thumbnailUrl,
      fileUrl,
      externalUrl,
    } = body;

    if (!title || !language || !categoryId || !type) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        {
          status: 400,
        }
      );
    }

    if (!RESOURCE_TYPES.has(type)) {
      return NextResponse.json(
        {
          success: false,
          message: "Invalid resource type.",
        },
        {
          status: 400,
        }
      );
    }

    const resource = await resourceRepository.create({
      title,
      slug: createSlug(title),
      author,
      language,
      description,
      categoryId,
      type,
      thumbnailUrl,
      fileUrl,
      externalUrl,
      createdBy: session.user.id,
    });

    return NextResponse.json({
      success: true,
      resource,
    });

  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to create resource.",
      },
      {
        status: 500,
      }
    );
  }
}