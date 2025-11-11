import React from 'react'
import { useTranslation } from 'react-i18next'


const sample = [
{ name: 'أحمد', role: 'مصمم' },
{ name: 'سارة', role: 'مطور' },
{ name: 'علي', role: 'مدير مشاريع' }
]



function Team() {
    const { t } = useTranslation()
  return (
    <section id="team" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl font-bold mb-8">{t('team.title')}</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-16">
        {sample.map((p, i) => (
            <div key={i} className="p-4 border rounded-lg text-center" data-aos="fade-up">
            <div className="h-24 w-24 rounded-full bg-gray-100 mx-auto mb-3 flex items-center justify-center">{p.name[0]}</div>
            <h4 className="font-semibold">{p.name}</h4>
            <p className="text-sm text-gray-600">{p.role}</p>
            </div>
        ))}
        </div>
        </div>
    </section>
  )
}

export default Team