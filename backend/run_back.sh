#!/usr/bin/env bash
docker run \
    -v $(pwd)/.:/backend \
    -p 8080:8080 \
    --rm -it \
    ehdgnv/itc:1.0 
