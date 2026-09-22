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

HTTP_STATUS=$(curl -sS --fail-with-body \
  -u "$USER" \
  -H "Accept: text/html" \
  "${URL}?productModuleNumber=${PRODUCT_MODULE}" \
  -o "$OUTPUT_FILE" \
  -w "%{http_code}")

# Check HTTP status and response validity
if [ $? -ne 0 ]; then
  echo "Error: curl failed (HTTP ${HTTP_STATUS}) retrieving pricing table" >&2
  rm -f "$OUTPUT_FILE"
  exit 1
fi

if [ ! -s "$OUTPUT_FILE" ]; then
  echo "Error: Response is empty for product module '${PRODUCT_MODULE}'" >&2
  rm -f "$OUTPUT_FILE"
  exit 1
fi

if ! grep -qi "<" "$OUTPUT_FILE"; then
  echo "Error: Response does not appear to be HTML (HTTP ${HTTP_STATUS})" >&2
  rm -f "$OUTPUT_FILE"
  exit 1
fi

echo "Saved to $OUTPUT_FILE (HTTP ${HTTP_STATUS})"
