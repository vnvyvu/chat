protoc \
--plugin="./node_modules/.bin/protoc-gen-ts_proto" \
--ts_proto_out=../libs/common/src ./proto/*.proto \
--ts_proto_opt=nestJs=true \
--ts_proto_opt=esModuleInterop=true \
--ts_proto_opt=fileSuffix=.pb