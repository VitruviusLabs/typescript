#!/usr/bin/env bash
set -euo pipefail

FILE_PATH="$(realpath ${BASH_SOURCE})"
CURRENT_DIR="$(dirname ${FILE_PATH})"


bash "${CURRENT_DIR}"/down.sh && bash "${CURRENT_DIR}"/up.sh
