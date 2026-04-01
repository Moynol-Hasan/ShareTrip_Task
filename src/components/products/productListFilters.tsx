import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useDebounce } from "../../hooks/useDebounce";
import { useProductFilter } from "../../hooks/useProductFilter";

export default function ProductListFilters({ loading }: { loading: boolean }) {
  const { search, category, setFilters } = useProductFilter();

  const [localSearch, setLocalSearch] = useState<string>(search);
  const debouncedSearch = useDebounce(localSearch);

  useEffect(() => {
    setFilters({ search: debouncedSearch });
  }, [debouncedSearch]);

  return (
    <section style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}>
      <div
        className="glass-panel"
        style={{
          display: "flex",
          alignItems: "center",
          padding: "0.75rem 1rem",
          flex: 1,
          maxWidth: "400px",
        }}
      >
        <Search
          size={20}
          color="var(--text-muted)"
          style={{ marginRight: "0.75rem" }}
        />
        <input
          type="text"
          placeholder="Search products..."
          value={localSearch}
          onChange={(e) => setLocalSearch(e.target.value)}
          style={{
            background: "transparent",
            border: "none",
            color: "var(--text-main)",
            outline: "none",
            width: "100%",
            fontSize: "1rem",
          }}
          disabled={loading}
        />
      </div>

      <select
        className="glass-panel"
        style={{
          padding: "0.75rem 1rem",
          color: "var(--text-main)",
          outline: "none",
          fontSize: "1rem",
          cursor: "pointer",
          appearance: "none",
        }}
        value={category}
        onChange={(e) => setFilters({ category: e.target.value })}
        disabled={loading}
      >
        <option value="" style={{ background: "var(--surface)" }}>
          All Categories
        </option>
        <option value="electronics" style={{ background: "var(--surface)" }}>
          Electronics
        </option>
        <option value="clothing" style={{ background: "var(--surface)" }}>
          Clothing
        </option>
        <option value="home" style={{ background: "var(--surface)" }}>
          Home
        </option>
        <option value="outdoors" style={{ background: "var(--surface)" }}>
          Outdoors
        </option>
      </select>
    </section>
  );
}
