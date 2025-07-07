"use client";
import Carts from "@/widgets/Carts/Carts";
import type { Block } from "@/widgets/mockData";
import { useMemo } from "react";
import styles from "./Favorites.module.scss"
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
    return (
    <section className={styles.favorites}>
    <h1 className={styles.favorites_title}>Список пуст</h1>
    </section>
    )
  }
  return (
    <div className="container" style={{ padding: "30px 0" }}>
      <h1>Избранное</h1>
      <Carts />
    </div>
  );
};

export default FavoritesPage;
