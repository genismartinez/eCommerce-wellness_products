import {Repository} from "typeorm";
import {Request, Response, NextFunction} from "express";
import AppDataSource from "../database";
import {DeepPartial, BaseEntity, FindOneOptions} from "typeorm";
import {ErrorHandler, ValidationError} from "../middleware/errorHandler";

export abstract class GenericService<T extends BaseEntity> {
    protected repository: Repository<T>;

    constructor(entityType: new () => T) {
        this.repository = AppDataSource.getRepository(entityType);
    }

    async create(req: Request, res: Response, next: NextFunction) {
        try {
            const newEntity = this.repository.create(req.body as DeepPartial<T>);
            await this.repository.save(newEntity);
            res.status(201).json(newEntity);
        } catch (error) {
            if (error instanceof Error) {
                next(new ErrorHandler(500, "Error creating entity", error.message));
            } else {
                next(new ErrorHandler(500, "Unknown error"));
            }
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction) {
        try {
            const relations = req.query.relations
                ? (req.query.relations as string).split(",")
                : [];

            const entities = await this.repository.find({
                relations: relations,
            });
            res.json(entities);
        } catch (error) {
            if (error instanceof Error) {
                next(new ErrorHandler(500, "Error retrieving entities", error.message));
            } else {
                next(new ErrorHandler(500, "Unknown error"));
            }
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = req.params;
            const options: FindOneOptions = {where: {id}};
            const entity = await this.repository.findOne(options);
            if (!entity) {
                return next(new ValidationError("Entity not found"));
            }
            res.json(entity);
        } catch (error) {
            if (error instanceof Error) {
                next(new ErrorHandler(500, "Error retrieving entity", error.message));
            } else {
                next(new ErrorHandler(500, "Unknown error"));
            }
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = req.params;
            const options: FindOneOptions = {where: {id}};
            const entityToUpdate = await this.repository.findOne(options);
            if (!entityToUpdate) {
                return next(new ValidationError("Entity not found"));
            }
            this.repository.merge(entityToUpdate, req.body);
            const updatedEntity = await this.repository.save(entityToUpdate);
            res.json(updatedEntity);
        } catch (error) {
            if (error instanceof Error) {
                next(new ErrorHandler(500, "Error updating entity", error.message));
            } else {
                next(new ErrorHandler(500, "Unknown error"));
            }
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const {id} = req.params;
            const options: FindOneOptions = {where: {id}};
            const entityToDelete = await this.repository.findOne(options);
            if (!entityToDelete) {
                return next(new ValidationError("Entity not found"));
            }
            await this.repository.remove(entityToDelete);
            res.status(204).send();
        } catch (error) {
            if (error instanceof Error) {
                next(new ErrorHandler(500, "Error deleting entity", error.message));
            } else {
                next(new ErrorHandler(500, "Unknown error"));
            }
        }
    }
}
