import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/book.schema';
import { Model } from 'mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async getAll(): Promise<Book[]> {
    const books = await this.bookModel.find();
    return books;
  }

  async addBook(createBookDto: CreateBookDto): Promise<Book> {
    const newBook = await this.bookModel.create(createBookDto);
    return newBook;
  }

  async getBook(id: string): Promise<Book> {
    const book = await this.bookModel.findById(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async getBookbyAuthor(author: string): Promise<Book[]> {
    const books = await this.bookModel.find({ author });
    if (!books) {
      throw new NotFoundException('Book not found');
    }
    return books;
  }

  async getBookbyTitle(title: string): Promise<Book> {
    const book = await this.bookModel.findOne({ title });
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }

  async updateBook(id: string, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookModel.findByIdAndUpdate(id, updateBookDto, {
      new: true,
      runValidators: true,
    });
    return book;
  }

  async deleteBook(id: string): Promise<Book> {
    const book = await this.bookModel.findByIdAndDelete(id);
    if (!book) {
      throw new NotFoundException('Book not found');
    }
    return book;
  }
}
