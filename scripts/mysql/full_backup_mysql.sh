#!/bin/bash

# 设置变量
DOCKER_CONTAINER="eemp-mysql"
#DOCKER_CONTAINER="mysql_8.0.19"
MYSQL_USER="root"
MYSQL_PASSWORD="root"
BACKUP_DIR="/backup"
DATE=$(date +%Y%m%d_%H%M%S)
DATABASE="eemp"
BACKUP_TYPE="full"

# 创建备份目录结构
mkdir -p $BACKUP_DIR/{full,incremental}

# 创建完整备份
echo "Starting full backup..."
docker exec $DOCKER_CONTAINER mysqldump \
    -u$MYSQL_USER -p$MYSQL_PASSWORD \
    --master-data=2 \
    --single-transaction \
    --flush-logs \
    $DATABASE > $BACKUP_DIR/full/backup_${DATABASE}_${DATE}.sql

# 压缩备份
gzip $BACKUP_DIR/full/backup_${DATABASE}_${DATE}.sql

# 记录二进制日志位置
docker exec $DOCKER_CONTAINER mysql -u$MYSQL_USER -p$MYSQL_PASSWORD \
    -e "SHOW MASTER STATUS\G" > $BACKUP_DIR/full/binlog_position_${DATE}.txt

# 删除30天前的完整备份
find $BACKUP_DIR/full -name "backup_${DATABASE}_*.sql.gz" -mtime +30 -delete
find $BACKUP_DIR/full -name "binlog_position_*.txt" -mtime +30 -delete

echo "Full backup completed: backup_${DATABASE}_${DATE}.sql.gz"
