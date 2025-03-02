/*
  # Create breach history table

  1. New Tables
    - `breach_history`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles.id)
      - `breach_name` (text, not null)
      - `breach_domain` (text)
      - `breach_date` (timestamptz)
      - `data_classes` (text[], array of exposed data types)
      - `description` (text)
      - `exposure_type` (text, 'surface' or 'deep')
      - `is_resolved` (boolean, default false)
      - `resolved_at` (timestamptz)
      - `created_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `breach_history` table
    - Add policy for authenticated users to read their own breach history
    - Add policy for authenticated users to update their own breach history
*/

CREATE TABLE IF NOT EXISTS breach_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  breach_name text NOT NULL,
  breach_domain text,
  breach_date timestamptz,
  data_classes text[],
  description text,
  exposure_type text CHECK (exposure_type IN ('surface', 'deep')),
  is_resolved boolean DEFAULT false,
  resolved_at timestamptz,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE breach_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own breach history"
  ON breach_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can update own breach history"
  ON breach_history
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own breach history"
  ON breach_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);