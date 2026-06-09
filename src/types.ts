export type PostStatus = 'Published' | 'Pending' | 'Failed';
export type PostType = 'CAROUSEL' | 'IMAGE' | 'VIDEO' | 'REEL' | 'STORY' | 'COVER_IMAGE';
export type Platform = 'instagram' | 'facebook' | 'twitter' | 'linkedin';

export interface OutletDetail {
  id: string;
  name: string;
  time: string;
  code: string;
  zone: string;
  region: string;
  city: string;
  status: PostStatus;
  platform: Platform;
}

export interface Post {
  id: string;
  accountName: string;
  date: string;
  type: PostType;
  platform: Platform;
  image: string;
  images?: string[];
  caption: string;
  hashtags: string[];
  outletsCount: number;
  category: string;
  postedBy: string;
  status: PostStatus;
  publishedCount: number;
  totalCount: number;
  outlets: OutletDetail[];
}
