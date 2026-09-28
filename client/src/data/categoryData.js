const imageSets = {
  fashion: [
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1612722432474-fb8ac7b1fdaa?auto=format&fit=crop&w=700&q=85',
  ],
  sarees: [
    'https://images.unsplash.com/photo-1610030469668-8e9f641aaf14?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1610189012906-4c4d2a68e5e5?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1583391733981-849840f4f2d7?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=700&q=85',
  ],
  western: [
    'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85',
  ],
  dresses: [
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85',
  ],
  tops: [
    'https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1564257577054-13e0b0f2be01?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1583846783214-7229a91b20ed?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1506629905607-d9c297d8a9c5?auto=format&fit=crop&w=700&q=85',
  ],
  bottoms: [
    'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1509551388413-e18d0ac5d495?auto=format&fit=crop&w=700&q=85',
  ],
  ethnic: [
    'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1585488433169-7f3b0d9a6a3b?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1597983073493-88cd35cf93d0?auto=format&fit=crop&w=700&q=85',
  ],
  partywear: [
    'https://images.unsplash.com/photo-1566174053879-31528523f8ae?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?auto=format&fit=crop&w=700&q=85',
  ],
  accessories: [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1611652022419-a9419f74343d?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=700&q=85',
    'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=700&q=85',
  ],
};

const catalog = {
  kurta: { title: 'Kurta Sets', subtitle: 'Elegant ethnic styles for everyday and festive moments.', category: 'fashion', tags: ['Everyday', 'Festive', 'Cotton', 'Anarkali'], names: ['Floral Printed Cotton Kurta Set', 'Pastel Anarkali Kurta Set', 'Embroidered Straight Kurta Set', 'Rayon Printed Kurta Set', 'Chikankari Kurta Set', 'Festive Anarkali Set', 'Mirror Work Kurta Set', 'Linen Kurta Set', 'Straight Cotton Kurta Set', 'Palazzo Kurta Set', 'Floral Anarkali Set', 'Premium Silk Kurta Set'] },
  sarees: { title: 'Elegant Sarees', subtitle: 'Timeless styles for every occasion.', category: 'sarees', tags: ['Silk', 'Cotton', 'Organza', 'Georgette', 'Designer'], names: ['Soft Silk Saree', 'Floral Organza Saree', 'Designer Georgette Saree', 'Cotton Handloom Saree', 'Banarasi Style Saree', 'Party Wear Saree', 'Printed Chiffon Saree', 'Embroidered Saree', 'Pastel Organza Saree', 'Festive Silk Saree', 'Linen Saree', 'Floral Printed Saree'] },
  western: { title: 'Western Wear', subtitle: 'Modern styles designed for your everyday look.', category: 'western', tags: ['Casual', 'Office Wear', 'Street Style', 'Party', 'Trending'], names: ['Oversized Casual Shirt', 'Ribbed Crop Top', 'High Waist Jeans', 'Wide Leg Trousers', 'Casual Blazer', 'Denim Jacket', 'Co-Ord Set', 'Casual Jumpsuit', 'Printed Shirt', 'Wide Leg Jeans', 'Ribbed Bodycon Top', 'Casual Blazer Dress'] },
  dresses: { title: 'Beautiful Dresses', subtitle: 'Make every moment stylish.', category: 'dresses', tags: ['Mini', 'Midi', 'Maxi', 'Floral', 'Party'], names: ['Floral Midi Dress', 'Elegant Maxi Dress', 'Satin Party Dress', 'Casual Cotton Dress', 'Printed Summer Dress', 'Bodycon Dress', 'Ruffle Midi Dress', 'Elegant Black Dress', 'Floral Maxi Dress', 'Party Mini Dress', 'Wrap Dress', 'Pleated Midi Dress'] },
  tops: { title: 'Trendy Tops', subtitle: 'Everyday essentials with a modern touch.', category: 'tops', tags: ['Basic', 'Crop', 'Office', 'Satin', 'Party'], names: ['Basic Cotton Top', 'Ribbed Crop Top', 'Puff Sleeve Top', 'Floral Top', 'Satin Top', 'Office Shirt', 'Peplum Top', 'Halter Neck Top', 'Oversized T-Shirt', 'Knit Top', 'Casual Shirt', 'Party Top'] },
  bottoms: { title: 'Bottom Wear', subtitle: 'Comfort meets effortless style.', category: 'bottoms', tags: ['Jeans', 'Trousers', 'Palazzo', 'Skirts', 'Shorts'], names: ['High Waist Jeans', 'Wide Leg Jeans', 'Straight Fit Jeans', 'Cargo Pants', 'Formal Trousers', 'Wide Leg Trousers', 'Cotton Palazzo', 'Printed Palazzo', 'Midi Skirt', 'Denim Skirt', 'Casual Shorts', 'Formal Pants'] },
  ethnic: { title: 'Ethnic Collection', subtitle: 'Celebrate tradition in your own way.', category: 'ethnic', tags: ['Anarkali', 'Lehengas', 'Salwar Suits', 'Sharara Sets', 'Dupattas'], names: ['Printed Anarkali Suit', 'Festive Silk Lehenga', 'Pastel Salwar Suit', 'Embroidered Sharara Set', 'Handblock Dupatta', 'Mirror Work Lehenga', 'Chanderi Anarkali', 'Floral Salwar Set', 'Velvet Festive Suit', 'Organza Dupatta', 'Bandhani Sharara', 'Classic Ethnic Set'] },
  partywear: { title: 'Party Edit', subtitle: 'Looks made to stand out.', category: 'partywear', tags: ['Party Dresses', 'Designer Sarees', 'Lehengas', 'Sequins', 'Evening Wear'], names: ['Sequin Slip Dress', 'Satin Evening Gown', 'Designer Party Saree', 'Velvet Mini Dress', 'Pearl Embellished Dress', 'Shimmer Lehenga', 'One Shoulder Midi', 'Metallic Draped Saree', 'Feather Trim Dress', 'Beaded Party Top', 'Satin Co-Ord Set', 'Crystal Evening Dress'] },
  accessories: { title: 'Complete Your Look', subtitle: 'The finishing touches that make it yours.', category: 'accessories', tags: ['Handbags', 'Jewelry', 'Sunglasses', 'Watches', 'Hair Accessories'], names: ['Mini Shoulder Bag', 'Leather Handbag', 'Pearl Necklace', 'Gold-Tone Earrings', 'Minimal Bracelet', 'Fashion Sunglasses', 'Analog Watch', 'Hair Claw Set', 'Designer Sling Bag', 'Hoop Earrings', 'Scrunchie Set', 'Fashion Belt'] },
};

const prices = [899, 1299, 1499, 999, 1599, 1899, 1699, 1199, 799, 1299, 1499, 2199];

export const categoryData = Object.fromEntries(Object.entries(catalog).map(([slug, data]) => [slug, {
  ...data,
  products: data.names.map((name, index) => ({
    id: `${slug}-${index}`,
    name,
    price: prices[index],
    oldPrice: prices[index] + Math.round(prices[index] * 0.35),
    discount: `${28 + (index % 5) * 3}% OFF`,
    rating: (4.6 + (index % 4) / 10).toFixed(1),
    image: imageSets[data.category]?.[index % imageSets[data.category].length] || imageSets.fashion[index % 4],
  })),
}]));

export const categoryNavigation = [
  ['Kurta Sets', 'kurta.html'], ['Sarees', 'sarees.html'], ['Western Wear', 'western.html'], ['Dresses', 'dresses.html'], ['Tops', 'tops.html'], ['Bottom Wear', 'bottoms.html'], ['Ethnic Wear', 'ethnic.html'], ['Party Wear', 'partywear.html'], ['Accessories', 'accessories.html'],
];
