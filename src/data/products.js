// single source for photos: Unsplash (random from the same collection)
const UNSPLASH_BASE = 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?w=1200&q=80&auto=format&fit=crop'


export const products = [
{
id: 'p1',
title: { ar: 'قالب متجر إلكتروني', en: 'E-commerce Template' },
short: { ar: 'قالب جاهز متجر الكتروني', en: 'Ready-to-use e-commerce template' },
price: '15$',
image: `${UNSPLASH_BASE}&ixid=1`,
description: { ar: 'وصف مفصل للمنتج الأول...', en: 'Detailed description for product one...' }
},
{
id: 'p2',
title: { ar: 'باقة لوجو', en: 'Logo Pack' },
short: { ar: 'باقة شعارات احترافية', en: 'Professional logo pack' },
price: '10$',
image: `${UNSPLASH_BASE}&ixid=2`,
description: { ar: 'وصف مفصل للمنتج الثاني...', en: 'Detailed description for product two...' }
},
{
id: 'p3',
title: { ar: 'قالب عرض تقديمي', en: 'Presentation Template' },
short: { ar: 'قالب عرض احترافي', en: 'Professional presentation template' },
price: '8$',
image: `${UNSPLASH_BASE}&ixid=3`,
description: { ar: 'وصف مفصل للمنتج الثالث...', en: 'Detailed description for product three...' }
}
]


export default products