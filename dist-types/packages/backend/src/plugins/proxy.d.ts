import { Router } from 'express';
import { PluginEnvironment } from '../types';
export default function createPlugin({ logger, config, discovery, }: PluginEnvironment): Promise<Router>;
