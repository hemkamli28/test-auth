import { IsEnum, IsNumber, MinLength } from 'class-validator';
import { Category } from '../schemas/book.schema';

export class CreateBookDto {
  @MinLength(3)
  title: string;

  @MinLength(6)
  description: string;

  @MinLength(8)
  author: string;

  @IsNumber()
  price: number;

  @IsEnum(Category)
  category: Category;
}
