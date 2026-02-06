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
            category: "Styling",
            price: 28,
            rating: 4.9,
            reviewCount: 420,
            image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&q=80&w=400",
            isExpertChoice: true,
            isBestSeller: true,
            stockLevel: "High",
            shortDescription: "Matte finish with strong hold.",
            longDescription: "Sourced from volcanic regions, this mineral-rich paste provides a reworkable hold that adds instant volume and texture without the shine. Perfect for modern, messy looks."
        },
        {
            id: 2,
            name: "Sandalwood & Sage Beard Oil",
            category: "Grooming",
            price: 24,
            rating: 4.8,
            reviewCount: 156,
            image: "https://images.unsplash.com/photo-1620916297397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=400",
            isExpertChoice: false,
            isBestSeller: true,
            stockLevel: "Medium",
            shortDescription: "Hydrates and softens coarse beards.",
            longDescription: "A premium blend of natural oils designed to soften your beard and moisturize the skin underneath. The earthy scent of sandalwood and sage provides a calming effect."
        },
        {
            id: 3,
            name: "Daily Revitalizing Face Wash",
            category: "Rituals",
            price: 22,
            rating: 4.7,
            reviewCount: 310,
            image: "https://images.unsplash.com/photo-1556228720-1987ba889608?auto=format&fit=crop&q=80&w=400",
            isExpertChoice: false,
            isBestSeller: false,
            stockLevel: "High",
            shortDescription: "Gentle cleanser for all skin types.",
            longDescription: "Infused with aloe vera and cucumber, this gentle face wash removes impurities without stripping your skin's natural moisture barrier."
        },
        {
            id: 4,
            name: "Premium Safety Razor",
            category: "Grooming",
            price: 85,
            rating: 5.0,
            reviewCount: 89,
            image: "https://images.unsplash.com/photo-1621607512214-68297f319087?auto=format&fit=crop&q=80&w=400",
            isExpertChoice: true,
            isBestSeller: false,
            stockLevel: "Low",
            shortDescription: "Precision engineered for a smooth shave.",
            longDescription: "Crafted from stainless steel, this safety razor offers a barber-grade shave at home. Balanced weight distribution ensures perfect control."
        },
        {
            id: 5,
            name: "Sea Salt Spray",
            category: "Styling",
            price: 20,
            rating: 4.5,
            reviewCount: 120,
            image: "https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=400",
            isExpertChoice: false,
            isBestSeller: true,
            stockLevel: "High",
            shortDescription: "Beach waves in a bottle.",
            longDescription: "Achieve that post-beach texture with our Sea Salt Spray. Adds grip and volume for a relaxed, windswept look."
        },
        {
            id: 6,
            name: "Charcoal Detox Soap Bar",
            category: "Rituals",
            price: 12,
            rating: 4.8,
            reviewCount: 230,
            image: "https://images.unsplash.com/photo-1600857544200-b2f666a9a2ec?auto=format&fit=crop&q=80&w=400",
            isExpertChoice: false,
            isBestSeller: false,
            stockLevel: "High",
            shortDescription: "Deep cleans pores.",
            longDescription: "Activated charcoal cleanses pores deeply while shea butter nourishes the skin. Ideal for oily or acne-prone skin."
        },
        {
            id: 7,
            name: "Matte Clay",
            category: "Styling",
            price: 26,
            rating: 4.7,
            reviewCount: 180,
            image: "https://images.unsplash.com/photo-1620917670397-a4a5402a3c6c?auto=format&fit=crop&q=80&w=400",
            isExpertChoice: true,
            isBestSeller: false,
            stockLevel: "Medium",
            shortDescription: "Strong hold, no shine.",
            longDescription: "Our strongest hold product. Keeps your style in place all day with a natural matte finish."
        },
        {
            id: 8,
            name: "Aftershave Balm",
            category: "Grooming",
            price: 25,
            rating: 4.9,
            reviewCount: 140,
            image: "https://images.unsplash.com/photo-1599305090598-fe179d501227?auto=format&fit=crop&q=80&w=400",
            isExpertChoice: false,
            isBestSeller: true,
            stockLevel: "High",
            shortDescription: "Soothes razor burn instantly.",
            longDescription: "Cooling menthol and chamomile calm irritated skin instantly after shaving. Alcohol-free formula prevents dryness."
        }
    ];
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
        },
        paymentMethods: [
            { id: 1, brand: 'Visa', last4: '4242', expiry: '12/28', isDefault: true },
            { id: 2, brand: 'Mastercard', last4: '8899', expiry: '09/27', isDefault: false }
        ]
    };
};
