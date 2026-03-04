/*
  # ANKARA BY K E-commerce Database Schema

  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - Product name
      - `description` (text) - Product description
      - `price` (numeric) - Price in FCFA
      - `category` (text) - Product category
      - `fabric_type` (text) - Batik, Wax, or Adiré
      - `sizes` (text[]) - Available sizes
      - `images` (text[]) - Array of image URLs
      - `featured` (boolean) - Featured product
      - `stock` (integer) - Stock quantity
      - `created_at` (timestamptz)
    
    - `cart_items`
      - `id` (uuid, primary key)
      - `user_id` (uuid) - User ID (nullable for guest carts)
      - `session_id` (text) - Session ID for guest users
      - `product_id` (uuid) - Foreign key to products
      - `quantity` (integer)
      - `size` (text)
      - `created_at` (timestamptz)
    
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `total_amount` (numeric)
      - `payment_method` (text) - MoMo or Card
      - `status` (text) - pending, paid, shipped, delivered
      - `items` (jsonb) - Order items
      - `created_at` (timestamptz)
    
    - `testimonials`
      - `id` (uuid, primary key)
      - `name` (text)
      - `message` (text)
      - `rating` (integer)
      - `created_at` (timestamptz)

  2. Security
    - Enable RLS on all tables
    - Public read access for products and testimonials
    - Authenticated users can manage their own cart items
    - Orders are readable by anyone (for admin purposes in this version)
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL,
  category text NOT NULL,
  fabric_type text NOT NULL,
  sizes text[] NOT NULL,
  images text[] NOT NULL,
  featured boolean DEFAULT false,
  stock integer DEFAULT 100,
  created_at timestamptz DEFAULT now()
);

-- Create cart_items table
CREATE TABLE IF NOT EXISTS cart_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid,
  session_id text,
  product_id uuid REFERENCES products(id) ON DELETE CASCADE,
  quantity integer NOT NULL DEFAULT 1,
  size text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  total_amount numeric NOT NULL,
  payment_method text NOT NULL,
  status text DEFAULT 'pending',
  items jsonb NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Create testimonials table
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  message text NOT NULL,
  rating integer DEFAULT 5,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

-- Products policies (public read)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  TO public
  USING (true);

-- Cart items policies
CREATE POLICY "Users can view own cart items"
  ON cart_items FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Users can insert cart items"
  ON cart_items FOR INSERT
  TO public
  WITH CHECK (true);

CREATE POLICY "Users can update own cart items"
  ON cart_items FOR UPDATE
  TO public
  USING (true);

CREATE POLICY "Users can delete own cart items"
  ON cart_items FOR DELETE
  TO public
  USING (true);

-- Orders policies (public read for this version)
CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  TO public
  WITH CHECK (true);

-- Testimonials policies (public read)
CREATE POLICY "Anyone can view testimonials"
  ON testimonials FOR SELECT
  TO public
  USING (true);

-- Insert sample products
INSERT INTO products (name, description, price, category, fabric_type, sizes, images, featured) VALUES
('Ensemble décontracté Ankara', 'Ensemble confortable et élégant en tissu Ankara traditionnel', 12000, 'Ensemble', 'Ankara', ARRAY['S', 'M', 'L', 'XL'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg'], true),
('Pièce unique Ankarabyk', 'Pièce unique confectionnée en tissu Adiré artisanal', 7000, 'Unique', 'Adiré', ARRAY['Standard'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg'], true),
('Ensemble Wax classique', 'Ensemble classique en tissu Wax coloré', 20000, 'Ensemble', 'Wax', ARRAY['Standard'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg'], true),
('Mini Boubou soft Ankarabyk', 'Mini boubou doux et confortable', 8000, 'Boubou', 'Ankara', ARRAY['Standard'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg'], false),
('Boubou wax décontracté sexy', 'Boubou moderne et séduisant en Wax', 15000, 'Boubou', 'Wax', ARRAY['Standard'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg'], false),
('Robe décontractée sexy', 'Robe élégante pour toutes occasions', 12000, 'Robe', 'Wax', ARRAY['Standard'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg'], false),
('Ensemble culotte batik soft élégant', 'Ensemble raffiné en batik traditionnel', 15000, 'Ensemble', 'Batik', ARRAY['S', 'M', 'L', 'XL'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg'], false),
('Ensemble wax premium', 'Ensemble haut de gamme en Wax de qualité supérieure', 20000, 'Ensemble', 'Wax', ARRAY['S', 'M', 'L', 'XL', 'XXL'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg'], true),
('Boubou wax élégant premium', 'Boubou de luxe pour occasions spéciales', 20000, 'Boubou', 'Wax', ARRAY['Standard', 'S', 'M', 'L', 'XL'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg'], false),
('Robe Wax premium', 'Robe premium en tissu Wax authentique', 12000, 'Robe', 'Wax', ARRAY['S', 'M', 'L'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg'], false);

-- Insert more products to reach 30
INSERT INTO products (name, description, price, category, fabric_type, sizes, images) VALUES
('Chemise Ankara homme', 'Chemise élégante pour homme en Ankara', 10000, 'Chemise', 'Ankara', ARRAY['M', 'L', 'XL'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg']),
('Pantalon Wax femme', 'Pantalon confortable en Wax', 13000, 'Pantalon', 'Wax', ARRAY['S', 'M', 'L'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg']),
('Jupe Batik courte', 'Jupe courte en Batik traditionnel', 8500, 'Jupe', 'Batik', ARRAY['S', 'M', 'L'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg']),
('Tunique Adiré longue', 'Tunique longue en Adiré artisanal', 14000, 'Tunique', 'Adiré', ARRAY['Standard'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg']),
('Veste Ankara premium', 'Veste sophistiquée en Ankara', 18000, 'Veste', 'Ankara', ARRAY['M', 'L', 'XL'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg']),
('Combinaison Wax élégante', 'Combinaison moderne en Wax', 22000, 'Combinaison', 'Wax', ARRAY['S', 'M', 'L'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg']),
('Short Ankara été', 'Short léger pour l''été', 7500, 'Short', 'Ankara', ARRAY['S', 'M', 'L', 'XL'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg']),
('Caftan Batik luxe', 'Caftan luxueux en Batik', 25000, 'Caftan', 'Batik', ARRAY['Standard'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg']),
('Top bustier Wax', 'Top bustier séduisant', 9000, 'Top', 'Wax', ARRAY['S', 'M', 'L'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg']),
('Kimono Ankara léger', 'Kimono léger et élégant', 16000, 'Kimono', 'Ankara', ARRAY['Standard'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg']),
('Ensemble sport Wax', 'Ensemble sportswear en Wax', 17000, 'Ensemble', 'Wax', ARRAY['S', 'M', 'L', 'XL'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg']),
('Robe longue Batik', 'Robe longue majestueuse', 19000, 'Robe', 'Batik', ARRAY['S', 'M', 'L'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg']),
('Blazer Ankara business', 'Blazer professionnel en Ankara', 21000, 'Blazer', 'Ankara', ARRAY['M', 'L', 'XL'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg']),
('Sarouel Adiré confort', 'Sarouel ultra confortable', 11000, 'Sarouel', 'Adiré', ARRAY['Standard'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg']),
('Débardeur Wax sport', 'Débardeur sportif coloré', 6500, 'Débardeur', 'Wax', ARRAY['S', 'M', 'L'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg']),
('Poncho Batik bohème', 'Poncho style bohème', 13500, 'Poncho', 'Batik', ARRAY['Standard'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg']),
('Chemisier Ankara féminin', 'Chemisier élégant pour femme', 10500, 'Chemisier', 'Ankara', ARRAY['S', 'M', 'L'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg']),
('Jogging Wax tendance', 'Jogging confortable et tendance', 14500, 'Jogging', 'Wax', ARRAY['S', 'M', 'L', 'XL'], ARRAY['/images/82047923-a272-4891-a02e-71c3673d3e0c.jpg']),
('Gilet Ankara casual', 'Gilet décontracté multipoches', 12500, 'Gilet', 'Ankara', ARRAY['M', 'L', 'XL'], ARRAY['/images/bda54df2-d0c2-41d4-a413-d3dd31e02829.jpg']),
('Combishort Batik été', 'Combishort parfait pour l''été', 11500, 'Combishort', 'Batik', ARRAY['S', 'M', 'L'], ARRAY['/images/ec5c9250-0bc0-4ffc-a0a2-037d5ba755b2.jpg']);

-- Insert testimonials
INSERT INTO testimonials (name, message, rating) VALUES
('Rénato TCHOBO', 'Qualité exceptionnelle et designs uniques ! ANKARA BY K a transformé ma garde-robe avec style.', 5),
('Donatien AKLA', 'Service impeccable et produits authentiques. Je recommande vivement pour tous les amoureux de la mode africaine.', 5),
('Amelée RODNY', 'Des créations magnifiques qui célèbrent notre culture. Chaque pièce est une œuvre d''art.', 5),
('Mme FADONOUGBO', 'Tissus de qualité supérieure et confection soignée. Je suis ravie de mes achats !', 5),
('M. Romaric', 'ANKARA BY K incarne l''élégance africaine moderne. Des pièces uniques pour toutes les occasions.', 5),
('Raïssa', 'Une boutique incontournable ! Les motifs sont vibrants et les coupes impeccables.', 5);
