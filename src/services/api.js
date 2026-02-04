// HSD Agency API Configuration
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
                after: "https://images.unsplash.com/photo-1552319681-42007138af69?auto=format&fit=crop&q=80&w=600&filt=sepia" // Mocking diff visual
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
