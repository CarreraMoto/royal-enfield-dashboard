const { useState } = React;

const DashboardRE = () => {
    return (
        <div className="p-8 max-w-7xl mx-auto">
            {/* Header del Dashboard */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 className="text-3xl font-bold text-blue-600 mb-2">
                    Dashboard Royal Enfield
                </h1>
                <p className="text-gray-600">
                    Métricas y KPIs - Febrero 2025
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

            {/* Objetivos Estratégicos */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-blue-50 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-blue-800 mb-4">Motos Nuevas - Visión 2029</h2>
                    <p className="font-bold mb-4 text-blue-900">TRANSMITIR LA EXPERIENCIA DE VIVIR EL MOTOCICLISMO PURO</p>
                    <div className="bg-white rounded p-4 mb-4">
                        <p className="font-bold text-blue-900 mb-2">Objetivo 2025:</p>
                        <p className="text-blue-800 mb-4">230 nuevos motociclistas</p>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Demos Mensuales</span>
                                <span className="font-bold">82/80</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Solicitudes Autorizadas</span>
                                <span className="font-bold">20/20</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Visitas Contables</span>
                                <span className="font-bold">63/60</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-green-50 rounded-lg shadow-lg p-6">
                    <h2 className="text-xl font-bold text-green-800 mb-4">Servicio - Visión 2029</h2>
                    <p className="font-bold mb-4 text-green-900">SER LA MEJOR OPCIÓN Y EL MEJOR ALIADO EN EL MUNDO DEL MOTOCICLISMO</p>
                    <div className="bg-white rounded p-4 mb-4">
                        <p className="font-bold text-green-900 mb-2">Objetivo 2025:</p>
                        <p className="text-green-800 mb-4">70 clientes mensuales satisfechos</p>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Servicios Mensuales</span>
                                <span className="font-bold">72/70</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Satisfacción CTA</span>
                                <span className="font-bold">96%/95%</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Reseñas 5★ Mensuales</span>
                                <span className="font-bold">4/4</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

// Exportar el componente
window.DashboardRE = DashboardRE;
