"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { getFAQs, searchFAQs, getFAQCategories } from "@/lib/data/faqs";
import { Header } from "@/components/Header";

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [expandedId, setExpandedId] = useState<string>("");

  const categories = getFAQCategories();
  const faqs = searchQuery ? searchFAQs(searchQuery) : selectedCategory ? getFAQs(selectedCategory) : getFAQs();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="mb-2 text-4xl font-bold text-gray-900">Frequently Asked Questions</h1>
        <p className="mb-8 text-lg text-gray-600">Find answers to common questions about our HR and Payroll system.</p>

        {/* Search */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedCategory("");
            }}
            className="input w-full"
          />
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="mb-8 flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedCategory("")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                selectedCategory === ""
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
              }`}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <div key={faq.id} className="card">
                <button
                  onClick={() => setExpandedId(expandedId === faq.id ? "" : faq.id)}
                  className="flex w-full items-start justify-between text-left"
                >
                  <h3 className="font-semibold text-gray-900">{faq.question}</h3>
                  <span className="ml-4 text-blue-600">
                    {expandedId === faq.id ? "−" : "+"}
                  </span>
                </button>
                {expandedId === faq.id && (
                  <div className="mt-4 border-t border-gray-200 pt-4 text-gray-600">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="card text-center">
              <p className="text-gray-600">No FAQs found. Try a different search.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
