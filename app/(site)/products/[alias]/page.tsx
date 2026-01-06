import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// 1. Оновлюємо типи для Next.js 15
interface PageProps {
  params: Promise<{ alias: string }>;
}

export async function generateStaticParams() {
  const menu = await getMenu(0);
  return menu.flatMap((item: any) => 
    item.pages.map((page: any) => ({ alias: page.alias }))
  );
}

// 2. Оновлюємо generateMetadata: params тепер Promise
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { alias } = await params; // Додаємо await
  const page = await getPage(alias);

  if (!page) {
    return {
      title: "Page Not Found",
    };
  }

  return {
    title: page.metaTitle || page.title,
    description: page.metaDescription || page.description,
  };
}

// 3. Оновлюємо сам компонент
const ProductsPage = async ({ params }: PageProps) => {
  const { alias } = await params; // Додаємо await
  const page = await getPage(alias);

  if (!page) {
    notFound();
  }

  return (
    <div>
      <h1>{page.title}</h1>
    </div>
  );
};

export default ProductsPage;
