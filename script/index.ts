import 'reflect-metadata';
import { GenerateParserJob } from './job/generate-parser-job';
import { ValidationService } from './service/validation-service';
import { Container } from 'typedi';

Container.get(ValidationService).validateEnvironment();
Container.get(GenerateParserJob).execute();
