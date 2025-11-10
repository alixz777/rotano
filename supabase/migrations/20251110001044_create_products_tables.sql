/*
  # Create products and orders tables for Rotano shop
  
  1. New Tables
    - `products`
      - `id` (uuid, primary key)
      - `name` (text) - product name
      - `slug` (text, unique) - URL-friendly identifier
      - `description` (text) - product description
      - `price` (numeric) - price per unit
      - `price_unit` (text) - unit of measurement (бухта, кг, etc.)
      - `image_url` (text) - main product image
      - `category` (text) - product category
      - `is_bestseller` (boolean) - bestseller flag
      - `is_new` (boolean) - new product flag
      - `in_stock` (boolean) - availability status
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `product_images`
      - `id` (uuid, primary key)
      - `product_id` (uuid, foreign key to products)
      - `image_url` (text) - additional product image
      - `order` (integer) - display order
      - `created_at` (timestamp)
    
    - `orders`
      - `id` (uuid, primary key)
      - `customer_name` (text)
      - `customer_email` (text)
      - `customer_phone` (text)
      - `delivery_method` (text) - delivery company/method
      - `payment_method` (text) - payment method
      - `delivery_address` (text) - delivery address/pickup point
      - `total_amount` (numeric) - total order amount
      - `discount_amount` (numeric) - discount applied
      - `status` (text) - order status (pending, confirmed, shipped, delivered, cancelled)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `order_items`
      - `id` (uuid, primary key)
      - `order_id` (uuid, foreign key to orders)
      - `product_id` (uuid, foreign key to products)
      - `quantity` (integer) - quantity ordered
      - `price` (numeric) - price at the time of order
      - `created_at` (timestamp)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for public read access to products
    - Add policies for creating orders (no auth required for public shop)
    - Restrict order viewing to authenticated users only
*/

-- Create products table
CREATE TABLE IF NOT EXISTS products (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text DEFAULT '',
  price numeric NOT NULL DEFAULT 0,
  price_unit text DEFAULT 'бухта',
  image_url text,
  category text,
  is_bestseller boolean DEFAULT false,
  is_new boolean DEFAULT false,
  in_stock boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create product_images table
CREATE TABLE IF NOT EXISTS product_images (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id uuid NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  image_url text NOT NULL,
  "order" integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Create orders table
CREATE TABLE IF NOT EXISTS orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  customer_name text NOT NULL,
  customer_email text NOT NULL,
  customer_phone text NOT NULL,
  delivery_method text NOT NULL,
  payment_method text NOT NULL,
  delivery_address text,
  total_amount numeric NOT NULL DEFAULT 0,
  discount_amount numeric DEFAULT 0,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create order_items table
CREATE TABLE IF NOT EXISTS order_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id uuid NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id uuid NOT NULL REFERENCES products(id),
  quantity integer NOT NULL DEFAULT 1,
  price numeric NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- Products policies (public read access)
CREATE POLICY "Anyone can view products"
  ON products FOR SELECT
  USING (true);

CREATE POLICY "Anyone can view product images"
  ON product_images FOR SELECT
  USING (true);

-- Orders policies (anyone can create, only auth users can view)
CREATE POLICY "Anyone can create orders"
  ON orders FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all orders"
  ON orders FOR SELECT
  TO authenticated
  USING (true);

-- Order items policies
CREATE POLICY "Anyone can create order items"
  ON order_items FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all order items"
  ON order_items FOR SELECT
  TO authenticated
  USING (true);

-- Insert sample products
INSERT INTO products (name, slug, description, price, price_unit, image_url, category, is_bestseller, is_new, in_stock) VALUES
  ('Ротанг полутрубка ПТГ 24/02Т', 'rotang-polutrubka-ptg-24-02t', 'Искусственный ротанг полутрубка высокого качества', 2000, 'бухта', '/img/img2.jpg', 'Ротанг полутрубка', true, true, true),
  ('Ротанг лента РЛ 30/07Т', 'rotang-lenta-rl-30-07t', 'Искусственный ротанг лента для плетения мебели', 2000, 'бухта', '/img/img3.jpg', 'Ротанг лента', false, false, true),
  ('Ротанг полумесяц ПМ 20/05Т', 'rotang-polumesyac-pm-20-05t', 'Искусственный ротанг полумесяц', 2000, 'бухта', '/img/img4.jpg', 'Ротанг полумесяц', true, true, true),
  ('Ротанг пруток ПР 15/03Т', 'rotang-prutok-pr-15-03t', 'Искусственный ротанг пруток круглого сечения', 2000, 'бухта', '/img/img5.jpg', 'Ротанг пруток', false, false, true),
  ('Сварочный пруток для полимеров', 'svarochnyj-prutok-dlya-polimerov', 'Сварочный пруток для соединения изделий из полимеров', 1500, 'кг', '/img/img6.jpg', 'Комплектующие', false, false, true),
  ('Ротанг полутрубка ПТГ 28/03Т', 'rotang-polutrubka-ptg-28-03t', 'Искусственный ротанг полутрубка увеличенного сечения', 2200, 'бухта', '/img/img7.jpg', 'Ротанг полутрубка', true, false, true),
  ('Ротанг лента РЛ 35/08Т', 'rotang-lenta-rl-35-08t', 'Искусственный ротанг лента широкая', 2300, 'бухта', '/img/img8.jpg', 'Ротанг лента', false, true, true),
  ('Ротанг полумесяц ПМ 25/06Т', 'rotang-polumesyac-pm-25-06t', 'Искусственный ротанг полумесяц увеличенного размера', 2100, 'бухта', '/img/img9.jpg', 'Ротанг полумесяц', false, false, true),
  ('Ротанг пруток ПР 20/04Т', 'rotang-prutok-pr-20-04t', 'Искусственный ротанг пруток увеличенного диаметра', 2100, 'бухта', '/img/img10.jpg', 'Ротанг пруток', true, true, true),
  ('Ротанг полутрубка ПТГ 22/02Т', 'rotang-polutrubka-ptg-22-02t', 'Искусственный ротанг полутрубка компактного размера', 1900, 'бухта', '/img/img11.jpg', 'Ротанг полутрубка', false, false, true),
  ('Ротанг лента РЛ 25/06Т', 'rotang-lenta-rl-25-06t', 'Искусственный ротанг лента средней ширины', 2000, 'бухта', '/img/img12.jpg', 'Ротанг лента', false, false, true);
