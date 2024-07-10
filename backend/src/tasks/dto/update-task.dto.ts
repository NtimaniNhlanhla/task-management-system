import {
  IsOptional,
  IsString,
  IsDate,
  IsEnum,
  IsDateString,
} from 'class-validator';

export class UpdateTaskDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsDateString()
  dueDate?: string;

  @IsOptional()
  @IsEnum(['low', 'medium', 'high'])
  priority: string;

  @IsOptional()
  @IsEnum(['pending', 'in-progress', 'completed'])
  status?: string;
}
