call yarn proto-loader-gen-types --grpcLib=@grpc/grpc-js --outDir=proto/ ./proto/chat.proto

@REM mkdir -p ./client/src/proto
@REM protoc -I=. ./proto/*.proto \
@REM    --js_out=import_style=commonjs:./client/src \
@REM    --grpc-web_out=import_style=typescript,mode=grpcwebtext:./client/src