// src/components/InterpreterContacts.jsx
import { useState } from "react";

export default function InterpreterContacts({ data }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCredentialed, setFilterCredentialed] = useState("all");
  const [languageFilter, setLanguageFilter] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("name");

  const allLanguages = Array.from(
    new Set(
      data.flatMap((i) => [i.language_1, i.language_2].filter(Boolean))
    )
  ).sort();

  const filteredData = data.filter((interpreter) => {
    const name = interpreter.first_name || "";
    const last = interpreter.last_name || "";
    const fullName = `${name} ${last}`.toLowerCase();
    const nameMatch = fullName.includes(searchTerm.toLowerCase());

    const certifications = interpreter.certifications || {};
    const credentialed = Object.values(certifications).includes("Certified") ||
      Object.values(certifications).includes("Registered");

    const matchesCredentialed =
      filterCredentialed === "all" ||
      (filterCredentialed === "yes" && credentialed) ||
      (filterCredentialed === "no" && !credentialed);

    const matchesLanguage =
      !languageFilter ||
      interpreter.language_1 === languageFilter ||
      interpreter.language_2 === languageFilter;

    return nameMatch && matchesCredentialed && matchesLanguage;
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortBy === "name") {
      const aName = `${a.first_name || ""} ${a.last_name || ""}`.toLowerCase();
      const bName = `${b.first_name || ""} ${b.last_name || ""}`.toLowerCase();
      return aName.localeCompare(bName);
    }
    if (sortBy === "language") {
      const aLang = (a.language_1 || "").toLowerCase();
      const bLang = (b.language_1 || "").toLowerCase();
      return aLang.localeCompare(bLang);
    }
    return 0;
  });

  const pageCount = Math.ceil(sortedData.length / itemsPerPage);
  const paginatedData = sortedData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, pageCount));
  const handlePageClick = (pageNum) => setCurrentPage(pageNum);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-64 p-4 border-r space-y-4">
        <div className="space-y-2">
          <label className="block font-medium">Credentialed</label>
          <select
            className="w-full border rounded p-2"
            value={filterCredentialed}
            onChange={(e) => setFilterCredentialed(e.target.value)}
          >
            <option value="all">All</option>
            <option value="yes">Credentialed</option>
            <option value="no">Non-Credentialed</option>
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Language</label>
          <select
            className="w-full border rounded p-2"
            value={languageFilter}
            onChange={(e) => setLanguageFilter(e.target.value)}
          >
            <option value="">All Languages</option>
            {allLanguages.map((lang) => (
              <option key={lang} value={lang}>{lang}</option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block font-medium">Sort By</label>
          <select
            className="w-full border rounded p-2"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="name">Name</option>
            <option value="language">Language</option>
          </select>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-4 space-y-4">
        <input
          type="text"
          placeholder="Search name, phone, email..."
          className="border p-2 rounded w-full max-w-md"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="border rounded overflow-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-100">
              <tr className="border-b">
                <th className="p-2"><input type="checkbox" /></th>
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Phone</th>
                <th className="p-2">Languages</th>
                <th className="p-2">Credentialed</th>
              </tr>
            </thead>
            <tbody>
              {paginatedData.map((interpreter) => (
                <tr key={interpreter.id} className="border-b hover:bg-gray-50">
                  <td className="p-2"><input type="checkbox" /></td>
                  <td className="p-2 font-medium">
                    {(interpreter.first_name || "") + " " + (interpreter.last_name || "")}
                  </td>
                  <td className="p-2">{interpreter.email || "--"}</td>
                  <td className="p-2">{interpreter.phone || "--"}</td>
                  <td className="p-2">
                    {[interpreter.language_1, interpreter.language_2].filter(Boolean).join(", ")}
                  </td>
                  <td className="p-2">
                    {Object.values(interpreter.certifications || {}).some(
                      (c) => c === "Certified" || c === "Registered"
                    ) ? "Yes" : "No"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex flex-col items-center gap-2 mt-4">
          <div className="flex gap-2">
            <label className="self-center text-sm text-gray-600">Rows per page:</label>
            <select
              className="border rounded p-1"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              {[10, 25, 50].map((n) => (
                <option key={n} value={n}>{n}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              onClick={handlePrev}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ← Prev
            </button>

            {[...Array(pageCount)].map((_, idx) => (
              <button
                key={idx + 1}
                onClick={() => handlePageClick(idx + 1)}
                className={`px-3 py-1 border rounded ${currentPage === idx + 1 ? "bg-gray-200" : ""}`}
              >
                {idx + 1}
              </button>
            ))}

            <button
              onClick={handleNext}
              disabled={currentPage === pageCount}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              Next →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}