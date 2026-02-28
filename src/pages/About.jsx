export const About = () => {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-dark mb-4">HSD Agency Hakkında</h1>
                <div className="w-24 h-1 bg-primary-500 mx-auto rounded-full"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                <div>
                    <div className="aspect-square bg-gray-200 rounded-3xl shadow-xl overflow-hidden">
                        {/* Placeholder for about image */}
                    </div>
                </div>
                <div>
                    <h2 className="text-3xl font-bold text-dark mb-6">Saç Bakımını Yeniden Tanımlıyoruz</h2>
                    <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                        HSD Agency olarak, saçınızın kimliğinizin bir yansıması olduğuna inanıyoruz. Uzman stilist ekibimiz, doğal güzelliğinizi geliştiren ve özgüveninizi artıran kişiselleştirilmiş hizmet sunmaya kendini adamıştır.
                    </p>
                    <p className="text-gray-600 text-lg leading-relaxed">
                        Moda ve güzellik endüstrisindeki on yılı aşkın tecrübemizle, lüks ve rahatlatıcı bir ortamda en son trendleri ve teknikleri size getiriyoruz.
                    </p>
                </div>
            </div>
        </div>
    );
};
