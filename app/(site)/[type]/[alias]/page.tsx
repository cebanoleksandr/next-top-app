import { API } from "@/api";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopLevelCategory, TopPageModal } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { notFound } from "next/navigation";
import TopPageHeader from "../../components/business/TopPageHeader";
import ProductsList from "../../components/business/ProductsList";
import VacanciesBlock from "../../components/business/VacanciesBlock";

export async function generateStaticParams() {
  let params: { type: string; alias: string }[] = [];

  for (const m of firstLevelMenu) {
    const menu: MenuItem[] = await fetch(API.topPage.find, {
      method: "POST",
      body: JSON.stringify({ firstCategory: m.id }),
      headers: { "Content-Type": "application/json" },
    }).then(res => res.json());

    const paths = menu.flatMap(s =>
      s.pages.map(p => ({
        type: m.route,
        alias: p.alias
      }))
    );

    params = params.concat(paths);
  }

  return params;
}

export default async function CoursePage({
  params
}: {
  params: Promise<{ type: string; alias: string }>;
}) {
  const { type, alias } = await params;
  const firstCategoryItem = firstLevelMenu.find(m => m.route === type);

  if (!firstCategoryItem) {
    notFound();
  }

  let menu: MenuItem[];

  try {
    menu = await fetch(API.topPage.find, {
      method: "POST",
      body: JSON.stringify({ firstCategory: firstCategoryItem.id }),
      headers: { "Content-Type": "application/json" },
    }).then(res => res.json());

    if (!menu.length) {
      notFound();
    }
  } catch {
    notFound();
  }

  const page: TopPageModal | null = await fetch(API.topPage.byAlias + alias)
    .then(res => (res.ok ? res.json() : null))
    .catch(() => null);

  if (!page) {
    notFound();
  }

  const products: ProductModel[] = await fetch(API.product.find, {
    method: "POST",
    body: JSON.stringify({ category: page.category, limit: 10 }),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json());

  return (
    <div className="mt-10">
      <TopPageHeader page={page} products={products} />
      <ProductsList products={products} />
      {firstCategoryItem.id === TopLevelCategory.Courses && <VacanciesBlock page={page} />}
    </div>
  );
}
