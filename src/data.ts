export const asset = (path: string) => `${import.meta.env?.BASE_URL || '/'}${path}`;
export type Language = 'es' | 'en';
export type Localized = Record<Language, string>;
export const business = { phone: '34614034687', displayPhone: '+34 614 034 687', whatsapp: 'https://wa.me/message/4SM5WWMZW3CJH1', instagram: 'https://www.instagram.com/yamibakery_/', menu: asset('yami-menu.pdf') };
export const products = [
 {id:'brownies',image:'brownies.webp',name:{es:'Mini brownies',en:'Mini brownies'},description:{es:'Pequeños bocados para grandes momentos.',en:'Little bites for your sweetest moments.'},variants:[{id:'16',price:1200,label:{es:'Caja de 16',en:'Box of 16'}},{id:'32',price:2000,label:{es:'Caja de 32',en:'Box of 32'}},{id:'48',price:3000,label:{es:'Caja de 48',en:'Box of 48'}}]},
 {id:'challah',image:'challah.webp',name:{es:'Jalá',en:'Challah'},description:{es:'Una invitación a compartir alrededor de la mesa.',en:'An invitation to gather around the table.'},variants:[{id:'traditional',price:470,label:{es:'Jalá Tradicional de 480 g',en:'Traditional challah · 480 g'}},{id:'ny',price:470,label:{es:'Jalá NY Style de 480 g',en:'NY Style challah · 480 g'}},{id:'mini',price:280,label:{es:'Mini Jalá de 240 g',en:'Mini challah · 240 g'}}]},
 {id:'coquitos',image:'coquitos.webp',name:{es:'Coquitos',en:'Coconut macaroons'},description:{es:'Un pequeño capricho de coco, hecho con cariño.',en:'A little coconut treat, made with love.'},variants:[{id:'10',price:1400,label:{es:'Bolsa de 10',en:'Bag of 10'}},{id:'20',price:2600,label:{es:'Bolsa de 20',en:'Bag of 20'}}]},
 {id:'cookies',image:'cookies.webp',name:{es:'Cookies con chips de chocolate',en:'Chocolate chip cookies'},description:{es:'Tu pausa más dulce, con chips de chocolate.',en:'Your sweetest pause, with chocolate chips.'},variants:[{id:'6',price:1400,label:{es:'Caja de 6',en:'Box of 6'}}]},
 {id:'almond',image:'almond.webp',name:{es:'Tarta de almendra',en:'Almond Cake'},description:{es:'Para celebrar, compartir o darte un gusto.',en:'For celebrating, sharing, or treating yourself.'},variants:[{id:'large',price:2600,label:{es:'Grande',en:'Large'}},{id:'small',price:1400,label:{es:'Pequeña',en:'Small'}}]},
];
export type Product = typeof products[number];
