#!/bin/bash
# MongoDB Backup Script for Jasri Space
# Runs daily via cron, keeps 7 days of backups

BACKUP_DIR="/backups"
DATE=$(date +%Y-%m-%d_%H-%M-%S)
BACKUP_NAME="mongodb_backup_$DATE"

echo "Starting MongoDB backup: $BACKUP_NAME"

# Create backup using mongodump
mongodump --host mongo --port 27017 --db jasri-space --out "$BACKUP_DIR/$BACKUP_NAME"

# Compress the backup
cd $BACKUP_DIR
tar -czf "$BACKUP_NAME.tar.gz" "$BACKUP_NAME"
rm -rf "$BACKUP_NAME"

echo "Backup created: $BACKUP_NAME.tar.gz"

# Remove backups older than 7 days
find $BACKUP_DIR -name "mongodb_backup_*.tar.gz" -mtime +7 -delete

echo "Cleanup complete. Remaining backups:"
ls -la $BACKUP_DIR/*.tar.gz 2>/dev/null || echo "No backups found"
