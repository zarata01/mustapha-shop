const featuredCategories = [
  { name: 'Engine', slug: 'engine', description: 'Filters, belts, pumps, sensors, and service essentials.' },
  { name: 'Brakes', slug: 'brakes', description: 'Pads, rotors, drums, hydraulic parts, and accessories.' },
  { name: 'Suspension', slug: 'suspension', description: 'Shocks, struts, control arms, bushings, and mounts.' }
];

const featuredPacks = [
  { name: 'Oil Service Pack', badge: 'Best seller', items: ['Oil filter', 'Air filter', 'Cabin filter'] },
  { name: 'Brake Refresh Pack', badge: 'Customizable', items: ['Front pads', 'Rear pads', 'Brake fluid'] },
  { name: 'Road Trip Safety Pack', badge: 'New', items: ['Wipers', 'Bulbs', 'Emergency fluids'] }
];

function home(req, res) {
  res.render('home', {
    title: 'Mustapha Shop | Spare Parts Marketplace',
    featuredCategories,
    featuredPacks
  });
}

function placeholder(pageTitle, description) {
  return (req, res) => {
    res.render('placeholder', {
      title: pageTitle,
      pageTitle,
      description
    });
  };
}

module.exports = {
  home,
  parts: placeholder('Spare parts catalog', 'Browse, search, and compare seller offers for catalog parts.'),
  packs: placeholder('Ready-made packs', 'Customize spare-part bundles before adding them to cart.'),
  cart: placeholder('Shopping cart', 'Review selected parts, pack customizations, sellers, and quantities.'),
  checkout: placeholder('Checkout', 'Collect contact details, delivery information, and payment method.'),
  login: placeholder('Login', 'Authentication screens will support customer, seller, and admin roles.'),
  adminDashboard: placeholder('Admin dashboard', 'Admin tools will manage catalog data, packs, sellers, orders, and platform settings.'),
  sellerDashboard: placeholder('Seller dashboard', 'Seller tools will manage offers, stock, pricing, and order confirmation calls.')
};
