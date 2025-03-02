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
      profiles: {
        Row: {
          id: string
          email: string
          first_name: string | null
          last_name: string | null
          phone: string | null
          address: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          first_name?: string | null
          last_name?: string | null
          phone?: string | null
          address?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      breach_history: {
        Row: {
          id: string
          profile_id: string
          breach_name: string
          breach_domain: string | null
          breach_date: string | null
          data_classes: string[] | null
          description: string | null
          exposure_type: 'surface' | 'deep' | null
          is_resolved: boolean
          resolved_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          breach_name: string
          breach_domain?: string | null
          breach_date?: string | null
          data_classes?: string[] | null
          description?: string | null
          exposure_type?: 'surface' | 'deep' | null
          is_resolved?: boolean
          resolved_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          breach_name?: string
          breach_domain?: string | null
          breach_date?: string | null
          data_classes?: string[] | null
          description?: string | null
          exposure_type?: 'surface' | 'deep' | null
          is_resolved?: boolean
          resolved_at?: string | null
          created_at?: string
        }
      }
      removal_requests: {
        Row: {
          id: string
          profile_id: string
          broker_id: string
          broker_name: string
          status: 'pending' | 'in_progress' | 'completed' | 'failed'
          request_date: string
          completion_date: string | null
          data_types: string[] | null
          request_content: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          broker_id: string
          broker_name: string
          status: 'pending' | 'in_progress' | 'completed' | 'failed'
          request_date?: string
          completion_date?: string | null
          data_types?: string[] | null
          request_content?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          broker_id?: string
          broker_name?: string
          status?: 'pending' | 'in_progress' | 'completed' | 'failed'
          request_date?: string
          completion_date?: string | null
          data_types?: string[] | null
          request_content?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      data_brokers: {
        Row: {
          id: string
          name: string
          category: string | null
          removal_process: 'email' | 'form' | 'api' | null
          removal_email: string | null
          removal_url: string | null
          removal_template: string | null
          difficulty: 'Easy' | 'Medium' | 'Hard' | null
          estimated_time: number | null
          created_at: string
        }
        Insert: {
          id: string
          name: string
          category?: string | null
          removal_process?: 'email' | 'form' | 'api' | null
          removal_email?: string | null
          removal_url?: string | null
          removal_template?: string | null
          difficulty?: 'Easy' | 'Medium' | 'Hard' | null
          estimated_time?: number | null
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          category?: string | null
          removal_process?: 'email' | 'form' | 'api' | null
          removal_email?: string | null
          removal_url?: string | null
          removal_template?: string | null
          difficulty?: 'Easy' | 'Medium' | 'Hard' | null
          estimated_time?: number | null
          created_at?: string
        }
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
  }
}