import { plainToClass, Type } from 'class-transformer';
import { IsEnum, IsNumber, IsString, validateSync } from 'class-validator';

enum Environment {
  테스트 = 'test',
  개발 = 'dev',
  스테이징 = 'staging',
  제품 = 'production',
}

class EnvironmentVariables {
  @IsEnum(Environment)
  readonly NODE_ENV: Environment;

  @Type(() => Number)
  @IsNumber()
  readonly PORT: number;

  @IsString()
  readonly QUERY_DATABASE_HOST: string;

  @Type(() => Number)
  @IsNumber()
  readonly QUERY_DATABASE_PORT: number;

  @IsString()
  readonly QUERY_DATABASE_USER: string;

  @IsString()
  readonly QUERY_DATABASE_PASSWORD: string;

  @IsString()
  readonly MUTATION_DATABASE_HOST: string;

  @Type(() => Number)
  @IsNumber()
  readonly MUTATION_DATABASE_PORT: number;

  @IsString()
  readonly MUTATION_DATABASE_USER: string;

  @IsString()
  readonly MUTATION_DATABASE_PASSWORD: string;
}

export function validate(config: Record<string, unknown>) {
  const validatedConfig = plainToClass(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}
