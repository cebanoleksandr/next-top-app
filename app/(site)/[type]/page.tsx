// app/(site)/[type]/page.tsx

import { API } from "@/api";
import { firstLevelMenu } from "@/helpers/helpers";
import { MenuItem } from "@/interfaces/menu.interface";
import axios from "axios";
import { notFound } from "next/navigation";

type Props = {
  params: {
    type: string;
  };
};

// ============ STATIC PARAMS ============
export async function generateStaticParams() {
  return firstLevelMenu.map((m) => ({
    type: m.route,
  }));
}

// ============ PAGE COMPONENT ============
async function TypePage({ params }: Props) {
  const firstCategoryItem = firstLevelMenu.find(
    (menu) => menu.route === params.type
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

// Важно: withMainLayout должен поддерживать Server Components
export default TypePage;
