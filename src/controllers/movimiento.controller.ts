import {authenticate} from '@loopback/authentication';
import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where
} from '@loopback/repository';
import {
  del, get,
  getModelSchemaRef, param, patch, post, put, requestBody,
  response
} from '@loopback/rest';
import {Movimiento} from '../models';
import {MovimientoRepository} from '../repositories';

@authenticate("admin")
export class MovimientoController {
  constructor(
    @repository(MovimientoRepository)
    public movimientoRepository: MovimientoRepository,
  ) { }

  @post('/movimientos')
  @response(200, {
    description: 'Movimiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Movimiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movimiento, {
            title: 'NewMovimiento',
            exclude: ['id'],
          }),
        },
      },
    })
    movimiento: Omit<Movimiento, 'id'>,
  ): Promise<Movimiento> {
    return this.movimientoRepository.create(movimiento);
  }

  @get('/movimientos/count')
  @response(200, {
    description: 'Movimiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Movimiento) where?: Where<Movimiento>,
  ): Promise<Count> {
    return this.movimientoRepository.count(where);
  }

  @authenticate.skip()
  @get('/movimientos')
  @response(200, {
    description: 'Array of Movimiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Movimiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Movimiento) filter?: Filter<Movimiento>,
  ): Promise<Movimiento[]> {
    return this.movimientoRepository.find(filter);
  }

  @patch('/movimientos')
  @response(200, {
    description: 'Movimiento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movimiento, {partial: true}),
        },
      },
    })
    movimiento: Movimiento,
    @param.where(Movimiento) where?: Where<Movimiento>,
  ): Promise<Count> {
    return this.movimientoRepository.updateAll(movimiento, where);
  }

  @get('/movimientos/{id}')
  @response(200, {
    description: 'Movimiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Movimiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.number('id') id: number,
    @param.filter(Movimiento, {exclude: 'where'}) filter?: FilterExcludingWhere<Movimiento>
  ): Promise<Movimiento> {
    return this.movimientoRepository.findById(id, filter);
  }

  @patch('/movimientos/{id}')
  @response(204, {
    description: 'Movimiento PATCH success',
  })
  async updateById(
    @param.path.number('id') id: number,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Movimiento, {partial: true}),
        },
      },
    })
    movimiento: Movimiento,
  ): Promise<void> {
    await this.movimientoRepository.updateById(id, movimiento);
  }

  @put('/movimientos/{id}')
  @response(204, {
    description: 'Movimiento PUT success',
  })
  async replaceById(
    @param.path.number('id') id: number,
    @requestBody() movimiento: Movimiento,
  ): Promise<void> {
    await this.movimientoRepository.replaceById(id, movimiento);
  }

  @del('/movimientos/{id}')
  @response(204, {
    description: 'Movimiento DELETE success',
  })
  async deleteById(@param.path.number('id') id: number): Promise<void> {
    await this.movimientoRepository.deleteById(id);
  }
}
