import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateBookmarkDTO {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsString()
  @IsNotEmpty()
  link: string;
}
