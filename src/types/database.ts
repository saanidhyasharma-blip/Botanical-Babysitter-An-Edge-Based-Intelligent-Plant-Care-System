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
      devices: {
        Row: {
          id: string
          user_id: string | null
          device_name: string
          device_uid: string
          firmware_version: string | null
          status: 'online' | 'offline' | null
          last_seen: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id?: string | null
          device_name?: string
          device_uid: string
          firmware_version?: string | null
          status?: 'online' | 'offline' | null
          last_seen?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string | null
          device_name?: string
          device_uid?: string
          firmware_version?: string | null
          status?: 'online' | 'offline' | null
          last_seen?: string | null
          created_at?: string | null
        }
      }
      sensor_readings: {
        Row: {
          id: number
          device_id: string | null
          temperature: number | null
          humidity: number | null
          moisture: number | null
          pump_status: boolean | null
          mode: 'auto' | 'manual' | null
          created_at: string | null
        }
        Insert: {
          id?: number
          device_id?: string | null
          temperature?: number | null
          humidity?: number | null
          moisture?: number | null
          pump_status?: boolean | null
          mode?: 'auto' | 'manual' | null
          created_at?: string | null
        }
        Update: {
          id?: number
          device_id?: string | null
          temperature?: number | null
          humidity?: number | null
          moisture?: number | null
          pump_status?: boolean | null
          mode?: 'auto' | 'manual' | null
          created_at?: string | null
        }
      }
    }
  }
}
