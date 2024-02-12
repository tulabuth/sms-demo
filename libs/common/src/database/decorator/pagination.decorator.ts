import {
  applyDecorators,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';

export const PaginationOptions = createParamDecorator(
  (data, ctx: ExecutionContext) => {
    const req = ctx.switchToHttp().getRequest();
    return {
      limit: parseInt(req.query?.limit || CONFIG.PAGE_LIMIT),
      page: parseInt(req.query?.page) || 1,
      search: req.query?.q || '',
      order: req.query?.order || '',
      sort: req.query?.sort || 'ASC',
    };
  },
);

export const CONFIG = {
  PAGE_LIMIT: 30,
  PAGE_MAX: 1000,
};

export const ApiPaginationQuery = () => {
  return applyDecorators(
    ApiQuery({
      name: 'limit',
      type: Number,
      example: 10,
      required: false,
    }),
    ApiQuery({
      name: 'page',
      type: Number,
      example: 1,
      required: false,
    }),
    ApiQuery({
      name: 'q',
      type: String,
      required: false,
    }),
    ApiQuery({
      name: 'order',
      type: String,
      description: 'เรียงโดย column',
      required: false,
    }),
    ApiQuery({
      name: 'sort',
      type: String,
      enum: ['ASC', 'DESC'],
      required: false,
    }),
  );
};
