import mongoose from 'mongoose';

const TicketSchema = new mongoose.Schema({
  id_equipo_mysql: { type: Number, required: true },
  asunto: { type: String, required: true },
  descripcion: { type: String, required: true },
  prioridad: { 
    type: String, 
    enum: ['Baja', 'Media', 'Alta', 'Crítica'],
    default: 'Media'
  },
  estado: { 
    type: String, 
    enum: ['Abierto', 'En Proceso', 'Cerrado'],
    default: 'Abierto'
  },
  metadatos_tecnicos: { type: Object },
  fecha_creacion: { type: Date, default: Date.now }
});

export default mongoose.models.TicketSoporte || mongoose.model('TicketSoporte', TicketSchema, 'tickets_soporte');
