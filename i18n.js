/* BTS Group Travel — dil dəyişdirici (AZ / RU / EN).
   Səhifələrin markup-una toxunmur: idarəetmə elementlərini özü əlavə edir,
   mətnləri DOM-da yerində tərcümə edir. Turların məzmunu (adlar, şəhərlər,
   məkanlar, tarixlər) azərbaycanca qalır — tərcümə olunan yalnız interfeysdir. */
(function () {
  'use strict';

  var LANGS = ['az', 'ru', 'en'];
  var KEY = 'bts_lang';

  /* ── Lüğət: açar azərbaycanca sətir, dəyər [rus, ingilis] ───────────── */
  var DICT = {
    /* naviqasiya və başlıq */
    'Ana səhifə': ['Главная', 'Home'],
    'Əsas səhifə': ['Главная', 'Home'],
    'Turlar': ['Туры', 'Tours'],
    'Fərdi turlar': ['Индивидуальные туры', 'Private Tours'],
    'Fərdi tur': ['Индивидуальный тур', 'Private Tour'],
    'Erkən Rezervasiyalar': ['Раннее бронирование', 'Early Booking'],
    'Erkən rezervasiyalar': ['Раннее бронирование', 'Early booking'],
    'Erkən rezervasiya': ['Раннее бронирование', 'Early booking'],
    'Haqqımızda': ['О нас', 'About Us'],
    'Əlaqə': ['Контакты', 'Contact'],
    'Bizimlə əlaqə': ['Связаться', 'Contact Us'],
    'Bizə zəng et': ['Позвонить нам', 'Call Us'],
    'Və ya bizə zəng edin': ['Или позвоните нам', 'Or give us a call'],
    'Avropa turları': ['Туры по Европе', 'Europe Tours'],
    'Menyu': ['Меню', 'Menu'],
    'Bağla': ['Закрыть', 'Close'],
    'Yanan turlar': ['Горящие туры', 'Last-minute Tours'],
    'Sanatoriyalar': ['Санатории', 'Sanatoriums'],

    /* alt hissə */
    'Naviqasiya': ['Навигация', 'Navigation'],
    'Məxfilik siyasəti': ['Политика конфиденциальности', 'Privacy Policy'],
    'Şərtlər': ['Условия', 'Terms'],
    '© 2026 BTS Group Travel. Bütün hüquqlar qorunur.':
      ['© 2026 BTS Group Travel. Все права защищены.', '© 2026 BTS Group Travel. All rights reserved.'],
    'Dünyanı kəşf etmək üçün düşünülmüş səyahət təcrübəsi. Kiçik qruplar, əsl yerlər, hər detal sizin üçün.':
      ['Продуманные путешествия для тех, кто открывает мир. Малые группы, настоящие места, внимание к каждой детали.',
       'Thoughtfully crafted travel for those who explore the world. Small groups, real places, every detail considered.'],
    'Telefon': ['Телефон', 'Phone'],
    'E-poçt': ['Эл. почта', 'Email'],
    'Ünvan': ['Адрес', 'Address'],
    'Xəritədə aç': ['Открыть на карте', 'Open in Maps'],
    'İş saatları': ['Часы работы', 'Opening Hours'],
    'Bazar ertəsi – Cümə': ['Понедельник – пятница', 'Monday – Friday'],
    'Şənbə': ['Суббота', 'Saturday'],
    'Bazar': ['Воскресенье', 'Sunday'],
    'Bağlı': ['Закрыто', 'Closed'],
    'İndi açıqdır': ['Сейчас открыто', 'Open now'],
    'Ofisimizə baş çəkin': ['Загляните в наш офис', 'Visit Our Office'],
    'BTS Group Travel — Bakı ofisi': ['BTS Group Travel — офис в Баку', 'BTS Group Travel — Baku office'],
    'Bakının mərkəzində yerləşirik. Zəng edin, yazın və ya bir fincan qəhvəyə gəlin — marşrutunuzu birlikdə planlaşdıraq.':
      ['Мы в центре Баку. Позвоните, напишите или зайдите на чашку кофе — спланируем маршрут вместе.',
       'We are in central Baku. Call, write or drop by for a coffee — let us plan your route together.'],

    /* filtrlər və sıralama */
    'İstiqamət / Ölkə': ['Направление / страна', 'Destination / Country'],
    'İstiqamət': ['Направление', 'Destination'],
    'Bütün istiqamətlər': ['Все направления', 'All destinations'],
    'bütün istiqamətlər': ['все направления', 'all destinations'],
    '— bütün istiqamətlər': ['— все направления', '— all destinations'],
    '— bütün Avropa istiqamətləri': ['— все направления Европы', '— all European destinations'],
    'Tarix aralığı': ['Период', 'Date Range'],
    'İstənilən tarix': ['Любая дата', 'Any date'],
    'Qiymət': ['Цена', 'Price'],
    'Müddət': ['Длительность', 'Duration'],
    'Fərq etməz': ['Не важно', 'Any'],
    'Sırala:': ['Сортировка:', 'Sort:'],
    'Sıralama': ['Сортировка', 'Sorting'],
    'Tövsiyə olunan': ['Рекомендуемые', 'Recommended'],
    'Qiymət: aşağıdan yuxarı': ['Цена: по возрастанию', 'Price: low to high'],
    'Qiymət: yuxarıdan aşağı': ['Цена: по убыванию', 'Price: high to low'],
    'Tarixə görə': ['По дате', 'By date'],
    'Axtar': ['Поиск', 'Search'],
    '7 günə qədər': ['До 7 дней', 'Up to 7 days'],
    '8–10 gün': ['8–10 дней', '8–10 days'],
    '11 gün və daha çox': ['11 дней и больше', '11 days or more'],
    '2 500 AZN-ə qədər': ['До 2 500 AZN', 'Up to 2,500 AZN'],
    '2 500 – 4 000 AZN': ['2 500 – 4 000 AZN', '2,500 – 4,000 AZN'],
    '4 000 AZN-dən yuxarı': ['Свыше 4 000 AZN', 'Over 4,000 AZN'],
    '800 $-a qədər': ['До 800 $', 'Up to $800'],
    '3000 $-dan yuxarı': ['Свыше 3000 $', 'Over $3,000'],
    'Bütün turlar': ['Все туры', 'All tours'],
    'Bütün turlara bax': ['Все туры', 'View all tours'],
    'Bütün regionlar': ['Все регионы', 'All regions'],
    'Turlara bax': ['Смотреть туры', 'View tours'],
    'Hamısına bax': ['Смотреть все', 'View all'],
    'Daha çox': ['Подробнее', 'More'],
    'Daha çox tur göstər': ['Показать ещё туры', 'Show more tours'],
    'Ətraflı': ['Подробнее', 'Details'],
    'Seçim': ['Выбор', 'Choice'],
    'Seçin…': ['Выберите…', 'Select…'],
    'Seç': ['Выбрать', 'Select'],
    'Dəyiş': ['Изменить', 'Change'],
    'Seçiminiz:': ['Ваш выбор:', 'Your choice:'],
    'Seçilmiş təklif': ['Выбранное предложение', 'Selected offer'],

    /* kateqoriyalar və regionlar */
    'Afrika': ['Африка', 'Africa'],
    'Amerika': ['Америка', 'Americas'],
    'Asiya': ['Азия', 'Asia'],
    'Avropa': ['Европа', 'Europe'],
    'Passiv': ['Пляжный отдых', 'Beach'],
    'Passiv istirahət': ['Пляжный отдых', 'Beach Holidays'],
    'İstirahət': ['Отдых', 'Leisure'],
    'Afrika turları': ['Туры в Африку', 'Africa tours'],
    'Amerika ölkələri': ['Страны Америки', 'The Americas'],
    'Asiya turları': ['Туры в Азию', 'Asia tours'],
    'Şimal': ['Север', 'North'],
    'Cənub': ['Юг', 'South'],
    'Qərb': ['Запад', 'West'],
    'Mərkəz': ['Центр', 'Central'],
    'Şimali Avropa': ['Северная Европа', 'Northern Europe'],
    'Cənubi Avropa': ['Южная Европа', 'Southern Europe'],
    'Qərbi Avropa': ['Западная Европа', 'Western Europe'],
    'Mərkəzi Avropa': ['Центральная Европа', 'Central Europe'],
    'Tur kateqoriyaları': ['Категории туров', 'Tour Categories'],
    'Qrup Turları': ['Групповые туры', 'Group Tours'],
    'Şəhər turları': ['Городские туры', 'City Tours'],
    'Tarixi turlar': ['Исторические туры', 'Historical Tours'],
    'Çimərlik istirahəti': ['Пляжный отдых', 'Beach Holidays'],
    'Afrika safari': ['Сафари в Африке', 'African Safari'],
    'Kruizlər': ['Круизы', 'Cruises'],
    'Sağlamlıq və istirahət': ['Здоровье и отдых', 'Health & Wellness'],
    'Digər istiqamətlər': ['Другие направления', 'Other destinations'],

    /* kart nişanları */
    'Son 1 yer': ['Осталось 1 место', '1 seat left'],
    'Son 2 yer': ['Осталось 2 места', '2 seats left'],
    'Son 3 yer': ['Осталось 3 места', '3 seats left'],
    'Son 4 yer': ['Осталось 4 места', '4 seats left'],
    'Yer yoxdur': ['Мест нет', 'Sold out'],
    'Yer qalmayıb': ['Мест нет', 'Sold out'],
    'Ən sərfəli': ['Самое выгодное', 'Best value'],
    'Ən sərfəli qiymət': ['Лучшая цена', 'Best price'],
    'Təyin olunacaq': ['Уточняется', 'To be announced'],

    /* tur səhifəsi */
    'Tarixlər və qiymətlər': ['Даты и цены', 'Dates & Prices'],
    'Qiymətə nə daxildir': ['Что включено в цену', 'What Is Included'],
    'Qiymətə nələr daxildir': ['Что включено в цену', 'What Is Included'],
    'Qiymətə daxildir': ['Включено в цену', 'Included in the price'],
    'Qiymətə daxil deyil': ['Не включено в цену', 'Not included'],
    'Daxildir': ['Включено', 'Included'],
    'Daxil deyil': ['Не включено', 'Not included'],
    'Ekskursiyalar': ['Экскурсии', 'Excursions'],
    'Tur proqramı': ['Программа тура', 'Itinerary'],
    'Tur haqqında': ['О туре', 'About the tour'],
    'Tur paketinə daxildir': ['Входит в пакет тура', 'Included in the package'],
    'Otel': ['Отель', 'Hotel'],
    'Otel və yerləşmə': ['Отель и проживание', 'Hotel & Accommodation'],
    'Vacib qeydlər': ['Важные замечания', 'Important Notes'],
    'Vacib qeydlər və şərtlər': ['Важные замечания и условия', 'Important Notes & Terms'],
    'Qeyd': ['Примечание', 'Note'],
    'Rezervasiya sorğusu': ['Заявка на бронирование', 'Booking Request'],
    'Rezervasiya sorğusu göndər': ['Отправить заявку', 'Send booking request'],
    'Rezervasiya et': ['Забронировать', 'Book now'],
    'Tura qeydiyyat': ['Записаться на тур', 'Register for the tour'],
    'WhatsApp ilə yaz': ['Написать в WhatsApp', 'Message on WhatsApp'],
    'WhatsApp ilə soruş': ['Спросить в WhatsApp', 'Ask on WhatsApp'],
    'Zəng': ['Звонок', 'Call'],
    'Və ya:': ['Или:', 'Or:'],
    'Tarix': ['Дата', 'Date'],
    'Tarix *': ['Дата *', 'Date *'],
    'Tarix seçimi': ['Выбор даты', 'Date options'],
    'Təxmini tarix': ['Примерная дата', 'Approximate date'],
    'Otaq tipi': ['Тип номера', 'Room type'],
    'Nəfər sayı': ['Количество человек', 'Number of people'],
    '2 nəfərlik': ['2-местный', 'Double'],
    '3 nəfərlik': ['3-местный', 'Triple'],
    '2 nəfərlik otaq': ['2-местный номер', 'Double room'],
    '1 nəfər': ['1 человек', '1 person'],
    '2 nəfər': ['2 человека', '2 people'],
    '3 nəfər': ['3 человека', '3 people'],
    '4 nəfər': ['4 человека', '4 people'],
    '5+ nəfər': ['5+ человек', '5+ people'],
    '1 nəfər üçün': ['на 1 человека', 'per person'],
    '-dan / 1 nəfər': ['от / 1 человек', 'from / per person'],
    'Bənzər turlar': ['Похожие туры', 'Similar Tours'],
    'Bənzər fərdi turlar': ['Похожие индивидуальные туры', 'Similar Private Tours'],
    'Bütün fərdi turlar ▸': ['Все индивидуальные туры ▸', 'All private tours ▸'],
    'Bütün şəkillərə bax ▸': ['Смотреть все фото ▸', 'View all photos ▸'],
    'Qidalanma': ['Питание', 'Meals'],
    'Səhər yeməyi': ['Завтрак', 'Breakfast'],
    'səhər yeməyi ilə': ['с завтраком', 'with breakfast'],
    'Şəhərdaxili nəqliyyat': ['Городской транспорт', 'Local transport'],
    'Giriş biletləri': ['Входные билеты', 'Entrance tickets'],
    'Giriş bileti ayrıca': ['Входной билет отдельно', 'Entrance ticket separate'],
    'Səyahət sığortası': ['Страховка', 'Travel insurance'],
    'Şəxsi xərclər': ['Личные расходы', 'Personal expenses'],
    'Aviabilet': ['Авиабилет', 'Flight'],
    'Aviabilet daxil': ['Авиабилет включён', 'Flight included'],
    'Aviabilet (gediş–gəliş)': ['Авиабилет (туда–обратно)', 'Flight (return)'],
    'Tur rəhbəri': ['Гид', 'Tour guide'],
    'Peşəkar tur rəhbəri': ['Профессиональный гид', 'Professional guide'],
    'Şəxsi bələdçi': ['Личный гид', 'Personal guide'],
    'VIP transfer': ['VIP-трансфер', 'VIP transfer'],
    '24/7 resepşn': ['Ресепшн 24/7', '24/7 reception'],
    'Mərkəzə yaxın': ['Рядом с центром', 'Near the centre'],
    '4★ otel': ['Отель 4★', '4★ hotel'],
    'Seçilmiş otellər': ['Отобранные отели', 'Hand-picked hotels'],
    'Kiçik qruplar': ['Малые группы', 'Small groups'],
    '24/7 dəstək': ['Поддержка 24/7', '24/7 support'],
    'Yerlər məhduddur — təsdiq 24 saat ərzində':
      ['Мест ограниченное количество — подтверждение в течение 24 часов',
       'Limited seats — confirmation within 24 hours'],
    'Yerlər məhduddur · təsdiq 24 saat ərzində':
      ['Мест ограниченное количество · подтверждение в течение 24 часов',
       'Limited seats · confirmation within 24 hours'],

    /* formalar */
    'Ad, Soyad': ['Имя, фамилия', 'Full name'],
    'Ad, Soyad *': ['Имя, фамилия *', 'Full name *'],
    'Adınız': ['Ваше имя', 'Your name'],
    'Adınızı yazın': ['Введите имя', 'Enter your name'],
    'Adınız və soyadınız': ['Имя и фамилия', 'First and last name'],
    'Telefon / WhatsApp': ['Телефон / WhatsApp', 'Phone / WhatsApp'],
    'Telefon / WhatsApp *': ['Телефон / WhatsApp *', 'Phone / WhatsApp *'],
    'WhatsApp nömrəsi': ['Номер WhatsApp', 'WhatsApp number'],
    'E-mail': ['E-mail', 'Email'],
    'Əlavə qeyd': ['Дополнительно', 'Additional notes'],
    'Mesajınız': ['Ваше сообщение', 'Your message'],
    'Mesaj göndərin': ['Отправить сообщение', 'Send a Message'],
    'Mesajı göndər': ['Отправить сообщение', 'Send message'],
    'Sorğu göndər': ['Отправить запрос', 'Send request'],
    'Sorğunu göndər': ['Отправить запрос', 'Send request'],
    'Müraciəti göndər': ['Отправить заявку', 'Submit application'],
    'Təklif al': ['Получить предложение', 'Get an offer'],
    'Müraciət et': ['Оставить заявку', 'Apply'],
    'Göndərilir...': ['Отправляется...', 'Sending...'],
    'Göndərilir…': ['Отправляется…', 'Sending…'],
    'Yenidən cəhd et': ['Попробовать снова', 'Try again'],
    'Nəsə səhv getdi': ['Что-то пошло не так', 'Something went wrong'],
    'Sorğunuz qəbul edildi': ['Заявка принята', 'Request received'],
    'Müraciətiniz qəbul edildi!': ['Заявка принята!', 'Request received!'],
    'Maraqlandığınız tur': ['Интересующий тур', 'Tour of interest'],
    'Fərdi marşrut': ['Индивидуальный маршрут', 'Custom route'],
    'İstiqamət və təxmini tarix': ['Направление и примерная дата', 'Destination and approximate date'],
    'Sizin marşrutunuz': ['Ваш маршрут', 'Your route'],
    'Təxmini büdcə (1 nəfər)': ['Примерный бюджет (1 человек)', 'Approximate budget (per person)'],
    'Şəxsi məlumatların işlənməsi ilə razıyam':
      ['Согласен на обработку персональных данных', 'I agree to the processing of my personal data'],
    'Şəxsi məlumatlarımın işlənməsi ilə razıyam':
      ['Согласен на обработку персональных данных', 'I agree to the processing of my personal data'],
    'Vacib qeydlər və ləğvetmə şərtləri ilə tanış oldum':
      ['Ознакомлен с важными замечаниями и условиями отмены',
       'I have read the important notes and cancellation terms'],
    'Menecer 24 saat ərzində sizinlə əlaqə saxlayacaq.':
      ['Менеджер свяжется с вами в течение 24 часов.', 'A manager will contact you within 24 hours.'],
    'Menecer 24 saat ərzində sizinlə əlaqə saxlayıb yeri təsdiqləyəcək.':
      ['Менеджер свяжется с вами в течение 24 часов и подтвердит место.',
       'A manager will contact you within 24 hours and confirm your seat.'],
    'Komandamız 24 saat ərzində sizinlə əlaqə saxlayacaq. Təşəkkür edirik.':
      ['Наша команда свяжется с вами в течение 24 часов. Спасибо.',
       'Our team will contact you within 24 hours. Thank you.'],
    'Formu doldurun — komandamız 24 saat ərzində sizinlə əlaqə saxlayacaq.':
      ['Заполните форму — наша команда свяжется с вами в течение 24 часов.',
       'Fill in the form — our team will contact you within 24 hours.'],
    'Formu doldurun — menecer 24 saat ərzində əlaqə saxlayıb yeri təsdiqləyir.':
      ['Заполните форму — менеджер свяжется в течение 24 часов и подтвердит место.',
       'Fill in the form — a manager will confirm your seat within 24 hours.'],
    'Formu doldurun — sizə qısa zamanda geri dönüş edək.':
      ['Заполните форму — мы свяжемся с вами в ближайшее время.',
       'Fill in the form — we will get back to you shortly.'],
    'Təşəkkürlər! Mesajınız göndərildi — tezliklə sizinlə əlaqə saxlayacağıq.':
      ['Спасибо! Сообщение отправлено — скоро свяжемся с вами.',
       'Thank you! Your message has been sent — we will be in touch soon.'],
    'Məlumatlarınız yalnız qeydiyyat üçün istifadə olunur və gizli saxlanılır.':
      ['Ваши данные используются только для регистрации и хранятся конфиденциально.',
       'Your details are used for registration only and kept confidential.'],
    '24 saat ərzində cavab': ['Ответ в течение 24 часов', 'Reply within 24 hours'],

    /* bölmə başlıqları və çağırışlar */
    'Növbəti macəranıza hazırsınız?': ['Готовы к следующему приключению?', 'Ready for your next adventure?'],
    'Növbəti macəranı seç': ['Выберите следующее приключение', 'Choose your next adventure'],
    'Növbəti macəra': ['Следующее приключение', 'Next adventure'],
    'Axtardığınız marşrutu tapmadınız?': ['Не нашли нужный маршрут?', 'Cannot find the route you want?'],
    'Uyğun tarix və ya istiqamət tapmadınız?':
      ['Не нашли подходящую дату или направление?', 'Cannot find a suitable date or destination?'],
    'Hara getmək istədiyinizi bilirsinizmi?': ['Уже знаете, куда хотите поехать?', 'Know where you want to go?'],
    'Turunuzu birlikdə quraq': ['Составим ваш тур вместе', 'Let us build your tour together'],
    'Səyahətinizi planlaşdıraq': ['Спланируем ваше путешествие', 'Let us plan your trip'],
    'Səyahəti sənət kimi düşünürük': ['Мы относимся к путешествию как к искусству', 'We treat travel as an art'],
    'Dünyanın ən gözəl istiqamətləri': ['Самые красивые направления мира', 'The world’s most beautiful destinations'],
    'Sizin üçün gözəl yerlər': ['Прекрасные места для вас', 'Beautiful places for you'],
    'Son dəqiqə təklifləri': ['Горящие предложения', 'Last-minute Deals'],
    'Birlikdə daha yaxşı': ['Вместе лучше', 'Better together'],
    'Bizi seçməyiniz üçün səbəblər': ['Почему выбирают нас', 'Why choose us'],
    'Səyahət': ['Путешествие', 'Travel'],
    'Daha şəxsi və rahat təcrübə üçün.': ['Для более личного и комфортного опыта.', 'For a more personal, comfortable experience.'],
    'Hər addımda peşəkar dəstək.': ['Профессиональная поддержка на каждом шаге.', 'Professional support at every step.'],
    'Səyahət boyu daim yanınızdayıq.': ['Мы рядом на протяжении всего путешествия.', 'We are with you throughout the journey.'],
    'Yoxlanılmış, keyfiyyətli məkanlar.': ['Проверенные, качественные места.', 'Verified, quality places.'],
    'İstədiyiniz şəhərlər, tarixlər və büdcəyə uyğun marşrutu birlikdə quraq. Bizimlə əlaqə saxlayın, qalanını biz düşünək.':
      ['Составим маршрут под ваши города, даты и бюджет. Свяжитесь с нами — об остальном подумаем мы.',
       'We will build a route around your cities, dates and budget. Get in touch — we will handle the rest.'],
    'İstiqaməti deyin — marşrutu, otelləri və qiyməti 24 saat ərzində sizin üçün hazırlayaq.':
      ['Назовите направление — маршрут, отели и цену подготовим за 24 часа.',
       'Tell us the destination — we will prepare the route, hotels and price within 24 hours.'],
    'Kiçik qruplar, əsl yerlər və şəxsən aparılan səyahətlər — unudulmaz xatirələr üçün diqqətlə qurulmuş marşrutlar.':
      ['Малые группы, настоящие места и путешествия с личным сопровождением — маршруты, собранные ради незабываемых впечатлений.',
       'Small groups, real places and personally led journeys — routes built for memories that last.'],
    'Kiçik qruplarla, yeni dostlarla və peşəkar bələdçi ilə unudulmaz səyahətlər.':
      ['Незабываемые путешествия в малых группах, с новыми друзьями и профессиональным гидом.',
       'Unforgettable journeys in small groups, with new friends and a professional guide.'],
    'İstədiyiniz istirahət növünü seçin — biz qalan hər şeyi sizin üçün hazırlayaq.':
      ['Выберите формат отдыха — остальное подготовим мы.',
       'Choose the kind of holiday you want — we will arrange the rest.'],
    'Məhdud sayda yerlər, endirimli qiymətlər. Təkliflər bitənə qədər tələsin.':
      ['Ограниченное число мест, сниженные цены. Успейте, пока предложения не закончились.',
       'Limited seats, reduced prices. Hurry before the offers run out.'],
    'İndidən rezervasiya edin — ən sərfəli qiymət və zəmanətli yer sizin olsun.':
      ['Бронируйте заранее — лучшая цена и гарантированное место.',
       'Book early — best price and a guaranteed seat.'],
    'Bütün tarixlər və istiqamətlər açıqdır — istədiyinizi seçin.':
      ['Все даты и направления открыты — выбирайте любое.',
       'All dates and destinations are open — take your pick.'],
    'Nə qədər tez rezervasiya etsəniz, qiymət bir o qədər sərfəli olur.':
      ['Чем раньше бронируете, тем выгоднее цена.', 'The earlier you book, the better the price.'],
    'Qruplar məhduddur — yerinizi indidən təsdiqləyin, gec olmasın.':
      ['Группы ограничены — подтвердите место заранее, пока не поздно.',
       'Groups are limited — confirm your seat before it is too late.'],
    'İstədiyiniz tarixə yerinizi indidən tutun. Komandamız sizə ən uyğun marşrutu seçməkdə kömək edəcək.':
      ['Забронируйте место на нужную дату заранее. Наша команда поможет подобрать подходящий маршрут.',
       'Reserve your place for the date you want. Our team will help you pick the right route.'],
    'Hissə-hissə ödəniş imkanı ilə səyahətinizi rahat planlaşdırın.':
      ['Планируйте путешествие спокойно — с оплатой частями.',
       'Plan your trip comfortably with instalment payments.'],
    'Tez tərpənin — ən yaxşı yerlər tez bitir': ['Не тяните — лучшие места уходят быстро', 'Move fast — the best seats go quickly'],
    'Geniş seçim': ['Широкий выбор', 'Wide choice'],
    'Rahat ödəniş': ['Удобная оплата', 'Convenient payment'],
    'Yeriniz zəmanətli': ['Место гарантировано', 'Your seat is guaranteed'],
    'Hər səyahəti fərqləndirən detallar — kiçik komandadan böyük qayğıya qədər.':
      ['Детали, которые отличают каждое путешествие — от небольшой команды до большой заботы.',
       'The details that set each journey apart — from a small team to great care.'],
    'Bu istiqamətlərin hər birini də sizin tarixinizə uyğun fərdi qura bilərik.':
      ['Каждое из этих направлений мы можем собрать индивидуально под ваши даты.',
       'We can build any of these destinations privately around your dates.'],
    'Qiymətlər dinamikdir, yerlər məhduddur': ['Цены динамические, мест ограниченное количество', 'Prices are dynamic, seats are limited'],
    'Ödəniş manatla, günün məzənnəsi ilə': ['Оплата в манатах по курсу дня', 'Payment in manat at the daily rate'],
    'Məhdud yerlər — rezervasiya ardıcıllıqla təsdiqlənir.':
      ['Мест мало — бронирования подтверждаются по очереди.',
       'Limited seats — bookings are confirmed in order.'],
    'Qrup turu olduğu üçün xidmətlərdə və tur proqramında dəyişiklik ola bilər.':
      ['Так как это групповой тур, услуги и программа могут измениться.',
       'As this is a group tour, services and the programme may change.'],
    'Qiymət 2 nəfərlik otaqda 1 nəfər üçün nəzərdə tutulub.':
      ['Цена указана за 1 человека в 2-местном номере.',
       'The price is per person in a double room.'],
    'Qiymət 2 və ya 3 nəfərlik otaqda 1 nəfər üçün nəzərdə tutulub.':
      ['Цена указана за 1 человека в 2- или 3-местном номере.',
       'The price is per person in a double or triple room.'],
    'Ödənişlər yalnız manatla, günün məzənnəsinə uyğun qəbul edilir.':
      ['Оплата принимается только в манатах по курсу дня.',
       'Payments are accepted in manat only, at the daily rate.'],
    'Ödənişlər manatla, günün məzənnəsinə uyğun qəbul edilir.':
      ['Оплата принимается в манатах по курсу дня.',
       'Payments are accepted in manat at the daily rate.'],

    /* ana səhifə: hero və bölmə mətnləri */
    'Dünyanı kəşf et,': ['Открой мир,', 'Discover the world,'],
    'həyatı yaşa': ['живи по-настоящему', 'live it fully'],
    '— Bütün turlar': ['— все туры', '— all tours'],
    'Müalicə, mineral sular və dincəlik — Azərbaycanın ən yaxşı sağlamlıq mərkəzləri.':
      ['Лечение, минеральные воды и отдых — лучшие оздоровительные центры Азербайджана.',
       'Treatment, mineral waters and rest — the finest wellness centres in Azerbaijan.'],
    'BTS Group Travel kiçik qruplar üçün diqqətlə qurulmuş səyahətlər təşkil edir. Hər marşrut əl ilə seçilir, uçuşdan otelə qədər hər detal sizin rahatlığınız üçün düşünülür.':
      ['BTS Group Travel организует путешествия, собранные для малых групп. Каждый маршрут подбирается вручную, и каждая деталь — от перелёта до отеля — продумана ради вашего комфорта.',
       'BTS Group Travel creates journeys built for small groups. Every route is chosen by hand, and every detail — from the flight to the hotel — is considered for your comfort.'],

    /* daxili səhifələrin alt başlıqları */
    'Bütün aktiv istiqamətlər bir yerdə — region üzrə süzgəcdən keçirin, qiymət və ya tarixə görə sıralayın. Hər tur kiçik qruplar üçün diqqətlə hazırlanıb.':
      ['Все активные направления в одном месте — фильтруйте по региону, сортируйте по цене или дате. Каждый тур подготовлен для малых групп.',
       'Every active destination in one place — filter by region, sort by price or date. Each tour is built for small groups.'],
    'İndidən planlayın, daha sərfəli səyahət edin. Qarşıdan gələn turlara erkən rezervasiya ilə ən yaxşı qiymət və zəmanətli yer əldə edin.':
      ['Планируйте заранее — путешествуйте выгоднее. Ранняя бронь на ближайшие туры даёт лучшую цену и гарантированное место.',
       'Plan ahead and travel for less. Booking upcoming tours early gets you the best price and a guaranteed seat.'],
    'Şimal işıqlarından Aralıq dənizi sahillərinə qədər — kiçik qruplar üçün diqqətlə qurulmuş Avropa marşrutları. Hər tur əl ilə seçilmiş otellər və yerli bələdçilərlə.':
      ['От северного сияния до берегов Средиземного моря — европейские маршруты, собранные для малых групп. В каждом туре отобранные вручную отели и местные гиды.',
       'From the northern lights to the Mediterranean shore — European routes built for small groups. Every tour with hand-picked hotels and local guides.'],
    'Fərdi tur qururuq: istiqaməti və təxmini tarixi yazın — menecer 24 saat ərzində marşrut və dəqiq qiymətlə təklif göndərəcək.':
      ['Составим индивидуальный тур: напишите направление и примерную дату — менеджер за 24 часа пришлёт маршрут и точную цену.',
       'We will build a private tour: send us the destination and approximate dates — a manager will reply within 24 hours with a route and exact price.'],
    'Sualınız var, yoxsa fərdi marşrut istəyirsiniz? Bizə zəng edin, yazın və ya ofisimizə baş çəkin — komandamız hər addımda yanınızdadır.':
      ['Есть вопрос или нужен индивидуальный маршрут? Позвоните, напишите или загляните в офис — команда рядом на каждом шаге.',
       'Have a question or want a custom route? Call, write or visit our office — our team is with you at every step.'],
    'İstədiyiniz şəhərlər, tarixlər və büdcəyə uyğun fərdi marşrut da qura bilərik. Bizimlə əlaqə saxlayın, qalanını biz düşünək.':
      ['Можем собрать индивидуальный маршрут под ваши города, даты и бюджет. Свяжитесь с нами — об остальном подумаем мы.',
       'We can also build a private route around your cities, dates and budget. Get in touch — we will handle the rest.'],
    'Avropa üzrə fərdi marşrut da qura bilərik — istədiyiniz şəhərlər, tarixlər və büdcəyə uyğun. Bizimlə əlaqə saxlayın, qalanını biz düşünək.':
      ['Можем собрать и индивидуальный маршрут по Европе — под ваши города, даты и бюджет. Свяжитесь с нами, об остальном подумаем мы.',
       'We can build a private route across Europe too — around your cities, dates and budget. Get in touch and we will handle the rest.'],

    /* tur səhifəsi: nişanlar, qeydlər, proqram */
    'Məhdud yer': ['Мест мало', 'Limited seats'],
    'MƏHDUD YER': ['МЕСТ МАЛО', 'LIMITED SEATS'],
    'Gəliş günü': ['День приезда', 'Arrival day'],
    'Qayıdış günü': ['День отъезда', 'Departure day'],
    '4★ otel — şəhər mərkəzində': ['Отель 4★ — в центре города', '4★ hotel — in the city centre'],
    'Mərkəzə yaxın · əsas məkanlara piyada məsafədə':
      ['Рядом с центром · до главных мест пешком', 'Near the centre · main sights within walking distance'],
    'Bütün ekskursiyalara transfer daxildir, giriş biletləri ayrıca ödənilir.':
      ['Трансфер до всех экскурсий включён, входные билеты оплачиваются отдельно.',
       'Transfer to all excursions is included, entrance tickets are paid separately.'],
    'Bütün ekskursiyalara VIP transfer daxildir, giriş biletləri ayrıca ödənilir.':
      ['VIP-трансфер до всех экскурсий включён, входные билеты оплачиваются отдельно.',
       'VIP transfer to all excursions is included, entrance tickets are paid separately.'],
    'Gün-gün marşrut. Saatlar və ardıcıllıq qrup üçün ümumidir.':
      ['Маршрут по дням. Время и порядок общие для группы.',
       'A day-by-day route. Times and order are the same for the whole group.'],
    'Uçuş, hava limanında qarşılanma və otelə transfer. Yerləşmə, sərbəst vaxt və axşam qısa şəhər gəzintisi.':
      ['Перелёт, встреча в аэропорту и трансфер в отель. Заселение, свободное время и короткая вечерняя прогулка по городу.',
       'Flight, airport welcome and transfer to the hotel. Check-in, free time and a short evening walk around the city.'],
    'Sərbəst vaxt, hava limanına transfer və qayıdış uçuşu.':
      ['Свободное время, трансфер в аэропорт и обратный перелёт.',
       'Free time, transfer to the airport and the return flight.'],
    'Qiymət 2 nəfərlik otaqda 1 nəfər üçündür.':
      ['Цена указана за 1 человека в 2-местном номере.', 'The price is per person in a double room.'],
    'Nahar və şam yeməyi qiymətə daxil deyil.':
      ['Обед и ужин не включены в цену.', 'Lunch and dinner are not included in the price.'],
    'Şəhərdaxili nəqliyyat və giriş biletləri qiymətə daxil deyil.':
      ['Городской транспорт и входные билеты не включены в цену.',
       'Local transport and entrance tickets are not included in the price.'],
    'Şəhərdaxili nəqliyyat və muzeylərin giriş biletləri qiymətə daxil deyil.':
      ['Городской транспорт и входные билеты в музеи не включены в цену.',
       'Local transport and museum entrance tickets are not included in the price.'],
    'Viza dəstəyi Visum.az tərəfindən ödənişsiz göstərilir.':
      ['Визовая поддержка предоставляется Visum.az бесплатно.',
       'Visa support is provided free of charge by Visum.az.'],
    'Yerlər məhduddur — rezervasiya ardıcıllıqla təsdiqlənir.':
      ['Мест мало — бронирования подтверждаются по очереди.',
       'Limited seats — bookings are confirmed in order.'],
    'Yerlər məhduddur — rezervasiya menecer təsdiqindən sonra qüvvəyə minir.':
      ['Мест мало — бронирование вступает в силу после подтверждения менеджера.',
       'Limited seats — the booking takes effect once a manager confirms it.'],
    'Qrup turu olduğu üçün proqramda kiçik dəyişikliklər ola bilər.':
      ['Так как это групповой тур, в программе возможны небольшие изменения.',
       'As this is a group tour, small changes to the programme are possible.'],
    'Qrup turu olduğu üçün saatlarda və ardıcıllıqda kiçik dəyişikliklər ola bilər.':
      ['Так как это групповой тур, время и порядок могут немного меняться.',
       'As this is a group tour, times and order may shift slightly.'],
    'Hər üç şəhərdə mərkəzə yaxın 4 ulduzlu otellərdə yerləşmə. Səhər yeməyi qiymətə daxildir. Konkret otel adları tur təsdiqlənəndə göndərilir.':
      ['Во всех трёх городах — размещение в 4-звёздочных отелях рядом с центром. Завтрак включён в цену. Названия конкретных отелей присылаются при подтверждении тура.',
       'In all three cities, accommodation in 4-star hotels near the centre. Breakfast is included. Exact hotel names are sent once the tour is confirmed.'],


    /* adlar: turlar */
    'Lüks & macəra dolu Dubay turu': ['Роскошный тур в Дубай с приключениями', 'Luxury & adventure Dubai tour'],
    'Roma–Milan–Paris turu': ['Тур Рим–Милан–Париж', 'Rome–Milan–Paris tour'],
    'Skandinaviya turu': ['Тур по Скандинавии', 'Scandinavia tour'],
    'Benelüks turu': ['Тур по Бенилюксу', 'Benelux tour'],
    'Budapeşt–Praqa–Vyana turu': ['Тур Будапешт–Прага–Вена', 'Budapest–Prague–Vienna tour'],
    'ABŞ turu': ['Тур в США', 'USA tour'],
    'Braziliya–Argentina turu': ['Тур Бразилия–Аргентина', 'Brazil–Argentina tour'],
    'Keniya–Tanzaniya safari': ['Сафари Кения–Танзания', 'Kenya–Tanzania safari'],
    'Mərakeş–Səhra turu': ['Тур Марракеш–Сахара', 'Marrakesh–Sahara tour'],
    'Bali macərası': ['Приключение на Бали', 'Bali adventure'],
    'Tailand macərası': ['Приключение в Таиланде', 'Thailand adventure'],
    'Maldiv lüksü': ['Мальдивы, люкс', 'Maldives luxury'],
    'Antalya istirahəti': ['Отдых в Анталье', 'Antalya holiday'],
    'İspaniya turu': ['Тур по Испании', 'Spain tour'],
    'İsveçrə Alpları turu': ['Тур по Швейцарским Альпам', 'Swiss Alps tour'],
    'London–Edinburq turu': ['Тур Лондон–Эдинбург', 'London–Edinburgh tour'],
    'Yunanıstan adaları turu': ['Тур по островам Греции', 'Greek islands tour'],
    'Hazır proqramlar sizə uyğun gəlmirsə — turu sıfırdan sizin üçün qururuq. İstiqaməti, tarixi, oteli və büdcəni siz seçirsiniz, marşrutu, biletləri və transferi biz düzəldirik.':
      ['Если готовые программы вам не подходят — соберём тур с нуля. Направление, даты, отель и бюджет выбираете вы, а маршрут, билеты и трансфер берём на себя.',
       'If the ready-made programmes do not suit you, we will build the tour from scratch. You choose the destination, dates, hotel and budget; we arrange the route, tickets and transfers.'],

    /* məzmun: şəhərlər, məkanlar, siyahılar, proqram */
    'Bakı': ['Баку', 'Baku'],
    'Dubay': ['Дубай', 'Dubai'],
    'Dubay, BƏƏ': ['Дубай, ОАЭ', 'Dubai, UAE'],
    'Roma': ['Рим', 'Rome'],
    'Milan': ['Милан', 'Milan'],
    'Paris': ['Париж', 'Paris'],
    'Kopenhagen': ['Копенгаген', 'Copenhagen'],
    'Oslo': ['Осло', 'Oslo'],
    'Stokholm': ['Стокгольм', 'Stockholm'],
    'Amsterdam': ['Амстердам', 'Amsterdam'],
    'Brüssel': ['Брюссель', 'Brussels'],
    'Lüksemburq': ['Люксембург', 'Luxembourg'],
    'Budapeşt': ['Будапешт', 'Budapest'],
    'Praqa': ['Прага', 'Prague'],
    'Vyana': ['Вена', 'Vienna'],
    'Nyu-York': ['Нью-Йорк', 'New York'],
    'Vaşinqton': ['Вашингтон', 'Washington'],
    'Vatikan': ['Ватикан', 'Vatican'],
    'Rio': ['Рио', 'Rio'],
    'Buenos-Ayres': ['Буэнос-Айрес', 'Buenos Aires'],
    'Nairobi': ['Найроби', 'Nairobi'],
    'Serengeti': ['Серенгети', 'Serengeti'],
    'Zanzibar': ['Занзибар', 'Zanzibar'],
    'Mərakeş': ['Марракеш', 'Marrakesh'],
    'Səhra': ['Сахара', 'Sahara'],
    'Fes': ['Фес', 'Fez'],
    'Ubud': ['Убуд', 'Ubud'],
    'Seminyak': ['Семиньяк', 'Seminyak'],
    'Nusa': ['Нуса', 'Nusa'],
    'Bangkok': ['Бангкок', 'Bangkok'],
    'Phuket': ['Пхукет', 'Phuket'],
    'Krabi': ['Краби', 'Krabi'],
    'Male': ['Мале', 'Male'],
    'atollar': ['атоллы', 'atolls'],
    'Antalya': ['Анталья', 'Antalya'],
    'Side': ['Сиде', 'Side'],
    'Kemer': ['Кемер', 'Kemer'],
    'Barselona': ['Барселона', 'Barcelona'],
    'Madrid': ['Мадрид', 'Madrid'],
    'Sevilya': ['Севилья', 'Seville'],
    'Sürix': ['Цюрих', 'Zurich'],
    'Lüsern': ['Люцерн', 'Lucerne'],
    'İnterlaken': ['Интерлакен', 'Interlaken'],
    'London': ['Лондон', 'London'],
    'Edinburq': ['Эдинбург', 'Edinburgh'],
    'Afina': ['Афины', 'Athens'],
    'Santorini': ['Санторини', 'Santorini'],
    'Mikonos': ['Миконос', 'Mykonos'],
    'Duomo katedralı': ['Собор Дуомо', 'Duomo Cathedral'],
    'Eyfel qülləsi': ['Эйфелева башня', 'Eiffel Tower'],
    'Kolizey': ['Колизей', 'Colosseum'],
    'Luvr muzeyi': ['Лувр', 'The Louvre'],
    'Cruise gəzintisi': ['Морская прогулка', 'Cruise trip'],
    'Səhra safari': ['Сафари по пустыне', 'Desert safari'],
    'Səhra safari turu': ['Тур-сафари по пустыне', 'Desert safari tour'],
    '4★ lüks oteldə gecələmə': ['Проживание в люксовом отеле 4★', 'Stay in a 4★ luxury hotel'],
    'Aviabilet, otel və transfer bir paketdə': ['Авиабилет, отель и трансфер одним пакетом', 'Flight, hotel and transfer in one package'],
    'Ekskursiyaların giriş biletləri': ['Входные билеты на экскурсии', 'Excursion entrance tickets'],
    'Gündəlik ləzzətli səhər yeməyi': ['Вкусный завтрак каждый день', 'A delicious breakfast every day'],
    'Gündəlik səhər yeməyi': ['Ежедневный завтрак', 'Daily breakfast'],
    'Nahar və şam yeməyi': ['Обед и ужин', 'Lunch and dinner'],
    'Otel xidmətləri: hovuz, sauna, spa, trenajor': ['Услуги отеля: бассейн, сауна, спа, тренажёрный зал', 'Hotel facilities: pool, sauna, spa, gym'],
    'Rəsmi müqavilə və qəbz': ['Официальный договор и квитанция', 'Official contract and receipt'],
    'Şəhər vergisi (torpaq basdı)': ['Городской налог', 'City tax'],
    'Şəhər vergisi (torpaq basdı) qiymətə daxil deyil.': ['Городской налог не включён в цену.', 'City tax is not included in the price.'],
    'VIP qrup transferi — rahat və sürətli nəqliyyat': ['VIP-трансфер для группы — комфортно и быстро', 'VIP group transfer — comfortable and fast'],
    'Transfer daxil': ['Трансфер включён', 'Transfer included'],
    'Adrenalin dolu səhrada macəra.': ['Приключение в пустыне, полное адреналина.', 'An adrenaline-filled desert adventure.'],
    'Alış-veriş cənnəti.': ['Рай для шопинга.', 'A shopping paradise.'],
    'Dənizdə romantik axşam.': ['Романтический вечер в море.', 'A romantic evening at sea.'],
    'Dubayın panoramik mənzərəsi.': ['Панорамный вид на Дубай.', 'A panoramic view of Dubai.'],
    'Dünyanın ən böyük muzeylərindən biri.': ['Один из крупнейших музеев мира.', 'One of the largest museums in the world.'],
    'Dünyanın ən hündür göydələni.': ['Самый высокий небоскрёб мира.', 'The tallest skyscraper in the world.'],
    'Günəş, qum və dəniz.': ['Солнце, песок и море.', 'Sun, sand and sea.'],
    'Milanın mərkəzindəki qotik katedral və dam terrası.': ['Готический собор в центре Милана и терраса на крыше.', 'A Gothic cathedral in central Milan with a rooftop terrace.'],
    'Milanın tarixi alış-veriş qalereyası.': ['Историческая торговая галерея Милана.', 'Milan’s historic shopping gallery.'],
    'Müqəddəs Pyotr bazilikası və Vatikan muzeyləri.': ['Базилика Святого Петра и музеи Ватикана.', 'St Peter’s Basilica and the Vatican Museums.'],
    'Ölkələrin mədəniyyəti, bazarları və yeməkləri.': ['Культура, базары и кухня разных стран.', 'Cultures, markets and food from around the world.'],
    'Parisin simvolu və Trocadéro meydanından mənzərə.': ['Символ Парижа и вид с площади Трокадеро.', 'The symbol of Paris and the view from Trocadéro.'],
    'Qədim Romanın simvolu — amfiteatr və Forum ərazisi.': ['Символ древнего Рима — амфитеатр и Форум.', 'The symbol of ancient Rome — the amphitheatre and the Forum.'],
    'Texnologiya və virtual reallıqla dolu dünya.': ['Мир технологий и виртуальной реальности.', 'A world of technology and virtual reality.'],
    'Təbiətin sehrli möcüzəsi.': ['Волшебное чудо природы.', 'A magical wonder of nature.'],
    'Duomo katedralı, Galleria Vittorio Emanuele II, Sforza qəsri.': ['Собор Дуомо, Галерея Виктора Эммануила II, замок Сфорца.', 'Duomo Cathedral, Galleria Vittorio Emanuele II, Sforza Castle.'],
    'Eyfel qülləsi, Trocadéro, Luvr muzeyi və Şanzelize.': ['Эйфелева башня, Трокадеро, Лувр и Елисейские Поля.', 'The Eiffel Tower, Trocadéro, the Louvre and the Champs-Élysées.'],
    'Kolizey, Roma Forumu və Palatin təpəsi. Trevi fəvvarəsi və İspan pillələri.': ['Колизей, Римский форум и Палатинский холм. Фонтан Треви и Испанская лестница.', 'The Colosseum, Roman Forum and Palatine Hill. The Trevi Fountain and the Spanish Steps.'],
    'Müqəddəs Pyotr bazilikası, Vatikan muzeyləri. Günün ikinci yarısı sərbəst.': ['Базилика Святого Петра и музеи Ватикана. Вторая половина дня свободна.', 'St Peter’s Basilica and the Vatican Museums. The afternoon is free.'],
    'Parisə keçid və otelə yerləşmə. Sena çayı boyunca axşam gəzintisi.': ['Переезд в Париж и заселение в отель. Вечерняя прогулка по Сене.', 'Transfer to Paris and hotel check-in. An evening walk along the Seine.'],
    'Qatarla Milana keçid, otelə yerləşmə, Duomo meydanı ətrafında gəzinti.': ['Переезд в Милан на поезде, заселение в отель, прогулка у площади Дуомо.', 'Train to Milan, hotel check-in and a walk around Duomo square.'],
    '2 və ya 3 nəfərlik otaqda · ödəniş manatla': ['В 2- или 3-местном номере · оплата в манатах', 'In a double or triple room · payment in manat'],
    'Möhtəşəm ekskursiyalar': ['Впечатляющие экскурсии', 'Remarkable excursions'],
    'Fərdi tur sorğusu': ['Заявка на индивидуальный тур', 'Private tour request'],
    'Yeni İl': ['Новый год', 'New Year'],
    'Zəfər Turu': ['Тур Победы', 'Victory Tour'],
    'Ödənişli ekskursiyalara transfer daxildir, giriş biletləri qiymətə daxil deyil.': ['Трансфер до платных экскурсий включён, входные билеты в цену не входят.', 'Transfer to paid excursions is included; entrance tickets are not.'],
    'Ödənişli ekskursiyalara transfer daxildir, lakin giriş biletləri daxil deyil.': ['Трансфер до платных экскурсий включён, но входные билеты — нет.', 'Transfer to paid excursions is included, but entrance tickets are not.'],
    'Formanı doldurun — menecer 24 saat ərzində sizinlə əlaqə saxlayıb marşrut və dəqiq qiymət təklifi göndərəcək. Sorğu heç bir öhdəlik yaratmır.': ['Заполните форму — менеджер свяжется с вами в течение 24 часов и пришлёт маршрут с точной ценой. Заявка ни к чему не обязывает.', 'Fill in the form — a manager will contact you within 24 hours with a route and an exact price. The request carries no obligation.'],
    'Marşrutdakı hər şəhərdə mərkəzə yaxın 4 ulduzlu otellərdə yerləşmə. Səhər yeməyi qiymətə daxildir. Konkret otel adları tur təsdiqlənəndə göndərilir.': ['В каждом городе маршрута — размещение в 4-звёздочных отелях рядом с центром. Завтрак включён в цену. Названия конкретных отелей присылаются при подтверждении тура.', 'In every city on the route, accommodation in 4-star hotels near the centre. Breakfast is included. Exact hotel names are sent once the tour is confirmed.'],
    'Qızıl şəhərdə unudulmaz anlar: VIP xidmət, əyləncə və rahatlıq — hamısı bir turda. Metrosuz, piyada gəzintisiz, tam VIP nəqliyyat xidməti ilə.': ['Незабываемые дни в золотом городе: VIP-сервис, развлечения и комфорт — всё в одном туре. Без метро и пеших переходов, только VIP-транспорт.', 'Unforgettable days in the golden city: VIP service, entertainment and comfort in one tour. No metro, no long walks — VIP transport throughout.'],
    'Duz mağarası': ['Соляная пещера', 'Salt cave'],
    'Neft müalicəsi': ['Нефтяные ванны', 'Oil therapy'],
    'Mineral sular': ['Минеральные воды', 'Mineral waters'],
    'Termal sular': ['Термальные воды', 'Thermal waters'],
    'Kəlbəcər': ['Кельбаджар', 'Kalbajar'],
    'Naxçıvan': ['Нахчыван', 'Nakhchivan'],
    'Şabran': ['Шабран', 'Shabran'],

    'VIP qrup transferi': ['VIP-трансфер для группы', 'VIP group transfer'],
    /* səhifə başlıqları (<title>) */
    'Turlar — BTS Group Travel': ['Туры — BTS Group Travel', 'Tours — BTS Group Travel'],
    'Fərdi turlar — BTS Group Travel': ['Индивидуальные туры — BTS Group Travel', 'Private Tours — BTS Group Travel'],
    'Avropa turları — BTS Group Travel': ['Туры по Европе — BTS Group Travel', 'Europe Tours — BTS Group Travel'],
    'Erkən Rezervasiyalar — BTS Group Travel': ['Раннее бронирование — BTS Group Travel', 'Early Booking — BTS Group Travel'],
    'Haqqımızda — BTS Group Travel': ['О нас — BTS Group Travel', 'About Us — BTS Group Travel'],
    'Əlaqə — BTS Group Travel': ['Контакты — BTS Group Travel', 'Contact — BTS Group Travel'],
    'BTS Group Travel — Səyahət': ['BTS Group Travel — Путешествия', 'BTS Group Travel — Travel']
  };

  /* ── Aylar: [adlıq hal, yiyəlik hal] — tarixlərdə «4–12 İyul» üçün ──── */
  var MONTHS = {
    'Yanvar':   { ru: ['Январь', 'января'],   en: ['January', 'January'] },
    'Fevral':   { ru: ['Февраль', 'февраля'], en: ['February', 'February'] },
    'Mart':     { ru: ['Март', 'марта'],      en: ['March', 'March'] },
    'Aprel':    { ru: ['Апрель', 'апреля'],   en: ['April', 'April'] },
    'May':      { ru: ['Май', 'мая'],         en: ['May', 'May'] },
    'İyun':     { ru: ['Июнь', 'июня'],       en: ['June', 'June'] },
    'İyul':     { ru: ['Июль', 'июля'],       en: ['July', 'July'] },
    'Avqust':   { ru: ['Август', 'августа'],  en: ['August', 'August'] },
    'Sentyabr': { ru: ['Сентябрь', 'сентября'], en: ['September', 'September'] },
    'Oktyabr':  { ru: ['Октябрь', 'октября'], en: ['October', 'October'] },
    'Noyabr':   { ru: ['Ноябрь', 'ноября'],   en: ['November', 'November'] },
    'Dekabr':   { ru: ['Декабрь', 'декабря'], en: ['December', 'December'] }
  };
  var MONTH_RE = new RegExp('(' + Object.keys(MONTHS).join('|') + ')', 'g');

  function ruPlural(n, one, few, many) {
    var d = n % 10, h = n % 100;
    if (d === 1 && h !== 11) return one;
    if (d >= 2 && d <= 4 && (h < 10 || h >= 20)) return few;
    return many;
  }
  /* «Asiya · 5 gün» -> «Азия · 5 дней»; левая часть может быть пустой */
  function comp(m, lang) {
    var l = m[1].trim(), r = m[2].trim();
    var R = translate(r, lang);
    return l ? (translate(l, lang) + ' · ' + R) : ('· ' + R);
  }


  /* ── Şablonlar: rəqəmli sətirlər («13 tur», «Cəmi (2 nəfər)») ──────── */
  var RULES = [
    { re: /^(\d+)\s+tur$/,
      ru: function (m) { return m[1] + ' ' + ruPlural(+m[1], 'тур', 'тура', 'туров'); },
      en: function (m) { return m[1] + ' tour' + (+m[1] === 1 ? '' : 's'); } },
    { re: /^(\d+)\s+gün$/,
      ru: function (m) { return m[1] + ' ' + ruPlural(+m[1], 'день', 'дня', 'дней'); },
      en: function (m) { return m[1] + ' day' + (+m[1] === 1 ? '' : 's'); } },
    { re: /^(\d+)\s+gün\s*\/\s*(\d+)\s+gecə$/,
      ru: function (m) { return m[1] + ' ' + ruPlural(+m[1], 'день', 'дня', 'дней') + ' / ' + m[2] + ' ' + ruPlural(+m[2], 'ночь', 'ночи', 'ночей'); },
      en: function (m) { return m[1] + ' day' + (+m[1] === 1 ? '' : 's') + ' / ' + m[2] + ' night' + (+m[2] === 1 ? '' : 's'); } },
    { re: /^(\d+)\s+nəfər$/,
      ru: function (m) { return m[1] + ' ' + ruPlural(+m[1], 'человек', 'человека', 'человек'); },
      en: function (m) { return m[1] + ' ' + (+m[1] === 1 ? 'person' : 'people'); } },
    { re: /^Cəmi\s*\((\d+)\s*nəfər\)$/,
      ru: function (m) { return 'Итого (' + m[1] + ' ' + ruPlural(+m[1], 'человек', 'человека', 'человек') + ')'; },
      en: function (m) { return 'Total (' + m[1] + ' ' + (+m[1] === 1 ? 'person' : 'people') + ')'; } },
    { re: /^SON\s+(\d+)\s+YER$/,
      ru: function (m) { return 'ОСТАЛОСЬ ' + m[1] + ' ' + ruPlural(+m[1], 'МЕСТО', 'МЕСТА', 'МЕСТ'); },
      en: function (m) { return m[1] + ' SEAT' + (+m[1] === 1 ? '' : 'S') + ' LEFT'; } },
    { re: /^(\d+)\s+tarix$/,
      ru: function (m) { return m[1] + ' ' + ruPlural(+m[1], 'дата', 'даты', 'дат'); },
      en: function (m) { return m[1] + ' date' + (+m[1] === 1 ? '' : 's'); } },
    { re: /^(.*)\s+AZN-ə qədər$/,
      ru: function (m) { return 'До ' + m[1] + ' AZN'; },
      en: function (m) { return 'Up to ' + m[1] + ' AZN'; } },
    { re: /^(\d+)\s+yer\s+qalıb$/,
      ru: function (m) { return 'осталось ' + m[1] + ' ' + ruPlural(+m[1], 'место', 'места', 'мест'); },
      en: function (m) { return m[1] + ' seat' + (+m[1] === 1 ? '' : 's') + ' left'; } },
    { re: /^\+(\d+)\s+şəkil$/,
      ru: function (m) { return '+' + m[1] + ' фото'; },
      en: function (m) { return '+' + m[1] + ' photos'; } },
    // «2-ci gün — Roma»: номер дня переводим, название города оставляем
    { re: /^(\d+)-(?:ci|cı|cü|cu)\s+gün\s*—\s*([\s\S]*)$/,
      ru: function (m) { return 'День ' + m[1] + ' — ' + translate(m[2], 'ru'); },
      en: function (m) { return 'Day ' + m[1] + ' — ' + translate(m[2], 'en'); } },
    { re: /^Son gün\s*—\s*([\s\S]*)$/,
      ru: function (m) { return 'Последний день — ' + translate(m[1], 'ru'); },
      en: function (m) { return 'Last day — ' + translate(m[1], 'en'); } },
    // «Məhdud yer — Son 2 yer»: хвост собирается отдельно, переводим его рекурсивно
    { re: /^Məhdud yer\s*—\s*([\s\S]+)$/,
      ru: function (m) { return 'Мест мало — ' + translate(m[1], 'ru'); },
      en: function (m) { return 'Limited seats — ' + translate(m[1], 'en'); } },
    { re: /^(\d+)\s+möhtəşəm məkan\.\s*([\s\S]*)$/,
      ru: function (m) { return m[1] + ' ' + ruPlural(+m[1], 'великолепное место', 'великолепных места', 'великолепных мест') + '. ' + translate(m[2], 'ru'); },
      en: function (m) { return m[1] + ' remarkable place' + (+m[1] === 1 ? '' : 's') + '. ' + translate(m[2], 'en'); } },
    /* бейдж в каталоге строится через toUpperCase() */
    { re: /^(\d+)\s+YER\s+QALIB$/,
      ru: function (m) { return 'ОСТАЛОСЬ ' + m[1] + ' ' + ruPlural(+m[1], 'МЕСТО', 'МЕСТА', 'МЕСТ'); },
      en: function (m) { return m[1] + ' SEAT' + (+m[1] === 1 ? '' : 'S') + ' LEFT'; } },
    /* «X üzrə şəhər turu ...» — город переводим отдельно */
    { re: /^([\s\S]+?) üzrə şəhər turu və əsas məkanlar\.$/,
      ru: function (m) { return 'Городской тур по ' + translate(m[1], 'ru') + ' и главные места.'; },
      en: function (m) { return 'City tour of ' + translate(m[1], 'en') + ' and the main sights.'; } },
    { re: /^([\s\S]+?) üzrə ekskursiya proqramı və əsas məkanlar\. Günün bir hissəsi sərbəst vaxtdır\.$/,
      ru: function (m) { return 'Экскурсионная программа по ' + translate(m[1], 'ru') + ' и главные места. Часть дня — свободное время.'; },
      en: function (m) { return 'Excursion programme in ' + translate(m[1], 'en') + ' and the main sights. Part of the day is free time.'; } },
    { re: /^([\s\S]+?) — (\d+) gün ərzində diqqətlə qurulmuş marşrut\. Kiçik qrup, əl ilə seçilmiş otellər və yerli bələdçi ilə unudulmaz təcrübə\.$/,
      ru: function (m) { return translate(m[1], 'ru') + ' — маршрут, продуманный на ' + m[2] + ' ' + ruPlural(+m[2], 'день', 'дня', 'дней') + '. Малая группа, отобранные вручную отели и местный гид — незабываемые впечатления.'; },
      en: function (m) { return translate(m[1], 'en') + ' — a route carefully built over ' + m[2] + ' day' + (+m[2] === 1 ? '' : 's') + '. A small group, hand-picked hotels and a local guide for an unforgettable experience.'; } },
    /* «Bakı → Roma» — переводим обе части */
    { re: /^([^→]+)→([\s\S]+)$/,
      ru: function (m) { return translate(m[1].trim(), 'ru') + ' → ' + translate(m[2].trim(), 'ru'); },
      en: function (m) { return translate(m[1].trim(), 'en') + ' → ' + translate(m[2].trim(), 'en'); } },
    /* составные строки вида «Asiya · 5 gün» — переводим части по отдельности.
       Должно идти последним: точные правила выше имеют приоритет. */
    { re: /^([^·]*)·([\s\S]+)$/,
      ru: function (m) { return comp(m, 'ru'); },
      en: function (m) { return comp(m, 'en'); } }
  ];

  /* ── Tərcümə nüvəsi ─────────────────────────────────────────────────── */
  var IDX = { ru: 0, en: 1 };

  function swapMonths(s, lang) {
    if (!MONTH_RE.test(s)) { MONTH_RE.lastIndex = 0; return null; }
    MONTH_RE.lastIndex = 0;
    // callback String.replace: (uyğunluq, qrup, mövqe, bütün sətir)
    return s.replace(MONTH_RE, function (m, name, off, whole) {
      var before = whole.slice(0, off);
      var genitive = /\d[\s.]*$/.test(before);   // «4–12 İyul» → yiyəlik hal
      return MONTHS[name][lang][genitive ? 1 : 0];
    });
  }

  function translate(raw, lang) {
    if (lang === 'az') return raw;
    var m = raw.match(/^(\s*)([\s\S]*?)(\s*)$/);
    var pre = m[1], key = m[2], post = m[3];
    if (!key) return raw;

    var hit = DICT[key];
    if (hit) return pre + hit[IDX[lang]] + post;

    for (var i = 0; i < RULES.length; i++) {
      var r = key.match(RULES[i].re);
      if (r) return pre + RULES[i][lang](r) + post;
    }

    var months = swapMonths(key, lang);
    if (months && months !== key) return pre + months + post;

    return raw;
  }

  /* ── DOM gəzişməsi ──────────────────────────────────────────────────── */
  var SKIP = { SCRIPT: 1, STYLE: 1, NOSCRIPT: 1, CODE: 1, PRE: 1 };
  var ATTRS = ['placeholder', 'title', 'aria-label', 'alt'];

  /* Müşahidəçi öz dəyişikliklərimizi görməməlidir. Bayraq işə yaramır —
     MutationObserver geriçağırışları asinxrondur və bayraq artıq sıfırlanmış olur.
     Ona görə tərcümə vaxtı müşahidəçini tamamilə söndürürük. */
  var mo = null;
  // characterData da lazımdır: cms.js mətni fetch-dən sonra mövcud düyünə yazır
  var OPTS = { childList: true, subtree: true, characterData: true };
  function pause() { if (mo) mo.disconnect(); }
  function resume() { if (mo) mo.observe(document.body, OPTS); }

  function skip(el) {
    for (var n = el; n; n = n.parentElement) {
      if (SKIP[n.nodeName]) return true;
      if (n.hasAttribute && n.hasAttribute('data-no-i18n')) return true;
    }
    return false;
  }

  function applyTo(root, lang) {
    // mətn düyünləri
    var walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, null);
    var batch = [], node;
    while ((node = walker.nextNode())) batch.push(node);
    batch.forEach(function (t) {
      if (!t.nodeValue || !t.nodeValue.trim()) return;
      if (t.parentElement && skip(t.parentElement)) return;
      if (t.__az === undefined) t.__az = t.nodeValue;
      // bir sətirdəki xəta bütün səhifənin tərcüməsini dayandırmamalıdır
      try {
        var next = translate(t.__az, lang);
        if (t.nodeValue !== next) t.nodeValue = next;
      } catch (e) { if (window.console) console.warn('i18n:', e.message, t.__az); }
    });

    // istifadəçinin gördüyü atributlar
    var els = root.querySelectorAll ? root.querySelectorAll('[placeholder],[title],[aria-label],[alt]') : [];
    [].forEach.call(els, function (el) {
      if (skip(el)) return;
      if (!el.__azAttr) {
        el.__azAttr = {};
        ATTRS.forEach(function (a) { if (el.hasAttribute(a)) el.__azAttr[a] = el.getAttribute(a); });
      }
      ATTRS.forEach(function (a) {
        if (el.__azAttr[a] === undefined) return;
        var next = translate(el.__azAttr[a], lang);
        if (el.getAttribute(a) !== next) el.setAttribute(a, next);
      });
    });
  }

  var titleAz = null;

  function apply(lang) {
    pause();
    if (titleAz === null) titleAz = document.title;
    document.title = translate(titleAz, lang);
    document.documentElement.lang = lang;
    applyTo(document.body, lang);
    resume();
  }

  /* ── İdarəetmə elementləri ──────────────────────────────────────────── */
  /* ── Состояние и запуск ──────────────────────────────────────────────
     Кнопками владеет lang.js. Движок только переводит:
     сам поднимает сохранённый язык и даёт apply() наружу.          */
  var current = 'az';

  function stored() {
    var q = (location.search.match(/[?&]lang=(az|ru|en)\b/) || [])[1];
    if (q) return q;
    try { return localStorage.getItem(KEY) || 'az'; } catch (e) { return 'az'; }
  }

  function applyLang(lang) {
    if (LANGS.indexOf(lang) < 0) return;
    current = lang;
    apply(lang);
  }

  function init() {
    current = stored();
    if (LANGS.indexOf(current) < 0) current = 'az';
    if (current !== 'az') apply(current);

    /* блоки, которые появляются позже: карточки из cms.js, мобильное меню,
       секции страницы тура — их тоже нужно перевести */
    if (window.MutationObserver) {
      mo = new MutationObserver(function (muts) {
        if (current === 'az') return;
        var nodes = [], texts = [];
        muts.forEach(function (m) {
          var host = (m.target && m.target.nodeType === 3) ? m.target.parentElement : m.target;
          /* свои элементы управления не трогаем — иначе бесконечный цикл */
          if (host && host.closest && host.closest('[data-no-i18n], .lang, .lang-seg')) return;

          if (m.type === 'characterData') {
            /* во время своих записей наблюдатель отключён, значит это чужая:
               обновляем источник, иначе вернётся старый перевод */
            m.target.__az = m.target.nodeValue;
            texts.push(m.target);
            return;
          }

          [].forEach.call(m.addedNodes, function (n) {
            if (n.nodeType === 1) nodes.push(n);
            else if (n.nodeType === 3 && n.parentElement) nodes.push(n.parentElement);
          });
        });
        if (!nodes.length && !texts.length) return;
        pause();
        nodes.forEach(function (n) { applyTo(n, current); });
        texts.forEach(function (t) {
          try {
            var next = translate(t.__az, current);
            if (t.nodeValue !== next) t.nodeValue = next;
          } catch (e) {}
        });
        resume();
      });
      resume();
    }
  }

  window.btsI18n = {
    apply: applyLang,
    translate: translate,
    get: function () { return current; }
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
