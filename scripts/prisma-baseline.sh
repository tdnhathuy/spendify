#!/bin/bash

# Script tự động tạo baseline migration khi bị drift
# Usage: ./scripts/prisma-baseline.sh [migration-name]

MIGRATION_NAME=${1:-baseline}

echo "🔄 Starting Prisma baseline migration process..."

# 1. Xóa migrations cũ
echo "📁 Removing old migrations..."
rm -rf prisma/migrations

# 2. Tạo folder migration mới
echo "📁 Creating new migration folder..."
mkdir -p prisma/migrations/0_init

# 3. Generate migration SQL
echo "📝 Generating migration SQL..."
npx prisma migrate diff \
  --from-empty \
  --to-schema-datamodel prisma/schema.prisma \
  --script > prisma/migrations/0_init/migration.sql

# 4. Mark migration as applied
echo "✅ Marking migration as applied..."
npx prisma migrate resolve --applied 0_init

# 5. Generate Prisma Client
echo "🔨 Generating Prisma Client..."
npx prisma generate

echo "✨ Baseline migration completed successfully!"
echo "📍 Migration name: 0_init"

