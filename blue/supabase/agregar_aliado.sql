-- Agrega a Manpoplast S.A.S (aliado principal de Blue) como centro "transformador".
-- Ejecutar en Supabase > SQL Editor. Se puede correr varias veces: "on conflict do nothing" evita duplicados.
--
-- OJO (pendiente de confirmar con la empresa):
--   * lat/lng son APROXIMADAS (barrio Comuneros, cerca de Cra 17 con Calle 5). Afínalas en Google Maps.
--   * Plásticos (LDPE, LLDPE, HDPE): deducidos de las fotos (bolsas y película -> manguera). No hay rótulo de resina.
--   * Horario y cantidades que recibe: no se vieron en la visita.
--   Por eso datos_confirmados = false.

do $$
declare
  -- Servicios B2B: solo lo que se vio en la visita (productos y pancarta)
  servicios text[] := array[
    'Fabricación de mangueras con plástico reciclado',
    'Fabricación de postes plásticos',
    'Madera plástica (según su pancarta)',
    'Recepción de material plástico: condiciones pendientes de confirmar'
  ];
  tipo text;
begin
  -- servicios_b2b puede ser text[] o jsonb según cómo se creó la tabla; se adapta solo
  select data_type into tipo from information_schema.columns
  where table_schema = 'public' and table_name = 'centros' and column_name = 'servicios_b2b';

  execute format($sql$
    insert into centros (
      id, nombre_organizacion, tipo_entidad, categoria,
      telefono, direccion, link_maps, sitio_web,
      lat, lng,
      servicios_b2b, persona_natural, empresa, horario,
      imagen, etiqueta_imagen, datos_confirmados
    ) values (
      'manpoplast',
      'Manpoplast S.A.S',
      'Planta transformadora: mangueras y postes plásticos',
      'transformador',
      '321 4208331',
      'Cra 17 # 5-25, Barrio Comuneros, Bucaramanga',
      'https://www.google.com/maps/search/?api=1&query=Cra%%2017%%20%%23%%205-25%%2C%%20Barrio%%20Comuneros%%2C%%20Bucaramanga%%2C%%20Santander%%2C%%20Colombia',
      'N/A',
      7.1405, -73.1290,
      %s,
      'Pendiente de confirmar con la planta',
      'Pendiente de confirmar con la planta',
      'Pendiente de confirmar',
      '/images/centros/manpoplast/pancarta-productos.jpg',
      null,
      false
    )
    on conflict do nothing
  $sql$, case when tipo in ('jsonb', 'json') then 'to_jsonb($1)' else '$1' end)
  using servicios;
end $$;

insert into centros_plasticos (centro_id, plastico_id)
select 'manpoplast', p.id
from plasticos p
where p.id in ('LDPE', 'LLDPE', 'HDPE')
on conflict do nothing;

-- Verificación: debe devolver 1 fila con 3 plásticos
select c.id, c.nombre_organizacion, c.lat, c.lng, array_agg(cp.plastico_id) as plasticos
from centros c
left join centros_plasticos cp on cp.centro_id = c.id
where c.id = 'manpoplast'
group by c.id, c.nombre_organizacion, c.lat, c.lng;
