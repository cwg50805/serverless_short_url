#!/bin/bash

# Check if base URL is provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <base_url>"
  exit 1
fi

base_url=$1

# Define the target URL
cat <<EOF > get-targets.txt
GET ${base_url}/t/4c865f2364ed1a43
EOF

# Run the attack
vegeta attack -targets=get-targets.txt -duration=30s -rate=10 | tee get-results.bin | vegeta report
vegeta plot < get-results.bin > get-plot.html
