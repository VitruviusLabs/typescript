#!/usr/bin/env bash

set -euo pipefail

added_files=()
modified_files=()

has_valid_added_files=$(git diff --name-status "${1}" "${2}" | grep -oP '[A]{1}[^A-Za-z]*(.*)' && echo true || echo false)

if [[ ${has_valid_added_files}  ]]; then

  mapfile -t added_files < <(git diff --name-status "${1}" "${2}" | grep -oP '[A]{1}[^A-Za-z]*(.*)' | sed --regexp-extended 's/[AMD]\s+//g')

fi

has_valid_modified_files=$(git diff --name-status "${1}" "${2}" | grep -oP '[M]{1}[^A-Za-z]*(.*)' && echo true || echo false)

if [[ ${has_valid_modified_files}  ]]; then

  mapfile -t modified_files < <(git diff --name-status "${1}" "${2}" | grep -oP '[M]{1}[^A-Za-z]*(.*)' | sed --regexp-extended 's/[AMD]\s+//g')

fi

cspell_ignored_files=$(jq '.ignorePaths | @sh' < .vscode/cspell.json)

ignored_files=($(echo "${cspell_ignored_files}" | tr -d \'\"))

files_requiring_spell_check=$(( "${#modified_files[@]}" + "${#added_files[@]}" ))

for i in "${!modified_files[@]}"; do

  for j in "${!ignored_files[@]}"; do

    file_requires_spell_check=$(echo "${modified_files[$i]}" | grep "${ignored_files[$j]}" &> /dev/null && echo true || echo false)

    if [[ "${file_requires_spell_check}" == "true" ]]; then

      files_requiring_spell_check=$(( --files_requiring_spell_check ))

    fi

  done

done

for i in "${!added_files[@]}"; do

  for j in "${!ignored_files[@]}"; do

    file_requires_spell_check=$(echo "${added_files[$i]}" | grep "${ignored_files[$j]}" &> /dev/null && echo true || echo false)

    if [[ "${file_requires_spell_check}" == "true" ]]; then

      files_requiring_spell_check=$(( files_requiring_spell_check-1 ))

    fi

  done

done

require_spell_check=$([[ "${files_requiring_spell_check}" -gt 0 ]] && echo "true" || echo "false")

echo "${require_spell_check}"
