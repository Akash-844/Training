"use client";
import { useState, useEffect } from "react";

interface Products {
  id: number;
  title: string;
  price: number;
  category: string;
}

const ProductsPage = () => {
  const [products, setProducts] = useState<Products[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [max, setMaxprice] = useState("");

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data: Products[] = await response.json();
        setProducts(data);
      } catch (error) {
        console.log("Failed To Fetch Products", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const productTitle = product.title.toLowerCase();
    const productCategory = product.category.toLowerCase();
    const query = search.toLowerCase();

    const mathcsSearch =
      productTitle.includes(query) || productCategory.includes(query);
    const matchsCategory =
      selectedCategory === "all" || product.category === selectedCategory;
    const matchesPrice = max === "" || product.price <= Number(max);

    return mathcsSearch && matchsCategory && matchesPrice;
  });
  const categories = [...new Set(products.map((product) => product.category))];

  if (loading) {
    return <>Loading Data....</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-8">
      {/* Header */}
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Our Products
          </h1>
          <p className="mt-2 text-gray-500">
            Discover our collection of products.
          </p>
        </div>

        {/* Filter Section */}
        <div className="mb-8 rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <h2 className="text-lg font-semibold text-gray-800">
              Filter Products
            </h2>

            <p className="text-sm text-gray-500">
              Showing{" "}
              <span className="font-semibold text-purple-600">
                {filteredProducts.length}
              </span>{" "}
              of {products.length} products
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {/* Search */}
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

            {/* Category */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            >
              <option value="all">All Categories</option>

              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>

            {/* Maximum Price */}
            <input
              type="number"
              value={max}
              onChange={(e) => setMaxprice(e.target.value)}
              placeholder="Maximum price ($)"
              min="0"
              className="w-full rounded-lg border border-gray-300 px-4 py-3 text-sm outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
            />

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearch("");
                setSelectedCategory("all");
                setMaxprice("");
              }}
              className="rounded-lg bg-purple-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700 active:scale-95"
            >
              Clear Filters
            </button>
          </div>
        </div>

        {/* Products Grid */}
        {filteredProducts.length === 0 ? (
          <div className="rounded-xl border border-gray-200 bg-white py-20 text-center">
            <h2 className="text-xl font-semibold text-gray-700">
              No products found
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              Try changing your search or filters.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="group rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100 text-xl font-bold text-purple-600">
                  {product.title.charAt(0).toUpperCase()}
                </div>

                <h2 className="mb-3 line-clamp-2 min-h-12 font-semibold text-gray-800 transition group-hover:text-purple-600">
                  {product.title}
                </h2>

                <p className="mb-4 text-2xl font-bold text-gray-900">
                  ${product.price}
                </p>

                <span className="inline-block rounded-full bg-purple-50 px-3 py-1 text-xs font-medium capitalize text-purple-700">
                  {product.category}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
