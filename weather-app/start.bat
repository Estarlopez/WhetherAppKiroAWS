@echo off
pushd %~dp0
echo Starting Weather App on http://localhost:3000 ...
start http://localhost:3000
call npm start
popd
