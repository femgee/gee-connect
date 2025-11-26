export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      categories: {
        Row: {
          id: string
          name: string
          slug: string
          description: string
          icon: string
          order_index: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          slug: string
          description?: string
          icon?: string
          order_index?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          slug?: string
          description?: string
          icon?: string
          order_index?: number
          created_at?: string
        }
      }
      articles: {
        Row: {
          id: string
          category_id: string
          title: string
          slug: string
          summary: string
          content: string
          tags: string[]
          reading_time: number
          order_index: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          category_id: string
          title: string
          slug: string
          summary?: string
          content?: string
          tags?: string[]
          reading_time?: number
          order_index?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          category_id?: string
          title?: string
          slug?: string
          summary?: string
          content?: string
          tags?: string[]
          reading_time?: number
          order_index?: number
          created_at?: string
          updated_at?: string
        }
      }
      blogs: {
        Row: {
          id: string
          title: string
          slug: string
          excerpt: string
          content: string
          author: string
          author_avatar: string
          cover_image: string
          tags: string[]
          reading_time: number
          views: number
          likes: number
          published_at: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          slug: string
          excerpt?: string
          content?: string
          author?: string
          author_avatar?: string
          cover_image?: string
          tags?: string[]
          reading_time?: number
          views?: number
          likes?: number
          published_at?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          slug?: string
          excerpt?: string
          content?: string
          author?: string
          author_avatar?: string
          cover_image?: string
          tags?: string[]
          reading_time?: number
          views?: number
          likes?: number
          published_at?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
