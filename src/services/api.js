export const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const loginUser = async (email, roleType) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    if (roleType === 'business') {
        return {
            success: true,
            user: {
                id: 99,
                name: 'Agency Admin',
                email: email || 'admin@hsd.agency',
                role: 'admin',
                avatar: 'https://ui-avatars.com/api/?name=Admin&background=10b981&color=fff'
            },
            redirect: '/admin-dashboard'
        };
    } else {
        return {
            success: true,
            user: {
                id: 1,
                name: 'Valued Client',
                email: email || 'client@example.com',
                role: 'customer',
                avatar: 'https://ui-avatars.com/api/?name=Client&background=f97316&color=fff'
            },
            redirect: '/home'
        };
    }
};

export const registerUser = async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return {
        success: true,
        user: {
            id: Date.now(),
            name: userData.name || 'New User',
            email: userData.email,
            role: 'customer',
            avatar: 'https://ui-avatars.com/api/?name=User&background=random'
        },
        redirect: '/home'
    };
};

export const getAppointments = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        {
            id: 1,
            service: "Premium Haircut & Styling",
            provider: "Elite Cuts Barbershop",
            date: "Oct 24, 2026",
            time: "10:00 AM",
            status: "Upcoming",
            location: "Downtown, New York",
            image: "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 2,
            service: "Therapy Session",
            provider: "Mindful Space",
            date: "Oct 28, 2026",
            time: "2:00 PM",
            status: "Upcoming",
            location: "Online / Virtual",
            image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=200"
        }
    ];
};

export const getAgencies = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
        {
            id: 1,
            name: "Barberking",
            category: "Barbershop",
            rating: 4.8,
            reviewCount: "3.2k",
            distance: "2.0 Kms",
            address: "Grand City St. 100, NY",
            imageUrl: "https://images.unsplash.com/photo-1503951914875-452162b7f30a?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 2,
            name: "Salon Elegance",
            category: "Beauty Salon",
            rating: 4.9,
            reviewCount: "1.5k",
            distance: "0.8 Kms",
            address: "Fifth Avenue, NY",
            imageUrl: "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 3,
            name: "Zen Dental Spa",
            category: "Dentist",
            rating: 5.0,
            reviewCount: "500+",
            distance: "4.5 Kms",
            address: "Westbourne Park, UK",
            imageUrl: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 4,
            name: "Iron Pump Gym",
            category: "Fitness",
            rating: 4.7,
            reviewCount: "890",
            distance: "1.2 Kms",
            address: "Downtown Complex, LA",
            imageUrl: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&q=80&w=800"
        },
        {
            id: 5,
            name: "Restore Physio",
            category: "Health",
            rating: 4.9,
            reviewCount: "120",
            distance: "3.0 Kms",
            address: "Medical Center Dr, TX",
            imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800"
        }
    ];
};

export const getMediaContent = async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return {
        transformations: [
            {
                id: 101,
                title: "Sharp Fade Revamp",
                category: "Haircut",
                before: "https://images.unsplash.com/photo-1552319681-42007138af69?auto=format&fit=crop&q=80&w=600",
                after: "https://images.unsplash.com/photo-1552319681-42007138af69?auto=format&fit=crop&q=80&w=600&filt=sepia"
            },
            {
                id: 102,
                title: "Beard Sculpting",
                category: "Grooming",
                before: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600",
                after: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=600&sat=-100"
            }
        ],
        videos: [
            {
                id: 201,
                title: "Summer Hair Trends 2026",
                creator: "Style Studio",
                views: "12.5k",
                likes: "840",
                thumb: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&q=80&w=600",
                service: "Book Hair Styling"
            },
            {
                id: 202,
                title: "Skin Care Routine 101",
                creator: "Glow & Co.",
                views: "45.2k",
                likes: "3.2k",
                thumb: "https://images.unsplash.com/photo-1556910103-1c02745a30bf?auto=format&fit=crop&q=80&w=600",
                service: "Book Facial"
            },
            {
                id: 203,
                title: "Fitness Bootcamp Highlights",
                creator: "Iron Gym",
                views: "8.9k",
                likes: "520",
                thumb: "https://images.unsplash.com/photo-1534438324721-6175277d33c5?auto=format&fit=crop&q=80&w=600",
                service: "Join Class"
            },
            {
                id: 204,
                title: "Morning Yoga Flow",
                creator: "Zen Space",
                views: "22.1k",
                likes: "1.8k",
                thumb: "https://images.unsplash.com/photo-1575052814086-f385e2e2ad1b?auto=format&fit=crop&q=80&w=600",
                service: "Book Session"
            }
        ]
    };
};

export const getStaffMembers = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
        {
            id: 1,
            name: "Sarah Jenkins",
            role: "Master Stylist",
            rating: 4.9,
            reviewCount: 342,
            experience: 12,
            specialties: ["Colorist", "Modern Cuts"],
            avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 2,
            name: "David Chen",
            role: "Senior Barber",
            rating: 4.8,
            reviewCount: 189,
            experience: 8,
            specialties: ["Fades", "Beard Sculpting"],
            avatar: "https://images.unsplash.com/photo-1531384441138-2736e62e0919?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 3,
            name: "Elena Rodriguez",
            role: "Esthetician",
            rating: 5.0,
            reviewCount: 156,
            experience: 6,
            specialties: ["Skincare", "Facials"],
            avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 4,
            name: "Michael Ross",
            role: "Massage Therapist",
            rating: 4.7,
            reviewCount: 201,
            experience: 9,
            specialties: ["Deep Tissue", "Sports Recovery"],
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 5,
            name: "Jessica Wu",
            role: "Nail Artist",
            rating: 4.9,
            reviewCount: 423,
            experience: 10,
            specialties: ["Nail Art", "Manicure"],
            avatar: "https://images.unsplash.com/photo-1597223591421-2890606714b9?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 6,
            name: "James Wilson",
            role: "Tattoo Artist",
            rating: 4.8,
            reviewCount: 275,
            experience: 15,
            specialties: ["Realism", "Blackwork"],
            avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 7,
            name: "Emily Thompson",
            role: "Makeup Artist",
            rating: 4.9,
            reviewCount: 310,
            experience: 7,
            specialties: ["Bridal", "Special FX"],
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=200"
        },
        {
            id: 8,
            name: "Robert Fox",
            role: "Personal Trainer",
            rating: 4.6,
            reviewCount: 120,
            experience: 5,
            specialties: ["Strength", "Cardio"],
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
        }
    ];
};

export const getProducts = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
        {
            id: 1,
            name: "Volcanic Ash Texturizing Paste",
            sku: "SKU-PASTE-001",
            category: "Hair",
            price: 28,
            stock: 45,
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
            description: "Matte finish with strong hold. Sourced from volcanic regions, this mineral-rich paste provides a reworkable hold that adds instant volume and texture.",
            predictedRestock: "Nov 15, 2026",
            demand: "High"
        },
        {
            id: 2,
            name: "Sandalwood & Sage Beard Oil",
            sku: "SKU-OIL-002",
            category: "Spa", // Mapped to Spa/Grooming
            price: 24,
            stock: 12,
            image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=400",
            description: "Hydrates and softens coarse beards. A premium blend of natural oils designed to soften your beard and moisturize the skin underneath.",
            predictedRestock: "Oct 30, 2026",
            demand: "Medium"
        },
        {
            id: 3,
            name: "Daily Revitalizing Face Wash",
            sku: "SKU-WASH-003",
            category: "Spa",
            price: 22,
            stock: 8,
            image: "https://images.unsplash.com/photo-1556228720-1987ba889608?auto=format&fit=crop&q=80&w=400",
            description: "Gentle cleanser for all skin types. Infused with aloe vera and cucumber, this gentle face wash removes impurities without stripping moisture.",
            predictedRestock: "Oct 28, 2026",
            demand: "High"
        },
        {
            id: 4,
            name: "Premium Tattoo Ink (Black)",
            sku: "SKU-INK-004",
            category: "Tattoo",
            price: 85,
            stock: 3,
            image: "https://images.unsplash.com/photo-1621607512214-68297f319087?auto=format&fit=crop&q=80&w=400",
            description: "High-pigment professional black ink. Fade-resistant formula ensuring long-lasting richness and depth.",
            predictedRestock: "Oct 25, 2026",
            demand: "Low",
            critical: true
        },
        {
            id: 5,
            name: "Sea Salt Spray",
            sku: "SKU-SPRAY-005",
            category: "Hair",
            price: 20,
            stock: 0,
            image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400",
            description: "Beach waves in a bottle. Achieve that post-beach texture with our Sea Salt Spray. Adds grip and volume.",
            predictedRestock: "Urgent",
            demand: "High",
            critical: true
        },
        {
            id: 6,
            name: "Titanium Piercing Ring",
            sku: "SKU-RING-006",
            category: "Piercing",
            price: 45,
            stock: 65,
            image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=400",
            description: "Hypoallergenic titanium piercing ring. Medical grade material suitable for new and healed piercings.",
            predictedRestock: "Dec 01, 2026",
            demand: "Medium"
        },
        {
            id: 7,
            name: "Matte Clay",
            sku: "SKU-CLAY-007",
            category: "Hair",
            price: 26,
            stock: 22,
            image: "https://images.unsplash.com/photo-1620917670397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=400",
            description: "Strong hold, no shine. Our strongest hold product. Keeps your style in place all day with a natural matte finish.",
            predictedRestock: "Nov 10, 2026",
            demand: "Medium"
        },
        {
            id: 8,
            name: "Healing Balms",
            sku: "SKU-BALM-008",
            category: "Tattoo",
            price: 25,
            stock: 18,
            image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=400",
            description: "Post-tattoo care balm. Promotes healing and preserves color vibrance with natural vitamins.",
            predictedRestock: "Nov 05, 2026",
            demand: "Medium"
        }
    ];
};

export const addProduct = async (productData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, product: { id: Date.now(), ...productData } };
};

export const updateProduct = async (id, productData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, product: { id, ...productData } };
};

export const deleteProduct = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { success: true, id };
};

export const getUserSettings = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return {
        notifications: {
            email: true,
            sms: true,
            promo: false,
            security: true
        },
        appearance: {
            theme: 'light',
            compactMode: false
        }
    };
};

export const getAdminStats = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return {
        revenue: {
            value: "$124,500",
            trend: "+12%",
            isPositive: true,
            label: "Total Revenue",
            variant: 'solid'
        },
        appointments: {
            value: "1,482",
            subValue: "Avg. Order: $84",
            trend: "+5.4%",
            isPositive: true,
            label: "Total Bookings"
        },
        newClients: {
            value: "350",
            subValue: "Retention: 82%",
            trend: "+18%",
            isPositive: true,
            label: "New Clients"
        },
        satisfaction: {
            value: "88%",
            subValue: "Top: Sarah J.",
            trend: "+2.4%",
            isPositive: true,
            label: "Staff Utilization"
        }
    };
};

export const getDashboardSchedule = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { id: 101, time: '09:00 AM', client: 'Alice Freeman', service: 'Full Hair Color', staff: 'Sarah' },
        { id: 102, time: '10:30 AM', client: 'Michael Bond', service: 'Beard Trim', staff: 'David' },
        { id: 103, time: '11:15 AM', client: 'Emma Wu', service: 'Manicure', staff: 'Jessica' },
        { id: 104, time: '12:00 PM', client: 'Robert Green', service: 'Massage', staff: 'Mike' },
    ];
};

export const getTopStaff = async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
        { id: 201, name: 'Sarah Jenkins', role: 'Stylist', revenue: '$4,200', rating: 4.9, avatar: 'https://ui-avatars.com/api/?name=Sarah+Jenkins&background=ffe4e6&color=be123c' },
        { id: 202, name: 'David Chen', role: 'Barber', revenue: '$3,850', rating: 4.8, avatar: 'https://ui-avatars.com/api/?name=David+Chen&background=e0f2fe&color=0369a1' },
        { id: 203, name: 'Jessica Wu', role: 'Nail Artist', revenue: '$3,100', rating: 5.0, avatar: 'https://ui-avatars.com/api/?name=Jessica+Wu&background=f0fdf4&color=15803d' },
    ];
};

export const getLowStock = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { id: 301, name: 'Volcanic Ash Paste', stock: 4, unit: 'tubs' },
        { id: 302, name: 'Sandalwood Beard Oil', stock: 2, unit: 'bottles' },
        { id: 303, name: 'Premium Shampoo', stock: 5, unit: 'liters' },
        { id: 304, name: 'Gold Face Masks', stock: 0, unit: 'packs', critical: true },
    ];
};

export const triggerReorderItem = async (itemId) => {
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate processing delay
    return { success: true, message: "Order placed successfully" };
};

export const getRevenueData = async () => {
    await new Promise(resolve => setTimeout(resolve, 700));
    return [
        { name: 'Mon', revenue: 4000 },
        { name: 'Tue', revenue: 3000 },
        { name: 'Wed', revenue: 2000 },
        { name: 'Thu', revenue: 2780 },
        { name: 'Fri', revenue: 1890 },
        { name: 'Sat', revenue: 2390 },
        { name: 'Sun', revenue: 3490 },
    ];
};

export const getSmartInsights = async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
        { id: 1, type: "prediction", text: "Predicted Peak Hour: 2:00 PM today based on historical data.", confidence: "High" },
        { id: 2, type: "alert", text: "Low stock alert: Volcanic Ash Texturizing Paste.", confidence: "Medium" },
        { id: 3, type: "recommendation", text: "Consider adding more staff for Saturday afternoon slots.", confidence: "High" }
    ];
};

export const getServices = async () => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return [
        {
            id: 1,
            name: "Precision Haircut",
            category: "Hair",
            price: 45,
            duration: "45 min",
            image: "https://images.unsplash.com/photo-1599351431202-1e0f0137899a?auto=format&fit=crop&q=80&w=300",
            frequentlyBookedWith: "Beard Trim",
            description: "A customized haircut tailored to your face shape, hair type, and lifestyle. Our master stylists use advanced cutting techniques to deliver a look that's distinctly yours.",
            processSteps: [
                "Consultation to discuss styling goals",
                "Invigorating shampoo and scalp massage",
                "Precision cutting using shear and clipper techniques",
                "Blow-dry and professional styling"
            ],
            preparation: "Please arrive with clean, dry hair. Bring inspiration photos if you have a specific style in mind.",
            aftercare: "Use professional salon products to maintain the style. We recommend returning every 4-6 weeks to keep the shape.",
            experts: [1, 2] // Referencing staff IDs
        },
        {
            id: 2,
            name: "Full Sleeve Session",
            category: "Tattoo",
            price: 350,
            duration: "4 hrs",
            image: "https://images.unsplash.com/photo-1590246814883-05add5d80d1b?auto=format&fit=crop&q=80&w=300",
            frequentlyBookedWith: "Aftercare Kit",
            description: "Dedicated time for large-scale tattoo projects. This session is designed for continuing work on full sleeves, back pieces, or large custom designs.",
            processSteps: [
                "Design review and placement check",
                "Skin preparation and stenciling",
                "Tattooing session (outlining or shading depending on progress)",
                "Cleaning and bandaging"
            ],
            preparation: "Eat a solid meal before arriving. Stay hydrated. Do not consume alcohol for 24 hours prior. Wear comfortable clothing that allows easy access to the area.",
            aftercare: "Keep the bandage on for 2-4 hours. Wash gently with warm water and unscented soap. Apply a thin layer of specialized healing balm 2-3 times daily.",
            experts: [6]
        },
        {
            id: 3,
            name: "Deep Tissue Massage",
            category: "Spa",
            price: 90,
            duration: "60 min",
            image: "https://images.unsplash.com/photo-1600334129128-685c5582fd35?auto=format&fit=crop&q=80&w=300",
            frequentlyBookedWith: "Aromatherapy",
            description: "A therapeutic massage focusing on realigning deeper layers of muscles and connective tissue. Ideal for chronic aches, stiff necks, upper back pain, and tight leg muscles.",
            processSteps: [
                "Brief consultation on problem areas",
                "Warm-up techniques to prep the muscles",
                "Deep sustained pressure targeting inner layers",
                "Cool down strokes and stretching"
            ],
            preparation: "Drink plenty of water before your appointment. Avoid eating a heavy meal right before.",
            aftercare: "Drink extra water to flush out released toxins. You may experience slight soreness the next day, which is normal. Take a warm bath if possible.",
            experts: [4]
        },
        {
            id: 4,
            name: "Industrial Piercing",
            category: "Piercing",
            price: 50,
            duration: "30 min",
            image: "https://images.unsplash.com/photo-1626049755455-827dbd761de6?auto=format&fit=crop&q=80&w=300",
            frequentlyBookedWith: "Saline Solution",
            description: "A striking two-point piercing connected by a single straight barbell, typically through the upper cartilage of the ear.",
            processSteps: [
                "Anatomy check to ensure suitability",
                "Sterilization of the area",
                "Marking the entry and exit points",
                "Piercing process and jewelry insertion"
            ],
            preparation: "Ensure you have eaten recently. Bring a valid photo ID. Avoid blood-thinning medications or alcohol beforehand.",
            aftercare: "Clean twice daily with sterile saline solution. Do NOT twist or turn the jewelry. Avoid sleeping on the pierced ear until fully healed.",
            experts: [6] // Assume James does piercings too for demo
        },
        {
            id: 5,
            name: "Beard Trim & Sculpt",
            category: "Hair",
            price: 30,
            duration: "30 min",
            image: "https://images.unsplash.com/photo-1621605815971-fbc98d665033?auto=format&fit=crop&q=80&w=300",
            frequentlyBookedWith: "Haircut",
            description: "Expert beard shaping, trimming, and conditioning to suit your facial structure.",
            processSteps: [
                "Hot towel application to soften hair",
                "Trimming to desired length",
                "Straight razor line-up for sharp edges",
                "Application of premium beard oil"
            ],
            preparation: "None required. Just bring your glorious beard.",
            aftercare: "Apply beard oil daily to maintain moisture and softness.",
            experts: [2]
        }
    ];
};

export const addService = async (serviceData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, service: { id: Date.now(), ...serviceData } };
};

export const updateService = async (id, serviceData) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    return { success: true, service: { id, ...serviceData } };
};

export const deleteService = async (id) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { success: true, id };
};

export const getAnalyticsData = async (period = 'Last 30 Days') => {
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock data changes based on period (simulated)
    const multiplier = period === 'Yearly' ? 12 : period === 'Last 6 Months' ? 6 : 1;

    return {
        sentiments: [
            { name: 'Positive', value: 65, color: '#f97316' }, // Orange
            { name: 'Neutral', value: 25, color: '#78716c' }, // Stone
            { name: 'Negative', value: 10, color: '#ef4444' } // Red
        ],
        clusters: [
            // VIP: High Spend, High Frequency
            { x: 80, y: 90, z: 200, segment: 'VIP' },
            { x: 85, y: 85, z: 150, segment: 'VIP' },
            { x: 90, y: 95, z: 300, segment: 'VIP' },
            // Regular: Med Spend, Med Frequency
            { x: 40, y: 50, z: 100, segment: 'Regular' },
            { x: 45, y: 45, z: 80, segment: 'Regular' },
            { x: 50, y: 55, z: 90, segment: 'Regular' },
            // At-Risk: Low Frequency, varies Spend
            { x: 10, y: 60, z: 50, segment: 'At-Risk' },
            { x: 5, y: 20, z: 30, segment: 'At-Risk' },
            { x: 15, y: 30, z: 40, segment: 'At-Risk' }
        ],
        forecast: [
            { name: 'Jan', actual: 4000 * multiplier, predicted: 4100 * multiplier },
            { name: 'Feb', actual: 3000 * multiplier, predicted: 3200 * multiplier },
            { name: 'Mar', actual: 2000 * multiplier, predicted: 2400 * multiplier },
            { name: 'Apr', actual: 2780 * multiplier, predicted: 2900 * multiplier },
            { name: 'May', actual: 1890 * multiplier, predicted: 2100 * multiplier },
            { name: 'Jun', actual: 2390 * multiplier, predicted: 2500 * multiplier },
            { name: 'Jul', actual: null, predicted: 3600 * multiplier }, // Future
            { name: 'Aug', actual: null, predicted: 4100 * multiplier }, // Future
        ],
        staffPerformance: [
            { subject: 'Rating', A: 120, B: 110, fullMark: 150 },
            { subject: 'Revenue', A: 98, B: 130, fullMark: 150 },
            { subject: 'Retention', A: 86, B: 130, fullMark: 150 },
            { subject: 'Punctuality', A: 99, B: 100, fullMark: 150 },
            { subject: 'Bookings', A: 85, B: 90, fullMark: 150 },
            { subject: 'Upsells', A: 65, B: 85, fullMark: 150 }
        ],
        miningInsights: [
            {
                type: 'prediction',
                icon: 'TrendingUp',
                text: 'Regrssion Model predicts a 15% increase in Spa services next month based on seasonal trends.'
            },
            {
                type: 'cluster',
                icon: 'Users',
                text: 'K-Means Clustering identified 25 "At-Risk" customers who haven\'t visited in 90 days but have high past spend.'
            }
        ]
    };
};

export const uploadProfileImage = async (formData) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock successful response
    return { success: true, message: "Image uploaded successfully" };
};
