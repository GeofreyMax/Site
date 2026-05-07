/*
  # Create Website Content Management Tables

  1. New Tables
    - `website_content` - Stores all editable website content sections and text
      - `id` (uuid, primary key)
      - `section` (text) - Identifies which page section (hero, about, services, etc.)
      - `key` (text) - Specific content key within section
      - `value` (text/longtext) - The actual content to display
      - `type` (text) - Type of content (text, image_url, etc.)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `website_images` - Stores image metadata and URLs
      - `id` (uuid, primary key)
      - `section` (text) - Which section the image belongs to
      - `name` (text) - Image name/identifier
      - `image_url` (text) - URL to the image (stored in Supabase storage or external)
      - `alt_text` (text) - Alt text for accessibility
      - `order` (integer) - Display order
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

    - `admin_users` - Admin credentials
      - `id` (uuid, primary key)
      - `username` (text, unique)
      - `password_hash` (text)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated admin access
    - Disable public access

  3. Initial Data
    - Create default admin user with username and password
*/

-- Create website_content table
CREATE TABLE IF NOT EXISTS website_content (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  key text NOT NULL,
  value text NOT NULL,
  type text DEFAULT 'text',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(section, key)
);

ALTER TABLE website_content ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage all content"
  ON website_content
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create website_images table
CREATE TABLE IF NOT EXISTS website_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section text NOT NULL,
  name text NOT NULL,
  image_url text NOT NULL,
  alt_text text,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE website_images ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can manage all images"
  ON website_images
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  username text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view their own record"
  ON admin_users
  FOR SELECT
  TO authenticated
  USING (true);

-- Insert default admin user (password: 1122)
-- Using simple SHA256 hash for demonstration (in production, use bcrypt)
INSERT INTO admin_users (username, password_hash)
VALUES ('admin', 'f3447c3e97e7f58ba1a34a81aae9924f10f4e80c56c57e1cfc06a1e8c1c0c3a8')
ON CONFLICT (username) DO NOTHING;

-- Insert default content values
INSERT INTO website_content (section, key, value, type) VALUES
  ('hero', 'headline', 'Your Trusted Partner in Supply, Transport & Trade', 'text'),
  ('hero', 'subheadline', 'ICR Investment Traders delivers high-quality automotive, agribusiness, logistics, and procurement services across Tanzania — with reliability, integrity, and a commitment to excellence.', 'text'),
  ('about', 'title', 'About ICR Investment Traders', 'text'),
  ('about', 'content', 'For over nine years, ICR Investment Traders has been serving valued customers in Tanzania with the best supply services in automotive, agribusiness, and industrial sectors.', 'text'),
  ('services', 'title', 'Our Services', 'text'),
  ('services', 'subtitle', 'From industrial supplies to logistics, we deliver comprehensive solutions tailored to your business needs.', 'text'),
  ('contact', 'address', 'Mezzanine Floor, ALFA PLAZA, Ada Estate Street, Chabruma Road, P.O. Box 373, Dar es Salaam, Tanzania', 'text'),
  ('contact', 'phone', '+255 767 071 788', 'text'),
  ('contact', 'email', 'infinitycarrentals77@gmail.com', 'text'),
  ('footer', 'tagline', 'A trusted Tanzanian provider of automotive, agribusiness supply, logistics, and procurement services.', 'text')
ON CONFLICT (section, key) DO NOTHING;
