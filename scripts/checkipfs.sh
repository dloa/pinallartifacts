#!/bin/bash
pidof ipfs >/dev/null
if [[ $? -ne 0 ]] ; then
        echo "Restarting ipfs daemon:     $(date)" >> /home/ipfs/logs/ipfs.log
        /home/ipfs/bin/ipfs daemon >> /home/ipfs/logs/ipfs.log 2>&1 &
fi
