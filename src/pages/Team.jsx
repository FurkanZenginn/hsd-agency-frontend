import furkanImg from '../assets/team/furkan.png';
import sinemImg from '../assets/team/sinem.png';
import sudeImg from '../assets/team/sude.png';
import ahmetImg from '../assets/team/ahmet.jpg';
import busraImg from '../assets/team/busra.png';
import busra2Img from '../assets/team/busra2.jpg';

const teamMembers = [
    { id: 1, name: 'Furkan', role: 'Ekip Üyesi', image: furkanImg },
    { id: 2, name: 'Sinem', role: 'Ekip Üyesi', image: sinemImg },
    { id: 3, name: 'Sude', role: 'Ekip Üyesi', image: sudeImg },
    { id: 4, name: 'Ahmet', role: 'Ekip Üyesi', image: ahmetImg },
    { id: 5, name: 'Büşra', role: 'Ekip Üyesi', image: busraImg },
    { id: 6, name: 'Resmi Büşra', role: 'Ekip Üyesi', image: busra2Img },
];

export const Team = () => {
    return (
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Uzmanlarımızla Tanışın</h1>
                <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
                <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">Her güzel dönüşümün ardındaki yaratıcı beyinler.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-8">
                {teamMembers.map(member => (
                    <div key={member.id} className="group relative text-center">
                        <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden mb-4">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                        </div>
                        <h3 className="text-xl font-bold text-dark">{member.name}</h3>
                        <p className="text-primary-600 font-medium mb-2">{member.role}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
