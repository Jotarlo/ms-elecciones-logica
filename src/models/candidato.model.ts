import {belongsTo, Entity, model, property} from '@loopback/repository';
import {Movimiento} from './movimiento.model';

@model({
  settings: {
    foreignKeys: {
      fk_movimiento_del_candidato: {
        name: 'fk_movimiento_del_candidato',
        entity: 'Movimiento',
        entityKey: 'id',
        foreignKey: 'movimientoId',
      },
    },
  },
})
export class Candidato extends Entity {
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
  nombres: string;

  @property({
    type: 'string',
    required: true,
  })
  apellidos: string;

  @property({
    type: 'string',
    required: true,
  })
  foto: string;

  @belongsTo(() => Movimiento)
  movimientoId: number;

  constructor(data?: Partial<Candidato>) {
    super(data);
  }
}

export interface CandidatoRelations {
  // describe navigational properties here
}

export type CandidatoWithRelations = Candidato & CandidatoRelations;
