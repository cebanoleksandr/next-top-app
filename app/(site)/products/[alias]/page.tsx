import { getMenu } from "@/api/menu";
import { getPage } from "@/api/page";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const menu = await getMenu(0);
  return menu.flatMap((item: any) => item.pages.map((page: any) => ({ alias: page.alias })));
}

export async function generateMetadata({ params }: { params: { alias: string } }) {
  const page = await getPage(params.alias);

  if (!page) {
    return {};
  }

  return {
    title: page.title,
    description: page.description,
  };
}

const ProductsPage = async({ params }: { params: { alias: string } }) => {
  const page = await getPage(params.alias);

  if (!page) {
    notFound();
  }

  return (
    <div>{page.title}</div>
  );
};

export default ProductsPage;
