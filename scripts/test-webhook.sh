#!/usr/bin/env bash

set -euo pipefail

MODE="${1:-valid}"
BASE_URL="${BASE_URL:-http://localhost:3000}"
DATA_ID="${DATA_ID:-123456789}"
REQUEST_ID="${REQUEST_ID:-local-test-req-001}"
TS="$(date +%s)"

if [[ "$MODE" == "valid" ]]; then
  if [[ -z "${MP_WEBHOOK_SECRET:-}" ]]; then
    echo "Error: MP_WEBHOOK_SECRET is required for valid mode"
    exit 1
  fi

  MANIFEST="id:${DATA_ID};request-id:${REQUEST_ID};ts:${TS};"
  SIG="$(printf %s "$MANIFEST" | openssl dgst -sha256 -hmac "$MP_WEBHOOK_SECRET" -hex | sed 's/^.* //')"
  X_SIGNATURE="ts=${TS},v1=${SIG}"
  echo "Sending VALID signed webhook to ${BASE_URL}"
else
  X_SIGNATURE="ts=${TS},v1=deadbeef"
  echo "Sending INVALID signed webhook to ${BASE_URL}"
fi

curl -i -X POST "${BASE_URL}/api/webhooks/mercadopago?data.id=${DATA_ID}" \
  -H "Content-Type: application/json" \
  -H "x-request-id: ${REQUEST_ID}" \
  -H "x-signature: ${X_SIGNATURE}" \
  -d "{\"type\":\"payment\",\"data\":{\"id\":\"${DATA_ID}\"}}"
