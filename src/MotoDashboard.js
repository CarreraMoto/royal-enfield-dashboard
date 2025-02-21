// Creamos un componente simple para probar
const MotoDashboard = () => {
  const [data, setData] = useState({
    metricas: [],
    consecutivos: [],
    config: {
      ultima_actualizacion: "",
      mes_actual: ""
    }
  });

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-blue-600">
        Dashboard Royal Enfield
      </h1>
      <p className="mt-4">
        Dashboard cargado correctamente
      </p>
    </div>
  );
};

// Exportamos el componente
window.MotoDashboard = MotoDashboard;
