import { existsSync } from 'node:fs';
import { join, normalize, sep } from 'node:path';

export interface VisualFrame {
  id: string;
  file: string;
  caption: string;
  alt?: string;
}

export interface VisualGroup {
  title?: string;
  frames: VisualFrame[];
}

export interface Visuals {
  base_path: string;
  frames?: VisualFrame[];
  groups?: VisualGroup[];
}

const supportedExtensions = new Set(['.png', '.jpg', '.jpeg']);
const publicRoot = join(process.cwd(), 'public');

function extensionFor(file: string) {
  const match = file.toLowerCase().match(/\.[^.\/]+$/);
  return match?.[0] ?? '';
}

function isSafePublicPath(path: string) {
  const normalized = normalize(path).replace(/^([/\\])+/, '');
  return normalized && !normalized.split(sep).includes('..');
}

export function visualGroups(visuals?: Visuals): VisualGroup[] {
  if (visuals?.groups?.length) return visuals.groups;
  if (visuals?.frames?.length) return [{ frames: visuals.frames }];
  return [];
}

export function visualFrameCount(visuals?: Visuals) {
  return visualGroups(visuals).reduce((count, group) => count + group.frames.length, 0);
}

export function publicVisualFileExists(basePath: string, file: string) {
  const relativePath = `${basePath.replace(/^\/+/, '').replace(/\/+$/, '')}/${file}`;
  if (!supportedExtensions.has(extensionFor(file)) || !isSafePublicPath(relativePath)) return false;
  const absolutePath = join(publicRoot, relativePath);
  return absolutePath.startsWith(publicRoot) && existsSync(absolutePath);
}

export function visualAvailability(visuals?: Visuals) {
  const groups = visualGroups(visuals);
  const total = visualFrameCount(visuals);
  const available = visuals
    ? groups.reduce(
      (count, group) => count + group.frames.filter((frame) => publicVisualFileExists(visuals.base_path, frame.file)).length,
      0
    )
    : 0;

  let label = 'Illustrations pending';
  if (total === 0) label = 'No illustration plan yet';
  else if (available === total) label = 'Fully illustrated';
  else if (available > 0) label = `Illustrations: ${available} / ${total} available`;

  return { available, total, label };
}
