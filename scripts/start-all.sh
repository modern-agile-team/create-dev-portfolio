CHECK_OS="`uname -s`"

if [[ ${CHECK_OS} = "Darwin"* ]]; then
  npm run build --prefix ./server/app && docker-compose -f ./server/docker-compose.yml --env-file ./config/.server.env up -d && npm run start:client
elif [[ "$CHECK_OS" = "Linux"* ]]; then
  npm run build --prefix ./server/app && docker-compose -f ./server/docker-compose.yml --env-file ./config/.server.env up -d && npm run start:client
elif [[ ${CHECK_OS} = "MINGW32"* ]]; then
  npm run start:windows
elif [[ ${CHECK_OS} = "MINGW64"* ]]; then
  npm run start:windows
elif [[ ${CHECK_OS} = "CYGWIN"* ]]; then
  npm run start:windows
fi
