import type { ReactNode } from 'react';

export type BlogSection = { id: string; title: string };

export type BlogPost = {
  slug: string;
  /** Visible H1. */
  title: string;
  /** <title> tag. Keep under about 60 characters. */
  seoTitle: string;
  /** Meta description and on-page dek. Keep under about 160 characters. */
  description: string;
  /** ISO 8601 with timezone. Never change publishedAt after publishing. */
  publishedAt: string;
  /** ISO 8601 with timezone. Only bump this when the content is actually revised. */
  updatedAt: string;
  author: { name: string; url: string };
  /** Shown as "Medically reviewed by" and in the byline when set. */
  reviewer?: { name: string; credentials: string; url?: string };
  /** Image behind the post header, from /public. Defaults to MedPrep (1).png. */
  heroImage?: string;
  category: string;
  keywords: string[];
  readingMinutes: number;
  /** Drives the table of contents. Each id must match an <h2 id> in the body. */
  sections: BlogSection[];
  Body: () => ReactNode;
};
