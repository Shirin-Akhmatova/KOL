"use client";
import Carts from "@/widgets/Carts/Carts";
import type { Block } from "@/widgets/mockData";
import { useMemo } from "react";

const FavoritesPage = () => {
  const favorites: Block[] = useMemo(() => {
    try {
      const item = localStorage.getItem("favorites");
      return item ? JSON.parse(item) : [];
    } catch {
      return [];
    }
  }, []);

  if (!favorites.length) {
    return <div>Список пуст</div>;
  }
  return (
    <div className="container" style={{ padding: "30px 0" }}>
      <h1>Избранное</h1>
      <Carts cardList={favorites} />
    </div>
  );
};

export default FavoritesPage;
