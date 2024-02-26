import {
  Body,
  Controller,
  Delete,
  Get,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { BookService } from './book.service';
import { Book } from './schemas/book.schema';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get('all')
  async getAll(): Promise<Book[]> {
    return await this.bookService.getAll();
  }

  @Post('add')
  async addBook(
    @Body(new ValidationPipe())
    createBookDto: CreateBookDto,
  ): Promise<Book> {
    try {
      return this.bookService.addBook(createBookDto);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get(':id')
  async getBook(@Param('id') id: string): Promise<Book> {
    try {
      return await this.bookService.getBook(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Get('author/:author')
  async getBookbyAuthor(@Param('author') author: string): Promise<Book[]> {
    try {
      return await this.bookService.getBookbyAuthor(author);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error; // Re-throw NotFoundException
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Get('title/:title')
  async getBookbyTitle(@Param('title') title: string): Promise<Book> {
    try {
      return await this.bookService.getBookbyTitle(title);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Put('update/:id')
  async updateBook(
    @Param('id') id: string,
    @Body(new ValidationPipe())
    updateBookDto: UpdateBookDto,
  ): Promise<Book> {
    try {
      return await this.bookService.updateBook(id, updateBookDto);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  @Delete('delete/:id')
  async deleteBook(@Param('id') id: string): Promise<Book> {
    try {
      return await this.bookService.deleteBook(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      } else {
        throw new InternalServerErrorException();
      }
    }
  }
}
