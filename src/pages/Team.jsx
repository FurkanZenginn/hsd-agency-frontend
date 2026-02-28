export const Team = () => {
    return (
        <div className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">Uzmanlarımızla Tanışın</h1>
                <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
                <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto">Her güzel dönüşümün ardındaki yaratıcı beyinler.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="group relative">
                        <div className="aspect-[3/4] bg-gray-200 rounded-2xl overflow-hidden mb-4">
                            {/* Image placeholder */}
                        </div>
                        <h3 className="text-xl font-bold text-dark">Stilist {i}</h3>
                        <p className="text-primary-600 font-medium mb-2">Kıdemli Direktör</p>
                    </div>
                ))}
            </div>
        </div>
    )
}
