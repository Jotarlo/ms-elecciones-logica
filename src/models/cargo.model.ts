import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {BloqueCargo} from './bloque-cargo.model';
import {Bloque} from './bloque.model';
import {Eleccion} from './eleccion.model';

@model({
  settings: {
    foreignKeys: {
      fk_eleccion_del_cargo: {
        name: 'fk_eleccion_del_cargo',
        entity: 'Eleccion',
        entityKey: 'id',
        foreignKey: 'eleccionId',
      },
    },
  },
})
export class Cargo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;

  @property({
    type: 'string',
  })
  descripcion?: string;

  @hasMany(() => Bloque, {through: {model: () => BloqueCargo}})
  bloques: Bloque[];

  @belongsTo(() => Eleccion)
  eleccionId: number;

  constructor(data?: Partial<Cargo>) {
    super(data);
  }
}

export interface CargoRelations {
  // describe navigational properties here
}

export type CargoWithRelations = Cargo & CargoRelations;
