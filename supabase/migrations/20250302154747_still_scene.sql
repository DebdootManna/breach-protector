/*
  # Create removal requests table

  1. New Tables
    - `removal_requests`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, references profiles.id)
      - `broker_id` (text, not null)
      - `broker_name` (text, not null)
      - `status` (text, check constraint for valid statuses)
      - `request_date` (timestamptz, default now())
      - `completion_date` (timestamptz)
      - `data_types` (text[], array of data types being removed)
      - `request_content` (text, the content of the removal request)
      - `notes` (text)
  2. Security
    - Enable RLS on `removal_requests` table
    - Add policy for authenticated users to read their own removal requests
    - Add policy for authenticated users to update their own removal requests
*/

CREATE TABLE IF NOT EXISTS removal_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  broker_id text NOT NULL,
  broker_name text NOT NULL,
  status text CHECK (status IN ('pending', 'in_progress', 'completed', 'failed')) NOT NULL,
  request_date timestamptz DEFAULT now(),
  completion_date timestamptz,
  data_types text[],
  request_content text,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE removal_requests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can read own removal requests"
  ON removal_requests
  FOR SELECT
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can update own removal requests"
  ON removal_requests
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = profile_id);

CREATE POLICY "Users can insert own removal requests"
  ON removal_requests
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = profile_id);