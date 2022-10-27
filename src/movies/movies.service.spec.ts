import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { Movie } from './entities/movie.entity';
import { MoviesService } from './movies.service';

describe('MoviesService', () => {
  let service: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MoviesService],
    }).compile();

    service = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAll', () => {
    it('should rturn an array', () => {
      const result = service.getAll();
      expect(result).toBeInstanceOf(Array);
    });
  });

  describe('getOne', () => {
    it('should return a moive', () => {
      service.create({
        title: 'test',
        year: 200250,
        genres: ['anction', 'horror'],
      });
      const moive = service.getOne(1);
      expect(moive).toBeDefined();
      expect(moive.id).toEqual(1);
    });

    it('should throw an exception', () => {
      try {
        service.getOne(2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('deleteOne', () => {
    it('delete a moive', () => {
      service.create({
        title: 'TestDeleteOne',
        year: 2020,
        genres: ['anction', 'horror'],
      });
      const beforeDelete = service.getAll().length;
      service.deleteOne(1);
      const afterDelete = service.getAll().length;
      expect(afterDelete).toBeLessThan(beforeDelete);
    });

    it('should return a 404', () => {
      try {
        service.deleteOne(2);
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });

  describe('create', () => {
    it('create a moive', () => {
      const beforeCreate = service.getAll().length;
      service.create({
        title: 'TestCreate',
        year: 2020,
        genres: ['anction', 'horror'],
      });
      const afterCreate = service.getAll().length;
      expect(afterCreate).toBeGreaterThan(beforeCreate);
    });
  });

  describe('update', () => {
    it('should update a movie', () => {
      service.create({
        title: 'TestUpdate',
        year: 2020,
        genres: ['anction', 'horror'],
      });
      service.update(1, { title: 'TestUpdated' });
      const movie = service.getOne(1);
      expect(movie.title).toEqual('TestUpdated');
    });

    it('should throw an exception', () => {
      try {
        service.update(999, {});
      } catch (e) {
        expect(e).toBeInstanceOf(NotFoundException);
      }
    });
  });
});
