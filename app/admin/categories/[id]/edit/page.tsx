import { notFound, redirect } from "next/navigation";

import { categoryRepository } from "@/lib/category-repository";
import { updateCategory } from "../../actions";

interface EditCategoryPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function EditCategoryPage({
    params,
}: EditCategoryPageProps) {
    const { id } = await params;

    const category = await categoryRepository.getById(id);

    if (!category) {
        notFound();
    }

    async function updateAction(formData: FormData) {
        "use server";

        await updateCategory(id, formData);

        redirect("/admin/categories");
    }

    return (
        <div className="space-y-8">
            <h1 className="text-4xl font-bold text-gray-900">
                Edit Category
            </h1>

            <form
                action={updateAction}
                className="space-y-6 rounded-xl border bg-white p-6 shadow"
            >
                <div>
                    <label className="mb-2 block font-medium text-gray-700">
                        Category Name
                    </label>

                    <input
                        name="name"
                        defaultValue={category.name}
                        required
                        className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
                    />
                </div>

                <button
                    type="submit"
                    className="rounded-lg bg-blue-600 px-5 py-2 text-white hover:bg-blue-700"
                >
                    Update Category
                </button>
            </form>
        </div>
    );
}