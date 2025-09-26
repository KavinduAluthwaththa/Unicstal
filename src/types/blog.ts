export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  author: string;
  readTime: string;
  date: string;
  image: string;
  slug: string;
  content: string;
  tags?: string[];
  category?: string;
}
