import {Entity, model, property} from '@loopback/repository';

@model({
  settings: {
    foreignKeys: {
      fk_bloque_cargo_id: {
        name: 'fk_bloque_cargo_id',
        entity: 'Bloque',
        entityKey: 'id',
        foreignKey: 'bloqueId',
      },
      fk_cargo_bloque_id: {
        name: 'fk_cargo_bloque_id',
        entity: 'Cargo',
        entityKey: 'id',
        foreignKey: 'cargoId',
      }
    },
  },
})
export class BloqueCargo extends Entity {
  @property({
    type: 'number',
    id: true,
    generated: true,
  })
  id?: number;

  @property({
    type: 'number',
  })
  bloqueId?: number;

  @property({
    type: 'number',
  })
  cargoId?: number;

  constructor(data?: Partial<BloqueCargo>) {
    super(data);
  }
}

export interface BloqueCargoRelations {
  // describe navigational properties here
}

export type BloqueCargoWithRelations = BloqueCargo & BloqueCargoRelations;
