import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getArticleBySlug, articles } from "@/data/journal";
import ArticleDetailClient from "@/components/ArticleDetailClient";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return { title: "Article Not Found — LOS KAREL" };

  return {
    title: `${article.titleTR} — LOS KAREL Journal`,
    description: article.subtitleTR,
  };
}

export async function generateStaticParams() {
  return articles.map((article) => ({
    slug: article.slug,
  }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  return <ArticleDetailClient article={article} />;
}
