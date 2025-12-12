"use client";

import { TopPageModal } from "@/interfaces/page.interface";
import { ProductModel } from "@/interfaces/product.interface";
import { useAppSelector } from "@/store/hooks";
import { useMemo } from "react";
import { SortEnum } from "@/store/sortSlice";
import TopPageHeader from "../../components/business/TopPageHeader";
import ProductsList from "../../components/business/ProductsList";
import VacanciesBlock from "../../components/business/VacanciesBlock";
import AdvantagesBlock from "../../components/business/AdvantagesBlock";
import SkillsBlock from "../../components/business/SkillsBlock";

export default function TopPageClient({
  page,
  products,
  firstCategory
}: {
  page: TopPageModal;
  products: ProductModel[];
  firstCategory: number;
}) {
  const { sort } = useAppSelector(state => state.sort);

  const sortedProducts = useMemo(() => {
    if (sort === SortEnum.Rating) {
      return [...products].sort((a, b) => a.initialRating - b.initialRating);
    }
    return [...products].sort((a, b) => b.price - a.price);
  }, [sort, products]);

  return (
    <div className="mt-10">
      <TopPageHeader page={page} products={sortedProducts} />
      <ProductsList products={sortedProducts} />

      {firstCategory === 0 && page.hh && <VacanciesBlock page={page} />}
      {!!page.advantages && page.advantages?.length > 0 && <AdvantagesBlock advantages={page.advantages} />}

      {page.seoText && (
        <div
          className="mb-12 seo"
          dangerouslySetInnerHTML={{ __html: page.seoText }}
        />
      )}

      {page.tags?.length > 0 && <SkillsBlock skills={page.tags} />}
    </div>
  );
}
