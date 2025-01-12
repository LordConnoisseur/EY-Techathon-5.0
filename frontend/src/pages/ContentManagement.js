import React, { useState } from "react";

function ContentManagement() {
  const [articles, setArticles] = useState([
    { id: 1, title: "Article 1" },
    { id: 2, title: "Article 2" },
  ]);

  const handleAddArticle = () => {
    const newArticle = { id: articles.length + 1, title: `Article ${articles.length + 1}` };
    setArticles([...articles, newArticle]);
  };

  const handleDeleteArticle = (id) => {
    setArticles(articles.filter((article) => article.id !== id));
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Content Management</h2>
      <button
        onClick={handleAddArticle}
        className="bg-green-500 text-white px-4 py-2 rounded mb-4"
      >
        Add Article
      </button>
      <ul>
        {articles.map((article) => (
          <li key={article.id} className="mb-2">
            <span>{article.title}</span>
            <button
              onClick={() => handleDeleteArticle(article.id)}
              className="bg-red-500 text-white px-2 py-1 rounded ml-4"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ContentManagement;
