import { API } from "@/api";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interfaces/menu.interface";
import axios from "axios";
import { notFound } from "next/navigation";

// 1. Оновлюємо тип: params тепер Promise
type Props = {
  params: Promise<{
    type: string;
  }>;
};

// ============ STATIC PARAMS ============
export async function generateStaticParams() {
  return firstLevelMenu.map((m) => ({
    type: m.route,
  }));
}

// ============ PAGE COMPONENT ============
// Функція вже async, це добре
async function TypePage({ params }: Props) {
  // 2. Обов'язково додаємо await для отримання значень з params
  const { type } = await params;

  const firstCategoryItem = firstLevelMenu.find(
    (menu) => menu.route === type
  );

  if (!firstCategoryItem) {
    notFound();
  }

  const { data: menu } = await axios.post<MenuItem[]>(API.topPage.find, {
    firstCategory: firstCategoryItem.id,
  });

  if (!menu.length) {
    notFound();
  }

  return (
    <div>
      {firstCategoryItem.id}
    </div>
  );
}

export default TypePage;
