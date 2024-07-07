import { IsNotEmpty, IsString, IsDate, IsEnum } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDate()
  dueDate: Date;

  @IsNotEmpty()
  @IsString()
  priority: string;

  @IsNotEmpty()
  @IsEnum(['pending', 'in-progress', 'completed'])
  status: string;
}
