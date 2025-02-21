const { useState, useEffect } = React;

const DashboardRE = () => {
    // Estado para los datos
    const [isLoading, setIsLoading] = useState(true);
    const [datos, setDatos] = useState(null);

    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header del Dashboard */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-2">
                    Dashboard Royal Enfield
                </h1>
                <p className="text-gray-600">
                    Métricas y KPIs
                </p>
            </div>

            {/* Panel de KPIs */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="font-bold text-gray-700">Demos del Mes</h3>
                    <p className="text-2xl font-bold text-blue-600">82</p>
                    <p className="text-sm text-green-600">+2.5% vs objetivo</p>
                </div>
                
                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="font-bold text-gray-700">Satisfacción CTA</h3>
                    <p className="text-2xl font-bold text-blue-600">96%</p>
                    <p className="text-sm text-green-600">+1% vs objetivo</p>
                </div>

                <div className="bg-white rounded-lg shadow-lg p-6">
                    <h3 className="font-bold text-gray-700">Reseñas 5★</h3>
                    <p className="text-2xl font-bold text-blue-600">4</p>
                    <p className="text-sm text-green-600">Meta cumplida</p>
                </div>
            </div>
        </div>
    );
};

// Exportar el componente para usarlo en index.html
window.DashboardRE = DashboardRE;
