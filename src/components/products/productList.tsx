import type { PaginatedResponse, Product } from "../../types/product";

interface ProductListProps {
  products: PaginatedResponse<Product>;
  loading: boolean;
  error: string | null;
  onPageChange?: (page: number) => void;
}
const ProductList = ({ products, loading, error }: ProductListProps) => {
  return (
    <>
      <main>
        {loading ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              padding: "1rem",
              border: "1px dashed var(--border)",
              borderRadius: "16px",
              gap: "1rem",
            }}
          >
            <style>{`
              @keyframes spin {
                100% { transform: rotate(360deg); }
              }
              @keyframes pulse {
                0% { background-position: 200% 0; }
                100% { background-position: -200% 0; }
              }
            `}</style>

            {/* Skeleton grid that mirrors the product grid layout */}
            <div style={{ width: "100%" }}>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                  gap: "1rem",
                }}
              >
                {Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    style={{
                      height: 220,
                      borderRadius: 12,
                      background:
                        "linear-gradient(90deg, rgba(0,0,0,0.03) 25%, rgba(0,0,0,0.06) 37%, rgba(0,0,0,0.03) 63%)",
                      backgroundSize: "200% 100%",
                      animation: "pulse 1.6s ease-in-out infinite",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : error ? (
          <div className="glass-panel" style={{ padding: "2rem" }}>
            <h2 style={{ marginBottom: "0.5rem" }}>Error loading products</h2>
            <p style={{ color: "var(--text-muted)" }}>{error}</p>
          </div>
        ) : (
          <div>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
                gap: "1rem",
              }}
            >
              {products.data.length === 0 ? (
                <div
                  className="glass-panel"
                  style={{
                    padding: "2rem",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    textAlign: "center",
                    borderRadius: 12,
                    gridColumn: "1 / -1",
                    minHeight: 350,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 9999,
                      background: "rgba(0,0,0,0.04)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 20,
                    }}
                    aria-hidden
                  >
                    🔍
                  </div>

                  <h3 style={{ margin: 0, fontSize: "1.05rem" }}>
                    No products found
                  </h3>
                  <p
                    style={{
                      margin: 0,
                      color: "var(--text-muted)",
                      maxWidth: 360,
                    }}
                  >
                    Try adjusting filters or search terms, or clear filters to
                    see more products.
                  </p>
                </div>
              ) : (
                products.data.map((p) => (
                  <div
                    key={p.id}
                    className="glass-panel"
                    style={{ padding: "1rem", borderRadius: 12 }}
                  >
                    <img
                      src={p.imageUrl}
                      alt={p.name}
                      style={{
                        width: "100%",
                        height: 180,
                        objectFit: "cover",
                        borderRadius: 8,
                        marginBottom: 8,
                      }}
                    />
                    <h3 style={{ margin: 0, fontSize: "1rem" }}>{p.name}</h3>
                    <p
                      style={{
                        color: "var(--text-muted)",
                        margin: "0.25rem 0",
                        background: "rgba(0,0,0,0.05)",
                        display: "inline-block",
                        padding: "0.25rem 0.5rem",
                        borderRadius: 12,
                        fontSize: "1rem",
                      }}
                    >
                      {p.category}
                    </p>
                    <p style={{ fontWeight: 600, color: "var(--primary)" }}>
                      ৳ {p.price.toFixed(2)}
                    </p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </main>
    </>
  );
};
export default ProductList;
