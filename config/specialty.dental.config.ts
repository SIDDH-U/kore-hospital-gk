export interface Doctor {
  id: string;
  slug: string;
  name: string;
  role: string;
  speciality: string;
  degrees: string;
  experience: string;
  shortBio: string;
  timings: string;
  image: string;
  highlight: string;
}

export interface TreatmentProcessStep {
  step: number;
  title: string;
  description: string;
}

export interface TreatmentCostRange {
  starting: string;
  average: string;
  note: string;
}

export interface TreatmentFAQ {
  q: string;
  a: string;
}

export interface Treatment {
  id: string;
  slug: string;
  title: string;
  badge: string;
  shortDesc: string;
  oneLineDesc: string;
  emiMonthly?: string;
  tagline: string;
  image: string;
  startingPrice: string;
  duration: string;
  sessions: string;
  whatItIs: string;
  whoItsFor: string[];
  processSteps: TreatmentProcessStep[];
  aftercare: string[];
  costRange: TreatmentCostRange;
  faqs: TreatmentFAQ[];
}

export interface QuickPickerItem {
  id: string;
  label: string;
  treatmentSlug: string;
  treatmentName: string;
  icon: string;
}

export interface SmileGalleryCase {
  id: string;
  title: string;
  treatment: string;
  category: "Aligners" | "Implants" | "Veneers" | "Whitening";
  duration: string;
  dentist: string;
  description: string;
  beforeImage: string;
  afterImage: string;
}

export interface ReviewItem {
  id: string;
  name: string;
  avatar: string;
  treatment: string;
  date: string;
  rating: number;
  comment: string;
}

export interface FAQItem {
  q: string;
  a: string;
}

export interface SpecialtyConfig {
  specialtyName: string;
  categoryBadge: string;
  quickPicker: {
    title: string;
    items: QuickPickerItem[];
  };
  whyChooseUs: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    description: string;
    image: string;
    stats: Array<{ number: string; label: string; desc: string }>;
    points: Array<{ title: string; desc: string; icon: string }>;
  };
  howItWorks: {
    badge: string;
    titleStart: string;
    titleHighlight: string;
    titleEnd: string;
    subtitle: string;
    steps: Array<{ step: number; title: string; description: string }>;
  };
  galleryBadgeText: string;
  galleryDisclaimer: string;
  smileGallery: SmileGalleryCase[];
  doctors: Doctor[];
  reviews: ReviewItem[];
  faqs: FAQItem[];
  treatments: Treatment[];
  ctaBanner: {
    title: string;
    subtitle: string;
    buttonText: string;
    whatsAppText: string;
  };
}

/**
 * ============================================================================
 * SPECIALTY CONFIGURATION (DENTAL CLINIC SPECIFIC)
 * ============================================================================
 * This file contains clinical dental procedures, before/after cases, specialist
 * roster, and FAQs. It is kept separate from clinic.config.ts so switching
 * or creating a new dental studio never requires rewriting specialty clinical content.
 */
export const specialtyDentalConfig: SpecialtyConfig = {
  specialtyName: "Dental & Orthodontic Care",
  categoryBadge: "POPULAR SPECIALTIES",

  quickPicker: {
    title: "What do you need today?",
    items: [
      {
        id: "tooth-pain",
        label: "Tooth pain",
        treatmentSlug: "root-canal",
        treatmentName: "Root Canal (RCT)",
        icon: "zap",
      },
      {
        id: "aligners",
        label: "Braces / Aligners",
        treatmentSlug: "braces-and-aligners",
        treatmentName: "Braces & Clear Aligners",
        icon: "sparkle",
      },
      {
        id: "whitening",
        label: "Whitening",
        treatmentSlug: "teeth-whitening",
        treatmentName: "Teeth Whitening",
        icon: "sun",
      },
      {
        id: "missing-tooth",
        label: "Missing tooth",
        treatmentSlug: "dental-implants",
        treatmentName: "Dental Implants",
        icon: "shield",
      },
      {
        id: "kids",
        label: "Kids dentistry",
        treatmentSlug: "pediatric-dentistry",
        treatmentName: "Pediatric Dentistry",
        icon: "smile",
      },
      {
        id: "checkup",
        label: "Check-up",
        treatmentSlug: "dental-implants",
        treatmentName: "Consultation & 3D Scan",
        icon: "check",
      },
    ],
  },

  whyChooseUs: {
    badge: "THE CLINICAL DIFFERENCE",
    titleStart: "Dental visits you will ",
    titleHighlight: "actually",
    titleEnd: " look forward to",
    description: "Designed from the ground up for zero anxiety, complete transparency, and gentle private care.",
    image: "/images/clinic-interior.webp",
    stats: [
      { number: "0", label: "Pain", desc: "Computer-guided numbing" },
      { number: "3D", label: "Scan", desc: "Zero impression goop" },
      { number: "100%", label: "Upfront", desc: "Transparent written quotes" },
    ],
    points: [
      {
        title: "Computerized Anesthesia",
        desc: "Gentle micro-delivery for zero injection discomfort.",
        icon: "feather",
      },
      {
        title: "3D Digital Scanning",
        desc: "No messy goop. Precision digital 3D models.",
        icon: "scan",
      },
      {
        title: "Senior MDS Specialists",
        desc: "Treated only by seasoned dental specialists.",
        icon: "doctor",
      },
      {
        title: "100% Upfront Pricing",
        desc: "Transparent written quotes with no surprises.",
        icon: "receipt",
      },
      {
        title: "Class-B Sterilisation",
        desc: "Hospital autoclave kits unsealed before you.",
        icon: "shield",
      },
      {
        title: "Flexible Evening Slots",
        desc: "Open till 8:30 PM and weekend appointments.",
        icon: "clock",
      },
    ],
  },

  howItWorks: {
    badge: "SIMPLE 4-STEP JOURNEY",
    titleStart: "Your painless smile ",
    titleHighlight: "transformation",
    titleEnd: " in four steps",
    subtitle: "From your initial WhatsApp chat to your final smile, we make every step simple and comfortable.",
    steps: [
      {
        step: 1,
        title: "Book Your Slot",
        description: "Instant confirmation on WhatsApp with zero waiting.",
      },
      {
        step: 2,
        title: "3D Scan & Checkup",
        description: "Gentle examination and low-dose digital 3D imaging.",
      },
      {
        step: 3,
        title: "Personalised Plan",
        description: "Transparent written quote with zero hidden charges.",
      },
      {
        step: 4,
        title: "Painless Care",
        description: "Gentle computer-numbed treatment and follow-up.",
      },
    ],
  },

  galleryBadgeText: "Sample case",
  galleryDisclaimer: "Sample clinical photographs for demonstration purposes. Individual anatomical results may vary.",

  smileGallery: [
    {
      id: "case-1",
      title: "Clear Aligners Straightening",
      treatment: "Clear Aligners",
      category: "Aligners",
      duration: "7 Months",
      dentist: "Orthodontic Specialist",
      description: "Severe lower crowding and upper midline deviation corrected with 16 sets of clear aligners.",
      beforeImage: "/images/gallery/case-1-before.webp",
      afterImage: "/images/gallery/case-1-after.webp",
    },
    {
      id: "case-2",
      title: "Single Tooth Implant & Crown",
      treatment: "Dental Implant",
      category: "Implants",
      duration: "3 Visits",
      dentist: "Implant Specialist",
      description: "Fractured front incisor replaced with an immediate Swiss implant and lifelike E-max porcelain crown.",
      beforeImage: "/images/gallery/case-2-before.webp",
      afterImage: "/images/gallery/case-2-after.webp",
    },
    {
      id: "case-3",
      title: "Porcelain Veneers Makeover",
      treatment: "Porcelain Veneers",
      category: "Veneers",
      duration: "2 Weeks",
      dentist: "Aesthetic Specialist",
      description: "Worn, discolored, and uneven enamel transformed into a symmetrical, bright, natural smile.",
      beforeImage: "/images/gallery/case-3-before.webp",
      afterImage: "/images/gallery/case-3-after.webp",
    },
    {
      id: "case-4",
      title: "In-Office Laser Whitening",
      treatment: "Teeth Whitening",
      category: "Whitening",
      duration: "45 Minutes",
      dentist: "Cosmetic Specialist",
      description: "Severe tea and coffee staining brightened by 5 full shades on the Vita guide in a single visit.",
      beforeImage: "/images/gallery/case-4-before.webp",
      afterImage: "/images/gallery/case-4-after.webp",
    },
  ],

  doctors: [
    {
      id: "dr-ananya-roy",
      slug: "dr-ananya-roy",
      name: "Dr. Ananya Roy",
      role: "Lead Orthodontist & Smile Designer",
      speciality: "Orthodontist & Dentofacial Orthopedics",
      degrees: "BDS, MDS (Orthodontics), Certified Invisalign Provider",
      experience: "12+ Years",
      shortBio: "Specialist in discreet clear aligners, ceramic braces, and computer-guided smile design. Passionate about gentle, anxiety-free orthodontic care.",
      timings: "Mon, Wed, Fri, Sat: 10:00 AM – 7:30 PM",
      image: "/images/doctors/dr-ananya-roy.webp",
      highlight: "Over 2,200+ successful clear aligner smile transformations completed.",
    },
    {
      id: "dr-vikram-singhania",
      slug: "dr-vikram-singhania",
      name: "Dr. Vikram Singhania",
      role: "Senior Implantologist & Oral Surgeon",
      speciality: "Oral & Maxillofacial Surgery, Dental Implants",
      degrees: "BDS, MDS (Oral Surgery), Fellow Int. Congress of Implantologists (ICOI)",
      experience: "15+ Years",
      shortBio: "Master of computer-guided keyhole dental implants, full-mouth rehabilitation, and painless wisdom tooth removal with minimal recovery time.",
      timings: "Tue, Thu, Sat: 9:30 AM – 8:00 PM",
      image: "/images/doctors/dr-vikram-singhania.webp",
      highlight: "Placed 3,800+ dental implants with a 99.4% clinical success record.",
    },
    {
      id: "dr-neha-kapoor",
      slug: "dr-neha-kapoor",
      name: "Dr. Neha Kapoor",
      role: "Chief Endodontist (Root Canal Specialist)",
      speciality: "Conservative Dentistry & Endodontics",
      degrees: "BDS, MDS (Conservative Dentistry)",
      experience: "10+ Years",
      shortBio: "Renowned for microscope-assisted, single-sitting painless root canals. Her gentle chairside demeanor puts even the most anxious patients at ease.",
      timings: "Mon – Sat: 9:00 AM – 2:00 PM",
      image: "/images/doctors/dr-neha-kapoor.webp",
      highlight: "Completed 5,000+ single-sitting root canals with zero discomfort.",
    },
    {
      id: "dr-siddharth-verma",
      slug: "dr-siddharth-verma",
      name: "Dr. Siddharth Verma",
      role: "Pediatric Dental Specialist",
      speciality: "Pedodontics & Preventive Children's Dentistry",
      degrees: "BDS, MDS (Pediatric Dentistry)",
      experience: "9+ Years",
      shortBio: "Dedicated to creating delightful, stress-free dental experiences for children. Expert in early habit correction, sealants, and cavity defense.",
      timings: "Mon, Wed, Fri: 2:00 PM – 8:00 PM",
      image: "/images/doctors/dr-siddharth-verma.webp",
      highlight: "Loved by kids for his magical 'no tears, big smiles' approach.",
    },
  ],

  reviews: [
    {
      id: "rev-1",
      name: "Pooja Deshmukh",
      avatar: "/images/reviews/rev-1.webp",
      treatment: "Clear Aligners",
      date: "2 weeks ago",
      rating: 5,
      comment: "I was very nervous about getting braces in my late 20s, but the clear aligner journey was completely effortless. Nobody at work even noticed I was wearing them, and my teeth are now straight in 7 months!",
    },
    {
      id: "rev-2",
      name: "Rajesh Kulkarni",
      avatar: "/images/reviews/rev-2.webp",
      treatment: "Dental Implant",
      date: "1 month ago",
      rating: 5,
      comment: "Terrified of dental surgery before coming in, but the implant was completely painless from start to finish. I can chew almonds and crunchy foods again without hesitation.",
    },
    {
      id: "rev-3",
      name: "Meera Nair",
      avatar: "/images/reviews/rev-3.webp",
      treatment: "Root Canal (RCT)",
      date: "3 weeks ago",
      rating: 5,
      comment: "Walked in with severe toothache and left 50 minutes later completely pain-free! The gentle touch and clear explanation of every step kept me calm the whole time.",
    },
    {
      id: "rev-4",
      name: "Aditya Patil",
      avatar: "/images/reviews/rev-4.webp",
      treatment: "Teeth Whitening",
      date: "2 months ago",
      rating: 5,
      comment: "Booked teeth whitening before my wedding reception. In 45 minutes my smile was noticeably brighter! Spotless, calm studio environment and zero sensitivity.",
    },
    {
      id: "rev-5",
      name: "Sunita Joshi",
      avatar: "/images/reviews/rev-2.webp",
      treatment: "Zirconia Crowns",
      date: "2 months ago",
      rating: 5,
      comment: "Extremely modern clinic with 3D digital scanners instead of messy impression paste. Transparent pricing with no surprises. Highly recommended!",
    },
    {
      id: "rev-6",
      name: "Karan Mehta",
      avatar: "/images/reviews/rev-4.webp",
      treatment: "Wisdom Tooth Removal",
      date: "3 months ago",
      rating: 5,
      comment: "Extracted impacted wisdom teeth on Saturday, and was back in office on Monday morning. Almost no swelling and zero pain. Truly state of the art.",
    },
  ],

  faqs: [
    {
      q: "Is a root canal treatment painful?",
      a: "Not at all. With modern computer-controlled local anesthesia and rotary instruments, root canals relieve pain rather than causing it. Most patients describe it as no different from getting a standard filling, and many even relax or take a light nap.",
    },
    {
      q: "How long do dental implants last?",
      a: "Dental implants are engineered to be a permanent, lifelong solution. The titanium post fuses permanently with your jawbone. With regular brushing, flossing, and 6-month checkups, implants can easily last 30+ years.",
    },
    {
      q: "Are clear aligners suitable for adults?",
      a: "Yes! In fact, more than 60% of our aligner patients are adults. Clear aligners are virtually invisible, comfortable, and removable, making them ideal for professionals, college students, and active lifestyles.",
    },
    {
      q: "How often should I get a dental checkup and cleaning?",
      a: "We recommend a preventative checkup and ultrasonic cleaning every 6 months. Regular maintenance removes plaque before it hardens into calculus, keeping gums healthy and preventing cavities before they start.",
    },
    {
      q: "Is professional teeth whitening safe for tooth enamel?",
      a: "Completely safe. Our in-office LED laser whitening uses a pH-balanced, medical-grade gel that breaks down stain molecules without thinning or eroding your natural tooth enamel. We also apply a remineralizing desensitizer immediately afterward.",
    },
    {
      q: "What payment and 0% EMI options do you provide?",
      a: "We accept all major credit/debit cards, UPI, net banking, and insurance reimbursements. For treatments over ₹10,000 (such as implants, aligners, and veneers), we offer 0% interest EMI plans up to 12 months with instant digital approval.",
    },
    {
      q: "What should I do in a dental emergency?",
      a: "Contact our emergency on-call desk immediately. Whether it is a knocked-out tooth, acute severe toothache, or facial swelling, our on-call dental team will guide you on immediate first aid and see you promptly.",
    },
    {
      q: "How soon can I eat after a tooth filling or cleaning?",
      a: "With our modern light-cured composite resin fillings, the material is 100% hardened immediately under the blue LED wand, so you can eat as soon as local numbness wears off. After cleaning or whitening, we recommend waiting 30 minutes.",
    },
  ],

  treatments: [
    {
      id: "dental-implants",
      slug: "dental-implants",
      title: "Dental Implants",
      badge: "Permanent Teeth",
      shortDesc: "Permanent, lifelike tooth replacements engineered with Swiss titanium fixtures and CAD/CAM zirconia crowns.",
      oneLineDesc: "Swiss titanium replacement with lifelike zirconia crown.",
      emiMonthly: "₹2,083/mo",
      tagline: "Eat, laugh, and smile with 100% natural confidence.",
      image: "/images/treatments/dental-implants.webp",
      startingPrice: "₹25,000",
      duration: "30 – 45 mins",
      sessions: "2 – 3 visits",
      whatItIs: "A dental implant is a medical-grade titanium fixture placed gently into the jawbone that functions as an artificial tooth root. Topped with a custom zirconia ceramic crown, it looks, bites, and feels identical to a natural tooth.",
      whoItsFor: [
        "Patients missing one or multiple natural teeth",
        "Anyone tired of loose, uncomfortable dentures",
        "Those having difficulty chewing favorite foods",
        "Patients wanting to prevent facial bone shrinkage after extraction",
      ],
      processSteps: [
        {
          step: 1,
          title: "3D CBCT Bone Scan",
          description: "High-resolution digital mapping of bone thickness and nerves for microscopic computer guidance.",
        },
        {
          step: 2,
          title: "Painless Keyhole Placement",
          description: "The titanium implant is placed under computer-controlled local anesthesia without discomfort.",
        },
        {
          step: 3,
          title: "Osseointegration Bonding",
          description: "The biocompatible implant fuses solidly with the jawbone over a short healing interval.",
        },
        {
          step: 4,
          title: "Custom Zirconia Crown",
          description: "A precision-milled, shade-matched porcelain crown is permanently attached.",
        },
      ],
      aftercare: [
        "Stick to soft foods for the initial 48 hours",
        "Gentle warm salt water mouth rinses after 24 hours",
        "Normal tooth brushing avoiding direct contact with surgical site for 3 days",
        "Routine 6-month preventive dental checkups",
      ],
      costRange: {
        starting: "₹25,000",
        average: "₹25,000 – ₹45,000",
        note: "Includes titanium implant, abutment, and CAD/CAM ceramic crown. 0% EMI available.",
      },
      faqs: [
        {
          q: "Is dental implant surgery painful?",
          a: "Not at all. The procedure is performed under gentle computer-assisted numbing. Patients consistently report feeling less discomfort than a standard tooth extraction.",
        },
        {
          q: "How long do dental implants last?",
          a: "With routine brushing, flossing, and 6-month checkups, dental implants are engineered to last a lifetime (30+ years).",
        },
        {
          q: "Can I get 0% EMI on dental implants?",
          a: "Yes! We provide 0% interest monthly EMI plans up to 12 months with instant digital approval.",
        },
      ],
    },
    {
      id: "braces-and-aligners",
      slug: "braces-and-aligners",
      title: "Braces & Clear Aligners",
      badge: "Invisible Orthodontics",
      shortDesc: "Discreet, removable clear aligners and modern ceramic braces to straighten teeth comfortably at any age.",
      oneLineDesc: "Discreet clear aligners to straighten teeth without wires.",
      emiMonthly: "₹2,916/mo",
      tagline: "Straighten your teeth invisibly without metal wires.",
      image: "/images/treatments/braces-and-aligners.webp",
      startingPrice: "₹35,000",
      duration: "6 – 14 months",
      sessions: "Reviews every 6 weeks",
      whatItIs: "Clear aligners are custom-crafted, BPA-free transparent medical plastic trays that gradually guide teeth into ideal alignment. They are virtually invisible and completely removable for meals and brushing.",
      whoItsFor: [
        "Crooked, rotated, or overlapping teeth",
        "Gaps and spacing between teeth (diastema)",
        "Overbites, underbites, and crossbites",
        "Adults wanting subtle straightening without teen metal braces",
      ],
      processSteps: [
        {
          step: 1,
          title: "3D Digital Intraoral Scan",
          description: "Zero impression goop. A rapid wand captures 6,000 pictures per second of your teeth.",
        },
        {
          step: 2,
          title: "Smile Outcome Simulation",
          description: "Preview your exact finished smile on our 4K monitor before starting treatment.",
        },
        {
          step: 3,
          title: "Custom Aligners Delivery",
          description: "Receive your sets of precision laser-trimmed aligner trays with wearing instructions.",
        },
        {
          step: 4,
          title: "Bi-Monthly Check-ins",
          description: "Quick 10-minute checkups or remote scan reviews to verify perfect tooth tracking.",
        },
      ],
      aftercare: [
        "Wear trays 20 to 22 hours per day",
        "Remove aligners when eating or drinking hot beverages",
        "Clean trays daily with lukewarm water and soft toothbrush",
        "Wear your nighttime retainer once active treatment concludes",
      ],
      costRange: {
        starting: "₹35,000",
        average: "₹35,000 – ₹85,000",
        note: "Complete plan includes all aligner stages, refinement trays, and post-treatment retainers.",
      },
      faqs: [
        {
          q: "How many hours a day do I need to wear aligners?",
          a: "For optimal movement speed, wear your aligners 20 to 22 hours per day, removing them only for meals and brushing.",
        },
        {
          q: "Will wearing aligners affect my speech?",
          a: "Most patients adjust within 48 to 72 hours with zero noticeable lisp.",
        },
      ],
    },
    {
      id: "root-canal",
      slug: "root-canal",
      title: "Root Canal (RCT)",
      badge: "Painless & Fast",
      shortDesc: "Microscope-guided, single-sitting root canals that eliminate infection and save your natural tooth with zero pain.",
      oneLineDesc: "Single-sitting microscope RCT to permanently end pain.",
      emiMonthly: "₹1,166/mo",
      tagline: "Relieve severe tooth pain in a single gentle 45-minute visit.",
      image: "/images/treatments/root-canal.webp",
      startingPrice: "₹3,500",
      duration: "40 – 50 mins",
      sessions: "Single sitting (usually 1 visit)",
      whatItIs: "A root canal is a specialized treatment to save an infected or badly decayed tooth. Under local numbing, infected pulp tissue is gently cleaned out, disinfected with laser irrigation, and hermetically sealed.",
      whoItsFor: [
        "Severe, throbbing toothache that worsens at night",
        "Lingering sensitivity to hot or cold drinks",
        "Pain when biting down or touching the tooth",
        "Gum swelling or tender pimple near a painful tooth",
      ],
      processSteps: [
        {
          step: 1,
          title: "Digital X-Ray & Numbing",
          description: "Micro-dose sensor locates canal depths while computer-assisted anesthesia ensures zero sensation.",
        },
        {
          step: 2,
          title: "Rotary Canal Cleaning",
          description: "Ultra-flexible nickel-titanium instruments gently remove bacteria in minutes.",
        },
        {
          step: 3,
          title: "Laser Bio-Disinfection",
          description: "Canals are irrigated to eliminate 99.9% of microscopic bacteria.",
        },
        {
          step: 4,
          title: "Bioceramic Sealing",
          description: "Sealed hermetically with gutta-percha and prepared for a protective ceramic crown.",
        },
      ],
      aftercare: [
        "Avoid chewing on the treated tooth until the final crown is placed",
        "Take prescribed mild anti-inflammatory tablets if slight soreness occurs",
        "Maintain routine brushing and flossing",
      ],
      costRange: {
        starting: "₹3,500",
        average: "₹3,500 – ₹6,500",
        note: "Includes digital X-rays, rotary instrumentation, and bioceramic obturation.",
      },
      faqs: [
        {
          q: "Can a root canal really be completed in one sitting?",
          a: "Yes! In over 90% of cases, modern rotary instruments and digital apex locators allow our specialist endodontists to complete the entire treatment in a single 45-minute visit.",
        },
        {
          q: "Do I always need a crown after a root canal?",
          a: "For back teeth (molars and premolars), a crown is strongly recommended to protect the tooth from biting forces and prevent fractures.",
        },
      ],
    },
    {
      id: "teeth-whitening",
      slug: "teeth-whitening",
      title: "Teeth Whitening",
      badge: "Same-Day Glow",
      shortDesc: "In-office cool-LED laser whitening that lifts stubborn tea, coffee, and tobacco stains up to 8 shades in 45 minutes.",
      oneLineDesc: "Laser LED whitening brightening enamel up to 8 shades.",
      emiMonthly: "₹1,250/mo",
      tagline: "Brighten your natural smile up to 8 shades in 45 minutes.",
      image: "/images/treatments/teeth-whitening.webp",
      startingPrice: "₹7,500",
      duration: "45 mins",
      sessions: "1 visit",
      whatItIs: "Professional in-office teeth whitening utilizes a medical-grade hydrogen peroxide gel activated by a cool blue LED light to gently break apart deep-set microscopic stains without damaging tooth enamel.",
      whoItsFor: [
        "Yellowing or dull teeth due to aging",
        "Tea, coffee, red wine, or tobacco staining",
        "Pre-wedding or special event smile brightening",
        "Anyone wanting a quick, dramatic confidence boost",
      ],
      processSteps: [
        { step: 1, title: "Pre-Polish & Shade Match", description: "Tooth surfaces are cleaned with an ultrasonic polisher and baseline shade recorded." },
        { step: 2, title: "Gum Barrier Application", description: "A protective resin barrier is placed over gums and lips for 100% comfort." },
        { step: 3, title: "LED Light Gel Activation", description: "Three 15-minute cycles of professional whitening gel activated under cool LED light." },
        { step: 4, title: "Fluoride Desensitizing", description: "A soothing remineralization paste is applied to prevent post-treatment sensitivity." },
      ],
      aftercare: [
        "Follow the 'white diet' (avoid coffee, tea, turmeric, berries, red wine) for 48 hours",
        "Use a soft-bristled toothbrush and non-abrasive toothpaste",
        "Rinse mouth with water after dark-colored beverages",
      ],
      costRange: {
        starting: "₹7,500",
        average: "₹7,500 – ₹12,000",
        note: "Includes pre-polish, 3 LED cycles, desensitizing serum, and home care kit.",
      },
      faqs: [
        {
          q: "Will teeth whitening damage my tooth enamel?",
          a: "No. Our clinic uses pH-balanced medical gels tested to preserve enamel integrity and mineral content.",
        },
        {
          q: "How long do teeth whitening results last?",
          a: "Results typically last 1 to 2 years depending on diet, coffee habits, and oral hygiene.",
        },
      ],
    },
    {
      id: "smile-design-veneers",
      slug: "smile-design-veneers",
      title: "Smile Design / Veneers",
      badge: "Cosmetic Makeover",
      shortDesc: "Ultra-thin, handcrafted E-max porcelain veneers that correct chips, gaps, and discoloration for a red-carpet smile.",
      oneLineDesc: "Ultra-thin E-max porcelain veneers for aesthetic perfection.",
      emiMonthly: "₹2,000/mo",
      tagline: "Handcrafted porcelain veneers for Hollywood-caliber aesthetics.",
      image: "/images/treatments/smile-design-veneers.webp",
      startingPrice: "₹12,000",
      duration: "60 mins",
      sessions: "2 visits",
      whatItIs: "Porcelain veneers are custom-milled, wafer-thin shells of dental ceramic bonded permanently to the front of teeth to reshape, brighten, and re-proportion your smile.",
      whoItsFor: [
        "Chipped, cracked, or worn tooth edges",
        "Stubborn intrinsic stains that whitening cannot fix",
        "Gaps, slight misalignment, or uneven tooth sizes",
        "Patients wanting a complete, symmetrical smile makeover",
      ],
      processSteps: [
        { step: 1, title: "Facial Aesthetic Scan", description: "Digital smile design analyzing lips, eyes, and skin tone for bespoke proportions." },
        { step: 2, title: "Micro-Enamel Prep", description: "Ultra-conservative 0.3mm enamel contouring with temporary trial veneers." },
        { step: 3, title: "Master Lab Crafting", description: "Hand-layered E-max porcelain with natural translucency." },
        { step: 4, title: "Adhesive Cementation", description: "Bonded under dental dam isolation for lifelong durability." },
      ],
      aftercare: [
        "Avoid biting directly into bottle caps or tearing packaging with veneers",
        "Wear a nightguard if you have a habit of clenching or grinding teeth",
        "Routine 6-month preventive polish and checkup",
      ],
      costRange: {
        starting: "₹12,000",
        average: "₹12,000 – ₹20,000 per tooth",
        note: "Includes digital 3D trial preview, hand-layered E-max porcelain, and 10-year warranty.",
      },
      faqs: [
        {
          q: "Will porcelain veneers look fake or bulky?",
          a: "Never. We customize translucency, surface micro-texture, and natural hue so your veneers look like naturally perfect teeth.",
        },
        {
          q: "How long do porcelain veneers last?",
          a: "High-grade E-max porcelain veneers regularly last 15 to 20+ years with standard oral hygiene.",
        },
      ],
    },
    {
      id: "pediatric-dentistry",
      slug: "pediatric-dentistry",
      title: "Pediatric Dentistry (Kids)",
      badge: "Gentle & Fun",
      shortDesc: "Specialized, fear-free dental care for infants, children, and teens with cavity prevention and kid-friendly suites.",
      oneLineDesc: "Fun, gentle children's dentistry with zero tears.",
      emiMonthly: "₹500/mo",
      tagline: "Delightful, tear-free dental experiences for growing smiles.",
      image: "/images/treatments/pediatric-dentistry.webp",
      startingPrice: "₹1,500",
      duration: "30 mins",
      sessions: "1 visit",
      whatItIs: "Pediatric dentistry focuses on child psychology, preventive sealants, cavity defenses, and gentle early habit guidance in a playful environment.",
      whoItsFor: [
        "First dental visits for toddlers (age 1+)",
        "Tooth decay, cavities, or early toothaches in children",
        "Preventive dental sealants and fluoride varnishes",
        "Habit correction for thumb sucking or tongue thrusting",
      ],
      processSteps: [
        { step: 1, title: "Tell-Show-Do Intro", description: "Friendly demonstration of dental tools so kids feel curious and happy." },
        { step: 2, title: "Gentle Checkup", description: "Checking bite alignment, jaw growth, and enamel density." },
        { step: 3, title: "Cavity Defense Application", description: "Fruity-flavored fluoride varnish or dental pit and fissure sealants." },
        { step: 4, title: "Brave Patient Reward", description: "Every child receives a surprise prize and certificate of bravery." },
      ],
      aftercare: [
        "Supervise brushing twice daily until age 8",
        "Limit sticky sweets, fruit gummies, and sugary bedtime juices",
        "6-month pediatric checkups for timely intervention",
      ],
      costRange: {
        starting: "₹1,500",
        average: "₹1,500 – ₹4,000",
        note: "Specialist MDS pediatric dentist consultation, clean, and fluoride application.",
      },
      faqs: [
        {
          q: "At what age should my child first visit the dentist?",
          a: "Pediatric dental associations advise bringing your child when their first baby tooth emerges or by their first birthday.",
        },
      ],
    },
    {
      id: "wisdom-teeth-removal",
      slug: "wisdom-teeth-removal",
      title: "Wisdom Teeth Removal",
      badge: "Gentle Extraction",
      shortDesc: "Minimally invasive, painless surgical extraction of impacted third molars with rapid recovery protocols.",
      oneLineDesc: "Gentle, computer-numbed removal of impacted wisdom teeth.",
      emiMonthly: "₹1,000/mo",
      tagline: "Fast, painless extraction of painful or impacted wisdom teeth.",
      image: "/images/treatments/wisdom-teeth-removal.webp",
      startingPrice: "₹4,000",
      duration: "30 – 40 mins",
      sessions: "1 visit",
      whatItIs: "A routine procedure to gently remove third molars that lack adequate space to emerge properly, preventing nerve damage, cysts, and crowding of front teeth.",
      whoItsFor: [
        "Jaw pain, stiffness, or swelling near back molars",
        "Food trapping and recurrent infections behind the last tooth",
        "Impaction pushing against neighbouring second molars",
      ],
      processSteps: [
        { step: 1, title: "3D Nerve Mapping", description: "Digital panoramic scan mapping exact roots relative to alveolar nerves." },
        { step: 2, title: "Deep Local Numbing", description: "Computer-assisted anesthesia ensuring absolute numbness throughout." },
        { step: 3, title: "Micro-Surgical Sectioning", description: "Tooth is sectioned gently for atraumatic removal." },
        { step: 4, title: "Healing Gel Placement", description: "Collagen plug and dissolvable sutures for fast recovery." },
      ],
      aftercare: [
        "Bite firmly on gauze pad for 45 minutes",
        "Apply cold ice packs to cheek in 15-minute intervals for first 12 hours",
        "Avoid using straws or spitting forcefully for 3 days",
      ],
      costRange: {
        starting: "₹4,000",
        average: "₹4,000 – ₹8,500",
        note: "Performed by Senior Oral & Maxillofacial Surgeon.",
      },
      faqs: [
        {
          q: "Will I feel pain during wisdom tooth extraction?",
          a: "Zero pain. Our computer-controlled anesthesia ensures complete numbness.",
        },
      ],
    },
    {
      id: "teeth-cleaning-polishing",
      slug: "teeth-cleaning-polishing",
      title: "Ultrasonic Cleaning & Polish",
      badge: "Preventive Care",
      shortDesc: "Gentle ultrasonic scaling that removes stubborn plaque, tartar, and coffee stains, paired with diamond air polishing.",
      oneLineDesc: "Ultrasonic scaling & diamond air polish for healthy gums.",
      emiMonthly: "₹500/mo",
      tagline: "Revitalize your gums and reveal smooth, clean teeth.",
      image: "/images/treatments/teeth-cleaning-polishing.webp",
      startingPrice: "₹1,500",
      duration: "30 mins",
      sessions: "1 visit",
      whatItIs: "A deep clinical cleaning using piezoelectric micro-vibrations to dislodge calcified tartar without scraping or scratching natural tooth enamel.",
      whoItsFor: [
        "Gums that bleed during tooth brushing or flossing",
        "Yellowish or brownish buildup around lower front teeth",
        "Persistent bad breath (halitosis)",
        "Anyone who has not had a professional cleaning in the past 6 months",
      ],
      processSteps: [
        { step: 1, title: "Periodontal Assessment", description: "Checking pocket depths and gum health." },
        { step: 2, title: "Ultrasonic Scaling", description: "Water-cooled sound waves dissolve calculus painlessly." },
        { step: 3, title: "Air-Flow Polishing", description: "Glycine powder jet lifts superficial tea and coffee stains." },
        { step: 4, title: "Fluoride Protection", description: "Remineralizing paste seals microscopic enamel pores." },
      ],
      aftercare: [
        "Avoid intensely hot or icy drinks for 2 hours if mild sensitivity occurs",
        "Resume gentle daily flossing",
        "Schedule regular maintenance clean every 6 months",
      ],
      costRange: {
        starting: "₹1,500",
        average: "₹1,500 – ₹2,500",
        note: "Full mouth ultrasonic scaling and diamond air-flow polish.",
      },
      faqs: [
        {
          q: "Does teeth cleaning make teeth loose or create gaps?",
          a: "A common myth! Cleaning only removes the hard tartar that was pushing gums away. Your gums tighten around the clean tooth surface.",
        },
      ],
    },
    {
      id: "dental-crowns-bridges",
      slug: "dental-crowns-bridges",
      title: "Zirconia Crowns & Bridges",
      badge: "Lifetime Strength",
      shortDesc: "Diamond-milled monolithic zirconia and E-max ceramic restorations that protect damaged teeth with lifelike beauty.",
      oneLineDesc: "Precision diamond-milled zirconia crowns with 15-yr warranty.",
      emiMonthly: "₹1,000/mo",
      tagline: "Restore broken or root-canal treated teeth with permanent strength.",
      image: "/images/treatments/dental-crowns-bridges.webp",
      startingPrice: "₹6,000",
      duration: "45 mins",
      sessions: "2 visits",
      whatItIs: "Custom-milled caps placed over compromised teeth to restore natural shape, bite strength, and color matching neighbouring teeth.",
      whoItsFor: [
        "Teeth that have undergone root canal treatment",
        "Heavily cracked, fractured, or worn down teeth",
        "Replacing older metal or black-margin PFM crowns",
      ],
      processSteps: [
        { step: 1, title: "Tooth Preparation & Digital Scan", description: "Gentle shaping and an optical 3D scan sent directly to our milling lab." },
        { step: 2, title: "Custom Temporary Protection", description: "A comfortable temporary crown protects your tooth while your crown is milled." },
        { step: 3, title: "CAD/CAM Zirconia Fabrication", description: "Diamond-milled from solid zirconia block for flawless fit and strength." },
        { step: 4, title: "Permanent Luting", description: "Bonded with medical glass ionomer cement for permanent retention." },
      ],
      aftercare: [
        "Avoid chewing extremely hard items (ice, bottle caps)",
        "Brush and floss around the crown margin daily",
        "Annual checkup to ensure bite alignment remains balanced",
      ],
      costRange: {
        starting: "₹6,000",
        average: "₹6,000 – ₹16,000",
        note: "Includes 15-year manufacturer replacement warranty on zirconia.",
      },
      faqs: [
        {
          q: "Do zirconia crowns have black lines near the gums?",
          a: "Never! Unlike older metal-fused crowns (PFM), zirconia is 100% metal-free and translucent, so your gums remain natural pink.",
        },
        {
          q: "How strong are zirconia crowns?",
          a: "Zirconia has a flexural strength of over 1200 MPa—more than three times stronger than natural tooth enamel.",
        },
      ],
    },
  ],

  ctaBanner: {
    title: "Ready for your best smile?",
    subtitle: "Take the first step toward a pain-free, radiant smile you'll feel proud to share with the world.",
    buttonText: "Book Your Appointment",
    whatsAppText: "Chat on WhatsApp",
  },
};
