// script.js - Ultra Professional Unit Converter
(function() {
  'use strict';

  // ==================== CONFIGURACIÓN Y CONSTANTES ====================
  const CONFIG = {
    loadingDuration: 2500,
    animationDelay: 100,
    themes: [
      { name: 'dark', icon: '🌙', label: { es: 'Oscuro', en: 'Dark', fr: 'Sombre', de: 'Dunkel', pt: 'Escuro', it: 'Scuro', ru: 'Тёмный', zh: '深色', ja: 'ダーク', ar: 'مظلم' } },
      { name: 'light', icon: '☀️', label: { es: 'Claro', en: 'Light', fr: 'Clair', de: 'Hell', pt: 'Claro', it: 'Chiaro', ru: 'Светлый', zh: '浅色', ja: 'ライト', ar: 'فاتح' } },
      { name: 'green', icon: '🌿', label: { es: 'Verde', en: 'Green', fr: 'Vert', de: 'Grün', pt: 'Verde', it: 'Verde', ru: 'Зелёный', zh: '绿色', ja: 'グリーン', ar: 'أخضر' } },
      { name: 'purple', icon: '💜', label: { es: 'Púrpura', en: 'Purple', fr: 'Violet', de: 'Lila', pt: 'Roxo', it: 'Viola', ru: 'Фиолетовый', zh: '紫色', ja: 'パープル', ar: 'بنفسجي' } }
    ],
    languages: [
      { code: 'es', name: 'Español', flag: '🇪🇸', nativeName: 'Español' },
      { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
      { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
      { code: 'de', name: 'Deutsch', flag: '🇩🇪', nativeName: 'Deutsch' },
      { code: 'pt', name: 'Português', flag: '🇧🇷', nativeName: 'Português' },
      { code: 'it', name: 'Italiano', flag: '🇮🇹', nativeName: 'Italiano' },
      { code: 'ru', name: 'Русский', flag: '🇷🇺', nativeName: 'Русский' },
      { code: 'zh', name: '中文', flag: '🇨🇳', nativeName: '中文' },
      { code: 'ja', name: '日本語', flag: '🇯🇵', nativeName: '日本語' },
      { code: 'ar', name: 'العربية', flag: '🇸🇦', nativeName: 'العربية' }
    ]
  };

  // ==================== SISTEMA DE UNIDADES ====================
  const UNITS = {
    length: {
      meter: { name: { es: "Metro", en: "Meter", fr: "Mètre", de: "Meter", pt: "Metro", it: "Metro", ru: "Метр", zh: "米", ja: "メートル", ar: "متر" }, symbol: "m", toBase: v => v, fromBase: v => v },
      kilometer: { name: { es: "Kilómetro", en: "Kilometer", fr: "Kilomètre", de: "Kilometer", pt: "Quilômetro", it: "Chilometro", ru: "Километр", zh: "千米", ja: "キロメートル", ar: "كيلومتر" }, symbol: "km", toBase: v => v * 1000, fromBase: v => v / 1000 },
      centimeter: { name: { es: "Centímetro", en: "Centimeter", fr: "Centimètre", de: "Zentimeter", pt: "Centímetro", it: "Centimetro", ru: "Сантиметр", zh: "厘米", ja: "センチメートル", ar: "سنتيمتر" }, symbol: "cm", toBase: v => v / 100, fromBase: v => v * 100 },
      millimeter: { name: { es: "Milímetro", en: "Millimeter", fr: "Millimètre", de: "Millimeter", pt: "Milímetro", it: "Millimetro", ru: "Миллиметр", zh: "毫米", ja: "ミリメートル", ar: "مليمتر" }, symbol: "mm", toBase: v => v / 1000, fromBase: v => v * 1000 },
      mile: { name: { es: "Milla", en: "Mile", fr: "Mille", de: "Meile", pt: "Milha", it: "Miglio", ru: "Миля", zh: "英里", ja: "マイル", ar: "ميل" }, symbol: "mi", toBase: v => v * 1609.344, fromBase: v => v / 1609.344 },
      yard: { name: { es: "Yarda", en: "Yard", fr: "Yard", de: "Yard", pt: "Jarda", it: "Iarda", ru: "Ярд", zh: "码", ja: "ヤード", ar: "ياردة" }, symbol: "yd", toBase: v => v * 0.9144, fromBase: v => v / 0.9144 },
      foot: { name: { es: "Pie", en: "Foot", fr: "Pied", de: "Fuß", pt: "Pé", it: "Piede", ru: "Фут", zh: "英尺", ja: "フィート", ar: "قدم" }, symbol: "ft", toBase: v => v * 0.3048, fromBase: v => v / 0.3048 },
      inch: { name: { es: "Pulgada", en: "Inch", fr: "Pouce", de: "Zoll", pt: "Polegada", it: "Pollice", ru: "Дюйм", zh: "英寸", ja: "インチ", ar: "بوصة" }, symbol: "in", toBase: v => v * 0.0254, fromBase: v => v / 0.0254 }
    },
    mass: {
      kilogram: { name: { es: "Kilogramo", en: "Kilogram", fr: "Kilogramme", de: "Kilogramm", pt: "Quilograma", it: "Chilogrammo", ru: "Килограмм", zh: "千克", ja: "キログラム", ar: "كيلوغرام" }, symbol: "kg", toBase: v => v, fromBase: v => v },
      gram: { name: { es: "Gramo", en: "Gram", fr: "Gramme", de: "Gramm", pt: "Grama", it: "Grammo", ru: "Грамм", zh: "克", ja: "グラム", ar: "غرام" }, symbol: "g", toBase: v => v / 1000, fromBase: v => v * 1000 },
      milligram: { name: { es: "Miligramo", en: "Milligram", fr: "Milligramme", de: "Milligramm", pt: "Miligrama", it: "Milligrammo", ru: "Миллиграмм", zh: "毫克", ja: "ミリグラム", ar: "مليغرام" }, symbol: "mg", toBase: v => v / 1e6, fromBase: v => v * 1e6 },
      pound: { name: { es: "Libra", en: "Pound", fr: "Livre", de: "Pfund", pt: "Libra", it: "Libbra", ru: "Фунт", zh: "磅", ja: "ポンド", ar: "رطل" }, symbol: "lb", toBase: v => v * 0.45359237, fromBase: v => v / 0.45359237 },
      ounce: { name: { es: "Onza", en: "Ounce", fr: "Once", de: "Unze", pt: "Onça", it: "Oncia", ru: "Унция", zh: "盎司", ja: "オンス", ar: "أونصة" }, symbol: "oz", toBase: v => v * 0.0283495231, fromBase: v => v / 0.0283495231 },
      ton: { name: { es: "Tonelada", en: "Ton", fr: "Tonne", de: "Tonne", pt: "Tonelada", it: "Tonnellata", ru: "Тонна", zh: "吨", ja: "トン", ar: "طن" }, symbol: "t", toBase: v => v * 1000, fromBase: v => v / 1000 }
    },
    time: {
      second: { name: { es: "Segundo", en: "Second", fr: "Seconde", de: "Sekunde", pt: "Segundo", it: "Secondo", ru: "Секунда", zh: "秒", ja: "秒", ar: "ثانية" }, symbol: "s", toBase: v => v, fromBase: v => v },
      minute: { name: { es: "Minuto", en: "Minute", fr: "Minute", de: "Minute", pt: "Minuto", it: "Minuto", ru: "Минута", zh: "分钟", ja: "分", ar: "دقيقة" }, symbol: "min", toBase: v => v * 60, fromBase: v => v / 60 },
      hour: { name: { es: "Hora", en: "Hour", fr: "Heure", de: "Stunde", pt: "Hora", it: "Ora", ru: "Час", zh: "小时", ja: "時間", ar: "ساعة" }, symbol: "h", toBase: v => v * 3600, fromBase: v => v / 3600 },
      day: { name: { es: "Día", en: "Day", fr: "Jour", de: "Tag", pt: "Dia", it: "Giorno", ru: "День", zh: "天", ja: "日", ar: "يوم" }, symbol: "d", toBase: v => v * 86400, fromBase: v => v / 86400 },
      week: { name: { es: "Semana", en: "Week", fr: "Semaine", de: "Woche", pt: "Semana", it: "Settimana", ru: "Неделя", zh: "周", ja: "週", ar: "أسبوع" }, symbol: "w", toBase: v => v * 604800, fromBase: v => v / 604800 },
      month: { name: { es: "Mes", en: "Month", fr: "Mois", de: "Monat", pt: "Mês", it: "Mese", ru: "Месяц", zh: "月", ja: "月", ar: "شهر" }, symbol: "mo", toBase: v => v * 2629746, fromBase: v => v / 2629746 },
      year: { name: { es: "Año", en: "Year", fr: "Année", de: "Jahr", pt: "Ano", it: "Anno", ru: "Год", zh: "年", ja: "年", ar: "سنة" }, symbol: "y", toBase: v => v * 31556952, fromBase: v => v / 31556952 }
    },
    temperature: {
      celsius: { 
        name: { es: "Celsius", en: "Celsius", fr: "Celsius", de: "Celsius", pt: "Celsius", it: "Celsius", ru: "Цельсий", zh: "摄氏度", ja: "摂氏", ar: "مئوية" }, 
        symbol: "°C", 
        toBase: v => v + 273.15, 
        fromBase: v => v - 273.15 
      },
      fahrenheit: { 
        name: { es: "Fahrenheit", en: "Fahrenheit", fr: "Fahrenheit", de: "Fahrenheit", pt: "Fahrenheit", it: "Fahrenheit", ru: "Фаренгейт", zh: "华氏度", ja: "華氏", ar: "فهرنهايت" }, 
        symbol: "°F", 
        toBase: v => (v - 32) * 5/9 + 273.15, 
        fromBase: v => (v - 273.15) * 9/5 + 32 
      },
      kelvin: { 
        name: { es: "Kelvin", en: "Kelvin", fr: "Kelvin", de: "Kelvin", pt: "Kelvin", it: "Kelvin", ru: "Кельвин", zh: "开尔文", ja: "ケルビン", ar: "كلفن" }, 
        symbol: "K", 
        toBase: v => v, 
        fromBase: v => v 
      }
    },
    area: {
      square_meter: { name: { es: "Metro Cuadrado", en: "Square Meter", fr: "Mètre Carré", de: "Quadratmeter", pt: "Metro Quadrado", it: "Metro Quadrato", ru: "Квадратный метр", zh: "平方米", ja: "平方メートル", ar: "متر مربع" }, symbol: "m²", toBase: v => v, fromBase: v => v },
      square_kilometer: { name: { es: "Kilómetro Cuadrado", en: "Square Kilometer", fr: "Kilomètre Carré", de: "Quadratkilometer", pt: "Quilômetro Quadrado", it: "Chilometro Quadrato", ru: "Квадратный километр", zh: "平方千米", ja: "平方キロメートル", ar: "كيلومتر مربع" }, symbol: "km²", toBase: v => v * 1e6, fromBase: v => v / 1e6 },
      square_centimeter: { name: { es: "Centímetro Cuadrado", en: "Square Centimeter", fr: "Centimètre Carré", de: "Quadratzentimeter", pt: "Centímetro Quadrado", it: "Centimetro Quadrato", ru: "Квадратный сантиметр", zh: "平方厘米", ja: "平方センチメートル", ar: "سنتيمتر مربع" }, symbol: "cm²", toBase: v => v / 1e4, fromBase: v => v * 1e4 },
      hectare: { name: { es: "Hectárea", en: "Hectare", fr: "Hectare", de: "Hektar", pt: "Hectare", it: "Ettaro", ru: "Гектар", zh: "公顷", ja: "ヘクタール", ar: "هكتار" }, symbol: "ha", toBase: v => v * 1e4, fromBase: v => v / 1e4 },
      acre: { name: { es: "Acre", en: "Acre", fr: "Acre", de: "Acre", pt: "Acre", it: "Acro", ru: "Акр", zh: "英亩", ja: "エーカー", ar: "فدان" }, symbol: "ac", toBase: v => v * 4046.86, fromBase: v => v / 4046.86 }
    },
    volume: {
      liter: { name: { es: "Litro", en: "Liter", fr: "Litre", de: "Liter", pt: "Litro", it: "Litro", ru: "Литр", zh: "升", ja: "リットル", ar: "لتر" }, symbol: "L", toBase: v => v, fromBase: v => v },
      milliliter: { name: { es: "Mililitro", en: "Milliliter", fr: "Millilitre", de: "Milliliter", pt: "Mililitro", it: "Millilitro", ru: "Миллилитр", zh: "毫升", ja: "ミリリットル", ar: "مليلتر" }, symbol: "mL", toBase: v => v / 1000, fromBase: v => v * 1000 },
      cubic_meter: { name: { es: "Metro Cúbico", en: "Cubic Meter", fr: "Mètre Cube", de: "Kubikmeter", pt: "Metro Cúbico", it: "Metro Cubo", ru: "Кубический метр", zh: "立方米", ja: "立方メートル", ar: "متر مكعب" }, symbol: "m³", toBase: v => v * 1000, fromBase: v => v / 1000 },
      gallon: { name: { es: "Galón", en: "Gallon", fr: "Gallon", de: "Gallone", pt: "Galão", it: "Gallone", ru: "Галлон", zh: "加仑", ja: "ガロン", ar: "غالون" }, symbol: "gal", toBase: v => v * 3.78541, fromBase: v => v / 3.78541 },
      quart: { name: { es: "Cuarto", en: "Quart", fr: "Quart", de: "Quart", pt: "Quarto", it: "Quarto", ru: "Кварта", zh: "夸脱", ja: "クォート", ar: "كوارت" }, symbol: "qt", toBase: v => v * 0.946353, fromBase: v => v / 0.946353 }
    }
  };

  // ==================== SISTEMA DE INTERNACIONALIZACIÓN ====================
  const I18N = {
    es: {
      // Categorías
      length: "Longitud", mass: "Masa", time: "Tiempo", temperature: "Temperatura", area: "Área", volume: "Volumen",
      // UI
      "Unit Converter": "Conversor de Unidades", "Professional Edition": "Edición Profesional",
      "Category": "Categoría", "Value": "Valor", "From": "De", "To": "A", "Convert": "Convertir",
      "Result": "Resultado", "Quick Conversions": "Conversiones Rápidas", "Enter value": "Ingresa el valor",
      "Copy result": "Copiar resultado", "Swap units": "Intercambiar unidades", "Change theme": "Cambiar tema",
      "Change language": "Cambiar idioma", "About": "Acerca de", "Help": "Ayuda", "Privacy": "Privacidad",
      "All rights reserved": "Todos los derechos reservados",
      // Estados
      "Loading": "Cargando", "Initializing": "Inicializando...", "Loading units": "Cargando unidades...",
      "Ready": "Listo", "Error": "Error", "Copied": "Copiado",
      // Fórmulas
      "formula": "1 {from} = {value} {to}"
    },
    en: {
      // Categories
      length: "Length", mass: "Mass", time: "Time", temperature: "Temperature", area: "Area", volume: "Volume",
      // UI
      "Unit Converter": "Unit Converter", "Professional Edition": "Professional Edition",
      "Category": "Category", "Value": "Value", "From": "From", "To": "To", "Convert": "Convert",
      "Result": "Result", "Quick Conversions": "Quick Conversions", "Enter value": "Enter value",
      "Copy result": "Copy result", "Swap units": "Swap units", "Change theme": "Change theme",
      "Change language": "Change language", "About": "About", "Help": "Help", "Privacy": "Privacy",
      "All rights reserved": "All rights reserved",
      // States
      "Loading": "Loading", "Initializing": "Initializing...", "Loading units": "Loading units...",
      "Ready": "Ready", "Error": "Error", "Copied": "Copied",
      // Formulas
      "formula": "1 {from} = {value} {to}"
    },
    fr: {
      // Categories
      length: "Longueur", mass: "Masse", time: "Temps", temperature: "Température", area: "Surface", volume: "Volume",
      // UI
      "Unit Converter": "Convertisseur d'Unités", "Professional Edition": "Édition Professionnelle",
      "Category": "Catégorie", "Value": "Valeur", "From": "De", "To": "À", "Convert": "Convertir",
      "Result": "Résultat", "Quick Conversions": "Conversions Rapides", "Enter value": "Entrez la valeur",
      "Copy result": "Copier le résultat", "Swap units": "Échanger les unités", "Change theme": "Changer le thème",
      "Change language": "Changer la langue", "About": "À propos", "Help": "Aide", "Privacy": "Confidentialité",
      "All rights reserved": "Tous droits réservés",
      // States
      "Loading": "Chargement", "Initializing": "Initialisation...", "Loading units": "Chargement des unités...",
      "Ready": "Prêt", "Error": "Erreur", "Copied": "Copié",
      // Formulas
      "formula": "1 {from} = {value} {to}"
    },
    de: {
      // Categories
      length: "Länge", mass: "Masse", time: "Zeit", temperature: "Temperatur", area: "Fläche", volume: "Volumen",
      // UI
      "Unit Converter": "Einheitenumrechner", "Professional Edition": "Professional Edition",
      "Category": "Kategorie", "Value": "Wert", "From": "Von", "To": "Zu", "Convert": "Umrechnen",
      "Result": "Ergebnis", "Quick Conversions": "Schnelle Umrechnungen", "Enter value": "Wert eingeben",
      "Copy result": "Ergebnis kopieren", "Swap units": "Einheiten tauschen", "Change theme": "Design ändern",
      "Change language": "Sprache ändern", "About": "Über", "Help": "Hilfe", "Privacy": "Datenschutz",
      "All rights reserved": "Alle Rechte vorbehalten",
      // States
      "Loading": "Laden", "Initializing": "Initialisierung...", "Loading units": "Einheiten laden...",
      "Ready": "Bereit", "Error": "Fehler", "Copied": "Kopiert",
      // Formulas
      "formula": "1 {from} = {value} {to}"
    },
    pt: {
      // Categories
      length: "Comprimento", mass: "Massa", time: "Tempo", temperature: "Temperatura", area: "Área", volume: "Volume",
      // UI
      "Unit Converter": "Conversor de Unidades", "Professional Edition": "Edição Profissional",
      "Category": "Categoria", "Value": "Valor", "From": "De", "To": "Para", "Convert": "Converter",
      "Result": "Resultado", "Quick Conversions": "Conversões Rápidas", "Enter value": "Digite o valor",
      "Copy result": "Copiar resultado", "Swap units": "Trocar unidades", "Change theme": "Mudar tema",
      "Change language": "Mudar idioma", "About": "Sobre", "Help": "Ajuda", "Privacy": "Privacidade",
      "All rights reserved": "Todos os direitos reservados",
      // States
      "Loading": "Carregando", "Initializing": "Inicializando...", "Loading units": "Carregando unidades...",
      "Ready": "Pronto", "Error": "Erro", "Copied": "Copiado",
      // Formulas
      "formula": "1 {from} = {value} {to}"
    },
    it: {
      // Categories
      length: "Lunghezza", mass: "Massa", time: "Tempo", temperature: "Temperatura", area: "Area", volume: "Volume",
      // UI
      "Unit Converter": "Convertitore di Unità", "Professional Edition": "Edizione Professionale",
      "Category": "Categoria", "Value": "Valore", "From": "Da", "To": "A", "Convert": "Converti",
      "Result": "Risultato", "Quick Conversions": "Conversioni Rapide", "Enter value": "Inserisci valore",
      "Copy result": "Copia risultato", "Swap units": "Scambia unità", "Change theme": "Cambia tema",
      "Change language": "Cambia lingua", "About": "Informazioni", "Help": "Aiuto", "Privacy": "Privacy",
      "All rights reserved": "Tutti i diritti riservati",
      // States
      "Loading": "Caricamento", "Initializing": "Inizializzazione...", "Loading units": "Caricamento unità...",
      "Ready": "Pronto", "Error": "Errore", "Copied": "Copiato",
      // Formulas
      "formula": "1 {from} = {value} {to}"
    },
    ru: {
      length: "Длина", mass: "Масса", time: "Время", temperature: "Температура", area: "Площадь", volume: "Объем",
      "Unit Converter": "Конвертер единиц", "Professional Edition": "Профессиональная версия",
      "Category": "Категория", "Value": "Значение", "From": "Из", "To": "В", "Convert": "Преобразовать",
      "Result": "Результат", "Quick Conversions": "Быстрые преобразования", "Enter value": "Введите значение",
      "Copy result": "Скопировать результат", "Swap units": "Поменять местами", "Change theme": "Сменить тему",
      "Change language": "Сменить язык", "About": "О программе", "Help": "Помощь", "Privacy": "Конфиденциальность",
      "All rights reserved": "Все права защищены",
      "Loading": "Загрузка", "Initializing": "Инициализация...", "Loading units": "Загрузка единиц...",
      "Ready": "Готово", "Error": "Ошибка", "Copied": "Скопировано",
      "formula": "1 {from} = {value} {to}"
    },
    zh: {
      length: "长度", mass: "质量", time: "时间", temperature: "温度", area: "面积", volume: "体积",
      "Unit Converter": "单位换算器", "Professional Edition": "专业版",
      "Category": "类别", "Value": "数值", "From": "从", "To": "到", "Convert": "转换",
      "Result": "结果", "Quick Conversions": "快速换算", "Enter value": "输入数值",
      "Copy result": "复制结果", "Swap units": "交换单位", "Change theme": "切换主题",
      "Change language": "切换语言", "About": "关于", "Help": "帮助", "Privacy": "隐私",
      "All rights reserved": "保留所有权利",
      "Loading": "加载中", "Initializing": "初始化...", "Loading units": "加载单位...",
      "Ready": "就绪", "Error": "错误", "Copied": "已复制",
      "formula": "1 {from} = {value} {to}"
    },
    ja: {
      length: "長さ", mass: "質量", time: "時間", temperature: "温度", area: "面積", volume: "体積",
      "Unit Converter": "単位変換", "Professional Edition": "プロフェッショナル版",
      "Category": "カテゴリ", "Value": "値", "From": "から", "To": "へ", "Convert": "変換",
      "Result": "結果", "Quick Conversions": "クイック変換", "Enter value": "値を入力",
      "Copy result": "結果をコピー", "Swap units": "単位を入れ替え", "Change theme": "テーマを変更",
      "Change language": "言語を変更", "About": "概要", "Help": "ヘルプ", "Privacy": "プライバシー",
      "All rights reserved": "全著作権所有",
      "Loading": "読み込み中", "Initializing": "初期化中...", "Loading units": "単位を読み込み中...",
      "Ready": "準備完了", "Error": "エラー", "Copied": "コピー済み",
      "formula": "1 {from} = {value} {to}"
    },
    ar: {
      length: "الطول", mass: "الكتلة", time: "الوقت", temperature: "درجة الحرارة", area: "المساحة", volume: "الحجم",
      "Unit Converter": "محول الوحدات", "Professional Edition": "الإصدار الاحترافي",
      "Category": "الفئة", "Value": "القيمة", "From": "من", "To": "إلى", "Convert": "تحويل",
      "Result": "النتيجة", "Quick Conversions": "تحويلات سريعة", "Enter value": "أدخل القيمة",
      "Copy result": "نسخ النتيجة", "Swap units": "تبديل الوحدات", "Change theme": "تغيير النمط",
      "Change language": "تغيير اللغة", "About": "حول", "Help": "مساعدة", "Privacy": "الخصوصية",
      "All rights reserved": "جميع الحقوق محفوظة",
      "Loading": "جار التحميل", "Initializing": "جاري التهيئة...", "Loading units": "جار تحميل الوحدات...",
      "Ready": "جاهز", "Error": "خطأ", "Copied": "تم النسخ",
      "formula": "1 {from} = {value} {to}"
    }
  };

  // ==================== UTILIDADES DE IDIOMA ====================
  function getUserLang() {
    const stored = localStorage.getItem('unitconv_lang');
    if (stored && I18N[stored]) return stored;
    const nav = navigator.language || navigator.userLanguage || 'en';
    const code = nav.split('-')[0];
    return I18N[code] ? code : 'en';
  }
  let currentLang = getUserLang();

  function t(key) {
    return I18N[currentLang][key] || I18N['en'][key] || key;
  }

  // ==================== UTILIDADES DE TEMA ====================
  function getUserTheme() {
    const stored = localStorage.getItem('unitconv_theme');
    if (stored && CONFIG.themes.some(t => t.name === stored)) return stored;
    return 'dark';
  }
  let currentTheme = getUserTheme();

  function setTheme(theme) {
    document.body.classList.remove(...CONFIG.themes.map(t => 'theme-' + t.name));
    document.body.classList.add('theme-' + theme);
    currentTheme = theme;
    localStorage.setItem('unitconv_theme', theme);
    updateThemeIcon();
  }

  function updateThemeIcon() {
    const btn = document.getElementById('themeSwitcher');
    const icon = btn.querySelector('.theme-icon');
    const themeObj = CONFIG.themes.find(t => t.name === currentTheme);
    icon.textContent = themeObj ? themeObj.icon : '🌙';
    btn.title = t('Change theme');
  }

  // ==================== CARGA Y ANIMACIÓN ====================
  function showApp() {
    document.getElementById('loadingScreen').classList.add('hidden');
    setTimeout(() => {
      document.getElementById('app').classList.remove('app-hidden');
    }, 400);
  }

  function fakeLoading() {
    const progress = document.getElementById('progressBar');
    const text = document.getElementById('loadingText');
    let percent = 0;
    text.textContent = t('Initializing');
    const steps = [
      { p: 20, msg: t('Loading units') },
      { p: 60, msg: t('Loading') + '...' },
      { p: 100, msg: t('Ready') }
    ];
    let step = 0;
    const interval = setInterval(() => {
      percent += Math.random() * 10 + 5;
      if (percent > steps[step].p) {
        text.textContent = steps[step].msg;
        step++;
      }
      progress.style.width = Math.min(percent, 100) + '%';
      if (percent >= 100) {
        clearInterval(interval);
        setTimeout(showApp, 400);
      }
    }, CONFIG.loadingDuration / 10);
  }

  // ==================== PANEL LATERAL ====================
  const panel = {
    el: null,
    overlay: null,
    content: null,
    title: null,
    body: null,
    open(type) {
      this.setContent(type);
      this.el.classList.add('active');
      document.body.style.overflow = 'hidden';
    },
    close() {
      this.el.classList.remove('active');
      document.body.style.overflow = '';
    },
    setContent(type) {
      let title = '', html = '';
      switch (type) {
        case 'about':
          title = t('About');
          html = `
            <h3>Shadowed Unit Converter Pro</h3>
            <p>${t('Unit Converter')} - ${t('Professional Edition')}</p>
            <div class="feature-grid">
              <div class="feature-item"><h4>🌐 ${t('Change language')}</h4><p>${t('Change language')} y traducción instantánea.</p></div>
              <div class="feature-item"><h4>🎨 ${t('Change theme')}</h4><p>${t('Change theme')} entre 4 estilos modernos.</p></div>
              <div class="feature-item"><h4>⚡ ${t('Quick Conversions')}</h4><p>${t('Quick Conversions')} y resultados instantáneos.</p></div>
              <div class="feature-item"><h4>🔒 ${t('Privacy')}</h4><p>${t('Privacy')}: 100% local, sin rastreo.</p></div>
            </div>
            <div class="contact-info">
              <p><b>Email:</b> <a href="mailto:info@shadowedunit.com">info@shadowedunit.com</a></p>
              <p><b>GitHub:</b> <a href="https://github.com/" target="_blank">github.com</a></p>
            </div>
          `;
          break;
        case 'help':
          title = t('Help');
          html = `
            <h3>${t('Help')}</h3>
            <ul>
              <li>1. ${t('Select category and units.') || 'Selecciona categoría y unidades.'}</li>
              <li>2. ${t('Enter value and press Convert.') || 'Ingresa el valor y presiona Convertir.'}</li>
              <li>3. ${t('Use quick conversions for common results.') || 'Usa conversiones rápidas para resultados comunes.'}</li>
              <li>4. ${t('Switch theme or language anytime.') || 'Cambia tema o idioma cuando quieras.'}</li>
            </ul>
            <div class="lang-selector">
              ${CONFIG.languages.map(l => `
                <button class="lang-option${currentLang === l.code ? ' active' : ''}" data-lang="${l.code}">
                  ${l.flag} ${l.nativeName}
                </button>
              `).join('')}
            </div>
          `;
          break;
        case 'privacy':
          title = t('Privacy');
          html = `
            <h3>${t('Privacy')}</h3>
            <p>${t('No personal data is collected. All calculations are performed locally in your browser. No tracking, no ads, no cookies.') || 'No se recopilan datos personales. Todo es local.'}</p>
            <p>${t('All rights reserved')}</p>
          `;
          break;
        default:
          title = 'Panel';
          html = '';
      }
      this.title.textContent = title;
      this.body.innerHTML = html;
      // Soporte para cambiar idioma desde el panel de ayuda
      if (type === 'help') {
        this.body.querySelectorAll('.lang-option').forEach(btn => {
          btn.onclick = () => {
            setLang(btn.dataset.lang);
            this.setContent('help');
            updateUI();
          };
        });
      }
    },
    init() {
      this.el = document.getElementById('sidePanel');
      this.overlay = document.getElementById('panelOverlay');
      this.content = this.el.querySelector('.panel-content');
      this.title = document.getElementById('panelTitle');
      this.body = document.getElementById('panelBody');
      document.getElementById('panelCloseBtn').onclick = () => this.close();
      this.overlay.onclick = () => this.close();
    }
  };

  // ==================== CAMBIO DE IDIOMA ====================
  function setLang(lang) {
    if (!I18N[lang]) return;
    currentLang = lang;
    localStorage.setItem('unitconv_lang', lang);
    updateUI();
  }

  function updateLangBtn() {
    const btn = document.getElementById('langSwitcher');
    const langObj = CONFIG.languages.find(l => l.code === currentLang);
    btn.querySelector('.lang-text').textContent = langObj ? langObj.code.toUpperCase() : currentLang.toUpperCase();
    btn.title = t('Change language');
  }

  // ==================== ACTUALIZACIÓN DE UI ====================
  function updateUI() {
    // Títulos y etiquetas
    document.getElementById('cardTitle').textContent = t('Unit Converter');
    document.querySelector('.app-title h1').textContent = t('Unit Converter');
    document.querySelector('.app-subtitle').textContent = t('Professional Edition');
    document.getElementById('categoryLabel').textContent = t('Category');
    document.getElementById('valueLabel').textContent = t('Value');
    document.getElementById('fromLabel').textContent = t('From');
    document.getElementById('toLabel').textContent = t('To');
    document.getElementById('convertBtnText').textContent = t('Convert');
    document.getElementById('resultLabel').textContent = t('Result');
    document.getElementById('quickTitle').textContent = t('Quick Conversions');
    document.getElementById('aboutLink').textContent = t('About');
    document.getElementById('helpLink').textContent = t('Help');
    document.getElementById('privacyLink').textContent = t('Privacy');
    document.getElementById('rightsText').textContent = t('All rights reserved');
    updateLangBtn();
    updateThemeIcon();
    updateCategoryOptions();
    updateUnitOptions();
    updateResult();
    updateQuickConversions();
  }

  // ==================== CATEGORÍAS Y UNIDADES ====================
  function updateCategoryOptions() {
    const select = document.getElementById('categorySelect');
    Array.from(select.options).forEach(opt => {
      opt.textContent = t(opt.value);
    });
  }

  function updateUnitOptions() {
    const cat = document.getElementById('categorySelect').value;
    const fromSel = document.getElementById('fromUnit');
    const toSel = document.getElementById('toUnit');
    fromSel.innerHTML = '';
    toSel.innerHTML = '';
    Object.entries(UNITS[cat]).forEach(([key, unit]) => {
      const opt1 = document.createElement('option');
      opt1.value = key;
      opt1.textContent = `${unit.name[currentLang] || unit.name['en']} (${unit.symbol})`;
      fromSel.appendChild(opt1);
      const opt2 = opt1.cloneNode(true);
      toSel.appendChild(opt2);
    });
    toSel.selectedIndex = 1;
  }

  // ==================== CONVERSIÓN ====================
  function convert() {
    const cat = document.getElementById('categorySelect').value;
    const from = document.getElementById('fromUnit').value;
    const to = document.getElementById('toUnit').value;
    let value = parseFloat(document.getElementById('inputValue').value);
    if (isNaN(value)) return { result: '—', formula: '' };
    let base = UNITS[cat][from].toBase(value);
    let result = UNITS[cat][to].fromBase(base);
    // Redondeo profesional
    result = Math.round(result * 1e8) / 1e8;
    // Fórmula
    let formula = t('formula')
      .replace('{from}', UNITS[cat][from].symbol)
      .replace('{value}', Math.round(UNITS[cat][to].fromBase(UNITS[cat][from].toBase(1)) * 1e8) / 1e8)
      .replace('{to}', UNITS[cat][to].symbol);
    return { result, formula };
  }

  function updateResult() {
    const { result, formula } = convert();
    document.getElementById('resultValue').textContent = result;
    document.getElementById('resultFormula').textContent = formula;
  }

  // ==================== CONVERSIONES RÁPIDAS ====================
  function updateQuickConversions() {
    const cat = document.getElementById('categorySelect').value;
    const from = document.getElementById('fromUnit').value;
    const value = parseFloat(document.getElementById('inputValue').value) || 1;
    const grid = document.getElementById('quickGrid');
    grid.innerHTML = '';
    Object.entries(UNITS[cat]).forEach(([key, unit]) => {
      if (key === from) return;
      let base = UNITS[cat][from].toBase(value);
      let res = UNITS[cat][key].fromBase(base);
      res = Math.round(res * 1e8) / 1e8;
      const div = document.createElement('div');
      div.className = 'quick-item';
      div.innerHTML = `<div class="quick-value">${res}</div>
        <div class="quick-unit">${unit.name[currentLang] || unit.name['en']} (${unit.symbol})</div>`;
      grid.appendChild(div);
    });
  }

  // ==================== EVENTOS PRINCIPALES ====================
  function mainEvents() {
    // Tema
    document.getElementById('themeSwitcher').onclick = () => {
      let idx = CONFIG.themes.findIndex(t => t.name === currentTheme);
      idx = (idx + 1) % CONFIG.themes.length;
      setTheme(CONFIG.themes[idx].name);
    };
    // Idioma
    document.getElementById('langSwitcher').onclick = () => {
      let idx = CONFIG.languages.findIndex(l => l.code === currentLang);
      idx = (idx + 1) % CONFIG.languages.length;
      setLang(CONFIG.languages[idx].code);
    };
    // Categoría
    document.getElementById('categorySelect').onchange = () => {
      updateUnitOptions();
      updateResult();
      updateQuickConversions();
    };
    // Unidades
    document.getElementById('fromUnit').onchange = () => {
      updateResult();
      updateQuickConversions();
    };
    document.getElementById('toUnit').onchange = () => {
      updateResult();
    };
    // Valor
    document.getElementById('inputValue').oninput = () => {
      updateResult();
      updateQuickConversions();
    };
    // Limpiar
    document.getElementById('clearBtn').onclick = () => {
      document.getElementById('inputValue').value = '';
      updateResult();
      updateQuickConversions();
    };
    // Intercambiar
    document.getElementById('swapBtn').onclick = () => {
      const fromSel = document.getElementById('fromUnit');
      const toSel = document.getElementById('toUnit');
      const tmp = fromSel.selectedIndex;
      fromSel.selectedIndex = toSel.selectedIndex;
      toSel.selectedIndex = tmp;
      updateResult();
      updateQuickConversions();
    };
    // Convertir
    document.getElementById('convertForm').onsubmit = e => {
      e.preventDefault();
      updateResult();
      document.getElementById('resultCard').classList.add('animate');
      setTimeout(() => document.getElementById('resultCard').classList.remove('animate'), 600);
    };
    // Copiar
    document.getElementById('copyBtn').onclick = () => {
      const val = document.getElementById('resultValue').textContent;
      navigator.clipboard.writeText(val);
      document.getElementById('copyBtn').textContent = '✅';
      setTimeout(() => document.getElementById('copyBtn').textContent = '📋', 1200);
    };
    // Paneles
    document.getElementById('aboutLink').onclick = () => panel.open('about');
    document.getElementById('helpLink').onclick = () => panel.open('help');
    document.getElementById('privacyLink').onclick = () => panel.open('privacy');
  }

  // ==================== INICIALIZACIÓN ====================
  function init() {
    setTheme(currentTheme);
    panel.init();
    updateUI();
    mainEvents();
    updateResult();
    updateQuickConversions();
    fakeLoading();
  }

  // ==================== INICIO ====================
  window.addEventListener('DOMContentLoaded', init);

})();