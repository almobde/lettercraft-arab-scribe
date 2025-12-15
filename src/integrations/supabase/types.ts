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
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      activities: {
        Row: {
          activity_url: string
          created_at: string | null
          description: string
          display_order: number | null
          id: number
          image_url: string | null
          is_active: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          activity_url: string
          created_at?: string | null
          description: string
          display_order?: number | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          activity_url?: string
          created_at?: string | null
          description?: string
          display_order?: number | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      activity_logs: {
        Row: {
          activity_type: string
          created_at: string
          description: string
          details: Json | null
          id: string
          user_id: string
          user_name: string
        }
        Insert: {
          activity_type: string
          created_at?: string
          description: string
          details?: Json | null
          id?: string
          user_id: string
          user_name: string
        }
        Update: {
          activity_type?: string
          created_at?: string
          description?: string
          details?: Json | null
          id?: string
          user_id?: string
          user_name?: string
        }
        Relationships: []
      }
      activity_rooms: {
        Row: {
          created_at: string
          current_participants: number | null
          description: string | null
          display_order: number | null
          end_time: string | null
          id: string
          is_active: boolean
          is_paused: boolean
          max_participants: number | null
          name: string
          room_code: string
          start_time: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          display_order?: number | null
          end_time?: string | null
          id?: string
          is_active?: boolean
          is_paused?: boolean
          max_participants?: number | null
          name: string
          room_code: string
          start_time?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          current_participants?: number | null
          description?: string | null
          display_order?: number | null
          end_time?: string | null
          id?: string
          is_active?: boolean
          is_paused?: boolean
          max_participants?: number | null
          name?: string
          room_code?: string
          start_time?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      agents: {
        Row: {
          created_at: string | null
          department: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          notes: string | null
          phone: string | null
          responsibilities: string[] | null
          role: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          notes?: string | null
          phone?: string | null
          responsibilities?: string[] | null
          role?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          notes?: string | null
          phone?: string | null
          responsibilities?: string[] | null
          role?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      ai_tools: {
        Row: {
          category: string
          cons: string[] | null
          created_at: string | null
          description: string
          features: string[] | null
          id: number
          is_active: boolean | null
          name: string
          price: string | null
          pricing_type: string
          pros: string[] | null
          updated_at: string | null
          url: string
          use_cases: string[] | null
        }
        Insert: {
          category: string
          cons?: string[] | null
          created_at?: string | null
          description: string
          features?: string[] | null
          id?: number
          is_active?: boolean | null
          name: string
          price?: string | null
          pricing_type: string
          pros?: string[] | null
          updated_at?: string | null
          url: string
          use_cases?: string[] | null
        }
        Update: {
          category?: string
          cons?: string[] | null
          created_at?: string | null
          description?: string
          features?: string[] | null
          id?: number
          is_active?: boolean | null
          name?: string
          price?: string | null
          pricing_type?: string
          pros?: string[] | null
          updated_at?: string | null
          url?: string
          use_cases?: string[] | null
        }
        Relationships: []
      }
      allowed_emails: {
        Row: {
          created_at: string | null
          email: string
          id: string
          is_active: boolean | null
          notes: string | null
        }
        Insert: {
          created_at?: string | null
          email: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
        }
        Update: {
          created_at?: string | null
          email?: string
          id?: string
          is_active?: boolean | null
          notes?: string | null
        }
        Relationships: []
      }
      attendance: {
        Row: {
          absent_excused: number
          absent_unexcused: number
          created_at: string | null
          id: string
          late_count: number
          present_days: number
          student_number: string
          term_code: string
          total_days: number
          updated_at: string | null
        }
        Insert: {
          absent_excused?: number
          absent_unexcused?: number
          created_at?: string | null
          id?: string
          late_count?: number
          present_days?: number
          student_number: string
          term_code: string
          total_days?: number
          updated_at?: string | null
        }
        Update: {
          absent_excused?: number
          absent_unexcused?: number
          created_at?: string | null
          id?: string
          late_count?: number
          present_days?: number
          student_number?: string
          term_code?: string
          total_days?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_student_number_fkey"
            columns: ["student_number"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_number"]
          },
        ]
      }
      attendance_days: {
        Row: {
          created_at: string | null
          created_by: string | null
          date: string
          id: string
          late_minutes: number | null
          letter_id: string | null
          note: string | null
          status: Database["public"]["Enums"]["attendance_status"] | null
          teacher_id: string
          updated_at: string | null
          updated_by: string | null
        }
        Insert: {
          created_at?: string | null
          created_by?: string | null
          date: string
          id?: string
          late_minutes?: number | null
          letter_id?: string | null
          note?: string | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
          teacher_id: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string | null
          date?: string
          id?: string
          late_minutes?: number | null
          letter_id?: string | null
          note?: string | null
          status?: Database["public"]["Enums"]["attendance_status"] | null
          teacher_id?: string
          updated_at?: string | null
          updated_by?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "attendance_days_letter_id_fkey"
            columns: ["letter_id"]
            isOneToOne: false
            referencedRelation: "letters"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "attendance_days_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "attendance_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_letters: {
        Row: {
          body_template: string | null
          created_at: string | null
          created_by: string | null
          date: string
          id: string
          pdf_url: string | null
          ref_no: string
          status: Database["public"]["Enums"]["letter_status"] | null
          teacher_id: string | null
          type: Database["public"]["Enums"]["letter_type"]
        }
        Insert: {
          body_template?: string | null
          created_at?: string | null
          created_by?: string | null
          date: string
          id?: string
          pdf_url?: string | null
          ref_no: string
          status?: Database["public"]["Enums"]["letter_status"] | null
          teacher_id?: string | null
          type: Database["public"]["Enums"]["letter_type"]
        }
        Update: {
          body_template?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          id?: string
          pdf_url?: string | null
          ref_no?: string
          status?: Database["public"]["Enums"]["letter_status"] | null
          teacher_id?: string | null
          type?: Database["public"]["Enums"]["letter_type"]
        }
        Relationships: [
          {
            foreignKeyName: "attendance_letters_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "school_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      attendance_teachers: {
        Row: {
          created_at: string | null
          current_job: string | null
          dept: string | null
          email: string | null
          emp_no: string
          full_name: string
          id: string
          is_active: boolean | null
          national_id: string | null
          phone: string | null
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          current_job?: string | null
          dept?: string | null
          email?: string | null
          emp_no: string
          full_name: string
          id?: string
          is_active?: boolean | null
          national_id?: string | null
          phone?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          current_job?: string | null
          dept?: string | null
          email?: string | null
          emp_no?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          national_id?: string | null
          phone?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      authorized_teachers: {
        Row: {
          created_at: string
          id: string
          is_active: boolean
          specialization: string | null
          teacher_id: string
          teacher_name: string
        }
        Insert: {
          created_at?: string
          id?: string
          is_active?: boolean
          specialization?: string | null
          teacher_id: string
          teacher_name: string
        }
        Update: {
          created_at?: string
          id?: string
          is_active?: boolean
          specialization?: string | null
          teacher_id?: string
          teacher_name?: string
        }
        Relationships: []
      }
      behavior: {
        Row: {
          counselor_notes: string | null
          created_at: string | null
          id: string
          negative_points: number
          positive_points: number
          student_number: string
          term_code: string
          updated_at: string | null
        }
        Insert: {
          counselor_notes?: string | null
          created_at?: string | null
          id?: string
          negative_points?: number
          positive_points?: number
          student_number: string
          term_code: string
          updated_at?: string | null
        }
        Update: {
          counselor_notes?: string | null
          created_at?: string | null
          id?: string
          negative_points?: number
          positive_points?: number
          student_number?: string
          term_code?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "behavior_student_number_fkey"
            columns: ["student_number"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_number"]
          },
        ]
      }
      chat_sessions: {
        Row: {
          bot_response: string
          created_at: string
          id: string
          parameters: Json | null
          query_type: string
          user_id: string | null
          user_query: string
        }
        Insert: {
          bot_response: string
          created_at?: string
          id?: string
          parameters?: Json | null
          query_type?: string
          user_id?: string | null
          user_query: string
        }
        Update: {
          bot_response?: string
          created_at?: string
          id?: string
          parameters?: Json | null
          query_type?: string
          user_id?: string | null
          user_query?: string
        }
        Relationships: []
      }
      chatbot_files: {
        Row: {
          content: string
          created_at: string
          file_type: string
          filename: string
          id: string
          is_active: boolean
          updated_at: string
          uploaded_by: string | null
        }
        Insert: {
          content: string
          created_at?: string
          file_type?: string
          filename: string
          id?: string
          is_active?: boolean
          updated_at?: string
          uploaded_by?: string | null
        }
        Update: {
          content?: string
          created_at?: string
          file_type?: string
          filename?: string
          id?: string
          is_active?: boolean
          updated_at?: string
          uploaded_by?: string | null
        }
        Relationships: []
      }
      cities: {
        Row: {
          country_id: string | null
          created_at: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          country_id?: string | null
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: [
          {
            foreignKeyName: "cities_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
        ]
      }
      class_schedule: {
        Row: {
          class_name: string
          created_at: string
          day_of_week: number
          id: string
          is_active: boolean | null
          period: number
          room: string | null
          subject: string
          teacher_id: string | null
          updated_at: string
        }
        Insert: {
          class_name: string
          created_at?: string
          day_of_week: number
          id?: string
          is_active?: boolean | null
          period: number
          room?: string | null
          subject: string
          teacher_id?: string | null
          updated_at?: string
        }
        Update: {
          class_name?: string
          created_at?: string
          day_of_week?: number
          id?: string
          is_active?: boolean | null
          period?: number
          room?: string | null
          subject?: string
          teacher_id?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      comprehensive_tools: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          id: number
          image: string | null
          is_active: boolean | null
          name: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          id?: number
          image?: string | null
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          id?: number
          image?: string | null
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      counselors: {
        Row: {
          assigned_grades: string[] | null
          counseling_areas: string[] | null
          created_at: string | null
          email: string | null
          id: string
          is_active: boolean | null
          name: string
          notes: string | null
          phone: string | null
          specialization: string | null
          updated_at: string | null
        }
        Insert: {
          assigned_grades?: string[] | null
          counseling_areas?: string[] | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          notes?: string | null
          phone?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Update: {
          assigned_grades?: string[] | null
          counseling_areas?: string[] | null
          created_at?: string | null
          email?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          notes?: string | null
          phone?: string | null
          specialization?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      countries: {
        Row: {
          code: string
          created_at: string | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          code: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          code?: string
          created_at?: string | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      course_modules: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          estimated_duration: string | null
          icon_name: string | null
          id: string
          is_active: boolean | null
          is_required: boolean | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          estimated_duration?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          is_required?: boolean | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          estimated_duration?: string | null
          icon_name?: string | null
          id?: string
          is_active?: boolean | null
          is_required?: boolean | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      education_organization_members: {
        Row: {
          id: string
          invited_by: string | null
          joined_at: string | null
          organization_id: string | null
          role: Database["public"]["Enums"]["user_role_education"]
          user_id: string | null
        }
        Insert: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role_education"]
          user_id?: string | null
        }
        Update: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role_education"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_organization_members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "education_organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      education_organizations: {
        Row: {
          address: string | null
          city_id: string | null
          country_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_verified: boolean | null
          logo_url: string | null
          name: string
          owner_id: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city_id?: string | null
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name: string
          owner_id?: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city_id?: string | null
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "education_organizations_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_organizations_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      education_subjects: {
        Row: {
          category: string
          code: string
          created_at: string | null
          education_levels:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string | null
          education_levels?:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string | null
          education_levels?:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      education_teachers: {
        Row: {
          bio: string | null
          created_at: string | null
          current_city_id: string | null
          current_country_id: string | null
          date_of_birth: string | null
          earliest_start_date: string | null
          expected_salary_max: number | null
          expected_salary_min: number | null
          gender: Database["public"]["Enums"]["gender_type"] | null
          id: string
          in_saudi_arabia: boolean | null
          license_level: string | null
          license_number: string | null
          nationality_country_id: string | null
          profile_completion_percentage: number | null
          show_email_public: boolean | null
          show_phone_public: boolean | null
          updated_at: string | null
          user_id: string | null
          willing_to_relocate: boolean | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          current_city_id?: string | null
          current_country_id?: string | null
          date_of_birth?: string | null
          earliest_start_date?: string | null
          expected_salary_max?: number | null
          expected_salary_min?: number | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          in_saudi_arabia?: boolean | null
          license_level?: string | null
          license_number?: string | null
          nationality_country_id?: string | null
          profile_completion_percentage?: number | null
          show_email_public?: boolean | null
          show_phone_public?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          willing_to_relocate?: boolean | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          current_city_id?: string | null
          current_country_id?: string | null
          date_of_birth?: string | null
          earliest_start_date?: string | null
          expected_salary_max?: number | null
          expected_salary_min?: number | null
          gender?: Database["public"]["Enums"]["gender_type"] | null
          id?: string
          in_saudi_arabia?: boolean | null
          license_level?: string | null
          license_number?: string | null
          nationality_country_id?: string | null
          profile_completion_percentage?: number | null
          show_email_public?: boolean | null
          show_phone_public?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          willing_to_relocate?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "education_teachers_current_city_id_fkey"
            columns: ["current_city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_teachers_current_country_id_fkey"
            columns: ["current_country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_teachers_nationality_country_id_fkey"
            columns: ["nationality_country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "education_teachers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      evaluation_criteria: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          is_active: boolean | null
          name: string
          updated_at: string
          weight: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name: string
          updated_at?: string
          weight?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean | null
          name?: string
          updated_at?: string
          weight?: number | null
        }
        Relationships: []
      }
      exercises: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          display_order: number | null
          file_size: string | null
          file_type: string | null
          file_url: string
          id: number
          is_active: boolean | null
          is_uploaded: boolean | null
          name: string
          updated_at: string | null
          upload_date: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          display_order?: number | null
          file_size?: string | null
          file_type?: string | null
          file_url: string
          id?: number
          is_active?: boolean | null
          is_uploaded?: boolean | null
          name: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          display_order?: number | null
          file_size?: string | null
          file_type?: string | null
          file_url?: string
          id?: number
          is_active?: boolean | null
          is_uploaded?: boolean | null
          name?: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Relationships: []
      }
      lessons: {
        Row: {
          category: string
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          title: string
          updated_at: string
          word_count: number
        }
        Insert: {
          category?: string
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string
          word_count?: number
        }
        Update: {
          category?: string
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string
          word_count?: number
        }
        Relationships: []
      }
      letters: {
        Row: {
          body_template: string | null
          created_at: string | null
          created_by: string | null
          date: string
          id: string
          pdf_url: string | null
          ref_no: string
          status: Database["public"]["Enums"]["letter_status"] | null
          teacher_id: string | null
          type: Database["public"]["Enums"]["letter_type"]
        }
        Insert: {
          body_template?: string | null
          created_at?: string | null
          created_by?: string | null
          date: string
          id?: string
          pdf_url?: string | null
          ref_no: string
          status?: Database["public"]["Enums"]["letter_status"] | null
          teacher_id?: string | null
          type: Database["public"]["Enums"]["letter_type"]
        }
        Update: {
          body_template?: string | null
          created_at?: string | null
          created_by?: string | null
          date?: string
          id?: string
          pdf_url?: string | null
          ref_no?: string
          status?: Database["public"]["Enums"]["letter_status"] | null
          teacher_id?: string | null
          type?: Database["public"]["Enums"]["letter_type"]
        }
        Relationships: [
          {
            foreignKeyName: "letters_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "attendance_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      media_posts: {
        Row: {
          created_at: string
          description: string | null
          display_name: string
          file_mime_type: string | null
          file_name: string
          file_size: number | null
          file_type: string
          file_url: string | null
          id: string
          likes: number | null
          status: string | null
          tags: string[] | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          views: number | null
          youtube_url: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_name: string
          file_mime_type?: string | null
          file_name: string
          file_size?: number | null
          file_type: string
          file_url?: string | null
          id?: string
          likes?: number | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          views?: number | null
          youtube_url?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          display_name?: string
          file_mime_type?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: string
          file_url?: string | null
          id?: string
          likes?: number | null
          status?: string | null
          tags?: string[] | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          views?: number | null
          youtube_url?: string | null
        }
        Relationships: []
      }
      my_designed_tools: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          id: number
          image: string | null
          is_active: boolean | null
          name: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          id?: never
          image?: string | null
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          id?: never
          image?: string | null
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      notification_reads: {
        Row: {
          acknowledged_at: string | null
          id: string
          notification_id: string | null
          read_at: string | null
          user_id: string
        }
        Insert: {
          acknowledged_at?: string | null
          id?: string
          notification_id?: string | null
          read_at?: string | null
          user_id: string
        }
        Update: {
          acknowledged_at?: string | null
          id?: string
          notification_id?: string | null
          read_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "notification_reads_notification_id_fkey"
            columns: ["notification_id"]
            isOneToOne: false
            referencedRelation: "student_note_notifications"
            referencedColumns: ["id"]
          },
        ]
      }
      organization_members: {
        Row: {
          id: string
          invited_by: string | null
          joined_at: string | null
          organization_id: string | null
          role: Database["public"]["Enums"]["user_role"]
          user_id: string | null
        }
        Insert: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Update: {
          id?: string
          invited_by?: string | null
          joined_at?: string | null
          organization_id?: string | null
          role?: Database["public"]["Enums"]["user_role"]
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organization_members_invited_by_fkey"
            columns: ["invited_by"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_organization_id_fkey"
            columns: ["organization_id"]
            isOneToOne: false
            referencedRelation: "organizations"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organization_members_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      organizations: {
        Row: {
          address: string | null
          city_id: string | null
          country_id: string | null
          created_at: string | null
          description: string | null
          id: string
          is_verified: boolean | null
          logo_url: string | null
          name: string
          owner_id: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at: string | null
          website: string | null
        }
        Insert: {
          address?: string | null
          city_id?: string | null
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name: string
          owner_id?: string | null
          type: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
          website?: string | null
        }
        Update: {
          address?: string | null
          city_id?: string | null
          country_id?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          is_verified?: boolean | null
          logo_url?: string | null
          name?: string
          owner_id?: string | null
          type?: Database["public"]["Enums"]["organization_type"]
          updated_at?: string | null
          website?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "organizations_city_id_fkey"
            columns: ["city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_country_id_fkey"
            columns: ["country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "organizations_owner_id_fkey"
            columns: ["owner_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          category: string
          created_at: string
          description: string | null
          display_name: string
          id: string
          is_active: boolean
          permission_key: Database["public"]["Enums"]["permission_type"]
          updated_at: string
        }
        Insert: {
          category?: string
          created_at?: string
          description?: string | null
          display_name: string
          id?: string
          is_active?: boolean
          permission_key: Database["public"]["Enums"]["permission_type"]
          updated_at?: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          display_name?: string
          id?: string
          is_active?: boolean
          permission_key?: Database["public"]["Enums"]["permission_type"]
          updated_at?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          attendance_role:
            | Database["public"]["Enums"]["attendance_user_role"]
            | null
          avatar_url: string | null
          created_at: string | null
          email: string
          first_name: string | null
          id: string
          is_approved: boolean | null
          is_email_verified: boolean | null
          is_phone_verified: boolean | null
          last_name: string | null
          name: string
          phone: string | null
          role: Database["public"]["Enums"]["user_role"] | null
          role_education:
            | Database["public"]["Enums"]["user_role_education"]
            | null
          updated_at: string | null
        }
        Insert: {
          attendance_role?:
            | Database["public"]["Enums"]["attendance_user_role"]
            | null
          avatar_url?: string | null
          created_at?: string | null
          email: string
          first_name?: string | null
          id: string
          is_approved?: boolean | null
          is_email_verified?: boolean | null
          is_phone_verified?: boolean | null
          last_name?: string | null
          name: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          role_education?:
            | Database["public"]["Enums"]["user_role_education"]
            | null
          updated_at?: string | null
        }
        Update: {
          attendance_role?:
            | Database["public"]["Enums"]["attendance_user_role"]
            | null
          avatar_url?: string | null
          created_at?: string | null
          email?: string
          first_name?: string | null
          id?: string
          is_approved?: boolean | null
          is_email_verified?: boolean | null
          is_phone_verified?: boolean | null
          last_name?: string | null
          name?: string
          phone?: string | null
          role?: Database["public"]["Enums"]["user_role"] | null
          role_education?:
            | Database["public"]["Enums"]["user_role_education"]
            | null
          updated_at?: string | null
        }
        Relationships: []
      }
      reference_books: {
        Row: {
          author: string
          created_at: string
          description: string | null
          file_name: string | null
          file_url: string | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string
          upload_date: string
        }
        Insert: {
          author: string
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string
          upload_date?: string
        }
        Update: {
          author?: string
          created_at?: string
          description?: string | null
          file_name?: string | null
          file_url?: string | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string
          upload_date?: string
        }
        Relationships: []
      }
      room_activities: {
        Row: {
          activity_id: number
          created_at: string
          display_order: number | null
          id: string
          room_id: string
        }
        Insert: {
          activity_id: number
          created_at?: string
          display_order?: number | null
          id?: string
          room_id: string
        }
        Update: {
          activity_id?: number
          created_at?: string
          display_order?: number | null
          id?: string
          room_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "room_activities_activity_id_fkey"
            columns: ["activity_id"]
            isOneToOne: false
            referencedRelation: "activities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "room_activities_room_id_fkey"
            columns: ["room_id"]
            isOneToOne: false
            referencedRelation: "activity_rooms"
            referencedColumns: ["id"]
          },
        ]
      }
      savings_videos: {
        Row: {
          created_at: string
          description: string
          display_order: number | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string
          video_url: string
        }
        Insert: {
          created_at?: string
          description: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string
          video_url: string
        }
        Update: {
          created_at?: string
          description?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string
          video_url?: string
        }
        Relationships: []
      }
      school_settings: {
        Row: {
          created_at: string
          department: string
          education_level: string
          id: string
          platform_supervisor: string
          principal_name: string
          school_name: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          department?: string
          education_level?: string
          id?: string
          platform_supervisor?: string
          principal_name?: string
          school_name?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          department?: string
          education_level?: string
          id?: string
          platform_supervisor?: string
          principal_name?: string
          school_name?: string
          updated_at?: string
        }
        Relationships: []
      }
      school_teachers: {
        Row: {
          created_at: string | null
          dept: string | null
          email: string | null
          emp_no: string
          full_name: string
          id: string
          is_active: boolean | null
          phone: string | null
          subject: string | null
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          dept?: string | null
          email?: string | null
          emp_no: string
          full_name: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          dept?: string | null
          email?: string | null
          emp_no?: string
          full_name?: string
          id?: string
          is_active?: boolean | null
          phone?: string | null
          subject?: string | null
          updated_at?: string | null
        }
        Relationships: []
      }
      scores: {
        Row: {
          created_at: string | null
          id: string
          max_score: number
          score: number
          score_date: string
          score_type: string
          student_number: string
          subject_code: string
          term_code: string
          updated_at: string | null
          weight: number
        }
        Insert: {
          created_at?: string | null
          id?: string
          max_score: number
          score: number
          score_date: string
          score_type: string
          student_number: string
          subject_code: string
          term_code: string
          updated_at?: string | null
          weight?: number
        }
        Update: {
          created_at?: string | null
          id?: string
          max_score?: number
          score?: number
          score_date?: string
          score_type?: string
          student_number?: string
          subject_code?: string
          term_code?: string
          updated_at?: string | null
          weight?: number
        }
        Relationships: [
          {
            foreignKeyName: "scores_student_number_fkey"
            columns: ["student_number"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_number"]
          },
        ]
      }
      sermon_plans: {
        Row: {
          created_at: string
          description: string | null
          end_date: string | null
          id: string
          is_active: boolean | null
          plan_type: string
          sermon_topics: string[]
          start_date: string | null
          title: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          plan_type?: string
          sermon_topics?: string[]
          start_date?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          end_date?: string | null
          id?: string
          is_active?: boolean | null
          plan_type?: string
          sermon_topics?: string[]
          start_date?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      sermons: {
        Row: {
          category: string
          character_count: number
          content: string
          created_at: string
          id: string
          is_active: boolean | null
          is_featured: boolean | null
          keywords: string[] | null
          main_points: string[] | null
          occasion: string | null
          target_audience: string | null
          title: string
          updated_at: string
        }
        Insert: {
          category?: string
          character_count?: number
          content: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          keywords?: string[] | null
          main_points?: string[] | null
          occasion?: string | null
          target_audience?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          category?: string
          character_count?: number
          content?: string
          created_at?: string
          id?: string
          is_active?: boolean | null
          is_featured?: boolean | null
          keywords?: string[] | null
          main_points?: string[] | null
          occasion?: string | null
          target_audience?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_settings: {
        Row: {
          created_at: string
          description: string | null
          id: string
          setting_key: string
          setting_value: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string
        }
        Relationships: []
      }
      site_users: {
        Row: {
          created_at: string
          full_name: string
          id: string
          is_active: boolean
          password_hash: string | null
          password_text: string
          updated_at: string
          user_role: string
          username: string
        }
        Insert: {
          created_at?: string
          full_name: string
          id?: string
          is_active?: boolean
          password_hash?: string | null
          password_text: string
          updated_at?: string
          user_role?: string
          username: string
        }
        Update: {
          created_at?: string
          full_name?: string
          id?: string
          is_active?: boolean
          password_hash?: string | null
          password_text?: string
          updated_at?: string
          user_role?: string
          username?: string
        }
        Relationships: []
      }
      student_dislikes: {
        Row: {
          created_at: string
          created_date: string
          dislikes_count: number
          id: string
          student_number: string
          teacher_id: string
        }
        Insert: {
          created_at?: string
          created_date?: string
          dislikes_count?: number
          id?: string
          student_number: string
          teacher_id: string
        }
        Update: {
          created_at?: string
          created_date?: string
          dislikes_count?: number
          id?: string
          student_number?: string
          teacher_id?: string
        }
        Relationships: []
      }
      student_likes: {
        Row: {
          created_at: string
          created_date: string
          id: string
          likes_count: number
          student_number: string
          teacher_id: string
        }
        Insert: {
          created_at?: string
          created_date?: string
          id?: string
          likes_count?: number
          student_number: string
          teacher_id: string
        }
        Update: {
          created_at?: string
          created_date?: string
          id?: string
          likes_count?: number
          student_number?: string
          teacher_id?: string
        }
        Relationships: []
      }
      student_note_notifications: {
        Row: {
          created_at: string | null
          created_by: string
          expires_at: string | null
          id: string
          message: string
          note_id: string | null
          notification_type: string
          priority_level: string
          resolution_notes: string | null
          resolved_at: string | null
          resolved_by: string | null
          status: string
          student_number: string
          target_all_supervisors: boolean | null
          target_recipients: Json
          title: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          created_by: string
          expires_at?: string | null
          id?: string
          message: string
          note_id?: string | null
          notification_type?: string
          priority_level?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          student_number: string
          target_all_supervisors?: boolean | null
          target_recipients?: Json
          title: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          created_by?: string
          expires_at?: string | null
          id?: string
          message?: string
          note_id?: string | null
          notification_type?: string
          priority_level?: string
          resolution_notes?: string | null
          resolved_at?: string | null
          resolved_by?: string | null
          status?: string
          student_number?: string
          target_all_supervisors?: boolean | null
          target_recipients?: Json
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_note_notifications_note_id_fkey"
            columns: ["note_id"]
            isOneToOne: false
            referencedRelation: "student_notes"
            referencedColumns: ["id"]
          },
        ]
      }
      student_notes: {
        Row: {
          author_name: string
          created_at: string | null
          id: string
          note_date: string
          note_text: string
          student_number: string
          term_code: string
          updated_at: string | null
        }
        Insert: {
          author_name: string
          created_at?: string | null
          id?: string
          note_date?: string
          note_text: string
          student_number: string
          term_code: string
          updated_at?: string | null
        }
        Update: {
          author_name?: string
          created_at?: string | null
          id?: string
          note_date?: string
          note_text?: string
          student_number?: string
          term_code?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "student_notes_student_number_fkey"
            columns: ["student_number"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["student_number"]
          },
        ]
      }
      student_points: {
        Row: {
          added_date: string
          created_at: string
          id: string
          notes: string | null
          points_added: number
          points_source: string | null
          student_number: string
          total_points: number
        }
        Insert: {
          added_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          points_added?: number
          points_source?: string | null
          student_number: string
          total_points?: number
        }
        Update: {
          added_date?: string
          created_at?: string
          id?: string
          notes?: string | null
          points_added?: number
          points_source?: string | null
          student_number?: string
          total_points?: number
        }
        Relationships: []
      }
      student_ratings: {
        Row: {
          created_at: string
          dislikes: number
          id: string
          likes: number
          student_number: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          student_number: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          dislikes?: number
          id?: string
          likes?: number
          student_number?: string
          updated_at?: string
        }
        Relationships: []
      }
      students: {
        Row: {
          academic_id: string | null
          class_code: string
          created_at: string | null
          family_name: string
          father_name: string
          first_name: string
          grandfather_name: string
          id: string
          phone: string | null
          stage: string
          status: string
          student_number: string
          updated_at: string | null
        }
        Insert: {
          academic_id?: string | null
          class_code: string
          created_at?: string | null
          family_name: string
          father_name: string
          first_name: string
          grandfather_name: string
          id?: string
          phone?: string | null
          stage: string
          status?: string
          student_number: string
          updated_at?: string | null
        }
        Update: {
          academic_id?: string | null
          class_code?: string
          created_at?: string | null
          family_name?: string
          father_name?: string
          first_name?: string
          grandfather_name?: string
          id?: string
          phone?: string | null
          stage?: string
          status?: string
          student_number?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      subjects: {
        Row: {
          category: string
          code: string
          created_at: string | null
          education_levels:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id: string
          is_active: boolean | null
          name_ar: string
          name_en: string
        }
        Insert: {
          category: string
          code: string
          created_at?: string | null
          education_levels?:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id?: string
          is_active?: boolean | null
          name_ar: string
          name_en: string
        }
        Update: {
          category?: string
          code?: string
          created_at?: string | null
          education_levels?:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id?: string
          is_active?: boolean | null
          name_ar?: string
          name_en?: string
        }
        Relationships: []
      }
      system_settings: {
        Row: {
          created_at: string | null
          description: string | null
          id: string
          setting_key: string
          setting_value: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key: string
          setting_value: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          id?: string
          setting_key?: string
          setting_value?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      teacher_courses: {
        Row: {
          certificate_url: string | null
          completion_date: string | null
          course_name: string
          created_at: string | null
          duration_hours: number | null
          id: string
          organization: string
          teacher_id: string | null
        }
        Insert: {
          certificate_url?: string | null
          completion_date?: string | null
          course_name: string
          created_at?: string | null
          duration_hours?: number | null
          id?: string
          organization: string
          teacher_id?: string | null
        }
        Update: {
          certificate_url?: string | null
          completion_date?: string | null
          course_name?: string
          created_at?: string | null
          duration_hours?: number | null
          id?: string
          organization?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_courses_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_education: {
        Row: {
          created_at: string | null
          degree_type: Database["public"]["Enums"]["degree_type"]
          gpa: number | null
          graduation_year: number | null
          id: string
          is_primary: boolean | null
          major: string
          sub_major: string | null
          teacher_id: string | null
          university: string
        }
        Insert: {
          created_at?: string | null
          degree_type: Database["public"]["Enums"]["degree_type"]
          gpa?: number | null
          graduation_year?: number | null
          id?: string
          is_primary?: boolean | null
          major: string
          sub_major?: string | null
          teacher_id?: string | null
          university: string
        }
        Update: {
          created_at?: string | null
          degree_type?: Database["public"]["Enums"]["degree_type"]
          gpa?: number | null
          graduation_year?: number | null
          id?: string
          is_primary?: boolean | null
          major?: string
          sub_major?: string | null
          teacher_id?: string | null
          university?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_education_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_education_records: {
        Row: {
          created_at: string | null
          degree_type: Database["public"]["Enums"]["degree_type"]
          gpa: number | null
          graduation_year: number | null
          id: string
          is_primary: boolean | null
          major: string
          sub_major: string | null
          teacher_id: string | null
          university: string
        }
        Insert: {
          created_at?: string | null
          degree_type: Database["public"]["Enums"]["degree_type"]
          gpa?: number | null
          graduation_year?: number | null
          id?: string
          is_primary?: boolean | null
          major: string
          sub_major?: string | null
          teacher_id?: string | null
          university: string
        }
        Update: {
          created_at?: string | null
          degree_type?: Database["public"]["Enums"]["degree_type"]
          gpa?: number | null
          graduation_year?: number | null
          id?: string
          is_primary?: boolean | null
          major?: string
          sub_major?: string | null
          teacher_id?: string | null
          university?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_education_records_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "education_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_experience: {
        Row: {
          achievements: string | null
          created_at: string | null
          education_level: Database["public"]["Enums"]["education_level"]
          end_date: string | null
          id: string
          is_current: boolean | null
          organization_name: string
          position: string
          start_date: string
          subject: string
          teacher_id: string | null
        }
        Insert: {
          achievements?: string | null
          created_at?: string | null
          education_level: Database["public"]["Enums"]["education_level"]
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          organization_name: string
          position: string
          start_date: string
          subject: string
          teacher_id?: string | null
        }
        Update: {
          achievements?: string | null
          created_at?: string | null
          education_level?: Database["public"]["Enums"]["education_level"]
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          organization_name?: string
          position?: string
          start_date?: string
          subject?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_experience_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_files: {
        Row: {
          description: string | null
          file_name: string
          file_size: number | null
          file_type: Database["public"]["Enums"]["file_type"]
          file_url: string
          id: string
          mime_type: string | null
          teacher_id: string | null
          uploaded_at: string | null
        }
        Insert: {
          description?: string | null
          file_name: string
          file_size?: number | null
          file_type: Database["public"]["Enums"]["file_type"]
          file_url: string
          id?: string
          mime_type?: string | null
          teacher_id?: string | null
          uploaded_at?: string | null
        }
        Update: {
          description?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: Database["public"]["Enums"]["file_type"]
          file_url?: string
          id?: string
          mime_type?: string | null
          teacher_id?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_files_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_language_skills: {
        Row: {
          created_at: string | null
          id: string
          language_code: string
          language_name: string
          level: Database["public"]["Enums"]["language_level"]
          teacher_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          language_code: string
          language_name: string
          level: Database["public"]["Enums"]["language_level"]
          teacher_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language_code?: string
          language_name?: string
          level?: Database["public"]["Enums"]["language_level"]
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_language_skills_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "education_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_languages: {
        Row: {
          created_at: string | null
          id: string
          language_code: string
          language_name: string
          level: Database["public"]["Enums"]["language_level"]
          teacher_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          language_code: string
          language_name: string
          level: Database["public"]["Enums"]["language_level"]
          teacher_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          language_code?: string
          language_name?: string
          level?: Database["public"]["Enums"]["language_level"]
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_languages_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_permissions: {
        Row: {
          created_at: string
          granted_by: string | null
          has_teaching_permission: boolean
          has_volunteer_permission: boolean
          id: string
          teacher_id: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          granted_by?: string | null
          has_teaching_permission?: boolean
          has_volunteer_permission?: boolean
          id?: string
          teacher_id: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          granted_by?: string | null
          has_teaching_permission?: boolean
          has_volunteer_permission?: boolean
          id?: string
          teacher_id?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "teacher_permissions_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: true
            referencedRelation: "authorized_teachers"
            referencedColumns: ["teacher_id"]
          },
        ]
      }
      teacher_portfolio_items: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          download_count: number | null
          file_name: string | null
          file_size: number | null
          file_type: string | null
          file_url: string | null
          id: string
          is_featured: boolean | null
          is_public: boolean | null
          item_type: string
          link_url: string | null
          metadata: Json | null
          title: string
          updated_at: string
          user_id: string
          view_count: number | null
          youtube_id: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          item_type: string
          link_url?: string | null
          metadata?: Json | null
          title: string
          updated_at?: string
          user_id: string
          view_count?: number | null
          youtube_id?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          download_count?: number | null
          file_name?: string | null
          file_size?: number | null
          file_type?: string | null
          file_url?: string | null
          id?: string
          is_featured?: boolean | null
          is_public?: boolean | null
          item_type?: string
          link_url?: string | null
          metadata?: Json | null
          title?: string
          updated_at?: string
          user_id?: string
          view_count?: number | null
          youtube_id?: string | null
        }
        Relationships: []
      }
      teacher_subject_specializations: {
        Row: {
          created_at: string | null
          education_levels:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id: string
          subject_id: string | null
          teacher_id: string | null
          years_of_experience: number | null
        }
        Insert: {
          created_at?: string | null
          education_levels?:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id?: string
          subject_id?: string | null
          teacher_id?: string | null
          years_of_experience?: number | null
        }
        Update: {
          created_at?: string | null
          education_levels?:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id?: string
          subject_id?: string | null
          teacher_id?: string | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_subject_specializations_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "education_subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_subject_specializations_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "education_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_subjects: {
        Row: {
          created_at: string | null
          education_levels:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id: string
          subject_id: string | null
          teacher_id: string | null
          years_of_experience: number | null
        }
        Insert: {
          created_at?: string | null
          education_levels?:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id?: string
          subject_id?: string | null
          teacher_id?: string | null
          years_of_experience?: number | null
        }
        Update: {
          created_at?: string | null
          education_levels?:
            | Database["public"]["Enums"]["education_level"][]
            | null
          id?: string
          subject_id?: string | null
          teacher_id?: string | null
          years_of_experience?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_subjects_subject_id_fkey"
            columns: ["subject_id"]
            isOneToOne: false
            referencedRelation: "subjects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teacher_subjects_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_training_courses: {
        Row: {
          certificate_url: string | null
          completion_date: string | null
          course_name: string
          created_at: string | null
          duration_hours: number | null
          id: string
          organization: string
          teacher_id: string | null
        }
        Insert: {
          certificate_url?: string | null
          completion_date?: string | null
          course_name: string
          created_at?: string | null
          duration_hours?: number | null
          id?: string
          organization: string
          teacher_id?: string | null
        }
        Update: {
          certificate_url?: string | null
          completion_date?: string | null
          course_name?: string
          created_at?: string | null
          duration_hours?: number | null
          id?: string
          organization?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_training_courses_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "education_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_uploaded_files: {
        Row: {
          description: string | null
          file_name: string
          file_size: number | null
          file_type: Database["public"]["Enums"]["teacher_file_type"]
          file_url: string
          id: string
          mime_type: string | null
          teacher_id: string | null
          uploaded_at: string | null
        }
        Insert: {
          description?: string | null
          file_name: string
          file_size?: number | null
          file_type: Database["public"]["Enums"]["teacher_file_type"]
          file_url: string
          id?: string
          mime_type?: string | null
          teacher_id?: string | null
          uploaded_at?: string | null
        }
        Update: {
          description?: string | null
          file_name?: string
          file_size?: number | null
          file_type?: Database["public"]["Enums"]["teacher_file_type"]
          file_url?: string
          id?: string
          mime_type?: string | null
          teacher_id?: string | null
          uploaded_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_uploaded_files_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "education_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teacher_work_experience: {
        Row: {
          achievements: string | null
          created_at: string | null
          education_level: Database["public"]["Enums"]["education_level"]
          end_date: string | null
          id: string
          is_current: boolean | null
          organization_name: string
          position: string
          start_date: string
          subject: string
          teacher_id: string | null
        }
        Insert: {
          achievements?: string | null
          created_at?: string | null
          education_level: Database["public"]["Enums"]["education_level"]
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          organization_name: string
          position: string
          start_date: string
          subject: string
          teacher_id?: string | null
        }
        Update: {
          achievements?: string | null
          created_at?: string | null
          education_level?: Database["public"]["Enums"]["education_level"]
          end_date?: string | null
          id?: string
          is_current?: boolean | null
          organization_name?: string
          position?: string
          start_date?: string
          subject?: string
          teacher_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "teacher_work_experience_teacher_id_fkey"
            columns: ["teacher_id"]
            isOneToOne: false
            referencedRelation: "education_teachers"
            referencedColumns: ["id"]
          },
        ]
      }
      teachers: {
        Row: {
          bio: string | null
          created_at: string | null
          current_city_id: string | null
          current_country_id: string | null
          date_of_birth: string | null
          earliest_start_date: string | null
          expected_salary_max: number | null
          expected_salary_min: number | null
          gender: Database["public"]["Enums"]["gender"] | null
          id: string
          in_saudi_arabia: boolean | null
          license_level: string | null
          license_number: string | null
          nationality_country_id: string | null
          profile_completion_percentage: number | null
          show_email_public: boolean | null
          show_phone_public: boolean | null
          updated_at: string | null
          user_id: string | null
          willing_to_relocate: boolean | null
        }
        Insert: {
          bio?: string | null
          created_at?: string | null
          current_city_id?: string | null
          current_country_id?: string | null
          date_of_birth?: string | null
          earliest_start_date?: string | null
          expected_salary_max?: number | null
          expected_salary_min?: number | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          in_saudi_arabia?: boolean | null
          license_level?: string | null
          license_number?: string | null
          nationality_country_id?: string | null
          profile_completion_percentage?: number | null
          show_email_public?: boolean | null
          show_phone_public?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          willing_to_relocate?: boolean | null
        }
        Update: {
          bio?: string | null
          created_at?: string | null
          current_city_id?: string | null
          current_country_id?: string | null
          date_of_birth?: string | null
          earliest_start_date?: string | null
          expected_salary_max?: number | null
          expected_salary_min?: number | null
          gender?: Database["public"]["Enums"]["gender"] | null
          id?: string
          in_saudi_arabia?: boolean | null
          license_level?: string | null
          license_number?: string | null
          nationality_country_id?: string | null
          profile_completion_percentage?: number | null
          show_email_public?: boolean | null
          show_phone_public?: boolean | null
          updated_at?: string | null
          user_id?: string | null
          willing_to_relocate?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "teachers_current_city_id_fkey"
            columns: ["current_city_id"]
            isOneToOne: false
            referencedRelation: "cities"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teachers_current_country_id_fkey"
            columns: ["current_country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teachers_nationality_country_id_fkey"
            columns: ["nationality_country_id"]
            isOneToOne: false
            referencedRelation: "countries"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "teachers_user_id_fkey"
            columns: ["user_id"]
            isOneToOne: true
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
        ]
      }
      testimonials: {
        Row: {
          author_name: string | null
          author_title: string | null
          content: string
          created_at: string | null
          display_order: number | null
          homepage_priority: number | null
          id: string
          is_active: boolean | null
          is_approved: boolean | null
          updated_at: string | null
        }
        Insert: {
          author_name?: string | null
          author_title?: string | null
          content: string
          created_at?: string | null
          display_order?: number | null
          homepage_priority?: number | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          updated_at?: string | null
        }
        Update: {
          author_name?: string | null
          author_title?: string | null
          content?: string
          created_at?: string | null
          display_order?: number | null
          homepage_priority?: number | null
          id?: string
          is_active?: boolean | null
          is_approved?: boolean | null
          updated_at?: string | null
        }
        Relationships: []
      }
      text_enrichments: {
        Row: {
          content: string
          created_at: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          title: string
          updated_at: string | null
        }
        Insert: {
          content: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title: string
          updated_at?: string | null
        }
        Update: {
          content?: string
          created_at?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      tools: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          id: number
          image_url: string | null
          is_active: boolean | null
          name: string
          updated_at: string | null
          url: string
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name: string
          updated_at?: string | null
          url: string
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          id?: number
          image_url?: string | null
          is_active?: boolean | null
          name?: string
          updated_at?: string | null
          url?: string
        }
        Relationships: []
      }
      training_files: {
        Row: {
          category: string | null
          created_at: string | null
          description: string
          display_order: number | null
          file_size: string | null
          file_type: string | null
          file_url: string
          id: number
          is_active: boolean | null
          is_uploaded: boolean | null
          name: string
          updated_at: string | null
          upload_date: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          description: string
          display_order?: number | null
          file_size?: string | null
          file_type?: string | null
          file_url: string
          id?: number
          is_active?: boolean | null
          is_uploaded?: boolean | null
          name: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          description?: string
          display_order?: number | null
          file_size?: string | null
          file_type?: string | null
          file_url?: string
          id?: number
          is_active?: boolean | null
          is_uploaded?: boolean | null
          name?: string
          updated_at?: string | null
          upload_date?: string | null
        }
        Relationships: []
      }
      user_module_progress: {
        Row: {
          completion_date: string | null
          created_at: string
          id: string
          is_completed: boolean | null
          module_id: string
          progress_percentage: number | null
          updated_at: string
          user_session_id: string
        }
        Insert: {
          completion_date?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          module_id: string
          progress_percentage?: number | null
          updated_at?: string
          user_session_id: string
        }
        Update: {
          completion_date?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          module_id?: string
          progress_percentage?: number | null
          updated_at?: string
          user_session_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_module_progress_module_id_fkey"
            columns: ["module_id"]
            isOneToOne: false
            referencedRelation: "course_modules"
            referencedColumns: ["id"]
          },
        ]
      }
      user_permissions: {
        Row: {
          expires_at: string | null
          granted_at: string
          granted_by: string | null
          id: string
          is_active: boolean
          notes: string | null
          permission_key: Database["public"]["Enums"]["permission_type"]
          user_id: string
        }
        Insert: {
          expires_at?: string | null
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          permission_key: Database["public"]["Enums"]["permission_type"]
          user_id: string
        }
        Update: {
          expires_at?: string | null
          granted_at?: string
          granted_by?: string | null
          id?: string
          is_active?: boolean
          notes?: string | null
          permission_key?: Database["public"]["Enums"]["permission_type"]
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      video_content: {
        Row: {
          created_at: string | null
          description: string
          display_order: number | null
          id: number
          is_active: boolean | null
          title: string
          updated_at: string | null
          video_url: string
        }
        Insert: {
          created_at?: string | null
          description: string
          display_order?: number | null
          id?: number
          is_active?: boolean | null
          title: string
          updated_at?: string | null
          video_url: string
        }
        Update: {
          created_at?: string | null
          description?: string
          display_order?: number | null
          id?: number
          is_active?: boolean | null
          title?: string
          updated_at?: string | null
          video_url?: string
        }
        Relationships: []
      }
      visit_evaluations: {
        Row: {
          created_at: string
          criterion_key: string
          criterion_label: string
          evaluation_level: string | null
          id: string
          visit_id: string
        }
        Insert: {
          created_at?: string
          criterion_key: string
          criterion_label: string
          evaluation_level?: string | null
          id?: string
          visit_id: string
        }
        Update: {
          created_at?: string
          criterion_key?: string
          criterion_label?: string
          evaluation_level?: string | null
          id?: string
          visit_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "visit_evaluations_visit_id_fkey"
            columns: ["visit_id"]
            isOneToOne: false
            referencedRelation: "visits"
            referencedColumns: ["id"]
          },
        ]
      }
      visits: {
        Row: {
          agent_id: string | null
          counselor_id: string | null
          created_at: string
          id: string
          is_completed: boolean | null
          notes: string | null
          percentage: number | null
          teacher_id: string | null
          total_points: number | null
          total_score: number | null
          updated_at: string
          visit_date: string
          visit_type: string
          visitor_name: string
        }
        Insert: {
          agent_id?: string | null
          counselor_id?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          percentage?: number | null
          teacher_id?: string | null
          total_points?: number | null
          total_score?: number | null
          updated_at?: string
          visit_date?: string
          visit_type?: string
          visitor_name?: string
        }
        Update: {
          agent_id?: string | null
          counselor_id?: string | null
          created_at?: string
          id?: string
          is_completed?: boolean | null
          notes?: string | null
          percentage?: number | null
          teacher_id?: string | null
          total_points?: number | null
          total_score?: number | null
          updated_at?: string
          visit_date?: string
          visit_type?: string
          visitor_name?: string
        }
        Relationships: [
          {
            foreignKeyName: "visits_agent_id_fkey"
            columns: ["agent_id"]
            isOneToOne: false
            referencedRelation: "agents"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "visits_counselor_id_fkey"
            columns: ["counselor_id"]
            isOneToOne: false
            referencedRelation: "counselors"
            referencedColumns: ["id"]
          },
        ]
      }
      volunteer_hours: {
        Row: {
          created_at: string
          hours_added: number
          id: string
          notes: string | null
          student_number: string
          term_code: string
          total_hours: number
          updated_at: string
          week_date: string
          week_number: number
        }
        Insert: {
          created_at?: string
          hours_added?: number
          id?: string
          notes?: string | null
          student_number: string
          term_code?: string
          total_hours?: number
          updated_at?: string
          week_date?: string
          week_number: number
        }
        Update: {
          created_at?: string
          hours_added?: number
          id?: string
          notes?: string | null
          student_number?: string
          term_code?: string
          total_hours?: number
          updated_at?: string
          week_date?: string
          week_number?: number
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      can_access_site_users: { Args: never; Returns: boolean }
      generate_letter_ref_no: { Args: { letter_date: string }; Returns: string }
      get_current_attendance_role: {
        Args: never
        Returns: Database["public"]["Enums"]["attendance_user_role"]
      }
      get_current_user_id: { Args: never; Returns: string }
      get_current_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role"]
      }
      get_education_user_role: {
        Args: never
        Returns: Database["public"]["Enums"]["user_role_education"]
      }
      get_student_total_dislikes: {
        Args: { p_student_number: string }
        Returns: number
      }
      get_student_total_likes: {
        Args: { p_student_number: string }
        Returns: number
      }
      get_teacher_daily_dislikes: {
        Args: { p_student_number: string; p_teacher_id: string }
        Returns: number
      }
      get_teacher_daily_likes: {
        Args: { p_student_number: string; p_teacher_id: string }
        Returns: number
      }
      get_user_permissions: {
        Args: { _user_id: string }
        Returns: {
          description: string
          display_name: string
          permission_key: Database["public"]["Enums"]["permission_type"]
        }[]
      }
      has_permission: {
        Args: {
          _permission: Database["public"]["Enums"]["permission_type"]
          _user_id: string
        }
        Returns: boolean
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_education_organization_member: {
        Args: { org_id: string }
        Returns: boolean
      }
      is_email_allowed: { Args: { p_email: string }; Returns: boolean }
      is_user_approved: { Args: { user_id: string }; Returns: boolean }
      reorder_training_files: {
        Args: { file_id: number; new_order: number }
        Returns: undefined
      }
      verify_site_user_credentials: {
        Args: { p_password: string; p_username: string }
        Returns: {
          full_name: string
          success: boolean
          user_id: string
          user_role: string
          username: string
        }[]
      }
      verify_site_user_login: {
        Args: { p_password: string; p_username: string }
        Returns: {
          full_name: string
          is_active: boolean
          user_id: string
          user_role: string
          username: string
        }[]
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      attendance_status: "PRESENT" | "LATE" | "ABSENT"
      attendance_user_role: "ADMIN" | "REGISTRAR" | "SUPERVISOR" | "VIEWER"
      degree_type: "bachelors" | "masters" | "phd"
      education_level:
        | "early_childhood"
        | "primary"
        | "middle"
        | "secondary"
        | "university"
      file_type: "cv_pdf" | "image" | "video" | "document"
      gender: "male" | "female"
      gender_type: "male" | "female"
      language_level: "A1" | "A2" | "B1" | "B2" | "C1" | "C2"
      letter_status: "DRAFT" | "ISSUED" | "SIGNED"
      letter_type: "ABSENT" | "LATE"
      organization_type:
        | "school_public"
        | "school_private"
        | "school_international"
        | "university_public"
        | "university_private"
      permission_type:
        | "volunteer_access"
        | "volunteer_edit"
        | "volunteer_delete"
        | "student_view_limited"
        | "student_view_full"
        | "reports_access"
        | "admin_panel_access"
        | "leaderboard_edit"
        | "data_upload_access"
        | "site_management"
        | "user_management"
        | "permission_management"
        | "system_settings"
        | "site_content_management"
        | "student_view"
        | "student_edit"
        | "student_delete"
        | "student_scores_manage"
        | "student_attendance_manage"
        | "student_behavior_manage"
        | "student_notes_manage"
        | "volunteer_view"
        | "volunteer_reports"
        | "volunteer_activities_manage"
        | "leaderboard_view"
        | "leaderboard_reset"
        | "content_sermons_manage"
        | "content_lessons_manage"
        | "content_media_manage"
        | "content_tools_manage"
        | "reports_view"
        | "reports_generate"
        | "reports_export"
        | "data_upload"
        | "data_export"
        | "data_backup"
      teacher_file_type: "cv_pdf" | "image" | "video" | "document"
      user_role:
        | "teacher"
        | "organization_admin"
        | "organization_recruiter"
        | "super_admin"
      user_role_education:
        | "teacher"
        | "organization_admin"
        | "organization_recruiter"
        | "super_admin"
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
      app_role: ["admin", "moderator", "user"],
      attendance_status: ["PRESENT", "LATE", "ABSENT"],
      attendance_user_role: ["ADMIN", "REGISTRAR", "SUPERVISOR", "VIEWER"],
      degree_type: ["bachelors", "masters", "phd"],
      education_level: [
        "early_childhood",
        "primary",
        "middle",
        "secondary",
        "university",
      ],
      file_type: ["cv_pdf", "image", "video", "document"],
      gender: ["male", "female"],
      gender_type: ["male", "female"],
      language_level: ["A1", "A2", "B1", "B2", "C1", "C2"],
      letter_status: ["DRAFT", "ISSUED", "SIGNED"],
      letter_type: ["ABSENT", "LATE"],
      organization_type: [
        "school_public",
        "school_private",
        "school_international",
        "university_public",
        "university_private",
      ],
      permission_type: [
        "volunteer_access",
        "volunteer_edit",
        "volunteer_delete",
        "student_view_limited",
        "student_view_full",
        "reports_access",
        "admin_panel_access",
        "leaderboard_edit",
        "data_upload_access",
        "site_management",
        "user_management",
        "permission_management",
        "system_settings",
        "site_content_management",
        "student_view",
        "student_edit",
        "student_delete",
        "student_scores_manage",
        "student_attendance_manage",
        "student_behavior_manage",
        "student_notes_manage",
        "volunteer_view",
        "volunteer_reports",
        "volunteer_activities_manage",
        "leaderboard_view",
        "leaderboard_reset",
        "content_sermons_manage",
        "content_lessons_manage",
        "content_media_manage",
        "content_tools_manage",
        "reports_view",
        "reports_generate",
        "reports_export",
        "data_upload",
        "data_export",
        "data_backup",
      ],
      teacher_file_type: ["cv_pdf", "image", "video", "document"],
      user_role: [
        "teacher",
        "organization_admin",
        "organization_recruiter",
        "super_admin",
      ],
      user_role_education: [
        "teacher",
        "organization_admin",
        "organization_recruiter",
        "super_admin",
      ],
    },
  },
} as const
