import path from 'node:path'
import fs from 'node:fs'
import type { NextConfig } from 'next'

const isMonorepo = fs.existsSync(path.resolve(__dirname, '../../pnpm-workspace.yaml'))
const workspaceRoot = isMonorepo ? path.resolve(__dirname, '../../') : path.resolve(__dirname)
const isStaticExport = process.env.STATIC_EXPORT === 'true'

const nextConfig: NextConfig = {
  output: isStaticExport ? 'export' : 'standalone',
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || '',
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  turbopack: {
    root: workspaceRoot,
  },
}

export default nextConfig
