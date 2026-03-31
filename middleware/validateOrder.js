import db from '../data/db.js';

const validateOrder = async (req, res, next) => {
  try {
    const { items, user_id } = req.body || {};

       if (!req.body) {
      return res.status(400).json({
        error: 'Request body saknas eller är i fel format'
      });
    }

       if (user_id !== undefined && typeof user_id !== 'string') {
      return res.status(400).json({
        error: 'user_id måste vara en sträng om det skickas med'
      });
    }

    if (!items || !Array.isArray(items)) {
      return res.status(400).json({
        error: 'items måste finnas och vara en array'
      });
    }

    if (items.length === 0) {
      return res.status(400).json({
        error: 'En order måste innehålla minst en produkt'
      });
    }

    const validatedItems = [];

    

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (typeof item !== 'object' || item === null) {
        return res.status(400).json({
          error: `Item på position ${i} måste vara ett objekt`
        });
      }

      
      if (!item.product_id || typeof item.product_id !== 'string') {
        return res.status(400).json({
          error: `product_id på position ${i} måste vara en sträng`
        });
      }

      if (!Number.isInteger(item.quantity) || item.quantity <= 0) {
        return res.status(400).json({
          error: `quantity ${i} måste vara ett heltal större än 0`
        });
      }

      // ÄNDRAD: better-sqlite3 använder prepare().get()
      const product = db
        .prepare('SELECT id, title, price FROM menu WHERE id = ?')
        .get(item.product_id);

      if (!product) {
        return res.status(400).json({
          error: `Produkt med id ${item.product_id} finns inte i menyn`
        });
      }

      if (item.price !== undefined && item.price !== product.price) {
        return res.status(400).json({
          error: `Fel pris för produkt med id ${item.product_id}`
        });
      }

      validatedItems.push({
        product_id: product.id,
        title: product.title,
        quantity: item.quantity,
        unit_price: product.price
      });
    }

    req.validatedItems = validatedItems;

    next();
  } catch (error) {
    // ÄNDRAD: tydligare logg
    console.error('Valideringsfel:', error);
    return res.status(500).json({
      error: 'Något gick fel i valideringen'
    });
  }
};

export { validateOrder };
export default validateOrder;