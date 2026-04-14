export interface Cita {
  id?: number;
  fecha_hora: string;
  motivo: string;
  estado: string;
  paciente_id: number;
  doctor_id: number;
}