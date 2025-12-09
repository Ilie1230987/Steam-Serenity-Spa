import React, { useState, useEffect } from "react";

// Исправленный single-file React компонент — форма записи на массаж в тёплых тонах.
// Tailwind CSS предполагается подключённым в проекте.
// Копируйте в src/App.jsx (или другой компонент) для запуска в Create React App / Vite + React.

export default function SpaBookingSite() {
  const [form, setForm] = useState({ name: "", phone: "", datetime: "" });
  const [submitted, setSubmitted] = useState(null);

  const reviews = [
    { id: 1, name: "Анна", text: "Невероятно расслабляюще — атмосфера и массаж на высоте!" },
    { id: 2, name: "Игорь", text: "Очень уютное место, мастер отлично знает свое дело." },
    { id: 3, name: "Мария", text: "Записалась на выходные — осталась в восторге. Рекомендую." },
  ];

  useEffect(() => {
    try {
      const last = localStorage.getItem("spa_last_booking");
      if (last) setSubmitted(JSON.parse(last));
    } catch (err) {
      console.warn("Не удалось загрузить последнюю запись:", err);
    }
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm((s) => ({ ...s, [name]: value }));
  }

  function validatePhone(phone) {
    return /^\+?[0-9()\-\s]{7,20}$/.test(phone);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Пожалуйста, укажите имя.");
      return;
    }
    if (!validatePhone(form.phone)) {
      alert("Пожалуйста, укажите корректный телефон.");
      return;
    }
    if (!form.datetime) {
      alert("Пожалуйста, выберите дату и время.");
      return;
    }

    const booking = { ...form, id: Date.now(), createdAt: new Date().toISOString() };
    setSubmitted(booking);

    try {
      localStorage.setItem("spa_last_booking", JSON.stringify(booking));
    } catch (err) {
      console.warn("Не удалось сохранить запись в localStorage:", err);
    }

    setForm({ name: "", phone: "", datetime: "" });
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f7efe6] to-[#efe1d6] text-gray-800">
      <header className="max-w-6xl mx-auto p-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Steam & Serenity Spa</h1>
          <p className="mt-1 text-sm opacity-80">Массаж · Полный релакс</p>
          <p className="text-sm mt-1">Телефон массажиста: <a href="tel:+79043494393" className="font-medium underline">+7 904 349-43-93</a></p>
        </div>

        <nav className="space-x-4 hidden md:block">
          <a href="#reviews" className="text-sm hover:underline">Отзывы</a>
          <a href="#booking" className="text-sm bg-[#caa77b] px-3 py-1 rounded text-white">Записаться</a>
        </nav>
      </header>

      <main className="max-w-6xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        <section className="md:col-span-2">
          <div className="rounded-3xl shadow-lg overflow-hidden p-6 bg-white/60 backdrop-blur-sm">
            <h2 className="text-2xl font-semibold">Добро пожаловать в Steam & Serenity Spa</h2>
            <p className="mt-3 text-gray-700">Тёплая атмосфера и опытные массажисты — идеальное место для отдыха и восстановления. Запишитесь — мы свяжемся для подтверждения.</p>

            <ul className="mt-4 space-y-2">
              <li>• Натуральные масла и расслабляющие ароматы</li>
              <li>• Индивидуальный подход к каждому клиенту</li>
              <li>• Внимание к деталям и гигиене</li>
            </ul>

            <div className="mt-4">
              <a href="#booking" className="inline-block px-4 py-2 rounded-lg bg-[#caa77b] text-white">Записаться</a>
            </div>
          </div>

          <section id="reviews" className="mt-8">
            <h3 className="text-xl font-semibold mb-3">Отзывы клиентов</h3>
            <div className="space-y-4">
              {reviews.map((r) => (
                <blockquote key={r.id} className="p-4 rounded-lg bg-white/60 border-l-4 border-[#e2c9a2]">
                  <div className="flex items-center mb-2 text-yellow-500" aria-hidden>
                    <span>★★★★★</span>
                  </div>
                  <p className="font-medium">{r.text}</p>
                  <footer className="mt-2 text-sm opacity-80">— {r.name}</footer>
                </blockquote>
              ))}
            </div>
          </section>
        </section>

        <aside id="booking" className="rounded-3xl shadow-xl p-6 bg-white/70 backdrop-blur-sm">
          <h2 className="text-2xl font-semibold">Онлайн запись</h2>
          <p className="text-sm mt-1 opacity-80">Заполните форму — мы подтвердим звонком или сообщением.</p>

          <form onSubmit={handleSubmit} className="mt-4 space-y-4">
            <div>
              <label className="block text-sm mb-1">Имя</label>
              <input
                name="name"
                value={form.name}
                onChange={handleChange}
                className="w-full rounded-lg p-3 border border-[#e6d6c0] focus:outline-none"
                placeholder="Ваше имя"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Телефон</label>
              <input
                name="phone"
                value={form.phone}
                onChange={handleChange}
                className="w-full rounded-lg p-3 border border-[#e6d6c0] focus:outline-none"
                placeholder="+7 999 123-45-67"
              />
            </div>

            <div>
              <label className="block text-sm mb-1">Дата и время</label>
              <input
                name="datetime"
                value={form.datetime}
                onChange={handleChange}
                type="datetime-local"
                className="w-full rounded-lg p-3 border border-[#e6d6c0]"
              />
            </div>

            <div>
              <button type="submit" className="w-full rounded-xl py-3 bg-[#b78952] text-white font-semibold">Подтвердить запись</button>
            </div>
          </form>

          {submitted && (
            <div className="mt-4 p-4 rounded-lg bg-[#fff8f0] border border-[#ecd3b8]">
              <strong>Последняя запись</strong>
              <div className="text-sm mt-2">Имя: {submitted.name || "—"}</div>
              <div className="text-sm">Телефон: {submitted.phone}</div>
              <div className="text-sm">Дата/время: {submitted.datetime ? new Date(submitted.datetime).toLocaleString() : "—"}</div>
            </div>
          )}
        </aside>
      </main>

      <footer className="max-w-6xl mx-auto p-6 text-center text-sm opacity-80">
        <div className="mb-2 font-medium">Телефон для записи: <a href="tel:+79043494393" className="underline">+7 904 349-43-93</a></div>
        <div className="mb-2">© {new Date().getFullYear()} Steam & Serenity Spa — все права защищены</div>
        <div className="opacity-60">Удобный онлайн-поиск и запись. Для реальной работы подключите бэкенд (API) для сохранения заявок.</div>
      </footer>
    </div>
  );
}
