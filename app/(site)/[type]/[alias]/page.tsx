import { API } from "@/api";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopPageModal } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { notFound } from "next/navigation";
import TopPageClient from "./TopPageClient";

// 1. Визначаємо правильний тип для Next.js 15
interface PageProps {
  params: Promise<{ 
    type: string; 
    alias: string; 
  }>;
}

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
        alias: p.alias,
      }))
    );

    params = [...params, ...paths];
  }

  return params;
}

// 2. Використовуємо інтерфейс PageProps і робимо await params
export default async function CoursePage({ params }: PageProps) {
  const { type, alias } = await params;

  const firstCategoryItem = firstLevelMenu.find(m => m.route === type);
  if (!firstCategoryItem) notFound();

  // MENU
  const menu: MenuItem[] = await fetch(API.topPage.find, {
    method: "POST",
    body: JSON.stringify({ firstCategory: firstCategoryItem.id }),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json());

  if (!menu.length) notFound();

  // PAGE
  const page: TopPageModal | null = await fetch(API.topPage.byAlias + alias)
    .then(res => (res.ok ? res.json() : null));

  if (!page) notFound();

  // PRODUCTS
  const products: ProductModel[] = await fetch(API.product.find, {
    method: "POST",
    body: JSON.stringify({ category: page.category, limit: 10 }),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json());

  return (
    <TopPageClient
      page={page}
      products={products}
      firstCategory={firstCategoryItem.id}
    />
  );
}
