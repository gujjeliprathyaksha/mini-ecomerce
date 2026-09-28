const image = (photo, variant = 0) => `https://images.unsplash.com/${photo}?auto=format&fit=crop&w=900&h=${950 + (variant % 37) * 11}&crop=entropy&sat=${(variant % 9) * 4 - 16}&sig=${variant}&q=85`;
const slugify = (value) => value.toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
const category = (name, subcategories = [], images = []) => ({ name, slug: slugify(name), subcategories, images });
const group = (name, categories, slug = slugify(name)) => ({ name, slug, categories });

export const shoppingDepartments = [
  {
    slug: 'fashion', name: 'Fashion', description: 'Everyday pieces, occasion dressing and easy-to-wear essentials.',
    groups: [
      group('Women', [
        category('Sarees', ['Silk Sarees', 'Kanjivaram Sarees', 'Banarasi Sarees', 'Cotton Sarees', 'Organza Sarees', 'Georgette Sarees', 'Designer Sarees'], ['photo-1610030469983-98e550d6193c', 'photo-1496747611176-843222e1e57c', 'photo-1483985988355-763728e1935b', 'photo-1524504388940-b1c1722653e1']),
        ...['Kurtis', "Women's Dresses", 'Tops', 'Jeans', 'Leggings', "Women's Shoes"].map((item) => category(item, [], ['photo-1496747611176-843222e1e57c', 'photo-1483985988355-763728e1935b', 'photo-1551488831-00ddcb6c6bd3'])),
      ]),
      group('Men', ["Men's T-Shirts", 'Shirts', 'Jeans', 'Trousers', 'Shorts', 'Jackets', "Men's Shoes", 'Watches', "Men's Accessories"].map((item) => category(item)), 'men'),
      group('Kids', ["Boys' Dresses", "Girls' Dresses", 'Kids T-Shirts', 'Kids Jeans', 'Kids Shorts', 'Kids Frocks', 'Kids Shoes', 'Kids Toys', 'School Bags'].map((item) => category(item)), 'kids'),
    ],
  },
  {
    slug: 'mobiles', name: 'Mobiles', description: 'Find your next phone, selected for performance and everyday use.',
    groups: [
      group('Phones', [category('Mobiles', ['iPhone', 'Samsung', 'OnePlus', 'Google Pixel', 'Xiaomi', 'Realme', 'Vivo', 'Oppo', 'Motorola', 'Nothing'], ['photo-1511707171634-5f897ff02aa9', 'photo-1598327105666-5b89351aff97', 'photo-1510557880182-3d4d3cba35a5'])]),
    ],
  },
  {
    slug: 'electronics', name: 'Electronics', description: 'Thoughtful technology for work, play and the everyday.',
    groups: [
      group('Electronics', ['Laptops', 'Tablets', 'Headphones', 'Earbuds', 'Smart Watches', 'Smart TVs', 'Cameras', 'Speakers', 'Gaming Consoles', 'Monitors', 'Keyboards', 'Mouse', 'Printers', 'Storage Devices'].map((item) => category(item)), ''),
      group('Mobile Accessories', [category('Mobile Accessories', ['Mobile Cases', 'Screen Protectors', 'Chargers', 'Power Banks', 'USB Cables', 'Wireless Chargers', 'Selfie Sticks'], ['photo-1601593346740-925612772716', 'photo-1583394838336-acd977736f90', 'photo-1603539279542-7cb9b3a6c5bb'])], 'mobile-accessories'),
    ],
  },
  {
    slug: 'toys', name: 'Toys', description: 'Playful discoveries for every age and imagination.',
    groups: [group('', ['Baby Toys', 'Educational Toys', 'Building Blocks', 'LEGO-style Building Sets', 'Remote Control Cars', 'Dolls', 'Doll Houses', 'Soft Toys', 'Action Figures', 'Board Games', 'Puzzles', 'STEM Toys', 'Musical Toys', 'Outdoor Toys', 'Ride-on Toys', 'Toy Guns', 'Kids Art & Craft', 'School Games'].map((item) => category(item)), '')],
  },
  {
    slug: 'sports', name: 'Sports', description: 'Training, team play and time outdoors, supported by good gear.',
    groups: [
      ...[
        ['Cricket', ['Cricket Bat', 'Cricket Ball', 'Cricket Gloves']], ['Football', ['Football', 'Football Shoes']], ['Badminton', ['Badminton Racket']], ['Tennis', ['Tennis Racket']], ['Basketball', ['Basketball']], ['Volleyball', ['Volleyball']], ['Table Tennis', ['Table Tennis Set']], ['Running', ['Running Gear']], ['Cycling', ['Cycling Gear']], ['Gym & Fitness', ['Dumbbells', 'Resistance Bands', 'Treadmill', 'Gym Gloves']], ['Yoga', ['Yoga Mat']], ['Swimming', ['Swimming Gear']], ['Sports Shoes', ['Sports Shoes']], ['Sports Clothing', ['Sports Clothing']], ['Sports Bags', ['Sports Bag']], ['Fitness Accessories', ['Sports Bottle']], ['Sports Equipment', ['Sports Equipment']],
      ].map(([name, subcategories]) => group(name, [category(name, subcategories)], slugify(name))),
    ],
  },
  {
    slug: 'books', name: 'Books', description: 'Stories, ideas and practical guides for every kind of reader.',
    groups: [group('', ['Fiction', 'Non-Fiction', 'Novels', 'Romance', 'Mystery & Thriller', 'Self Help', 'Business', 'Finance', 'Technology', 'Programming', 'Engineering', 'Competitive Exams', 'UPSC', 'SSC', 'Banking', 'School Books', "Children's Books", 'Comics', 'Story Books', 'Biography', 'History', 'Science', 'Literature'].map((item) => category(item)), '')],
  },
  {
    slug: 'furniture', name: 'Furniture', description: 'Well-made pieces to make living, resting and working feel better.',
    groups: [
      group('Living Room', ['Sofas', 'Sofa Sets', 'Coffee Tables', 'TV Units', 'Side Tables', 'Recliners', 'Bookshelves'].map((item) => category(item)), 'living-room'),
      group('Bedroom', ['Beds', 'King Size Beds', 'Queen Size Beds', 'Wardrobes', 'Bedside Tables', 'Dressing Tables', 'Mattresses'].map((item) => category(item)), 'bedroom'),
      group('Dining', ['Dining Tables', 'Dining Chairs', 'Dining Sets', 'Kitchen Cabinets'].map((item) => category(item)), 'dining'),
      group('Office', ['Office Tables', 'Office Chairs', 'Study Tables', 'Computer Tables'].map((item) => category(item)), 'office'),
      group('Home', ['Shoe Racks', 'Storage Cabinets', 'Drawers', 'Benches', 'Stools'].map((item) => category(item)), 'home'),
    ],
  },
  {
    slug: 'tools', name: 'Tools & Hardware', description: 'Reliable tools, hardware and protection for projects big and small.',
    groups: [
      group('Hand Tools', ['Screwdrivers', 'Hammers', 'Pliers', 'Wrenches', 'Spanners', 'Measuring Tapes', 'Allen Keys', 'Tool Kits'].map((item) => category(item)), 'hand-tools'),
      group('Power Tools', ['Drills', 'Electric Screwdrivers', 'Angle Grinders', 'Saws', 'Sanders', 'Welding Machines'].map((item) => category(item)), 'power-tools'),
      group('Hardware', ['Screws', 'Nails', 'Bolts', 'Nuts', 'Hinges', 'Locks', 'Door Handles', 'Cables'].map((item) => category(item)), 'hardware'),
      group('Safety', ['Safety Gloves', 'Safety Goggles', 'Helmets', 'Masks', 'Protective Equipment'].map((item) => category(item)), 'safety'),
    ],
  },
  {
    slug: 'home-kitchen', name: 'Home & Kitchen', description: 'Useful kitchenware and small details that make a home.',
    groups: [
      group('Kitchen', ['Cookware', 'Non-Stick Pans', 'Pressure Cookers', 'Kitchen Appliances', 'Mixers', 'Grinders', 'Air Fryers', 'Electric Kettles', 'Storage Containers'].map((item) => category(item)), 'kitchen'),
      group('Home', ['Curtains', 'Bedsheets', 'Pillows', 'Blankets', 'Carpets', 'Wall Decor', 'Lamps', 'Clocks', 'Plants', 'Home Storage'].map((item) => category(item)), 'home'),
    ],
  },
  {
    slug: 'footwear', name: 'Footwear', description: 'Comfortable pairs for weekdays, weekends and everything between.',
    groups: [
      group('Women', ['Heels', 'Flats', 'Sandals', 'Sneakers', 'Boots'].map((item) => category(item)), 'women'),
      group('Men', ['Formal Shoes', 'Sneakers', 'Loafers', 'Sandals', 'Boots'].map((item) => category(item)), 'men'),
      group('Kids', ['School Shoes', 'Sneakers', 'Sandals', 'Sports Shoes'].map((item) => category(item)), 'kids'),
    ],
  },
  {
    slug: 'bags-accessories', name: 'Bags & Accessories', description: 'Finishing touches and functional companions for the day.',
    groups: [group('', ['Handbags', 'Shoulder Bags', 'Sling Bags', 'Backpacks', 'Laptop Bags', 'Travel Bags', 'Wallets', 'Belts', 'Sunglasses', 'Watches', 'Caps', 'Jewellery'].map((item) => category(item)), '')],
  },
];

const imagePools = {
  fashion: ['photo-1483985988355-763728e1935b', 'photo-1496747611176-843222e1e57c', 'photo-1541099649105-f69ad21f3246', 'photo-1529139574466-a303027c1d8b', 'photo-1483985988355-763728e1935b', 'photo-1496747611176-843222e1e57c', 'photo-1541099649105-f69ad21f3246', 'photo-1529139574466-a303027c1d8b'],
  'fashion-men': ['photo-1507679799987-c73779587ccf', 'photo-1521572163474-6864f9cf17ab', 'photo-1552374196-c4e7ffc6e126', 'photo-1542291026-7eec264c27ff', 'photo-1523275335684-37898b6baf30'],
  'fashion-kids': ['photo-1503919545889-aef636e10ad4', 'photo-1596870230751-ebdfce98ec42', 'photo-1519238263530-99bdd11df2ea', 'photo-1503919545889-aef636e10ad4'],
  mobiles: ['photo-1511707171634-5f897ff02aa9', 'photo-1598327105666-5b89351aff97', 'photo-1510557880182-3d4d3cba35a5'],
  electronics: ['photo-1498049794561-7780e7231661', 'photo-1523275335684-37898b6baf30', 'photo-1505740420928-5e560c06d30e', 'photo-1527814050087-3793815479db', 'photo-1524805444758-089113d48a6d'],
  toys: ['photo-1566576912321-d58ddd7a6088', 'photo-1596461404969-9ae70f2830c1', 'photo-1559454403-b8fb88521f11'],
  sports: ['photo-1542291026-7eec264c27ff', 'photo-1518611012118-696072aa579a', 'photo-1517836357463-d25dfeac3438', 'photo-1574629810360-7efbbe195018'],
  books: ['photo-1512820790803-83ca734da794', 'photo-1521587760476-6c12a4b040da', 'photo-1516979187454-437ec7d9d58b'],
  furniture: ['photo-1505693416388-ac5ce068fe85', 'photo-1497366754035-f200968a6e72', 'photo-1618220179428-22790b461013'],
  tools: ['photo-1581147036324-c17ac5c9ce0d', 'photo-1601762603339-fd61e28b698a', 'photo-1504307651254-35680f356dfd'],
  'home-kitchen': ['photo-1514228742587-6b1558fcca3d', 'photo-1507473885765-e6ed057f782c', 'photo-1618220179428-22790b461013'],
  footwear: ['photo-1542291026-7eec264c27ff', 'photo-1543163521-1bf539c55dd2', 'photo-1542291026-7eec264c27ff'],
  'bags-accessories': ['photo-1584917865442-de89df76afd3', 'photo-1553062407-98eeb64c6a62', 'photo-1511499767150-a48a237f0083'],
};

const brandPools = {
  fashion: ['Aurelia', 'Thread & Form', 'Everyday Edit'], mobiles: ['Apple', 'Samsung', 'OnePlus', 'Google', 'Xiaomi', 'Realme', 'Vivo', 'Oppo', 'Motorola', 'Nothing'],
  electronics: ['Acer', 'Logitech', 'Sony', 'JBL', 'Canon'], toys: ['PlayNest', 'BrightStart', 'Little Orbit'], sports: ['Decathlon', 'Nivia', 'Vector X'], books: ['Penguin', 'HarperCollins', 'Sage Press'],
  furniture: ['Woodcraft', 'Urban Living', 'House & Haven'], tools: ['Bosch', 'Stanley', 'Taparia'], 'home-kitchen': ['Prestige', 'Milton', 'Homefolk'], footwear: ['Walkwell', 'Campus', 'Clarks'], 'bags-accessories': ['Daily Carry', 'Mokobara', 'Accessorize'],
};

const productNameOverrides = {
  'iPhone': 'iPhone 16 Pro', 'Samsung': 'Samsung Galaxy S25', 'OnePlus': 'OnePlus 13R', 'Google Pixel': 'Google Pixel 9', 'Xiaomi': 'Xiaomi 14T', 'Realme': 'Realme 14 Pro', 'Vivo': 'Vivo V50', 'Oppo': 'Oppo Reno 13', 'Motorola': 'Motorola Edge 50', 'Nothing': 'Nothing Phone (3a)',
  'Silk Sarees': 'Pure Silk Saree', 'Kanjivaram Sarees': 'Kanjivaram Silk Saree', 'Banarasi Sarees': 'Banarasi Woven Saree', 'Cotton Sarees': 'Handloom Cotton Saree', 'Organza Sarees': 'Pastel Organza Saree', 'Georgette Sarees': 'Floral Georgette Saree', 'Designer Sarees': 'Embroidered Designer Saree',
  'Baggy Jeans': 'Relaxed Baggy Jeans', 'Cricket Bat': 'Kashmir Willow Cricket Bat', 'Cricket Ball': 'Leather Cricket Ball', 'Cricket Gloves': 'Pro Grip Cricket Gloves', 'Football': 'Match Football', 'Football Shoes': 'Football Stud Shoes', 'Badminton Racket': 'Carbon Badminton Racket', 'Tennis Racket': 'Control Tennis Racket', 'Basketball': 'Indoor Outdoor Basketball', 'Volleyball': 'Tournament Volleyball', 'Yoga Mat': 'Grip Yoga Mat', 'Dumbbells': 'Adjustable Dumbbell Pair', 'Resistance Bands': 'Resistance Band Set', 'Treadmill': 'Foldable Home Treadmill', 'Gym Gloves': 'Training Gym Gloves', 'Sports Bottle': 'Insulated Sports Bottle',
  'Programming': 'Programming Fundamentals', 'Novels': 'The Last House: A Mystery Novel', 'Sofas': 'Modern Three-Seater Sofa', 'Sofa Sets': 'Linen Sofa Set', 'Drills': 'Cordless Power Drill', 'Cookware': 'Everyday Stainless Cookware Set', 'Heels': 'Everyday Block Heels', 'Handbags': 'Structured Everyday Handbag',
};

const ageGroups = ['0-2 Years', '3-5 Years', '6-8 Years', '9-12 Years'];

export function getDepartmentRoute(department) {
  return `/${department.slug}`;
}

export function getGroupRoute(department, departmentGroup) {
  return departmentGroup.slug ? `/${department.slug}/${departmentGroup.slug}` : getDepartmentRoute(department);
}

export function getCategoryRoute(department, departmentGroup, entry) {
  const groupRoute = getGroupRoute(department, departmentGroup);
  return departmentGroup.name === entry.name || entry.name === 'Mobiles' ? groupRoute : `${groupRoute}/${entry.slug}`;
}

export function getSubcategoryRoute(department, departmentGroup, entry, subcategory) {
  const categoryRoute = getCategoryRoute(department, departmentGroup, entry);
  return `${categoryRoute}/${slugify(subcategory)}`;
}

let productIndex = 0;
export const shoppingProducts = shoppingDepartments.flatMap((department) => department.groups.flatMap((departmentGroup) => departmentGroup.categories.flatMap((entry) => {
  const productTypes = entry.subcategories.length ? entry.subcategories : [entry.name];
  return productTypes.map((productType, typeIndex) => {
    const index = productIndex++;
    const groupKey = department.slug;
    const poolKey = groupKey === 'fashion' && departmentGroup.slug ? `fashion-${departmentGroup.slug}` : groupKey;
    const pool = entry.images.length ? entry.images : (imagePools[poolKey] || imagePools[groupKey]);
    const photo = pool[index % pool.length];
    const slug = slugify(`${department.slug}-${departmentGroup.name}-${entry.name}-${productType}`);
    const basePrices = { fashion: 599, mobiles: 9999, electronics: 1299, toys: 299, sports: 399, books: 249, furniture: 1999, tools: 199, 'home-kitchen': 299, footwear: 699, 'bags-accessories': 399 };
    const price = basePrices[groupKey] + ((index * 173 + typeIndex * 97) % (groupKey === 'mobiles' ? 22000 : groupKey === 'furniture' ? 14000 : 4200));
    const discount = 10 + (index % 9) * 5;
    const originalPrice = Math.round(price / (1 - discount / 100));
    const brand = groupKey === 'mobiles' && entry.name === 'Mobiles'
      ? productType
      : brandPools[groupKey][index % brandPools[groupKey].length];
    const productLabel = groupKey === 'footwear' && ['Sneakers', 'Sandals'].includes(productType) ? `${departmentGroup.name} ${productType}` : productType;
    const name = productNameOverrides[productType] || productNameOverrides[entry.name] || `${productLabel} ${['Essential', 'Classic', 'Everyday', 'Select'][index % 4]}`;
    const imageUrl = image(photo, index + 1);
    const metadata = groupKey === 'books'
      ? { author: ['Mira Sen', 'A. K. Menon', 'R. Iyer'][index % 3], publisher: ['Penguin', 'HarperCollins', 'Sage Press'][index % 3], language: 'English' }
      : groupKey === 'furniture'
        ? { dimensions: '120 x 80 x 75 cm', material: 'Engineered wood', delivery: 'Delivered in 5-7 days' }
        : groupKey === 'electronics' || groupKey === 'mobiles'
          ? { model: `${brand} ${productType}`, warranty: '1 year manufacturer warranty', connectivity: 'Bluetooth / Wi-Fi' }
          : groupKey === 'toys'
            ? { ageGroup: ageGroups[index % ageGroups.length], material: 'Child-safe materials' }
            : { department: department.name, group: departmentGroup.name };
    const categoryName = entry.name;
    const subcategoryName = productType;
    const listingRoute = entry.subcategories.length
      ? getSubcategoryRoute(department, departmentGroup, entry, productType)
      : getCategoryRoute(department, departmentGroup, entry);
    return {
      id: `catalog-${slug}`, _id: `catalog-${slug}`, slug, department: department.name, group: departmentGroup.name,
      category: categoryName, subcategory: subcategoryName, name, brand,
      description: `${name} from our ${departmentGroup.name ? `${departmentGroup.name} ` : ''}${department.name} edit. Carefully selected for quality, comfort and everyday value.`,
      price, originalPrice, discount, rating: Number((4.2 + (index % 8) * 0.1).toFixed(1)), reviews: 34 + (index * 17) % 900,
      stock: index % 29 === 28 ? 0 : 8 + (index * 7) % 80, imageUrl, images: [imageUrl], colors: ['Classic', 'Natural'], sizes: [],
      specifications: metadata, createdAt: new Date(Date.now() - (index % 18) * 86400000).toISOString(), ageGroup: metadata.ageGroup, listingRoute, route: `/catalog/${slug}`,
      isNew: index % 8 === 0,
    };
  });
})));

export const shoppingBrands = [...new Set(shoppingProducts.map((product) => product.brand))].sort();

export function findShoppingDepartment(slug) {
  return shoppingDepartments.find((department) => department.slug === slug);
}

export function getShoppingProductRoute(product) {
  return product.route || `/catalog/${product.slug}`;
}

export function findShoppingProduct(slug) {
  return shoppingProducts.find((product) => product.slug === slug);
}