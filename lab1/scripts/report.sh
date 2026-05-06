#!/bin/bash

today=$(date +%Y-%m-%d)

touch ~/shell_lab/notes/report_${today}.txt

echo "User Name: $(whoami)" >> ~/shell_lab/notes/report_${today}.txt

echo "Current Path: $(pwd)" >> ~/shell_lab/notes/report_${today}.txt

file_count=$(ls -1 ~/shell_lab/data | wc -l)

echo "Number of files in data: $file_count" >> ~/shell_lab/notes/report_${today}.txt

echo "------------------------"
echo "Success: Report Created"
echo "------------------------"