import { business, products, type Language } from './data';
import { translations } from './i18n';
export type CartItem = { productId: string; variantId: string; quantity: number };
export const money = (cents: number, lang: Language) => new Intl.NumberFormat({es:'es-ES',en:'en-IE'}[lang], { style:'currency',currency:'EUR' }).format(cents/100);
export function details(item: CartItem) { const product = products.find(p=>p.id===item.productId)!; return {product,variant:product.variants.find(v=>v.id===item.variantId)!}; }
export function sanitizeCart(value: unknown): CartItem[] {
 if (!Array.isArray(value)) return [];
 const result: CartItem[]=[];
 for (const item of value) { if (!item || typeof item!=='object') continue; const p=products.find(p=>p.id===item.productId); if(!p?.variants.some(v=>v.id===item.variantId)||!Number.isSafeInteger(item.quantity)||item.quantity<1) continue; const old=result.find(x=>x.productId===item.productId&&x.variantId===item.variantId); if(old) old.quantity=Math.min(999,old.quantity+item.quantity); else result.push({productId:item.productId,variantId:item.variantId,quantity:Math.min(999,item.quantity)}); }
 return result;
}
export const total = (cart: CartItem[]) => cart.reduce((sum,item)=>sum+details(item).variant.price*item.quantity,0);
function orderMoney(cents: number, lang: Language) {
 return `${new Intl.NumberFormat({es:'es-ES',en:'en-IE'}[lang], {minimumFractionDigits:2,maximumFractionDigits:2}).format(cents/100)} €`;
}
export function orderMessage(cart: CartItem[], lang: Language) {
 const t = translations[lang];
 const items = cart.map(item => {
  const {product, variant} = details(item);
  return `${product.name[lang]}\n${variant.label[lang]}\n${t.quantity}: ${item.quantity}\n${t.subtotal}: ${orderMoney(variant.price * item.quantity, lang)}`;
 }).join('\n\n');
 return `${t.orderHello}\n\n${t.orderIntro}\n\n${t.orderHeading}\n${items}\n\n${t.total.toUpperCase()}: ${orderMoney(total(cart), lang)}\n\n${t.orderEnd}\n\n${t.thanks}`;
}
export const checkoutUrl = (cart:CartItem[],lang:Language) => `https://wa.me/${business.phone}?text=${encodeURIComponent(orderMessage(cart,lang))}`;
