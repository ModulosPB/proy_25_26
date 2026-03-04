'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import sequelize from './db/mysql';
import { Equipo, Asignacion, Empleado } from './models/mysql';
import dbConnect from './db/mongodb';
import TicketSoporte from './models/mongodb';

export async function createEquipo(formData) {
  const marca = formData.get('marca');
  const modelo = formData.get('modelo');
  const numero_serie = formData.get('numero_serie');
  const id_categoria = formData.get('id_categoria');

  await Equipo.create({
    marca,
    modelo,
    numero_serie,
    id_categoria: parseInt(id_categoria),
    estado: 'Disponible'
  });

  revalidatePath('/inventario');
  revalidatePath('/');
  redirect('/inventario');
}

export async function updateEquipo(formData) {
  const id = formData.get('id');
  const marca = formData.get('marca');
  const modelo = formData.get('modelo');
  const numero_serie = formData.get('numero_serie');
  const id_categoria = formData.get('id_categoria');
  const estado = formData.get('estado');

  await Equipo.update({
    marca,
    modelo,
    numero_serie,
    id_categoria: parseInt(id_categoria),
    estado
  }, { where: { id } });

  revalidatePath('/inventario');
  revalidatePath('/');
  redirect('/inventario');
}

export async function createAsignacion(formData) {
  const id_equipo = formData.get('id_equipo');
  const id_empleado = formData.get('id_empleado');
  const observaciones = formData.get('observaciones');

  const transaction = await sequelize.transaction();

  try {
    // Crear la asignación
    await Asignacion.create({
      id_equipo: parseInt(id_equipo),
      id_empleado: parseInt(id_empleado),
      observaciones
    }, { transaction });

    // Actualizar estado del equipo
    await Equipo.update(
      { estado: 'Asignado' },
      { where: { id: id_equipo }, transaction }
    );

    await transaction.commit();
  } catch (error) {
    await transaction.rollback();
    throw error;
  }

  revalidatePath('/inventario');
  revalidatePath('/asignaciones');
  revalidatePath('/');
  redirect('/asignaciones');
}

export async function createTicket(formData) {
  await dbConnect();
  
  const id_equipo_mysql = formData.get('id_equipo_mysql');
  const asunto = formData.get('asunto');
  const descripcion = formData.get('descripcion');
  const prioridad = formData.get('prioridad');
  
  // Metadatos técnicos extraídos del form
  const metadatos_tecnicos = {
    os: formData.get('os') || 'Desconocido',
    browser: formData.get('browser') || 'Desconocido',
    ultimo_reinicio: new Date().toISOString()
  };

  await TicketSoporte.create({
    id_equipo_mysql: parseInt(id_equipo_mysql),
    asunto,
    descripcion,
    prioridad,
    estado: 'Abierto',
    metadatos_tecnicos,
    fecha_creacion: new Date()
  });

  revalidatePath('/soporte');
  revalidatePath('/');
  redirect('/soporte');
}

export async function updateTicket(formData) {
  await dbConnect();
  const id = formData.get('id');
  const asunto = formData.get('asunto');
  const descripcion = formData.get('descripcion');
  const prioridad = formData.get('prioridad');
  const estado = formData.get('estado');

  await TicketSoporte.findByIdAndUpdate(id, {
    asunto,
    descripcion,
    prioridad,
    estado
  });

  revalidatePath('/soporte');
  redirect('/soporte');
}

export async function createEmpleado(formData) {
  const nombre_completo = formData.get('nombre_completo');
  const email = formData.get('email');
  const departamento = formData.get('departamento');
  const fecha_ingreso = formData.get('fecha_ingreso');

  await Empleado.create({
    nombre_completo,
    email,
    departamento,
    fecha_ingreso
  });

  revalidatePath('/empleados');
  redirect('/empleados');
}

export async function updateEmpleado(formData) {
  const id = formData.get('id');
  const nombre_completo = formData.get('nombre_completo');
  const email = formData.get('email');
  const departamento = formData.get('departamento');
  const fecha_ingreso = formData.get('fecha_ingreso');
  const foto = formData.get('foto');

  await Empleado.update({
    nombre_completo,
    email,
    departamento,
    fecha_ingreso,
    foto
  }, { where: { id } });

  revalidatePath('/empleados');
  redirect('/empleados');
}

export async function deleteEmpleado(id) {
  await Empleado.destroy({ where: { id } });
  revalidatePath('/empleados');
}

export async function returnEquipo(id_equipo) {
  await Equipo.update(
    { estado: 'Disponible' },
    { where: { id: id_equipo } }
  );

  revalidatePath('/inventario');
  revalidatePath('/asignaciones');
  revalidatePath('/');
}
