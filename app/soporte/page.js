import dbConnect from '../../lib/db/mongodb';
import TicketSoporte from '../../lib/models/mongodb';
import SoporteList from './SoporteList';

export default async function SoportePage() {
  await dbConnect();
  const ticketsRaw = await TicketSoporte.find().sort({ fecha_creacion: -1 });
  
  // Convertimos a objeto plano para evitar problemas de serialización en el cliente
  const tickets = JSON.parse(JSON.stringify(ticketsRaw));

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Tickets de Soporte Técnico</h1>
        <p className="text-gray-600">Gestiona todos los incidentes y solicitudes de soporte</p>
      </div>
      
      <SoporteList initialTickets={tickets} />
    </div>
  );
}
