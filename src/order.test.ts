import { test } from 'node:test';
import assert from 'node:assert/strict';
import { products, type Language } from './data';
import { checkoutUrl, orderMessage, sanitizeCart, total } from './order';
const cart=[{productId:'brownies',variantId:'16',quantity:2},{productId:'challah',variantId:'traditional',quantity:1},{productId:'coquitos',variantId:'10',quantity:1}];
test('example order totals exactly €42.70',()=>assert.equal(total(cart),4270));
test('all eleven variants retain the supplied prices',()=>assert.deepEqual(products.flatMap(p=>p.variants.map(v=>v.price)),[1200,2000,3000,470,470,280,1400,2600,1400,2600,1400]));
test('each selected variant determines the total',()=>{for(const p of products)for(const v of p.variants)assert.equal(total([{productId:p.id,variantId:v.id,quantity:3}]),v.price*3);});
test('checkout roundtrips complete translated message and preserves the cart',()=>{const before=JSON.stringify(cart);for(const lang of ['es','en'] as Language[]){const url=new URL(checkoutUrl(cart,lang));assert.equal(url.origin+url.pathname,'https://wa.me/34614034687');assert.equal(url.searchParams.get('text'),orderMessage(cart,lang));assert.match(orderMessage(cart,lang),/42[,.]70/);assert.ok(orderMessage(cart,lang).includes(products[0].variants[0].label[lang]));}assert.equal(JSON.stringify(cart),before);});
test('local storage validation rejects invalid data and merges duplicate entries',()=>{assert.deepEqual(sanitizeCart(null),[]);assert.deepEqual(sanitizeCart([{},null,{productId:'challah',variantId:'no',quantity:2},{...cart[0],quantity:-1},{...cart[0],quantity:1.2}]),[]);assert.deepEqual(sanitizeCart([cart[0],cart[0]]),[{...cart[0],quantity:4}]);});
test('English WhatsApp message matches the requested plain-text format exactly',()=>{
 assert.equal(orderMessage([{productId:'almond',variantId:'large',quantity:1}],'en'),`Hello, Yami Bakery!

I'd like to place an order:

MY ORDER:
Almond Cake
Large
Quantity: 1
Subtotal: 26.00 €

TOTAL: 26.00 €

Could you please confirm availability and the delivery or pickup options?

Thank you very much!`);
});
