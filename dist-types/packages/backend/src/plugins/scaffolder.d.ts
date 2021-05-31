import { Router } from 'express';
import type { PluginEnvironment } from '../types';
export default function createPlugin({ logger, config, database, reader, }: PluginEnvironment): Promise<Router>;
