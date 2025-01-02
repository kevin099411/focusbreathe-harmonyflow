export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      audio_tracks: {
        Row: {
          created_at: string
          duration: string | null
          file_path: string
          id: string
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration?: string | null
          file_path: string
          id?: string
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration?: string | null
          file_path?: string
          id?: string
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
      breathing_completions: {
        Row: {
          completed_at: string
          created_at: string
          exercise_type: string
          id: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          created_at?: string
          exercise_type: string
          id?: string
          user_id: string
        }
        Update: {
          completed_at?: string
          created_at?: string
          exercise_type?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      messages: {
        Row: {
          content: string
          created_at: string
          id: string
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          id?: string
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          id?: string
          user_id?: string
        }
        Relationships: []
      }
      payment_methods: {
        Row: {
          account_holder: string | null
          account_number: string | null
          bank_name: string | null
          branch_name: string | null
          created_at: string
          id: string
          name: string
          swift_code: string | null
        }
        Insert: {
          account_holder?: string | null
          account_number?: string | null
          bank_name?: string | null
          branch_name?: string | null
          created_at?: string
          id?: string
          name: string
          swift_code?: string | null
        }
        Update: {
          account_holder?: string | null
          account_number?: string | null
          bank_name?: string | null
          branch_name?: string | null
          created_at?: string
          id?: string
          name?: string
          swift_code?: string | null
        }
        Relationships: []
      }
      product_images: {
        Row: {
          created_at: string
          id: string
          image_url: string
          is_primary: boolean | null
          product_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          id?: string
          image_url: string
          is_primary?: boolean | null
          product_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          id?: string
          image_url?: string
          is_primary?: boolean | null
          product_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_images_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
        ]
      }
      product_tag_relations: {
        Row: {
          product_id: string
          tag_id: string
        }
        Insert: {
          product_id: string
          tag_id: string
        }
        Update: {
          product_id?: string
          tag_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "product_tag_relations_product_id_fkey"
            columns: ["product_id"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "product_tag_relations_tag_id_fkey"
            columns: ["tag_id"]
            isOneToOne: false
            referencedRelation: "product_tags"
            referencedColumns: ["id"]
          },
        ]
      }
      product_tags: {
        Row: {
          created_at: string
          id: string
          name: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          user_id?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          allow_backorders: boolean | null
          attribute_1_global: boolean | null
          attribute_1_name: string | null
          attribute_1_value: string | null
          attribute_1_visible: boolean | null
          attribute_2_global: boolean | null
          attribute_2_name: string | null
          attribute_2_value: string | null
          attribute_2_visible: boolean | null
          button_text: string | null
          categories: string[] | null
          created_at: string
          crosssell_ids: string[] | null
          description: string
          download_expiry: number | null
          download_limit: number | null
          external_url: string | null
          featured: boolean | null
          gtin: string | null
          height: number | null
          id: string
          image_url: string | null
          inventory: number | null
          length: number | null
          order_index: number | null
          price: number
          product_cost: number | null
          profit: number | null
          purchase_note: string | null
          sale_end_date: string | null
          sale_price: number | null
          sale_start_date: string | null
          seo_description: string | null
          seo_keywords: string | null
          seo_title: string | null
          shipping_class: string | null
          sku: string | null
          sold_individually: boolean | null
          tax_class: string | null
          tax_status: string | null
          title: string
          updated_at: string
          upsell_ids: string[] | null
          user_id: string | null
          visibility: string | null
          weight: number | null
          width: number | null
        }
        Insert: {
          allow_backorders?: boolean | null
          attribute_1_global?: boolean | null
          attribute_1_name?: string | null
          attribute_1_value?: string | null
          attribute_1_visible?: boolean | null
          attribute_2_global?: boolean | null
          attribute_2_name?: string | null
          attribute_2_value?: string | null
          attribute_2_visible?: boolean | null
          button_text?: string | null
          categories?: string[] | null
          created_at?: string
          crosssell_ids?: string[] | null
          description: string
          download_expiry?: number | null
          download_limit?: number | null
          external_url?: string | null
          featured?: boolean | null
          gtin?: string | null
          height?: number | null
          id?: string
          image_url?: string | null
          inventory?: number | null
          length?: number | null
          order_index?: number | null
          price: number
          product_cost?: number | null
          profit?: number | null
          purchase_note?: string | null
          sale_end_date?: string | null
          sale_price?: number | null
          sale_start_date?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          shipping_class?: string | null
          sku?: string | null
          sold_individually?: boolean | null
          tax_class?: string | null
          tax_status?: string | null
          title: string
          updated_at?: string
          upsell_ids?: string[] | null
          user_id?: string | null
          visibility?: string | null
          weight?: number | null
          width?: number | null
        }
        Update: {
          allow_backorders?: boolean | null
          attribute_1_global?: boolean | null
          attribute_1_name?: string | null
          attribute_1_value?: string | null
          attribute_1_visible?: boolean | null
          attribute_2_global?: boolean | null
          attribute_2_name?: string | null
          attribute_2_value?: string | null
          attribute_2_visible?: boolean | null
          button_text?: string | null
          categories?: string[] | null
          created_at?: string
          crosssell_ids?: string[] | null
          description?: string
          download_expiry?: number | null
          download_limit?: number | null
          external_url?: string | null
          featured?: boolean | null
          gtin?: string | null
          height?: number | null
          id?: string
          image_url?: string | null
          inventory?: number | null
          length?: number | null
          order_index?: number | null
          price?: number
          product_cost?: number | null
          profit?: number | null
          purchase_note?: string | null
          sale_end_date?: string | null
          sale_price?: number | null
          sale_start_date?: string | null
          seo_description?: string | null
          seo_keywords?: string | null
          seo_title?: string | null
          shipping_class?: string | null
          sku?: string | null
          sold_individually?: boolean | null
          tax_class?: string | null
          tax_status?: string | null
          title?: string
          updated_at?: string
          upsell_ids?: string[] | null
          user_id?: string | null
          visibility?: string | null
          weight?: number | null
          width?: number | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          credit_card_last4: string | null
          first_name: string | null
          full_name: string | null
          id: string
          last_name: string | null
          phone: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          credit_card_last4?: string | null
          first_name?: string | null
          full_name?: string | null
          id: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          credit_card_last4?: string | null
          first_name?: string | null
          full_name?: string | null
          id?: string
          last_name?: string | null
          phone?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      video_tracks: {
        Row: {
          created_at: string
          duration: string | null
          file_path: string
          id: string
          thumbnail_path: string | null
          title: string
          user_id: string | null
        }
        Insert: {
          created_at?: string
          duration?: string | null
          file_path: string
          id?: string
          thumbnail_path?: string | null
          title: string
          user_id?: string | null
        }
        Update: {
          created_at?: string
          duration?: string | null
          file_path?: string
          id?: string
          thumbnail_path?: string | null
          title?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type PublicSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
        PublicSchema["Views"])
    ? (PublicSchema["Tables"] &
        PublicSchema["Views"])[PublicTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
    ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
    ? PublicSchema["Enums"][PublicEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof PublicSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof PublicSchema["CompositeTypes"]
    ? PublicSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never
