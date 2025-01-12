import React from "react";

function ArticleView() {
  // Mock article content
  const article = {
    title: "Understanding Claims Processing",
    content: "This article explains the end-to-end claims processing workflow...",
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">{article.title}</h2>
      <p>{article.content}</p>
    </div>
  );
}

export default ArticleView;
