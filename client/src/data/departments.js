const image = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=900&q=85`;

export const departments = {
  women: {
    title: "Women's Fashion",
    department: 'Womens Wear',
    description: 'Elegant silhouettes, everyday essentials and occasion dressing.',
    image: image('photo-1483985988355-763728e1935b'),
    categories: {
      sarees: ['Sarees', ['Silk Saree', 'Kanchipuram Saree', 'Banarasi Saree', 'Cotton Saree', 'Georgette Saree', 'Chiffon Saree', 'Organza Saree', 'Linen Saree', 'Designer Saree', 'Party Wear Saree', 'Wedding Saree', 'Printed Saree', 'Traditional Saree', 'Modern Saree']],
      'womens-wear': ['Womens Wear', ['Dresses', 'Tops', 'Kurtis', 'Salwar Suits', 'Lehengas', 'Womens Jeans', 'Womens Tops', 'Ethnic Wear']],
      'kurta-sets': ['Kurta Sets', ['Women\'s Kurta', 'Cotton Kurta', 'Designer Kurta', 'Festive Kurta', 'Kurta Set']],
    },
  },
  men: {
    title: "Men's Fashion",
    department: 'Mens Wear',
    description: 'Refined essentials for work, weekends and every occasion.',
    image: image('photo-1507679799987-c73779587ccf'),
    categories: {
      'mens-wear': ['Mens Wear', ['Mens Shirts', 'Mens T-Shirts', 'Mens Trousers', 'Mens Kurta', 'Mens Ethnic Wear', 'Mens Jackets']],
      'mens-jeans': ['Mens Jeans', ['Slim Fit', 'Straight Fit', 'Regular Fit', 'Baggy Jeans', 'Cargo Jeans', 'Black Jeans', 'Blue Jeans']],
      'kurta-sets': ['Kurta Sets', ['Mens Kurta', 'Cotton Kurta', 'Festive Kurta', 'Designer Kurta']],
    },
  },
  kids: {
    title: 'Kids Wear',
    department: 'Kids Wear',
    description: 'Play-ready comfort and joyful looks for growing personalities.',
    image: image('photo-1519345182560-3f2917c472ef'),
    categories: {
      'kids-wear': ['Kids Wear', ['Boys T-Shirts', 'Boys Shirts', 'Boys Jeans', 'Girls Dresses', 'Girls Frocks', 'Kids Ethnic Wear', 'Kids Party Wear']],
    },
  },
  electronics: {
    title: 'Electronics',
    department: 'Electronics',
    description: 'Smart technology for work, entertainment and everyday life.',
    image: image('photo-1498049794561-7780e7231661'),
    categories: {
      electronics: ['Electronics', ['Smartphones', 'Laptops', 'Headphones', 'Earbuds', 'Smart Watches', 'Bluetooth Speakers', 'Keyboards', 'Computer Accessories', 'Chargers', 'Power Banks']],
    },
  },
};

export function slugify(value) {
  return value
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

export function categoryKey(value) {
  return slugify(value);
}
