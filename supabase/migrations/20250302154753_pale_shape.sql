/*
  # Create data brokers table

  1. New Tables
    - `data_brokers`
      - `id` (text, primary key)
      - `name` (text, not null)
      - `category` (text)
      - `removal_process` (text, 'email', 'form', or 'api')
      - `removal_email` (text)
      - `removal_url` (text)
      - `removal_template` (text)
      - `difficulty` (text, 'Easy', 'Medium', or 'Hard')
      - `estimated_time` (int, days to complete)
      - `created_at` (timestamptz, default now())
  2. Security
    - Enable RLS on `data_brokers` table
    - Add policy for all users to read data brokers
*/

CREATE TABLE IF NOT EXISTS data_brokers (
  id text PRIMARY KEY,
  name text NOT NULL,
  category text,
  removal_process text CHECK (removal_process IN ('email', 'form', 'api')),
  removal_email text,
  removal_url text,
  removal_template text,
  difficulty text CHECK (difficulty IN ('Easy', 'Medium', 'Hard')),
  estimated_time int,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE data_brokers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can read data brokers"
  ON data_brokers
  FOR SELECT
  TO anon, authenticated
  USING (true);

-- Insert initial data brokers
INSERT INTO data_brokers (id, name, category, removal_process, removal_email, removal_url, removal_template, difficulty, estimated_time)
VALUES
  ('1', 'Acxiom', 'Data Broker', 'email', 'optout@acxiom.com', NULL, 'I request the removal of my personal information from your database pursuant to CCPA/GDPR regulations. My information includes: {name}, {email}, {address}, {phone}.', 'Medium', 14),
  ('2', 'Experian', 'Credit Bureau', 'form', NULL, 'https://www.experian.com/privacy/opting-out', NULL, 'Hard', 30),
  ('3', 'Spokeo', 'People Search', 'email', 'privacy@spokeo.com', NULL, 'Please remove my information from your database. My information includes: {name}, {email}, {address}. This is a formal opt-out request.', 'Easy', 7),
  ('4', 'Whitepages', 'People Search', 'form', NULL, 'https://www.whitepages.com/suppression-requests', NULL, 'Easy', 7),
  ('5', 'Intelius', 'People Search', 'email', 'privacy@intelius.com', NULL, 'I am requesting the removal of my personal information from your database. My information includes: {name}, {email}, {address}, {phone}.', 'Medium', 14),
  ('6', 'BeenVerified', 'Background Check', 'form', NULL, 'https://www.beenverified.com/app/optout/search', NULL, 'Easy', 7),
  ('7', 'PeopleFinders', 'People Search', 'form', NULL, 'https://www.peoplefinders.com/opt-out', NULL, 'Easy', 7),
  ('8', 'Equifax', 'Credit Bureau', 'form', NULL, 'https://www.equifax.com/personal/credit-report-services/opt-out-of-marketing/', NULL, 'Hard', 30),
  ('9', 'TransUnion', 'Credit Bureau', 'form', NULL, 'https://www.transunion.com/optout-request', NULL, 'Hard', 30),
  ('10', 'LexisNexis', 'Data Broker', 'form', NULL, 'https://consumer.risk.lexisnexis.com/request', NULL, 'Hard', 45),
  ('11', 'Epsilon', 'Marketing', 'email', 'optout@epsilon.com', NULL, 'I am requesting to opt out of Epsilon''s marketing database. My information includes: {name}, {email}, {address}, {phone}.', 'Medium', 21),
  ('12', 'Oracle Data Cloud', 'Marketing', 'form', NULL, 'https://datacloudoptout.oracle.com/optout', NULL, 'Medium', 21),
  ('13', 'Truthfinder', 'People Search', 'form', NULL, 'https://www.truthfinder.com/opt-out/', NULL, 'Easy', 7),
  ('14', 'USSearch', 'People Search', 'form', NULL, 'https://www.ussearch.com/opt-out/submit/', NULL, 'Easy', 7),
  ('15', 'ZoomInfo', 'Business Data', 'form', NULL, 'https://www.zoominfo.com/about-zoominfo/privacy-policy#privacy-center', NULL, 'Medium', 14),
  ('16', 'Radaris', 'People Search', 'form', NULL, 'https://radaris.com/control/privacy', NULL, 'Easy', 7),
  ('17', 'PeopleSmart', 'People Search', 'form', NULL, 'https://www.peoplesmart.com/optout-go', NULL, 'Easy', 7),
  ('18', 'Instant Checkmate', 'Background Check', 'form', NULL, 'https://www.instantcheckmate.com/opt-out/', NULL, 'Easy', 7),
  ('19', 'MyLife', 'Reputation', 'form', NULL, 'https://www.mylife.com/privacy-policy', NULL, 'Medium', 14),
  ('20', 'InfoTracer', 'Background Check', 'form', NULL, 'https://infotracer.com/optout/', NULL, 'Easy', 7);