import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import {
  CreateBookmarkDTO,
  EditBookmarkDTO,
} from './dto/';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userID: userId,
      },
    });
  }
  async createBookmark(
    userId: number,
    dto: CreateBookmarkDTO,
  ) {
    const bookmark =
      await this.prisma.bookmark.create({
        data: {
          userID: userId,
          ...dto,
        },
      });
    return bookmark;
  }
  async editBookmark(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDTO,
  ) {
    //first get bookmark by id
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    if (!bookmark || bookmark.userID !== userId) {
      throw new ForbiddenException(
        'Access to resources denied',
      );
    }
    return this.prisma.bookmark.update({
      where: {
        id: bookmarkId,
      },
      data: {
        ...dto,
      },
    });
  }

  getBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    return this.prisma.bookmark.findUnique({
      where: {
        userID: userId,
        id: bookmarkId,
      },
    });
  }

  async deleteBookmarkById(
    userId: number,
    bookmarkId: number,
  ) {
    const bookmark =
      await this.prisma.bookmark.findUnique({
        where: {
          id: bookmarkId,
        },
      });

    if (!bookmark || bookmark.userID !== userId) {
      throw new ForbiddenException(
        'Access to resources denied',
      );
    }

    await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
      },
    });
  }
}
