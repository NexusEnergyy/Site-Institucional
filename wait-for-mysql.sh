#!/bin/bash

set -e

host="$1"
shift
cmd="$@"

until mysql -h "$DB_HOST" -u "$DB_USER" -p"$DB_PASSWORD" -e 'SELECT 1'; do
  >&2 echo "MySQL está indisponível - aguardando..."
  sleep 1
done

>&2 echo "MySQL está pronto - executando comando"
exec $cmd