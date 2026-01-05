import { db } from "@/db";
import Header from "./header";

const HeaderWrapper = async () => {
  const categories = await db.query.categoryTable.findMany({});

  return <Header categories={categories} />;
};

export default HeaderWrapper;

