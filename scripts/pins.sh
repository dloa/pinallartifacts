#!/bin/bash
#
# Quick and dirty script to ipfs pin add a batch
# of files.
while IFS= read -r line
do
  cmd="ipfs pin add \"$line\""
  echo $cmd
  eval $cmd
done < "pinslist.txt"
