// Use this to fetch data: api.fetchProducts(...)
import { api } from "./services/api";
import { useEffect, useState, useCallback } from "react";
import type { PaginatedResponse, Product } from "./types/product";
import ProductList from "./components/products/productList";
import { useProductFilter } from "./hooks/useProductFilter";
import ProductListFilters from "./components/products/productListFilters";
import Pagination from "./components/Pagination";

function App() {
  const { search, category, page, setFilters } = useProductFilter();
  const [products, setProducts] = useState<PaginatedResponse<Product>>({
    data: [],
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch with simple retry logic (exponential backoff)
  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);

    const maxAttempts = 3;
    let attempt = 0;
    let lastErr: unknown = null;

    while (attempt < maxAttempts) {
      try {
        const data = await api.fetchProducts({
          page,
          limit: 10,
          search,
          category,
        });
        setProducts(data);
        setError(null);
        setLoading(false);
        return;
      } catch (err: unknown) {
        lastErr = err;
        attempt += 1;
        // wait with exponential backoff before retrying
        const wait = 300 * Math.pow(2, attempt - 1);
        await new Promise((r) => setTimeout(r, wait));
      }
    }

    setLoading(false);
    setError(lastErr instanceof Error ? lastErr.message : String(lastErr));
  }, [page, search, category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleRetry = () => {
    fetchProducts();
  };

  return (
    <div style={{ minHeight: "100vh", padding: "2rem" }}>
      {/* Header Section */}
      <header
        className="glass-panel"
        style={{ padding: "2rem", marginBottom: "2rem" }}
      >
        <h1
          style={{ fontSize: "2rem", fontWeight: 600, marginBottom: "0.5rem" }}
        >
          Premium Products
        </h1>
        <p style={{ color: "var(--text-muted)" }}>
          Browse our collection. Handling the flaky API gracefully is part of
          the challenge.
        </p>
      </header>

      {/* product filter */}
      <ProductListFilters loading={loading} />

      {/* product list */}
      <ProductList products={products} loading={loading} error={error} />

      {/* pagination */}
      <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-5">
        <p>
          Showing {products.total} product{products.total === 1 ? "" : "s"}
        </p>
        <Pagination
          page={page}
          totalPages={products.totalPages}
          onPageChange={(page) => setFilters({ page })}
          disabled={loading}
        />
      </div>
      {error && (
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 12 }}
        >
          <button
            className="glass-panel"
            onClick={handleRetry}
            style={{ padding: "0.5rem 1rem" }}
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
