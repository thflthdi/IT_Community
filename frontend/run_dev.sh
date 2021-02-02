#!/usr/bin/env bash

docker run \
   -p 80:3000 \
   -v $(pwd)/.:/frontend \
   --rm -it -d \
   thflthdi/reactsetting:1.0

