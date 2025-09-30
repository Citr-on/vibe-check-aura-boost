export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.12 (cd3cf9e)"
  }
  public: {
    Tables: {
      analyses: {
        Row: {
          age_range_max: number | null
          age_range_min: number | null
          analysis_option_id: string
          analysis_results: Json | null
          bio_length: string | null
          bio_text: string | null
          cost_amount: number
          cost_type: string
          created_at: string
          id: string
          images: string[] | null
          is_premium: boolean
          keywords: string[] | null
          review_count: number
          score: number | null
          status: string
          target_gender: string | null
          title: string
          tone: string | null
          total_votes: number | null
          type: string
          updated_at: string
          user_id: string
          votes_received: number | null
        }
        Insert: {
          age_range_max?: number | null
          age_range_min?: number | null
          analysis_option_id: string
          analysis_results?: Json | null
          bio_length?: string | null
          bio_text?: string | null
          cost_amount: number
          cost_type: string
          created_at?: string
          id?: string
          images?: string[] | null
          is_premium?: boolean
          keywords?: string[] | null
          review_count?: number
          score?: number | null
          status?: string
          target_gender?: string | null
          title: string
          tone?: string | null
          total_votes?: number | null
          type: string
          updated_at?: string
          user_id: string
          votes_received?: number | null
        }
        Update: {
          age_range_max?: number | null
          age_range_min?: number | null
          analysis_option_id?: string
          analysis_results?: Json | null
          bio_length?: string | null
          bio_text?: string | null
          cost_amount?: number
          cost_type?: string
          created_at?: string
          id?: string
          images?: string[] | null
          is_premium?: boolean
          keywords?: string[] | null
          review_count?: number
          score?: number | null
          status?: string
          target_gender?: string | null
          title?: string
          tone?: string | null
          total_votes?: number | null
          type?: string
          updated_at?: string
          user_id?: string
          votes_received?: number | null
        }
        Relationships: []
      }
      dev_accounts: {
        Row: {
          created_at: string
          email: string
          id: string
          name: string
          password_hash: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          name: string
          password_hash: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          name?: string
          password_hash?: string
          updated_at?: string
        }
        Relationships: []
      }
      photo_batches: {
        Row: {
          analysis_results: Json | null
          batch_name: string | null
          created_at: string
          credits_used: number | null
          id: string
          photos: string[]
          status: string
          updated_at: string
          user_id: string
        }
        Insert: {
          analysis_results?: Json | null
          batch_name?: string | null
          created_at?: string
          credits_used?: number | null
          id?: string
          photos?: string[]
          status?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          analysis_results?: Json | null
          batch_name?: string | null
          created_at?: string
          credits_used?: number | null
          id?: string
          photos?: string[]
          status?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          age: number | null
          coins: number
          created_at: string
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          age?: number | null
          coins?: number
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          age?: number | null
          coins?: number
          created_at?: string
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      reviews: {
        Row: {
          analysis_id: string
          created_at: string
          feeling_score: number
          id: string
          improvement_comment: string | null
          intrigue_score: number
          photo_index: number | null
          positive_comment: string | null
          reviewer_id: string
          updated_at: string
          vibe_score: number
        }
        Insert: {
          analysis_id: string
          created_at?: string
          feeling_score: number
          id?: string
          improvement_comment?: string | null
          intrigue_score: number
          photo_index?: number | null
          positive_comment?: string | null
          reviewer_id: string
          updated_at?: string
          vibe_score: number
        }
        Update: {
          analysis_id?: string
          created_at?: string
          feeling_score?: number
          id?: string
          improvement_comment?: string | null
          intrigue_score?: number
          photo_index?: number | null
          positive_comment?: string | null
          reviewer_id?: string
          updated_at?: string
          vibe_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "reviews_analysis_id_fkey"
            columns: ["analysis_id"]
            isOneToOne: false
            referencedRelation: "analyses"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      authenticate_dev_account: {
        Args: { p_email: string; p_password: string }
        Returns: {
          account_email: string
          account_id: string
          account_name: string
        }[]
      }
    }
    Enums: {
      ethnic_origin_type:
        | "européenne"
        | "africaine"
        | "asiatique"
        | "hispanique"
        | "moyen-orientale"
        | "métisse"
        | "autre"
        | "préfère-ne-pas-dire"
      gender_type: "homme" | "femme" | "non-binaire" | "préfère-ne-pas-dire"
      religious_confession_type:
        | "christianisme"
        | "islam"
        | "judaisme"
        | "bouddhisme"
        | "hinduisme"
        | "athéisme"
        | "agnosticisme"
        | "autre"
        | "préfère-ne-pas-dire"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      ethnic_origin_type: [
        "européenne",
        "africaine",
        "asiatique",
        "hispanique",
        "moyen-orientale",
        "métisse",
        "autre",
        "préfère-ne-pas-dire",
      ],
      gender_type: ["homme", "femme", "non-binaire", "préfère-ne-pas-dire"],
      religious_confession_type: [
        "christianisme",
        "islam",
        "judaisme",
        "bouddhisme",
        "hinduisme",
        "athéisme",
        "agnosticisme",
        "autre",
        "préfère-ne-pas-dire",
      ],
    },
  },
} as const
