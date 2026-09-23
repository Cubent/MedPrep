import { TableOfContents } from '@/components/blog/table-of-contents';
import { SITE_URL, formatPostDate, getAllPosts, getPostBySlug } from '@/lib/blog';
import { JsonLd } from '@repo/seo/json-ld';
import type { BlogPosting, BreadcrumbList, WithContext } from '@repo/seo/json-ld';
import { createMetadata } from '@repo/seo/metadata';
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { SiteFooter } from '../../components/site-footer';
import { SiteHeader } from '../../components/site-header';

type BlogPostPageProperties = {
  readonly params: Promise<{ slug: string }>;
};

export const generateStaticParams = async (): Promise<{ slug: string }[]> =>
  getAllPosts().map((post) => ({ slug: post.slug }));

export const generateMetadata = async ({ params }: BlogPostPageProperties): Promise<Metadata> => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return createMetadata({
    title: post.seoTitle,
    description: post.description,
    path: `/blog/${post.slug}`,
    noSuffix: true,
    keywords: post.keywords,
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      type: 'article',
      url: `${SITE_URL}/blog/${post.slug}`,
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
    },
  });
};

const BlogPostPage = async ({ params }: BlogPostPageProperties) => {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const url = `${SITE_URL}/blog/${post.slug}`;

  const article: WithContext<BlogPosting> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: [`${SITE_URL}/og-image.png`],
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: { '@type': 'Organization', name: post.author.name, url: post.author.url },
    publisher: { '@type': 'Organization', name: 'MedPrep Institute', url: SITE_URL },
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    keywords: post.keywords.join(', '),
  };

  const breadcrumbs: WithContext<BreadcrumbList> = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      { '@type': 'ListItem', position: 3, name: post.title, item: url },
    ],
  };

  return (
    <div className="min-h-screen bg-white">
      <JsonLd code={article} />
      <JsonLd code={breadcrumbs} />
      <SiteHeader />
      <main className="mx-auto max-w-3xl px-6 py-10 sm:py-16">
        <nav aria-label="Breadcrumb" className="text-xs text-gray-500">
          <ol className="flex flex-wrap items-center gap-1.5">
            <li>
              <Link href="/" className="hover:text-[#06005A]">
                Home
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/blog" className="hover:text-[#06005A]">
                Blog
              </Link>
            </li>
          </ol>
        </nav>

        <article className="mt-6">
          <header>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#C46B10]">
              {post.category}
            </p>
            <h1 className="font-[family-name:var(--font-display)] mt-3 text-3xl font-bold leading-tight tracking-tight text-[#06005A] sm:text-4xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-gray-600">{post.description}</p>
            <p className="mt-5 text-sm text-gray-500">
              By{' '}
              <a href={post.author.url} className="font-medium text-[#06005A] hover:underline">
                {post.author.name}
              </a>
              {' · '}
              Published <time dateTime={post.publishedAt}>{formatPostDate(post.publishedAt)}</time>
              {post.updatedAt !== post.publishedAt && (
                <>
                  {' · '}
                  Updated <time dateTime={post.updatedAt}>{formatPostDate(post.updatedAt)}</time>
                </>
              )}
              {' · '}
              {post.readingMinutes} min read
            </p>
            {post.reviewer && (
              <p className="mt-1 text-sm text-gray-500">
                Medically reviewed by{' '}
                <span className="font-medium text-[#06005A]">{post.reviewer.name}</span>,{' '}
                {post.reviewer.credentials}
              </p>
            )}
          </header>

          <TableOfContents sections={post.sections} />

          <div className="prose prose-lg max-w-none prose-headings:font-[family-name:var(--font-display)] prose-headings:font-bold prose-headings:text-[#06005A] prose-h2:mt-14 prose-h2:scroll-mt-24 prose-h3:mt-8 prose-h3:scroll-mt-24 prose-a:font-medium prose-a:text-[#C46B10] prose-a:no-underline hover:prose-a:underline prose-strong:text-[#000C3F] prose-li:my-1.5">
            <post.Body />
          </div>
        </article>
      </main>
      <SiteFooter />
    </div>
  );
};

export default BlogPostPage;
