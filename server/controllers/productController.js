import Product from '../models/Product.js';

const editableFields = [
  'name', 'description', 'price', 'originalPrice', 'discount', 'department',
  'category', 'subcategory', 'brand', 'stock', 'imageUrl', 'images', 'rating',
  'reviews', 'sizes', 'colors', 'specifications', 'ageGroup',
];

const categoryAliases = {
  sarees: ['Sarees'],
  'womens wear': ['Womens Wear', "Women's Wear"],
  women: ['Womens Wear', "Women's Wear"],
  'mens wear': ['Mens Wear', "Men's Wear", 'Men'],
  men: ['Mens Wear', "Men's Wear", 'Men'],
  'mens jeans': ['Mens Jeans', "Men's Jeans"],
  'kids wear': ['Kids Wear', 'Kids'],
  kids: ['Kids Wear', 'Kids'],
  'kurta sets': ['Kurta Sets'],
  kurtas: ['Kurta Sets'],
  electronics: ['Electronics'],
  'home living': ['Home & Living', 'Home / Other Products'],
};

function normalizeValue(value) {
  return String(value || '')
    .trim()
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9\s&]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildNormalizedValuePattern(value) {
  return value
    .split(' ')
    .map((word) => [...word].map((character) => `${escapeRegex(character)}['’]?`).join(''))
    .join('[^a-z0-9&]+');
}

function getCategoryVariants(rawValue) {
  const normalized = normalizeValue(rawValue);
  if (!normalized) return [];

  const variants = new Set([normalized]);
  const mapped = categoryAliases[normalized];
  if (mapped) {
    mapped.forEach((entry) => variants.add(normalizeValue(entry)));
  }

  const flattened = [...variants].flatMap((entry) => categoryAliases[entry] || [entry]);
  return [...new Set(flattened.map((entry) => entry.trim()).filter(Boolean))];
}

function buildCategoryFilter(rawValue) {
  const variants = getCategoryVariants(rawValue);
  if (!variants.length) return null;

  const pattern = variants.map(buildNormalizedValuePattern).join('|');
  const categoryRegExp = new RegExp(`^(?:${pattern})$`, 'i');

  return {
    $or: [
      { category: categoryRegExp },
      { subcategory: categoryRegExp },
      { department: categoryRegExp },
    ],
  };
}

function getProductInput(body) {
  return Object.fromEntries(
    editableFields
      .filter((field) => body[field] !== undefined)
      .map((field) => [field, body[field]]),
  );
}

function parsePagination(request) {
  const page = Math.max(Number.parseInt(request.query.page, 10) || 1, 1);
  const limit = Math.min(Math.max(Number.parseInt(request.query.limit, 10) || 10, 1), 100);
  return { page, limit, skip: (page - 1) * limit };
}

function handleDatabaseError(response, error, fallbackMessage) {
  if (error.name === 'ValidationError' || error.name === 'CastError') {
    return response.status(400).json({ message: 'Invalid product data' });
  }
  return response.status(500).json({ message: fallbackMessage });
}

export async function createProduct(request, response) {
  const productInput = getProductInput(request.body);

  if (!productInput.name || productInput.price === undefined) {
    return response.status(400).json({ message: 'Name and price are required' });
  }

  try {
    const product = await Product.create({ ...productInput, createdBy: request.user._id });
    return response.status(201).json(product);
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to create product');
  }
}

export async function listProducts(request, response) {
  const { page, limit, skip } = parsePagination(request);
  const filters = [];

  for (const field of ['department', 'category', 'subcategory', 'brand']) {
    const rawValue = request.query[field]?.trim();
    if (rawValue) {
      if (field === 'category') continue;
      if (field === 'department') {
        const variants = getCategoryVariants(rawValue);
        const pattern = variants.map(buildNormalizedValuePattern).join('|');
        filters.push({ [field]: new RegExp(`^(?:${pattern})$`, 'i') });
        continue;
      }
      filters.push({ [field]: new RegExp(escapeRegex(rawValue), 'i') });
    }
  }

  const categoryFilter = buildCategoryFilter(request.query.category);
  if (categoryFilter) {
    filters.push(categoryFilter);
  }

  const minPrice = Number(request.query.minPrice);
  const maxPrice = Number(request.query.maxPrice);
  const priceFilter = {};
  if (request.query.minPrice !== undefined && Number.isFinite(minPrice) && minPrice >= 0) priceFilter.$gte = minPrice;
  if (request.query.maxPrice !== undefined && Number.isFinite(maxPrice) && maxPrice >= 0) priceFilter.$lte = maxPrice;
  if (Object.keys(priceFilter).length) filters.push({ price: priceFilter });

  const minimumRating = Number(request.query.rating);
  if (request.query.rating !== undefined && Number.isFinite(minimumRating) && minimumRating >= 0 && minimumRating <= 5) {
    filters.push({ rating: { $gte: minimumRating } });
  }

  const minimumDiscount = Number(request.query.discount);
  if (request.query.discount !== undefined && Number.isFinite(minimumDiscount) && minimumDiscount >= 0 && minimumDiscount <= 100) {
    filters.push({ discount: { $gte: minimumDiscount } });
  }

  if (request.query.availability === 'in-stock') filters.push({ stock: { $gt: 0 } });
  if (request.query.availability === 'out-of-stock') filters.push({ stock: { $lte: 0 } });

  if (request.query.new === 'true') {
    filters.push({ createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } });
  }

  const filter = filters.length ? { $and: filters } : {};

  try {
    const [products, total] = await Promise.all([
      Product.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      Product.countDocuments(filter),
    ]);

    return response.json({
      products,
      total,
      page,
      pages: Math.ceil(total / limit),
    });
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to fetch products');
  }
}

export async function getProduct(request, response) {
  try {
    const product = await Product.findById(request.params.id);
    if (!product) {
      return response.status(404).json({ message: 'Product not found' });
    }
    return response.json(product);
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to fetch product');
  }
}

export async function searchProducts(request, response) {
  const query = request.query.q?.trim();
  if (!query) {
    return response.status(400).json({ message: 'Search query is required' });
  }

  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const searchExpression = new RegExp(escapedQuery, 'i');

  try {
    const products = await Product.find({
      $or: [
        { name: searchExpression },
        { description: searchExpression },
        { department: searchExpression },
        { category: searchExpression },
        { subcategory: searchExpression },
        { brand: searchExpression },
      ],
    }).sort({ createdAt: -1 });
    return response.json(products);
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to search products');
  }
}

export async function updateProduct(request, response) {
  const productInput = getProductInput(request.body);
  if (!Object.keys(productInput).length) {
    return response.status(400).json({ message: 'At least one product field is required' });
  }

  try {
    const product = await Product.findByIdAndUpdate(request.params.id, productInput, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return response.status(404).json({ message: 'Product not found' });
    }
    return response.json(product);
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to update product');
  }
}

export async function deleteProduct(request, response) {
  try {
    const product = await Product.findByIdAndDelete(request.params.id);
    if (!product) {
      return response.status(404).json({ message: 'Product not found' });
    }
    return response.json({ message: 'Product deleted' });
  } catch (error) {
    return handleDatabaseError(response, error, 'Unable to delete product');
  }
}
