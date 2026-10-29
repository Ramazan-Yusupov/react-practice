type ProfileRow = {
  id: string;
  clerk_user_id: string;
  username: string;
  display_name: string;
  bio: string;
  avatar_url: string;
  location: string;
  website: string;
  banner_color: string;
  created_at: string;
  updated_at: string;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: ProfileRow;
        Insert: Pick<ProfileRow, 'clerk_user_id' | 'username'> &
          Partial<Omit<ProfileRow, 'clerk_user_id' | 'username'>>;
        Update: Partial<ProfileRow>;
        Relationships: [];
      };
    };
    Views: { [_ in never]: never };
    Functions: { [_ in never]: never };
    Enums: { [_ in never]: never };
    CompositeTypes: { [_ in never]: never };
  };
};
