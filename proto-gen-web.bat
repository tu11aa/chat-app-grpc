mkdir ./client/src/proto
call protoc -I=. ./proto/chat.proto --js_out=import_style=commonjs:./client/src --grpc-web_out=import_style=typescript,mode=grpcwebtext:./client/src --plugin=protoc-gen-grpc-web=%cd%/client/node_modules/.bin/protoc-gen-grpc-web.cmd