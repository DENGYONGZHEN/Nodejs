import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BookmarkService } from './bookmark.service';
import { JWTGuard } from '../auth/guard';
import {
  CreateBookmarkDTO,
  EditBookmarkDTO,
} from './dto/';
import { GetUser } from '../auth/decorator';

@UseGuards(JWTGuard)
@Controller('bookmarks')
export class BookmarkController {
  constructor(
    private bookmarkService: BookmarkService,
  ) {}

  @Post()
  createBookmark(
    @GetUser('id') userId: number,
    @Body() dto: CreateBookmarkDTO,
  ) {
    return this.bookmarkService.createBookmark(
      userId,
      dto,
    );
  }
  @Get()
  getBookmarks(@GetUser('id') userId: number) {
    return this.bookmarkService.getBookmarks(
      userId,
    );
  }

  @Get(':id')
  getBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.getBookmarkById(
      userId,
      bookmarkId,
    );
  }

  @Patch(':id')
  editBookmark(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
    @Body() dto: EditBookmarkDTO,
  ) {
    return this.bookmarkService.editBookmark(
      userId,
      bookmarkId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteBookmarkById(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) bookmarkId: number,
  ) {
    return this.bookmarkService.deleteBookmarkById(
      userId,
      bookmarkId,
    );
  }
}
