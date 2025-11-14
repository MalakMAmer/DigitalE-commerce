import i18n from 'i18next'
import { initReactI18next } from 'react-i18next';

const resources = {
ar: {
translation: {
nav: {
    home: 'الرئيسية',
    products: 'المنتجات',
    services: 'الخدمات',
    offers: 'عروض',
    about: 'من نحن',
    team: 'الفريق',
    contact: 'اتصل بنا',
    signup: 'سجل الآن!'
},
hero: {
    title: 'منصة المنتجات الرقمية العراقية',
    subtitle: 'حلول رقمية مبدعة لكل مشروع',
    cta: 'تسوق الآن'
},
about: {
    title: 'عن الشركة',
    p: 'نحن شركة عراقية متخصصة في بيع المنتجات الرقمية عالية الجودة لمساعدة المشاريع والأفراد على النمو.'
},
team: {
    title: 'فريقنا'
},
products: {
    title: 'منتجاتنا',
    more: 'المزيد'
},
cta: {
    title: 'هل أنت مستعد للبدء؟',
    btn: 'تواصل معنا الآن !'
}
}
},
en: {
translation: {
nav: {
    home: 'Home',
    products: 'Products',    services: 'services',
    about: 'About',
    services: 'services',
    offers: 'offers',
    team: 'Team',
    contact: 'اتصل بنا',
    signup: 'signup'
},
hero: {
    title: 'Iraqi Digital Products Platform',
    subtitle: 'Creative digital solutions for every project',
    cta: 'Shop now'
},
about: {
    title: 'About Us',
    p: 'We are an Iraqi company providing high-quality digital products to help businesses and individuals grow.'
},
team: {
    title: 'Our Team'
},
products: {
    title: 'Our Products',
    more: 'More'
},
cta: {
    title: 'Ready to get started?',
    btn: 'Contact us Now!'
}
}
}
}


i18n.use(initReactI18next).init({
resources,
lng: 'ar',
fallbackLng: 'en',
interpolation: { escapeValue: false }
})


export default i18n