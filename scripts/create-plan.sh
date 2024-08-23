#!/bin/bash

# Define variables
ACCESS_TOKEN="APP_USR-4833948173144760-080414-bbfe050979f973da6d4f5868317eb48c-311210283"
URL="https://api.mercadopago.com/preapproval_plan"
DATA=$(cat <<EOF
{
  "reason": "Suscripción a PremBet",
  "auto_recurring": {
    "frequency": 1,
    "frequency_type": "months",
    "transaction_amount": 10000,
    "billing_day_proportional": false,
    "billing_day": 10,
    "currency_id": "COP",
    "start_date": "$(date --iso-8601=seconds)",
    "end_date": "$(date --iso-8601=seconds --date='+1 year')"
  },
  "back_url": "https://sorteo-seguro.com"
}
EOF
)

# Execute curl
curl -X POST "$URL" \
  -H "Authorization: Bearer $ACCESS_TOKEN" \
  -H "Content-Type: application/json" \
  -d "$DATA"
