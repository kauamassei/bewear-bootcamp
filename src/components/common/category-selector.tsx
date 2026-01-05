import { categoryTable } from "@/db/schema";
import { Button } from "../ui/button";
import Link from "next/link";

interface CategorySelectorProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const CategorySelector = ({ categories }: CategorySelectorProps) => {
  return (
    <>
      <div className="rounded-3xl bg-[#F4EFFF] p-6 md:p-8 lg:p-10">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4 lg:gap-5">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant="ghost"
              className="rounded-full bg-white text-xs md:text-sm font-semibold md:py-6"
            >
              <Link href={`/category/${category.slug}`}>{category.name}</Link>
            </Button>
          ))}
        </div>
      </div>
    </>
  );
};

export default CategorySelector;
