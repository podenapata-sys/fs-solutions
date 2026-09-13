#!/usr/bin/env node
/* Generate the four demo sites under demos/.
 *
 * Four pages that share a layout vocabulary but must not look like the same template
 * three times over, so the shared parts live in demos/demo.css and demos/demo.js and
 * everything that gives a site its character — palette, type scale, section order,
 * content — is data here.
 *
 * Two rules every generated page obeys, because these pages exist to demonstrate them:
 *   1. Readable with JavaScript off. The English is in the HTML; the script swaps it.
 *   2. No third-party imagery. Photo slots are styled placeholders.
 *
 * Every business, person, price and phone number below is invented, and each page
 * carries a bar at the top saying so. Run: node tools/gen-demos.js
 */
const fs = require("fs");
const path = require("path");

const ROOT = path.resolve(__dirname, "..");
const SITE = "https://podenapata-sys.github.io/fs-solutions";

const esc = (s) => String(s ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;")
  .replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/* t(en, bn) → an element's bilingual attributes plus its English content. */
const t = (en, bn) => `data-en="${esc(en)}" data-bn="${esc(bn)}">${esc(en)}`;

const DEMOS = [
  /* ─────────────────────────── restaurant ─────────────────────────── */
  {
    slug: "restaurant",
    name: "Nokshi Kitchen",
    kind: ["Restaurant demo", "রেস্টুরেন্ট ডেমো"],
    tagline: ["Bengali kitchen · Dhanmondi", "বাঙালি রান্নাঘর · ধানমন্ডি"],
    theme: { accent: "#c2410c", bg: "#fffdfa", bg2: "#faf3ec", line: "#eee0d3", ink: "#211610" },
    title: ["Nokshi Kitchen — Bengali restaurant in Dhanmondi, Dhaka",
            "নকশী কিচেন — ধানমন্ডি, ঢাকার বাঙালি রেস্টুরেন্ট"],
    desc: ["A demo restaurant site by Future Stack Solutions: menu with prices, photo gallery, table booking and opening hours, in Bangla and English.",
           "ফিউচার স্ট্যাক সলিউশনসের একটি ডেমো রেস্টুরেন্ট সাইট: মূল্যসহ মেনু, ছবির গ্যালারি, টেবিল বুকিং ও খোলার সময়, বাংলা ও ইংরেজিতে।"],
    nav: [["Menu", "মেনু", "#menu"], ["Gallery", "গ্যালারি", "#gallery"],
          ["Hours", "সময়", "#hours"], ["Book a table", "টেবিল বুক", "#book"]],
    hero: {
      h1: ["Home cooking, the way Dhaka remembers it",
           "ঘরের রান্না, ঢাকা যেভাবে মনে রাখে"],
      lede: ["Bhuna khichuri, shorshe ilish and slow-cooked beef rezala, made fresh every day. Dine in at Dhanmondi or order for delivery across the city.",
             "ভুনা খিচুড়ি, সরষে ইলিশ আর ধীরে রান্না করা বিফ রেজালা — প্রতিদিন টাটকা। ধানমন্ডিতে বসে খান, বা সারা শহরে ডেলিভারি নিন।"],
      cta: [["Book a table", "টেবিল বুক করুন", "#book"], ["See the menu", "মেনু দেখুন", "#menu"]],
      ph: ["Your restaurant photo", "আপনার রেস্টুরেন্টের ছবি"]
    },
    facts: [["৳0", "monthly hosting", "মাসিক হোস্টিং"],
            ["7", "days a week", "দিন খোলা"],
            ["4.8", "average rating", "গড় রেটিং"]],
    menu: {
      head: ["The menu", "মেনু"],
      sub: ["Prices in taka, updated by the restaurant from a dashboard — no developer needed.",
            "মূল্য টাকায়, রেস্টুরেন্ট নিজেই ড্যাশবোর্ড থেকে বদলায় — ডেভেলপার লাগে না।"],
      groups: [
        { g: ["Rice & biryani", "ভাত ও বিরিয়ানি"], items: [
          [["Kachchi biryani", "কাচ্চি বিরিয়ানি"], ["Mutton, aged basmati, kewra", "খাসি, পুরনো বাসমতি, কেওড়া"], "৳420"],
          [["Bhuna khichuri", "ভুনা খিচুড়ি"], ["With beef or egg", "গরু বা ডিমসহ"], "৳260"],
          [["Morog polao", "মোরগ পোলাও"], ["Half chicken, ghee rice", "আধা মুরগি, ঘি ভাত"], "৳340"],
        ]},
        { g: ["Fish & curry", "মাছ ও তরকারি"], items: [
          [["Shorshe ilish", "সরষে ইলিশ"], ["Hilsa in mustard, seasonal", "সরষে ইলিশ, মৌসুমি"], "৳520"],
          [["Beef rezala", "বিফ রেজালা"], ["Slow-cooked, six hours", "ছয় ঘণ্টা ধীরে রান্না"], "৳380"],
          [["Chingri malaikari", "চিংড়ি মালাইকারি"], ["Prawn in coconut", "নারকেলে চিংড়ি"], "৳480"],
        ]},
        { g: ["Sides & sweets", "সাইড ও মিষ্টি"], items: [
          [["Begun bhaja", "বেগুন ভাজা"], ["", ""], "৳90"],
          [["Mishti doi", "মিষ্টি দই"], ["Clay pot", "মাটির হাঁড়িতে"], "৳120"],
          [["Borhani", "বোরহানি"], ["Glass", "গ্লাস"], "৳80"],
        ]},
      ]
    },
    gallery: { head: ["Inside the restaurant", "রেস্টুরেন্টের ভেতরে"],
               sub: ["On a real project these are your photographs.", "আসল প্রজেক্টে এখানে আপনার তোলা ছবি থাকবে।"],
               ph: ["Your photo", "আপনার ছবি"], count: 6 },
    hours: { head: ["Opening hours", "খোলার সময়"],
      rows: [[["Saturday – Thursday", "শনি – বৃহস্পতি"], "12:00 – 23:00"],
             [["Friday", "শুক্রবার"], "15:00 – 23:00"],
             [["Delivery", "ডেলিভারি"], ["Until 22:30", "রাত ১০:৩০ পর্যন্ত"]]],
      addr: ["House 42, Road 9/A, Dhanmondi, Dhaka 1209", "বাড়ি ৪২, রোড ৯/এ, ধানমন্ডি, ঢাকা ১২০৯"] },
    form: { head: ["Book a table", "টেবিল বুক করুন"],
      sub: ["On a real site this reaches the restaurant by email, in a dashboard and in a Google Sheet.",
            "আসল সাইটে এটি ইমেইলে, ড্যাশবোর্ডে ও গুগল শিটে রেস্টুরেন্টের কাছে পৌঁছায়।"],
      fields: [["Name", "নাম", "text", "Your name", "আপনার নাম"],
               ["Phone", "ফোন", "tel", "01XXXXXXXXX", "01XXXXXXXXX"],
               ["Date", "তারিখ", "date", "", ""],
               ["Guests", "অতিথি সংখ্যা", "number", "2", "২"]],
      note: ["Any special request", "বিশেষ কিছু বলার থাকলে"],
      submit: ["Request a table", "টেবিলের অনুরোধ"] }
  },

  /* ─────────────────────────── shop ─────────────────────────── */
  {
    slug: "shop",
    name: "Rongdhonu",
    kind: ["Online shop demo", "অনলাইন শপ ডেমো"],
    tagline: ["Handloom & home · Dhaka", "তাঁত ও ঘর · ঢাকা"],
    theme: { accent: "#7c3aed", bg: "#fefdff", bg2: "#f6f3fc", line: "#e7e0f5", ink: "#191324" },
    title: ["Rongdhonu — handloom clothing and home goods, Dhaka",
            "রংধনু — তাঁতের পোশাক ও ঘরের জিনিস, ঢাকা"],
    desc: ["A demo online shop by Future Stack Solutions: product catalogue with prices and WhatsApp ordering — no payment gateway and no monthly fee.",
           "ফিউচার স্ট্যাক সলিউশনসের একটি ডেমো অনলাইন শপ: মূল্যসহ পণ্যের তালিকা ও WhatsApp-এ অর্ডার — পেমেন্ট গেটওয়ে লাগে না, মাসিক খরচও নেই।"],
    nav: [["Shop", "দোকান", "#products"], ["Delivery", "ডেলিভারি", "#delivery"],
          ["Contact", "যোগাযোগ", "#contact"]],
    hero: {
      h1: ["Handloom, straight from the weavers",
           "তাঁতিদের কাছ থেকে সরাসরি তাঁতের কাপড়"],
      lede: ["Jamdani, khadi and block-printed cotton, made in Narayanganj and Tangail. Order on WhatsApp — no account, no card, cash on delivery across Dhaka.",
             "জামদানি, খাদি আর ব্লক প্রিন্টের সুতি — নারায়ণগঞ্জ ও টাঙ্গাইলে তৈরি। WhatsApp-এ অর্ডার করুন — অ্যাকাউন্ট লাগে না, কার্ড লাগে না, ঢাকায় ক্যাশ অন ডেলিভারি।"],
      cta: [["Browse the shop", "দোকান দেখুন", "#products"], ["Order on WhatsApp", "WhatsApp-এ অর্ডার", "https://wa.me/8801632932249"]],
      ph: ["Your product photo", "আপনার পণ্যের ছবি"]
    },
    facts: [["৳0", "payment gateway fees", "পেমেন্ট গেটওয়ে ফি"],
            ["48h", "Dhaka delivery", "ঢাকায় ডেলিভারি"],
            ["COD", "cash on delivery", "ক্যাশ অন ডেলিভারি"]],
    cats: [["All", "সব"], ["Saree", "শাড়ি"], ["Panjabi", "পাঞ্জাবি"], ["Kurti", "কুর্তি"],
           ["Home", "ঘর"], ["Gifts", "উপহার"]],
    products: {
      head: ["What's in stock", "যা আছে"],
      sub: ["The shop owner adds products and changes prices from a dashboard. Each one opens WhatsApp with the item already written in.",
            "দোকানের মালিক ড্যাশবোর্ড থেকে পণ্য যোগ করেন ও দাম বদলান। প্রতিটিতে ক্লিক করলে WhatsApp খোলে, পণ্যের নাম আগে থেকেই লেখা।"],
      items: [
        [["Jamdani saree — indigo", "জামদানি শাড়ি — নীল"], "৳6,500", ["Narayanganj handloom", "নারায়ণগঞ্জের তাঁত"]],
        [["Khadi panjabi — natural", "খাদি পাঞ্জাবি — প্রাকৃতিক"], "৳2,200", ["Full sleeve, unbleached", "ফুল স্লিভ, অপ্রক্রিয়াজাত"]],
        [["Block-print kurti", "ব্লক প্রিন্ট কুর্তি"], "৳1,450", ["Hand block, cotton", "হাতে ব্লক, সুতি"]],
        [["Tangail cotton saree", "টাঙ্গাইল সুতি শাড়ি"], "৳3,100", ["Daily wear", "প্রতিদিনের পরার"]],
        [["Nakshi kantha throw", "নকশি কাঁথা"], "৳4,800", ["Hand stitched", "হাতে সেলাই"]],
        [["Terracotta planter set", "টেরাকোটা টব সেট"], "৳900", ["Set of three", "তিনটির সেট"]],
        [["Jute table runner", "পাটের টেবিল রানার"], "৳650", ["Natural dye", "প্রাকৃতিক রং"]],
        [["Gift box — small", "উপহার বক্স — ছোট"], "৳1,800", ["Wrap and card included", "মোড়ক ও কার্ডসহ"]],
      ]
    },
    delivery: { head: ["Delivery & returns", "ডেলিভারি ও ফেরত"],
      rows: [[["Inside Dhaka", "ঢাকার ভেতরে"], "৳60 · 24–48h"],
             [["Outside Dhaka", "ঢাকার বাইরে"], "৳130 · 3–5 days"],
             [["Returns", "ফেরত"], ["7 days, unworn", "৭ দিন, না পরা অবস্থায়"]],
             [["Payment", "পেমেন্ট"], ["Cash on delivery or bKash", "ক্যাশ অন ডেলিভারি বা বিকাশ"]]] },
    form: { head: ["Ask about an order", "অর্ডার নিয়ে জানতে চান"],
      sub: ["On a real site this reaches the shop by email and in a dashboard.",
            "আসল সাইটে এটি ইমেইলে ও ড্যাশবোর্ডে দোকানের কাছে পৌঁছায়।"],
      fields: [["Name", "নাম", "text", "Your name", "আপনার নাম"],
               ["Phone", "ফোন", "tel", "01XXXXXXXXX", "01XXXXXXXXX"]],
      note: ["Which item, and how many?", "কোন পণ্য, কয়টি?"],
      submit: ["Send enquiry", "জিজ্ঞাসা পাঠান"] }
  },

  /* ─────────────────────────── property ─────────────────────────── */
  {
    slug: "property",
    name: "Nagar Properties",
    kind: ["Real-estate demo", "রিয়েল এস্টেট ডেমো"],
    tagline: ["Flats & land · Dhaka", "ফ্ল্যাট ও জমি · ঢাকা"],
    theme: { accent: "#0f766e", bg: "#fcfefd", bg2: "#eef6f4", line: "#d8e8e4", ink: "#0d1c1a" },
    title: ["Nagar Properties — flats and land in Dhaka",
            "নগর প্রপার্টিজ — ঢাকায় ফ্ল্যাট ও জমি"],
    desc: ["A demo property site by Future Stack Solutions: filterable listings, detail pages and an enquiry form that cannot lose a lead.",
           "ফিউচার স্ট্যাক সলিউশনসের একটি ডেমো প্রপার্টি সাইট: ফিল্টার করা যায় এমন তালিকা, বিস্তারিত পাতা আর এমন ফর্ম যা কোনো গ্রাহক হারায় না।"],
    nav: [["Listings", "তালিকা", "#listings"], ["How it works", "কীভাবে কাজ করে", "#how"],
          ["Enquire", "যোগাযোগ", "#contact"]],
    hero: {
      h1: ["Find the flat before someone else does",
           "অন্য কেউ নেওয়ার আগেই ফ্ল্যাটটি খুঁজে নিন"],
      lede: ["Verified listings in Dhanmondi, Uttara, Bashundhara and Mirpur. Filter by area, budget and size — then talk to a person, not a call centre.",
             "ধানমন্ডি, উত্তরা, বসুন্ধরা আর মিরপুরে যাচাই করা তালিকা। এলাকা, বাজেট আর আকার দিয়ে ফিল্টার করুন — তারপর কল সেন্টার নয়, সরাসরি মানুষের সঙ্গে কথা বলুন।"],
      cta: [["See listings", "তালিকা দেখুন", "#listings"], ["Talk to us", "কথা বলুন", "#contact"]],
      ph: ["Your property photo", "আপনার প্রপার্টির ছবি"]
    },
    facts: [["4", "areas covered", "এলাকা"],
            ["৳0", "listing fee for buyers", "ক্রেতার জন্য ফি"],
            ["24h", "reply time", "উত্তরের সময়"]],
    listings: {
      head: ["Available now", "এখন পাওয়া যাচ্ছে"],
      sub: ["Every listing is added from a dashboard — photographs, price and status, without touching any code.",
            "প্রতিটি তালিকা ড্যাশবোর্ড থেকে যোগ করা হয় — ছবি, দাম আর অবস্থা, কোনো কোড না ছুঁয়েই।"],
      items: [
        [["3 bed flat, Dhanmondi", "৩ বেড ফ্ল্যাট, ধানমন্ডি"], "৳1.35 কোটি", ["1,650 sq ft · 4th floor · south facing", "১,৬৫০ বর্গফুট · ৪র্থ তলা · দক্ষিণমুখী"]],
        [["2 bed flat, Mirpur DOHS", "২ বেড ফ্ল্যাট, মিরপুর ডিওএইচএস"], "৳85 লাখ", ["1,150 sq ft · 2nd floor · lift", "১,১৫০ বর্গফুট · ২য় তলা · লিফট"]],
        [["4 bed duplex, Bashundhara", "৪ বেড ডুপ্লেক্স, বসুন্ধরা"], "৳2.60 কোটি", ["2,900 sq ft · block K · parking ×2", "২,৯০০ বর্গফুট · ব্লক কে · পার্কিং ×২"]],
        [["3 bed flat, Uttara sector 7", "৩ বেড ফ্ল্যাট, উত্তরা সেক্টর ৭"], "৳1.10 কোটি", ["1,480 sq ft · 6th floor · generator", "১,৪৮০ বর্গফুট · ৬ষ্ঠ তলা · জেনারেটর"]],
        [["Land, 5 katha, Savar", "জমি, ৫ কাঠা, সাভার"], "৳48 লাখ", ["Corner plot · road facing", "কর্নার প্লট · রাস্তার পাশে"]],
        [["2 bed flat, Mohammadpur", "২ বেড ফ্ল্যাট, মোহাম্মদপুর"], "৳72 লাখ", ["1,050 sq ft · 3rd floor", "১,০৫০ বর্গফুট · ৩য় তলা"]],
      ]
    },
    how: { head: ["How it works", "কীভাবে কাজ করে"],
      steps: [[["Tell us what you need", "কী দরকার বলুন"], ["Area, budget, how many bedrooms, when you want to move.", "এলাকা, বাজেট, কয়টি বেডরুম, কবে উঠতে চান।"]],
              [["We shortlist", "আমরা বাছাই করি"], ["Three or four that actually fit, with honest notes on each.", "তিন-চারটি যা সত্যিই মানায়, প্রতিটির সৎ মন্তব্যসহ।"]],
              [["Visit together", "একসঙ্গে দেখতে যাই"], ["We come with you and ask the questions buyers forget to ask.", "আমরা সঙ্গে যাই আর সেই প্রশ্নগুলো করি যা ক্রেতারা করতে ভুলে যান।"]],
              [["Paperwork checked", "কাগজপত্র যাচাই"], ["Mutation, khatian and dues verified before any money moves.", "টাকা দেওয়ার আগেই নামজারি, খতিয়ান ও বকেয়া যাচাই।"]]] },
    form: { head: ["Tell us what you're looking for", "কী খুঁজছেন বলুন"],
      sub: ["On a real site this reaches the agent by email, in a dashboard and in a Google Sheet — three ways, so a lead cannot go missing.",
            "আসল সাইটে এটি ইমেইলে, ড্যাশবোর্ডে ও গুগল শিটে এজেন্টের কাছে পৌঁছায় — তিনভাবে, যাতে কোনো গ্রাহক হারিয়ে না যায়।"],
      fields: [["Name", "নাম", "text", "Your name", "আপনার নাম"],
               ["Phone", "ফোন", "tel", "01XXXXXXXXX", "01XXXXXXXXX"],
               ["Area", "এলাকা", "text", "Dhanmondi, Uttara…", "ধানমন্ডি, উত্তরা…"],
               ["Budget", "বাজেট", "text", "৳80 lakh – ৳1.2 crore", "৳৮০ লাখ – ৳১.২ কোটি"]],
      note: ["Anything else we should know", "আর কিছু জানানোর থাকলে"],
      submit: ["Send enquiry", "জিজ্ঞাসা পাঠান"] }
  },

  /* ─────────────────────────── profile ─────────────────────────── */
  {
    slug: "profile",
    name: "Rafiq Hasan",
    kind: ["Personal profile demo", "ব্যক্তিগত প্রোফাইল ডেমো"],
    tagline: ["Maths & physics tutor · Dhaka", "গণিত ও পদার্থবিজ্ঞানের শিক্ষক · ঢাকা"],
    theme: { accent: "#4f46e5", bg: "#fdfdff", bg2: "#f2f3fb", line: "#e2e3f2", ink: "#14141f" },
    title: ["Rafiq Hasan — maths and physics tutor in Dhaka",
            "রফিক হাসান — ঢাকায় গণিত ও পদার্থবিজ্ঞানের শিক্ষক"],
    desc: ["A demo personal profile site by Future Stack Solutions: credentials, services, availability and booking on a single page.",
           "ফিউচার স্ট্যাক সলিউশনসের একটি ডেমো ব্যক্তিগত প্রোফাইল সাইট: যোগ্যতা, সেবা, সময় ও বুকিং — সব এক পাতায়।"],
    nav: [["About", "পরিচিতি", "#about"], ["Subjects", "বিষয়", "#subjects"],
          ["Fees", "ফি", "#fees"], ["Book", "বুক করুন", "#contact"]],
    hero: {
      h1: ["Maths stops being frightening when it starts making sense",
           "গণিত বোঝা শুরু হলে ভয়টা আর থাকে না"],
      lede: ["Eleven years teaching HSC and O/A level maths and physics in Dhaka. Small groups of four, or one to one, in Dhanmondi or online.",
             "ঢাকায় এগারো বছর ধরে এইচএসসি ও ও/এ লেভেলের গণিত আর পদার্থবিজ্ঞান পড়াচ্ছি। চারজনের ছোট দলে, বা একজন করে — ধানমন্ডিতে অথবা অনলাইনে।"],
      cta: [["Book a trial class", "ট্রায়াল ক্লাস বুক করুন", "#contact"], ["See subjects", "বিষয় দেখুন", "#subjects"]],
      ph: ["Your photo", "আপনার ছবি"]
    },
    facts: [["11", "years teaching", "বছর পড়াচ্ছি"],
            ["4", "students per group", "জন প্রতি দলে"],
            ["2", "locations + online", "জায়গা + অনলাইন"]],
    about: { head: ["About", "পরিচিতি"],
      paras: [["I teach the way I wish I had been taught: work the problem slowly, out loud, until the student can explain it back to me. No shortcuts, no memorised formulas without the reasoning underneath.",
               "আমি সেভাবেই পড়াই যেভাবে আমি নিজে শিখতে চাইতাম: সমস্যাটি ধীরে, শব্দ করে সমাধান করা, যতক্ষণ না শিক্ষার্থী সেটি আমাকে বুঝিয়ে বলতে পারে। কোনো শর্টকাট নয়, যুক্তি ছাড়া মুখস্থ সূত্র নয়।"],
              ["Groups are capped at four because five is where the quiet student stops asking. Parents get a short written note after every month — what we covered, what is not sticking yet.",
               "দলে সর্বোচ্চ চারজন, কারণ পাঁচজন হলেই চুপচাপ শিক্ষার্থীটি প্রশ্ন করা বন্ধ করে দেয়। প্রতি মাসে অভিভাবকরা একটি সংক্ষিপ্ত লিখিত নোট পান — কী পড়ানো হলো, কোনটা এখনো আটকে আছে।"]] },
    subjects: { head: ["Subjects", "বিষয়"],
      items: [[["HSC Mathematics", "এইচএসসি গণিত"], ["First and second paper, full syllabus", "প্রথম ও দ্বিতীয় পত্র, সম্পূর্ণ সিলেবাস"]],
              [["HSC Physics", "এইচএসসি পদার্থবিজ্ঞান"], ["With practical preparation", "ব্যবহারিক প্রস্তুতিসহ"]],
              [["O Level Maths", "ও লেভেল গণিত"], ["Edexcel and Cambridge", "এডেক্সেল ও ক্যামব্রিজ"]],
              [["A Level Physics", "এ লেভেল পদার্থবিজ্ঞান"], ["Mechanics and electricity", "বলবিদ্যা ও তড়িৎ"]],
              [["University admission", "বিশ্ববিদ্যালয় ভর্তি"], ["BUET, DU and medical maths", "বুয়েট, ঢাবি ও মেডিকেলের গণিত"]],
              [["Online classes", "অনলাইন ক্লাস"], ["Same groups, from anywhere", "একই দল, যেকোনো জায়গা থেকে"]]] },
    fees: { head: ["Fees", "ফি"],
      sub: ["Published openly. You should never have to ask what something costs.",
            "খোলাখুলি প্রকাশিত। কোনো কিছুর দাম জিজ্ঞেস করতে হওয়া উচিত নয়।"],
      rows: [[["Group of four — per month", "চারজনের দল — মাসে"], "৳4,000"],
             [["One to one — per month", "একজন করে — মাসে"], "৳9,000"],
             [["Online group — per month", "অনলাইন দল — মাসে"], "৳3,000"],
             [["Trial class", "ট্রায়াল ক্লাস"], ["Free", "ফ্রি"]]] },
    form: { head: ["Book a trial class", "ট্রায়াল ক্লাস বুক করুন"],
      sub: ["The first class is free, and there is no obligation after it.",
            "প্রথম ক্লাস ফ্রি, আর তারপর কোনো বাধ্যবাধকতা নেই।"],
      fields: [["Student name", "শিক্ষার্থীর নাম", "text", "Name", "নাম"],
               ["Guardian phone", "অভিভাবকের ফোন", "tel", "01XXXXXXXXX", "01XXXXXXXXX"],
               ["Class / level", "শ্রেণি / লেভেল", "text", "HSC 1st year, O Level…", "এইচএসসি ১ম বর্ষ, ও লেভেল…"],
               ["Preferred time", "পছন্দের সময়", "text", "Evenings, weekends…", "সন্ধ্যা, সাপ্তাহিক ছুটি…"]],
      note: ["What is the student finding hardest?", "শিক্ষার্থীর কোনটা সবচেয়ে কঠিন লাগছে?"],
      submit: ["Request a trial class", "ট্রায়াল ক্লাসের অনুরোধ"] }
  },
];

/* ── shared fragments ─────────────────────────────────────────────────────── */

function head(d) {
  const th = d.theme;
  return `<!DOCTYPE html>
<html lang="en" data-lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(d.title[0])}</title>
<meta name="description" content="${esc(d.desc[0])}">
<link rel="icon" href="${SITE}/assets/favicon.ico" sizes="any">
<link rel="canonical" href="${SITE}/demos/${d.slug}/">
<meta name="robots" content="noindex">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(d.title[0])}">
<meta property="og:description" content="${esc(d.desc[0])}">
<meta property="og:url" content="${SITE}/demos/${d.slug}/">
<meta property="og:image" content="${SITE}/assets/share-1200x630.jpg">
<meta name="twitter:card" content="summary_large_image">
<meta name="theme-color" content="${th.accent}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=Noto+Sans+Bengali:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="../demo.css?v=1">
<style>
:root{--accent:${th.accent};--bg:${th.bg};--bg-2:${th.bg2};--line:${th.line};--ink:${th.ink}}
</style>
</head>
<body>

<!-- Every demo says what it is, at the top, before anything else. The businesses,
     prices, phone numbers and people below are all invented. -->
<div class="demo-bar">
  <div class="wrap">
    <b ${t("Demo site", "ডেমো সাইট")}</b>
    <span ${t("Sample content — this business is not real.", "নমুনা কনটেন্ট — এই ব্যবসাটি বাস্তব নয়।")}</span>
    <a href="../../" ${t("Built by Future Stack Solutions", "তৈরি করেছে ফিউচার স্ট্যাক সলিউশনস")}</a>
  </div>
</div>

<header class="hd">
  <div class="wrap hd-in">
    <a class="hd-logo" href="#top">${esc(d.name)}<small ${t(d.tagline[0], d.tagline[1])}</small></a>
    <nav class="hd-nav" aria-label="Main">
      ${d.nav.map(n => `<a href="${n[2]}" ${t(n[0], n[1])}</a>`).join("\n      ")}
    </nav>
    <div class="hd-act">
      <button class="lang" id="langBtn" type="button" aria-label="Switch language">বাংলা</button>
      <a class="btn btn-sm" href="https://wa.me/8801632932249" target="_blank" rel="noopener"
         ${t("WhatsApp", "WhatsApp")}</a>
    </div>
  </div>
</header>

<main id="top">`;
}

function hero(d) {
  return `
<section class="hero">
  <div class="wrap hero-grid">
    <div>
      <p class="eyebrow" ${t(d.kind[0], d.kind[1])}</p>
      <h1 ${t(d.hero.h1[0], d.hero.h1[1])}</h1>
      <p class="lede" ${t(d.hero.lede[0], d.hero.lede[1])}</p>
      <div class="hero-cta">
        <a class="btn btn-lg" href="${d.hero.cta[0][2]}" ${t(d.hero.cta[0][0], d.hero.cta[0][1])}</a>
        <a class="btn btn-lg btn-ghost" href="${d.hero.cta[1][2]}" ${t(d.hero.cta[1][0], d.hero.cta[1][1])}</a>
      </div>
    </div>
    <div class="ph ph-4x3"><span ${t(d.hero.ph[0], d.hero.ph[1])}</span></div>
  </div>
  <div class="wrap">
    <ul class="grid g3" style="margin-top:clamp(30px,4vw,52px)">
      ${d.facts.map(f => `<li class="card"><div class="card-body">
        <h3 style="color:var(--accent);font-size:1.5rem">${esc(f[0])}</h3>
        <p ${t(f[1], f[2])}</p></div></li>`).join("\n      ")}
    </ul>
  </div>
</section>`;
}

function secHead(id, h, sub, center) {
  return `<header class="sec-head${center ? " center" : ""}">
      <h2 ${t(h[0], h[1])}</h2>
      ${sub ? `<p ${t(sub[0], sub[1])}</p>` : ""}
    </header>`;
}

function form(d) {
  const f = d.form;
  return `
<section class="sec" id="contact">
  <div class="wrap">
    ${secHead("contact", f.head, f.sub)}
    <form class="form wide" data-demo>
      ${f.fields.map(x => `<div class="field">
        <label ${t(x[0], x[1])}</label>
        <input type="${x[2]}"${x[3] ? ` placeholder="${esc(x[3])}" data-ph-en="${esc(x[3])}" data-ph-bn="${esc(x[4])}"` : ""} required>
      </div>`).join("\n      ")}
      <div class="field full">
        <label ${t(f.note[0], f.note[1])}</label>
        <textarea></textarea>
      </div>
      <div class="field full">
        <button class="btn btn-lg" type="submit" ${t(f.submit[0], f.submit[1])}</button>
        <p class="form-note form-result" hidden></p>
        <p class="form-note" ${t("This form is part of a demo. Nothing is sent or stored.", "এই ফর্মটি ডেমোর অংশ। কিছুই পাঠানো বা সংরক্ষণ করা হয় না।")}</p>
      </div>
    </form>
  </div>
</section>`;
}

function foot(d) {
  return `
</main>

<footer class="ft">
  <div class="wrap ft-grid">
    <div>
      <h4>${esc(d.name)}</h4>
      <p ${t(d.tagline[0], d.tagline[1])}</p>
      <p style="margin-top:14px" ${t("Invented business, invented details — this page exists to show how a real one would work.", "কাল্পনিক ব্যবসা, কাল্পনিক তথ্য — আসল সাইট কেমন হবে তা দেখানোর জন্যই এই পাতা।")}</p>
    </div>
    <div>
      <h4 ${t("Pages", "পাতা")}</h4>
      ${d.nav.map(n => `<a href="${n[2]}" ${t(n[0], n[1])}</a>`).join("\n      ")}
    </div>
    <div>
      <h4 ${t("Other demos", "অন্যান্য ডেমো")}</h4>
      ${DEMOS.filter(x => x.slug !== d.slug).map(x =>
        `<a href="../${x.slug}/">${esc(x.name)}</a>`).join("\n      ")}
      <a href="../../" ${t("← Future Stack Solutions", "← ফিউচার স্ট্যাক সলিউশনস")}</a>
    </div>
  </div>
  <div class="wrap ft-btm">
    <span>© <span id="yr">2026</span> ${esc(d.name)} · <span ${t("demo site", "ডেমো সাইট")}</span></span>
    <span><a href="../../" ${t("Built by Future Stack Solutions", "তৈরি করেছে ফিউচার স্ট্যাক সলিউশনস")}</a></span>
  </div>
</footer>

<script src="../demo.js?v=1"></script>
</body>
</html>
`;
}

/* ── per-demo body sections ───────────────────────────────────────────────── */

function body(d) {
  let h = "";

  if (d.menu) {
    h += `
<section class="sec sec-alt" id="menu">
  <div class="wrap">
    ${secHead("menu", d.menu.head, d.menu.sub)}
    ${d.menu.groups.map(g => `<h3 style="margin:30px 0 14px" ${t(g.g[0], g.g[1])}</h3>
    <div class="rows">
      ${g.items.map(it => `<div class="row">
        <span><b ${t(it[0][0], it[0][1])}</b>${it[1][0] ? `<small ${t(it[1][0], it[1][1])}</small>` : ""}</span>
        <span class="price">${esc(it[2])}</span>
      </div>`).join("\n      ")}
    </div>`).join("\n    ")}
  </div>
</section>`;
  }

  if (d.gallery) {
    h += `
<section class="sec" id="gallery">
  <div class="wrap">
    ${secHead("gallery", d.gallery.head, d.gallery.sub)}
    <div class="grid g3">
      ${Array.from({ length: d.gallery.count }, () =>
        `<div class="ph ph-4x3"><span ${t(d.gallery.ph[0], d.gallery.ph[1])}</span></div>`).join("\n      ")}
    </div>
  </div>
</section>`;
  }

  if (d.hours) {
    h += `
<section class="sec sec-alt" id="hours">
  <div class="wrap">
    ${secHead("hours", d.hours.head)}
    <div class="grid g2">
      <div class="rows">
        ${d.hours.rows.map(r => `<div class="row"><b ${t(r[0][0], r[0][1])}</b>
        <span>${Array.isArray(r[1]) ? `<span ${t(r[1][0], r[1][1])}</span>` : esc(r[1])}</span></div>`).join("\n        ")}
      </div>
      <div>
        <h3 ${t("Where to find us", "আমরা কোথায়")}</h3>
        <p style="color:var(--ink-2);margin-top:10px" ${t(d.hours.addr[0], d.hours.addr[1])}</p>
        <p style="color:var(--ink-2);margin-top:10px">01XXX-XXXXXX</p>
        <div class="ph ph-16x9" style="margin-top:18px"><span ${t("Your map or photo", "আপনার ম্যাপ বা ছবি")}</span></div>
      </div>
    </div>
  </div>
</section>`;
  }

  if (d.cats && d.products) {
    h += `
<section class="sec sec-alt" id="products">
  <div class="wrap">
    ${secHead("products", d.products.head, d.products.sub)}
    <div style="display:flex;flex-wrap:wrap;gap:9px;margin-bottom:26px">
      ${d.cats.map((c, i) => `<span class="btn btn-sm${i ? " btn-ghost" : ""}" ${t(c[0], c[1])}</span>`).join("\n      ")}
    </div>
    <div class="grid g4">
      ${d.products.items.map(p => `<article class="card">
        <div class="ph ph-1x1" style="border:0;border-radius:0"><span ${t("Your photo", "আপনার ছবি")}</span></div>
        <div class="card-body">
          <h3 ${t(p[0][0], p[0][1])}</h3>
          <p ${t(p[2][0], p[2][1])}</p>
          <p style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;gap:10px">
            <span class="price">${esc(p[1])}</span>
            <a class="btn btn-sm" href="https://wa.me/8801632932249" target="_blank" rel="noopener"
               ${t("Order", "অর্ডার")}</a>
          </p>
        </div>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>`;
  }

  if (d.delivery) {
    h += `
<section class="sec" id="delivery">
  <div class="wrap">
    ${secHead("delivery", d.delivery.head)}
    <div class="rows" style="max-width:640px">
      ${d.delivery.rows.map(r => `<div class="row"><b ${t(r[0][0], r[0][1])}</b>
      <span>${Array.isArray(r[1]) ? `<span ${t(r[1][0], r[1][1])}</span>` : esc(r[1])}</span></div>`).join("\n      ")}
    </div>
  </div>
</section>`;
  }

  if (d.listings) {
    h += `
<section class="sec sec-alt" id="listings">
  <div class="wrap">
    ${secHead("listings", d.listings.head, d.listings.sub)}
    <div class="grid g3">
      ${d.listings.items.map(p => `<article class="card">
        <div class="ph ph-4x3" style="border:0;border-radius:0"><span ${t("Your photo", "আপনার ছবি")}</span></div>
        <div class="card-body">
          <h3 ${t(p[0][0], p[0][1])}</h3>
          <p ${t(p[2][0], p[2][1])}</p>
          <p style="margin-top:12px;display:flex;justify-content:space-between;align-items:center;gap:10px">
            <span class="price">${esc(p[1])}</span>
            <a class="btn btn-sm btn-ghost" href="#contact" ${t("Enquire", "জানতে চাই")}</a>
          </p>
        </div>
      </article>`).join("\n      ")}
    </div>
  </div>
</section>`;
  }

  if (d.how) {
    h += `
<section class="sec" id="how">
  <div class="wrap">
    ${secHead("how", d.how.head)}
    <div class="grid g4">
      ${d.how.steps.map((s, i) => `<article class="card"><div class="card-body">
        <span class="price" style="font-size:1.6rem">${String(i + 1).padStart(2, "0")}</span>
        <h3 style="margin-top:8px" ${t(s[0][0], s[0][1])}</h3>
        <p ${t(s[1][0], s[1][1])}</p>
      </div></article>`).join("\n      ")}
    </div>
  </div>
</section>`;
  }

  if (d.about) {
    h += `
<section class="sec sec-alt" id="about">
  <div class="wrap grid g2" style="align-items:center">
    <div class="ph ph-3x4" style="max-width:340px"><span ${t(d.hero.ph[0], d.hero.ph[1])}</span></div>
    <div>
      ${secHead("about", d.about.head)}
      ${d.about.paras.map(p => `<p style="color:var(--ink-2);margin-bottom:14px" ${t(p[0], p[1])}</p>`).join("\n      ")}
    </div>
  </div>
</section>`;
  }

  if (d.subjects) {
    h += `
<section class="sec" id="subjects">
  <div class="wrap">
    ${secHead("subjects", d.subjects.head)}
    <div class="grid g3">
      ${d.subjects.items.map(s => `<article class="card"><div class="card-body">
        <h3 ${t(s[0][0], s[0][1])}</h3>
        <p ${t(s[1][0], s[1][1])}</p>
      </div></article>`).join("\n      ")}
    </div>
  </div>
</section>`;
  }

  if (d.fees) {
    h += `
<section class="sec sec-alt" id="fees">
  <div class="wrap">
    ${secHead("fees", d.fees.head, d.fees.sub)}
    <div class="rows" style="max-width:640px">
      ${d.fees.rows.map(r => `<div class="row"><b ${t(r[0][0], r[0][1])}</b>
      <span class="price">${Array.isArray(r[1]) ? `<span ${t(r[1][0], r[1][1])}</span>` : esc(r[1])}</span></div>`).join("\n      ")}
    </div>
  </div>
</section>`;
  }

  return h;
}

/* ── write ────────────────────────────────────────────────────────────────── */
let n = 0;
for (const d of DEMOS) {
  const dir = path.join(ROOT, "demos", d.slug);
  fs.mkdirSync(dir, { recursive: true });
  const html = head(d) + hero(d) + body(d) + form(d) + foot(d);
  fs.writeFileSync(path.join(dir, "index.html"), html);
  console.log(`  demos/${d.slug}/index.html  ${(html.length / 1024).toFixed(1)} KB`);
  n++;
}
console.log(`${n} demo sites generated.`);
