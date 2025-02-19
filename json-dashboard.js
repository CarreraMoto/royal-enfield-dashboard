import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ReferenceLine } from 'recharts';
import { Calendar, Wrench, Target, Star, Users, TrendingUp } from 'lucide-react';

const MotoDashboard = () => {
  const [data, setData] = useState({
    metricas: [],
    consecutivos: [],
    config: {
      ultima_actualizacion: "",
      mes_actual: ""
    }
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Función para cargar los datos
    const fetchData = async () => {
      try {
        // Cambia esta URL a donde hospedarás tu JSON
        const response = await fetch('/data/dashboard-data.json');
        
        if (!response.ok) {
          throw new Error('No se pudieron cargar los datos');
        }
        
        const jsonData = await response.json();
        setData(jsonData);
        setIsLoading(false);
      } catch (err) {
        console.error('Error cargando datos:', err);
        setError(err.message);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  // Preparar datos para gráficas
  const prepararDatosPorcentaje = () => {
    if (!data.metricas || data.metricas.length === 0) return [];
    
    return data.metricas.map(item => ({
      mes: item.mes.substring(0, 3), // Tomar solo las primeras 3 letras del mes
      demos: (item.demos / item.objetivo_demos) * 100,
      solicitudes: (item.solicitudes / item.objetivo_solicitudes) * 100,
      visitas: (item.visitas / item.objetivo_visitas) * 100
    }));
  };

  const prepararDatosServicio = () => {
    if (!data.metricas || data.metricas.length === 0) return [];
    
    return data.metricas.map(item => ({
      mes: item.mes.substring(0, 3),
      servicios: item.servicios,
      satisfaccion: item.satisfaccion
    }));
  };

  const ventasPorcentajeData = prepararDatosPorcentaje();
  const servicioData = prepararDatosServicio();

  // Si está cargando, mostrar indicador
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4">Cargando dashboard...</p>
        </div>
      </div>
    );
  }

  // Si hay error, mostrar mensaje
  if (error) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center text-red-600">
          <h2 className="text-2xl font-bold mb-4">Error al cargar datos</h2>
          <p>{error}</p>
          <p className="mt-4 text-sm">Verifica que el archivo JSON esté disponible y bien formateado.</p>
        </div>
      </div>
    );
  }

  // Obtener el último mes para mostrar KPIs actuales
  const ultimoMes = data.metricas.length > 0 ? data.metricas[data.metricas.length - 1] : null;

  return (
    <div className="p-6 space-y-6">
      {/* Header con Fecha Actual */}
      <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
        <div className="flex items-center gap-2">
          <Calendar className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold">{data.config.mes_actual}</h2>
        </div>
        <div className="flex items-center gap-2 bg-blue-100 px-4 py-2 rounded-md">
          <span className="font-semibold">Actualizado:</span>
          <span>{data.config.ultima_actualizacion}</span>
        </div>
      </div>

      {/* Registro de Resultados Consecutivos */}
      <Card className="bg-gray-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-6 w-6" />
            Racha de Resultados Consecutivos
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {data.consecutivos.map((item, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-semibold">{item.metrica}</span>
                  <span className={`px-2 py-1 rounded ${
                    item.actual >= item.objetivo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {item.actual}/{item.objetivo}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-gray-600">Meses consecutivos:</span>
                  <span className="font-bold text-lg">{item.meses}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Sección de Objetivos */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-6 w-6" />
              Motos Nuevas - Visión 2029
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold mb-4">TRANSMITIR LA EXPERIENCIA DE VIVIR EL MOTOCICLISMO PURO</p>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Objetivo 2025: 230 nuevos motociclistas</p>
                {ultimoMes && (
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Demos Mensuales</span>
                      <span className="font-bold">{ultimoMes.demos}/{ultimoMes.objetivo_demos}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Solicitudes Autorizadas</span>
                      <span className="font-bold">{ultimoMes.solicitudes}/{ultimoMes.objetivo_solicitudes}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Visitas Contables</span>
                      <span className="font-bold">{ultimoMes.visitas}/{ultimoMes.objetivo_visitas}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-green-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-6 w-6" />
              Servicio - Visión 2029
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="font-bold mb-4">SER LA MEJOR OPCIÓN Y EL MEJOR ALIADO EN EL MUNDO DEL MOTOCICLISMO</p>
            <div className="space-y-4">
              <div>
                <p className="font-semibold">Objetivo 2025: 70 clientes mensuales satisfechos</p>
                {ultimoMes && (
                  <div className="mt-2 space-y-2">
                    <div className="flex justify-between items-center">
                      <span>Servicios Mensuales</span>
                      <span className="font-bold">{ultimoMes.servicios}/{ultimoMes.objetivo_servicios}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Satisfacción CTA</span>
                      <span className="font-bold">{ultimoMes.satisfaccion}%/{ultimoMes.objetivo_satisfaccion}%</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Reseñas 5★ Mensuales</span>
                      <span className="font-bold">{ultimoMes.resenias}/{ultimoMes.objetivo_resenias}</span>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* KPIs del Mes */}
      {ultimoMes && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Demos del Mes</p>
                  <h3 className="text-2xl font-bold">{ultimoMes.demos} demos</h3>
                  <p className="text-sm text-green-600">
                    {ultimoMes.demos >= ultimoMes.objetivo_demos 
                      ? `+${((ultimoMes.demos/ultimoMes.objetivo_demos - 1) * 100).toFixed(1)}% vs objetivo`
                      : `${((ultimoMes.demos/ultimoMes.objetivo_demos - 1) * 100).toFixed(1)}% vs objetivo`}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Satisfacción CTA</p>
                  <h3 className="text-2xl font-bold">{ultimoMes.satisfaccion}%</h3>
                  <p className="text-sm text-green-600">
                    {ultimoMes.satisfaccion >= ultimoMes.objetivo_satisfaccion 
                      ? `+${(ultimoMes.satisfaccion - ultimoMes.objetivo_satisfaccion).toFixed(1)}% vs objetivo`
                      : `${(ultimoMes.satisfaccion - ultimoMes.objetivo_satisfaccion).toFixed(1)}% vs objetivo`}
                  </p>
                </div>
                <Star className="h-8 w-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-500">Reseñas 5★</p>
                  <h3 className="text-2xl font-bold">{ultimoMes.resenias} este mes</h3>
                  <p className="text-sm text-green-600">
                    {ultimoMes.resenias >= ultimoMes.objetivo_resenias 
                      ? 'Meta cumplida' 
                      : `Faltan ${ultimoMes.objetivo_resenias - ultimoMes.resenias}`}
                  </p>
                </div>
                <Star className="h-8 w-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Gráficas de Seguimiento */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Porcentaje de Logro Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <BarChart width={500} height={300} data={ventasPorcentajeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis domain={[0, 120]} />
              <Tooltip 
                formatter={(value) => `${value.toFixed(1)}%`}
                labelFormatter={(label) => `Mes: ${label}`}
              />
              <Legend />
              <ReferenceLine y={100} stroke="#666" strokeDasharray="3 3" label="Meta" />
              <Bar dataKey="demos" fill="#0088FE" name="Demos %" />
              <Bar dataKey="solicitudes" fill="#00C49F" name="Solicitudes %" />
              <Bar dataKey="visitas" fill="#FFBB28" name="Visitas %" />
            </BarChart>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Servicios y Satisfacción Mensual</CardTitle>
          </CardHeader>
          <CardContent>
            <LineChart width={500} height={300} data={servicioData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Line yAxisId="left" type="monotone" dataKey="servicios" stroke="#0088FE" name="Servicios" />
              <Line yAxisId="right" type="monotone" dataKey="satisfaccion" stroke="#00C49F" name="Satisfacción %" />
            </LineChart>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MotoDashboard;
