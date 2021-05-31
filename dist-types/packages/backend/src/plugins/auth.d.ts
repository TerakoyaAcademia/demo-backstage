import { Router } from 'express';
import { PluginEnvironment } from '../types';
export default function createPlugin({ logger, database, config, discovery, }: PluginEnvironment): Promise<Router>;
