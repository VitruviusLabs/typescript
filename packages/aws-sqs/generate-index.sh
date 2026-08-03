#!/usr/bin/env bash

set -euo pipefail

# Basic path elements definition.

readonly FILE_PATH="$(realpath ${BASH_SOURCE})"
readonly CURRENT_DIR="$(dirname ${FILE_PATH})"


readonly INDEX_FILE_PATH="${CURRENT_DIR}/src/_index.mts"

if [[ -f "${INDEX_FILE_PATH}" ]]; then
    rm "${INDEX_FILE_PATH}"
fi

readonly TYPESCRIPT_FILES=($(find "${CURRENT_DIR}/src" -iname "*.mts"))

indexContent=""

for file in "${TYPESCRIPT_FILES[@]}"; do

    LOCAL_FILE_NAME="${file#$CURRENT_DIR\/src*/}"
    REPLACED_FILE_NAME="./${LOCAL_FILE_NAME//\.mts/.mjs}"

    indexContent="${indexContent}export * from \"${REPLACED_FILE_NAME}\";\n"

done

echo -e "${indexContent}" > "${INDEX_FILE_PATH}"
