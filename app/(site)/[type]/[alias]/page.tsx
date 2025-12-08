import { API } from "@/api";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interfaces/menu.interface";
import { TopPageModal } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { notFound } from "next/navigation";


//
// ===================== STATIC PATHS ======================
// Аналог getStaticPaths
//
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



//
// ======================== PAGE ===========================
// Аналог getStaticProps
//
export default async function CoursePage({
  params
}: {
  params: Promise<{ type: string; alias: string }>;
}) {
  const { type, alias } = await params;

  // 1. Определяем категорию
  const firstCategoryItem = firstLevelMenu.find(m => m.route === type);

  if (!firstCategoryItem) {
    notFound();
  }

  //
  // 2. Получаем меню
  //
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

  //
  // 3. Получаем страницу
  //
  const page: TopPageModal | null = await fetch(API.topPage.byAlias + alias)
    .then(res => (res.ok ? res.json() : null))
    .catch(() => null);

  if (!page) {
    notFound();
  }

  //
  // 4. Получаем продукты
  //
  const products: ProductModel[] = await fetch(API.product.find, {
    method: "POST",
    body: JSON.stringify({ category: page.category, limit: 10 }),
    headers: { "Content-Type": "application/json" },
  }).then(res => res.json());


  //
  // 5. РЕНДЕР
  //
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Course Page</h1>

      <div>{page.title}</div>
      <div>{page.alias}</div>

      <div className="mt-4">
        {products.map((product) => (
          <div key={product._id} className="py-1 border-b">
            {product.title}
          </div>
        ))}
      </div>
    </div>
  );
}
