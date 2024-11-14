#!/bin/bash

# 设置变量
DOCKER_CONTAINER="eemp-mysql"
#DOCKER_CONTAINER="mysql_8.0.19"
MYSQL_USER="root"
MYSQL_PASSWORD="root"
BACKUP_DIR="/backup"
DATABASE="eemp"

# 参数检查
if [ $# -lt 1 ]; then
    echo "Usage: $0 <full_backup_date> [incremental_end_date]"
    exit 1
fi

FULL_BACKUP_DATE=$1
INCREMENTAL_END_DATE=$2

# 停止应用服务
echo "Stopping application services..."
docker-compose stop eemp-system

# 恢复完整备份
echo "Restoring full backup..."
gunzip -c $BACKUP_DIR/full/backup_${DATABASE}_${FULL_BACKUP_DATE}.sql.gz | \
    docker exec -i $DOCKER_CONTAINER mysql -u$MYSQL_USER -p$MYSQL_PASSWORD $DATABASE

# 如果指定了增量恢复日期，则恢复增量备份
if [ ! -z "$INCREMENTAL_END_DATE" ]; then
    echo "Restoring incremental backups..."
    for binlog in $(ls $BACKUP_DIR/incremental/binlog_*.sql.gz | sort); do
        BINLOG_DATE=$(echo $binlog | grep -o '[0-9]\{8\}_[0-9]\{6\}')
        if [ "$BINLOG_DATE" \> "$FULL_BACKUP_DATE" ] && [ "$BINLOG_DATE" \<= "$INCREMENTAL_END_DATE" ]; then
            echo "Applying binlog: $binlog"
            gunzip -c $binlog | \
                docker exec -i $DOCKER_CONTAINER mysql -u$MYSQL_USER -p$MYSQL_PASSWORD $DATABASE
        fi
    done
fi

# 启动应用服务
echo "Starting application services..."
docker-compose start eemp-system

echo "Restore completed!"
