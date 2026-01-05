import Link from "next/link";
import { categoryTable } from "@/db/schema";

interface HeaderCategoriesProps {
  categories: (typeof categoryTable.$inferSelect)[];
}

const HeaderCategories = ({ categories }: HeaderCategoriesProps) => {
  return (
    <nav className="flex items-center gap-4 lg:gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/category/${category.slug}`}
          className="text-sm font-semibold hover:text-primary transition-colors"
        >
          {category.name}
        </Link>
      ))}
    </nav>
  );
};

export default HeaderCategories;

