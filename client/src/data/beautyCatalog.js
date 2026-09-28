const image = (photo, variant = 0) => `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&h=${950 + (variant % 37) * 11}&crop=entropy&sat=${(variant % 9) * 4 - 16}&sig=${variant}&q=85`;
const slugify = (value) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

export const beautyCategories = [
  { slug: 'skincare', name: 'Skincare', description: 'Daily rituals for healthy, comfortable skin.', image: image('photo-1556228578-8c89e6adf883'), subcategories: ['Face Wash', 'Cleanser', 'Toner', 'Face Serum', 'Moisturizer', 'Sunscreen', 'Face Mask', 'Scrub', 'Lip Care', 'Eye Care', 'Night Cream', 'Day Cream'] },
  { slug: 'makeup', name: 'Makeup', description: 'Color, coverage and confidence for every day.', image: image('photo-1596462502278-27bfdc403348'), subcategories: ['Lipstick', 'Lip Gloss', 'Lip Liner', 'Lip Tint', 'Liquid Lipstick', 'Foundation', 'Concealer', 'Compact Powder', 'Blush', 'Highlighter', 'Primer', 'Setting Spray', 'Kajal', 'Eyeliner', 'Mascara', 'Eyeshadow', 'Eye Pencil', 'Eyeshadow Palette'] },
  { slug: 'hair-care', name: 'Hair Care', description: 'Wash-day care and styling made considered.', image: image('photo-1527799820374-dcf8d9d4a388'), subcategories: ['Shampoo', 'Conditioner', 'Hair Oil', 'Hair Serum', 'Hair Mask', 'Hair Spa', 'Hair Styling', 'Hair Color'] },
  { slug: 'fragrance', name: 'Fragrance', description: 'Find a signature scent, from light mist to oud.', image: image('photo-1594035910387-fea47794261f'), subcategories: ['Perfumes', 'Body Mist', 'Deodorants', 'Attar', 'Gift Sets'] },
  { slug: 'bath-body', name: 'Bath & Body', description: 'Small everyday luxuries for head-to-toe care.', image: image('photo-1608248543803-ba4f8c70ae0b'), subcategories: ['Body Wash', 'Body Lotion', 'Body Scrub', 'Bath Soap', 'Body Butter', 'Hand Wash', 'Shower Gel'] },
  { slug: 'nail-care', name: 'Nail Care', description: 'Fresh color and tools for a neat finishing touch.', image: image('photo-1632345031435-8727f6897d53'), subcategories: ['Nail Polish', 'Nail Art', 'Nail Polish Sets', 'Nail Remover', 'Nail Care Kits', 'Nail Tools'] },
  { slug: 'beauty-tools', name: 'Beauty Tools', description: 'Useful tools for easy at-home routines.', image: image('photo-1522335789203-aabd1fc54bc9'), subcategories: ['Makeup Brushes', 'Makeup Sponges', 'Hair Brushes', 'Hair Dryer', 'Hair Straightener', 'Hair Curler', 'Facial Tools', 'Beauty Kits'] },
];

const subcategorySlug = (subcategory) => {
  if (subcategory === 'Face Serum') return 'serums';
  if (subcategory === 'Perfumes') return 'perfumes';
  return slugify(subcategory);
};

const productRows = [
  ['Skincare', 'Face Wash', 'Aloe Vera Face Wash', 249, 399, 4.7, 328, 42, 'photo-1608248543803-ba4f8c70ae0b', ['Aloe Vera', 'Gentle Cleanse']],
  ['Skincare', 'Cleanser', 'Oat Milk Daily Cleanser', 349, 499, 4.6, 214, 31, 'photo-1601049541289-9b1b7bbbfe19', ['Oat Milk', 'Fragrance Free']],
  ['Skincare', 'Toner', 'Rose Water Balancing Toner', 299, 449, 4.5, 187, 27, 'photo-1608571423902-eed4a5ad8108', ['Rose', 'Alcohol Free']],
  ['Skincare', 'Face Serum', 'Vitamin C Face Serum', 599, 899, 4.8, 642, 38, 'photo-1611930022073-b7a4ba5fcccd', ['Vitamin C', '30 ml']],
  ['Skincare', 'Face Serum', 'Hyaluronic Acid Serum', 549, 799, 4.8, 521, 26, 'photo-1620916566398-39f1143ab7be', ['Hyaluronic Acid', '30 ml']],
  ['Skincare', 'Moisturizer', 'Hydrating Daily Moisturizer', 449, 699, 4.7, 398, 36, 'photo-1556229010-6c3f2c9ca5f8', ['Ceramides', '50 ml']],
  ['Skincare', 'Sunscreen', 'Daily Shield SPF 50 Sunscreen', 499, 749, 4.6, 477, 19, 'photo-1556228720-195a672e8a03', ['SPF 50', 'No White Cast']],
  ['Skincare', 'Face Mask', 'Purifying Clay Face Mask', 379, 549, 4.5, 243, 24, 'photo-1571781926291-c477ebfd024b', ['Kaolin Clay', '75 g']],
  ['Skincare', 'Scrub', 'Rice Polish Gentle Face Scrub', 329, 499, 4.4, 156, 33, 'photo-1598440947619-2c35fc9aa908', ['Rice Extract', '75 g']],
  ['Skincare', 'Lip Care', 'Shea Butter Lip Balm', 199, 299, 4.7, 382, 60, 'photo-1608248543803-ba4f8c70ae0b', ['Shea Butter', 'Tint Free']],
  ['Skincare', 'Eye Care', 'Caffeine Under Eye Cream', 499, 749, 4.6, 293, 22, 'photo-1611930022073-b7a4ba5fcccd', ['Caffeine', '15 ml']],
  ['Skincare', 'Night Cream', 'Overnight Renewal Night Cream', 649, 999, 4.7, 204, 17, 'photo-1601049541289-9b1b7bbbfe19', ['Peptides', '50 ml']],
  ['Skincare', 'Day Cream', 'Daily Glow Day Cream', 499, 749, 4.5, 188, 20, 'photo-1620916566398-39f1143ab7be', ['Vitamin E', 'SPF 15']],
  ['Makeup', 'Lipstick', 'Velvet Matte Lipstick - Rosewood', 399, 599, 4.8, 814, 28, 'photo-1586495777744-4413f21062fa', ['Rosewood', 'Velvet Matte']],
  ['Makeup', 'Lipstick', 'Nude Satin Lipstick', 379, 549, 4.7, 526, 34, 'photo-1583241800698-e8ab01830a07', ['Warm Nude', 'Satin']],
  ['Makeup', 'Lip Gloss', 'Glass Shine Lip Gloss', 329, 499, 4.5, 263, 26, 'photo-1596462502278-27bfdc403348', ['Clear Rose', 'High Shine']],
  ['Makeup', 'Lip Liner', 'Precision Lip Liner', 249, 399, 4.4, 197, 39, 'photo-1522335789203-aabd1fc54bc9', ['Muted Mauve', 'Cream']],
  ['Makeup', 'Lip Tint', 'Water Tint Lip & Cheek', 349, 499, 4.6, 311, 32, 'photo-1599733589046-10c2112e5b37', ['Berry', 'Buildable']],
  ['Makeup', 'Liquid Lipstick', 'Stay Soft Liquid Lipstick', 429, 649, 4.7, 405, 18, 'photo-1583241800698-e8ab01830a07', ['Brick Rose', 'Transfer Resistant']],
  ['Makeup', 'Foundation', 'Second Skin Liquid Foundation', 799, 1199, 4.6, 573, 15, 'photo-1631214540242-8c9bd80aa4ba', ['Warm Beige', '30 ml']],
  ['Makeup', 'Concealer', 'Full Coverage Concealer', 499, 749, 4.5, 318, 22, 'photo-1596462502278-27bfdc403348', ['Medium Sand', 'Crease Resistant']],
  ['Makeup', 'Compact Powder', 'Soft Focus Compact Powder', 399, 599, 4.4, 207, 29, 'photo-1522335789203-aabd1fc54bc9', ['Translucent', 'Matte']],
  ['Makeup', 'Blush', 'Petal Rose Powder Blush', 449, 699, 4.8, 431, 21, 'photo-1599733589046-10c2112e5b37', ['Petal Rose', 'Silky Powder']],
  ['Makeup', 'Highlighter', 'Champagne Glow Highlighter', 549, 799, 4.7, 282, 16, 'photo-1583241800698-e8ab01830a07', ['Champagne', 'Soft Shimmer']],
  ['Makeup', 'Primer', 'Pore Smoothing Primer', 599, 899, 4.5, 246, 19, 'photo-1596462502278-27bfdc403348', ['Silicone Free', '30 ml']],
  ['Makeup', 'Setting Spray', 'All Day Setting Spray', 499, 749, 4.6, 341, 24, 'photo-1522335789203-aabd1fc54bc9', ['Dewy Finish', '100 ml']],
  ['Makeup', 'Kajal', 'Deep Black Longwear Kajal', 249, 399, 4.8, 678, 43, 'photo-1583241800698-e8ab01830a07', ['Black', 'Water Resistant']],
  ['Makeup', 'Eyeliner', 'Precision Liquid Eyeliner', 299, 449, 4.6, 453, 37, 'photo-1596462502278-27bfdc403348', ['Jet Black', 'Fine Tip']],
  ['Makeup', 'Mascara', 'Waterproof Lift Mascara', 449, 699, 4.7, 512, 25, 'photo-1522335789203-aabd1fc54bc9', ['Black', 'Volume + Lift']],
  ['Makeup', 'Eyeshadow', 'Soft Neutrals Eyeshadow Quad', 599, 899, 4.5, 199, 14, 'photo-1599733589046-10c2112e5b37', ['Four Shades', 'Blendable']],
  ['Makeup', 'Eye Pencil', 'Velvet Kohl Eye Pencil', 279, 399, 4.4, 177, 30, 'photo-1583241800698-e8ab01830a07', ['Espresso', 'Smudgeable']],
  ['Makeup', 'Eyeshadow Palette', 'Everyday Edit Eyeshadow Palette', 899, 1299, 4.8, 388, 12, 'photo-1596462502278-27bfdc403348', ['12 Shades', 'Matte + Shimmer']],
  ['Hair Care', 'Shampoo', 'Herbal Anti-Dandruff Shampoo', 349, 499, 4.6, 392, 33, 'photo-1527799820374-dcf8d9d4a388', ['Neem', '250 ml']],
  ['Hair Care', 'Shampoo', 'Gentle Herbal Daily Shampoo', 399, 599, 4.5, 247, 28, 'photo-1535632066927-ab7c9ab60908', ['Amla', '300 ml']],
  ['Hair Care', 'Conditioner', 'Smoothening Daily Conditioner', 399, 599, 4.6, 283, 25, 'photo-1598440947619-2c35fc9aa908', ['Argan', '200 ml']],
  ['Hair Care', 'Hair Oil', 'Cold Pressed Argan Hair Oil', 499, 749, 4.7, 329, 17, 'photo-1608571423902-eed4a5ad8108', ['Argan', '100 ml']],
  ['Hair Care', 'Hair Serum', 'Root Rise Hair Growth Serum', 699, 1399, 4.5, 216, 13, 'photo-1626015365107-94c5a0855c3e', ['Peptides', '50 ml']],
  ['Hair Care', 'Hair Mask', 'Repair & Restore Hair Mask', 549, 799, 4.7, 305, 20, 'photo-1585751119414-8d9871be8e44', ['Shea Butter', '200 g']],
  ['Hair Care', 'Hair Spa', 'At-Home Nourishing Hair Spa', 649, 949, 4.4, 138, 11, 'photo-1519735777090-ec97162dc266', ['Deep Conditioning', '250 g']],
  ['Hair Care', 'Hair Styling', 'Flexible Hold Styling Cream', 449, 649, 4.3, 104, 18, 'photo-1527799820374-dcf8d9d4a388', ['Soft Hold', '100 g']],
  ['Hair Care', 'Hair Color', 'Ammonia Free Hair Color Kit', 599, 899, 4.4, 196, 9, 'photo-1535632066927-ab7c9ab60908', ['Dark Brown', 'Complete Kit']],
  ['Fragrance', 'Perfumes', 'Floral Eau de Parfum', 1299, 1899, 4.8, 497, 14, 'photo-1594035910387-fea47794261f', ['Floral', '50 ml']],
  ['Fragrance', 'Perfumes', 'Fresh Citrus Eau de Parfum', 1499, 2199, 4.7, 362, 12, 'photo-1592945403244-b3fbafd7f539', ['Citrus', '60 ml']],
  ['Fragrance', 'Perfumes', 'Premium Eau de Parfum', 1999, 2999, 4.8, 583, 8, 'photo-1590736969955-71cc94901144', ['Amber Woods', '75 ml']],
  ['Fragrance', 'Body Mist', 'Rose Petal Body Mist', 499, 749, 4.5, 278, 22, 'photo-1595425970377-c9703cf48b6d', ['Rose', '150 ml']],
  ['Fragrance', 'Deodorants', 'Long Lasting Fresh Deodorant', 299, 449, 4.3, 315, 37, 'photo-1541643600914-78b084683601', ['Fresh Linen', '150 ml']],
  ['Fragrance', 'Attar', 'Oud Blend Roll-On Attar', 699, 999, 4.7, 187, 10, 'photo-1590156222573-7be5b2f33449', ['Oud', '12 ml']],
  ['Fragrance', 'Gift Sets', 'Signature Scent Discovery Set', 1599, 2299, 4.8, 219, 7, 'photo-1594035910387-fea47794261f', ['Five Mini Scents', 'Gift Box']],
  ['Bath & Body', 'Body Wash', 'Rose Petal Body Wash', 349, 499, 4.6, 291, 32, 'photo-1608248543803-ba4f8c70ae0b', ['Rose', '250 ml']],
  ['Bath & Body', 'Body Lotion', 'Cocoa Comfort Body Lotion', 399, 599, 4.7, 347, 29, 'photo-1601049541289-9b1b7bbbfe19', ['Cocoa Butter', '250 ml']],
  ['Bath & Body', 'Body Scrub', 'Coffee Polish Body Scrub', 449, 699, 4.5, 218, 16, 'photo-1571781926291-c477ebfd024b', ['Coffee', '200 g']],
  ['Bath & Body', 'Bath Soap', 'Herbal Botanical Bath Soap Set', 299, 449, 4.4, 182, 41, 'photo-1598440947619-2c35fc9aa908', ['Three Bars', 'Plant Oils']],
  ['Bath & Body', 'Body Butter', 'Shea Butter Body Butter', 549, 799, 4.8, 254, 18, 'photo-1611930022073-b7a4ba5fcccd', ['Shea Butter', '200 g']],
  ['Bath & Body', 'Hand Wash', 'Moisture Care Hand Wash', 249, 369, 4.5, 146, 24, 'photo-1620916566398-39f1143ab7be', ['Aloe', '250 ml']],
  ['Bath & Body', 'Shower Gel', 'Refreshing Citrus Shower Gel', 329, 499, 4.5, 198, 21, 'photo-1608571423902-eed4a5ad8108', ['Citrus', '250 ml']],
  ['Nail Care', 'Nail Polish', 'Nude Veil Nail Polish', 199, 299, 4.6, 294, 38, 'photo-1632345031435-8727f6897d53', ['Warm Nude', 'Gloss Finish']],
  ['Nail Care', 'Nail Polish', 'Glossy Red Nail Polish', 199, 299, 4.7, 321, 27, 'photo-1610992015732-2449b76344bc', ['Classic Red', 'Gloss Finish']],
  ['Nail Care', 'Nail Art', 'Fine Line Nail Art Kit', 349, 549, 4.4, 133, 15, 'photo-1604654894610-df63bc536371', ['Detail Brushes', 'Metallic Foils']],
  ['Nail Care', 'Nail Polish Sets', 'Pastel Nail Polish Set', 499, 749, 4.8, 245, 19, 'photo-1604654894610-df63bc536371', ['Six Pastels', 'Gloss Finish']],
  ['Nail Care', 'Nail Remover', 'Gentle Acetone-Free Nail Remover', 179, 269, 4.3, 167, 44, 'photo-1632345031435-8727f6897d53', ['Acetone Free', '100 ml']],
  ['Nail Care', 'Nail Care Kits', 'Professional Nail Care Kit', 699, 999, 4.7, 176, 11, 'photo-1610992015732-2449b76344bc', ['Six-Piece Set', 'Travel Case']],
  ['Nail Care', 'Nail Tools', 'Stainless Steel Nail Tool Set', 399, 599, 4.5, 142, 20, 'photo-1604654894610-df63bc536371', ['Four Tools', 'Stainless Steel']],
  ['Beauty Tools', 'Makeup Brushes', 'Professional Makeup Brush Set', 899, 1299, 4.8, 416, 14, 'photo-1522335789203-aabd1fc54bc9', ['Eight Brushes', 'Soft Synthetic']],
  ['Beauty Tools', 'Makeup Sponges', 'Cloud Soft Beauty Blender Set', 399, 599, 4.7, 328, 25, 'photo-1596462502278-27bfdc403348', ['Three Sponges', 'Latex Free']],
  ['Beauty Tools', 'Hair Brushes', 'Cushion Detangling Hair Brush', 499, 749, 4.6, 207, 18, 'photo-1512496015851-a90fb38ba796', ['Flexible Bristles', 'All Hair Types']],
  ['Beauty Tools', 'Hair Dryer', 'Compact Ionic Hair Dryer', 1999, 2799, 4.5, 184, 9, 'photo-1527799820374-dcf8d9d4a388', ['Ionic Care', 'Two Heat Settings']],
  ['Beauty Tools', 'Hair Straightener', 'Ceramic Hair Straightener', 2499, 3499, 4.7, 218, 7, 'photo-1519735777090-ec97162dc266', ['Ceramic Plates', 'Adjustable Heat']],
  ['Beauty Tools', 'Hair Curler', 'Automatic Curling Wand', 2999, 4299, 4.6, 163, 5, 'photo-1585751119414-8d9871be8e44', ['Auto Rotate', 'Heat Control']],
  ['Beauty Tools', 'Facial Tools', 'Rose Quartz Facial Roller', 699, 999, 4.8, 391, 22, 'photo-1601049541289-9b1b7bbbfe19', ['Rose Quartz', 'Dual Ended']],
  ['Beauty Tools', 'Facial Tools', 'Sculpting Gua Sha Stone', 499, 749, 4.7, 276, 17, 'photo-1571781926291-c477ebfd024b', ['Natural Stone', 'Curved Edge']],
  ['Beauty Tools', 'Beauty Kits', 'Complete Makeup Starter Kit', 1799, 2599, 4.8, 231, 6, 'photo-1596462502278-27bfdc403348', ['Brushes + Basics', 'Gift Ready']],
];

const brandsByCategory = {
  Skincare: ['Serein Skin', 'Kindred Botanics', 'Dew Theory'],
  Makeup: ['Morrow Beauty', 'Studio Petal', 'Form & Finish'],
  'Hair Care': ['Root Ritual', 'Sunday Rinse', 'Silkline'],
  Fragrance: ['Maison Serein', 'Aster & Oak', 'Noon Notes'],
  'Bath & Body': ['Soft Hours', 'Kindred Botanics', 'Dew Theory'],
  'Nail Care': ['Color Studio', 'Morrow Beauty', 'Polished Edit'],
  'Beauty Tools': ['Form & Finish', 'Studio Petal', 'Luma Tools'],
};

export const beautyProducts = productRows.map(([category, subcategory, name, price, originalPrice, rating, reviews, stock, photo, colors], index) => {
  const slug = slugify(name);
  return {
    id: `beauty-${slug}`,
    _id: `beauty-${slug}`,
    slug,
    name,
    brand: brandsByCategory[category][index % brandsByCategory[category].length],
    description: `${name}, thoughtfully made for a comfortable everyday beauty routine.`,
    department: 'Beauty',
    category,
    subcategory,
    price,
    originalPrice,
    discount: Math.round((1 - price / originalPrice) * 100),
    images: [image(photo, index + 1)],
    imageUrl: image(photo, index + 1),
    rating,
    reviews,
    colors,
    sizes: [],
    stock,
    specifications: { finish: colors[1] || colors[0], routine: category },
    createdAt: new Date(Date.now() - index * 86400000).toISOString(),
  };
});

export function findBeautyCategory(slug) {
  return beautyCategories.find((category) => category.slug === slug);
}

export function findBeautySubcategory(category, slug) {
  if (!category) return undefined;
  return category.subcategories.find((subcategory) => subcategorySlug(subcategory) === slug);
}

export function getBeautyProductRoute(product) {
  return `/beauty/product/${product.slug || slugify(product.name)}`;
}