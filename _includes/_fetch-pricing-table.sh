#!/usr/bin/env bash

# Config
USER="netlicensing"
URL="https://go.netlicensing.io/core/v2/rest/licensingmodel/PricingTable/render"
PRODUCT_MODULE="PM-PRICE"
OUTPUT_FILE="netlicensing-pricing-table.html"

# Optional: allow override via arguments
if [ -n "$1" ]; then
  PRODUCT_MODULE="$1"
fi

if [ -n "$2" ]; then
  OUTPUT_FILE="$2"
fi

echo "Fetching pricing table for product module: $PRODUCT_MODULE"

curl -sS \
  -u "$USER" \
  -H "Accept: text/html" \
  "${URL}?productModuleNumber=${PRODUCT_MODULE}" \
  -o "$OUTPUT_FILE"

# Check result
if [ $? -eq 0 ]; then
  echo "Saved to $OUTPUT_FILE"
else
  echo "Error: Failed to retrieve pricing table" >&2
  exit 1
fi
