import {belongsTo, Entity, hasMany, model, property} from '@loopback/repository';
import {BloqueVotante} from './bloque-votante.model';
import {Bloque} from './bloque.model';
import {TipoDocumento} from './tipo-documento.model';

@model()
export class Votante extends Entity {
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
  primerNombre: string;

  @property({
    type: 'string',
  })
  segundoNombre?: string;

  @property({
    type: 'string',
    required: true,
  })
  primerApellido: string;

  @property({
    type: 'string',
  })
  segundoApellido?: string;

  @property({
    type: 'string',
    required: true,
  })
  documento: string;

  @property({
    type: 'string',
    required: true,
  })
  correo: string;

  @property({
    type: 'string',
    required: true,
  })
  numeroCelular: string;

  @property({
    type: 'string',
  })
  hash?: string;

  @belongsTo(() => TipoDocumento)
  tipoDocumentoId: number;

  @hasMany(() => Bloque, {through: {model: () => BloqueVotante}})
  bloques: Bloque[];

  constructor(data?: Partial<Votante>) {
    super(data);
  }
}

export interface VotanteRelations {
  // describe navigational properties here
}

export type VotanteWithRelations = Votante & VotanteRelations;
