"use client";
import { useCallback } from "react";
import { useSearchParams } from "react-router-dom";

export function useProductFilter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const setFilters = useCallback(
    (filter: Partial<{ search: string; category: string; page: number }>) => {
      setSearchParams((params) => {
        const param = new URLSearchParams(params.toString());

        if ("search" in filter) {
          if (filter.search && filter.search.length > 0) {
            param.set("page", "1");
            param.set("search", filter.search);
          } else {
            param.delete("search");
          }
        }

        if ("category" in filter) {
          if (filter.category && filter.category.length > 0) {
            param.set("page", "1");
            param.set("category", filter.category);
          } else {
            param.delete("category");
          }
        }

        if ("page" in filter) {
          if (filter.page !== undefined && filter.page !== null) {
            param.set("page", filter.page.toString());
          } else {
            param.delete("page");
          }
        }

        return param;
      });
    },
    [setSearchParams],
  );

  return { search, category, page, setFilters };
}
