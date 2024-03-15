#!/bin/bash

# Check if base URL is provided
if [ $# -ne 1 ]; then
  echo "Usage: $0 <base_url>"
  exit 1
fi

base_url=$1

# Define the target URL
cat <<EOF > post-targets.txt
POST ${base_url}/create
Content-Type: application/json
@post-body.json
EOF

# Run the attack
vegeta attack -targets=post-targets.txt -duration=3s -rate=10 | tee post-results.bin | vegeta report
vegeta plot < post-results.bin > post-plot.html
