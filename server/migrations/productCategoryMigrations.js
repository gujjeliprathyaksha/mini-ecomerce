import Product from '../models/Product.js';

export async function migrateLegacyProductCategories() {
  const result = await Product.updateMany(
    {
      name: 'Smartphone Pro 12',
      department: 'Electronics',
      category: 'Electronics',
      subcategory: 'Smartphones',
    },
    { $set: { department: 'Mobiles', category: 'Mobiles' } },
  );

  if (result.modifiedCount) {
    console.log(`Reclassified ${result.modifiedCount} legacy smartphone product(s).`);
  }
}