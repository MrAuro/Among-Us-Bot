set /p token=Bot Token:
echo TOKEN=%token% > .env
echo Made a .env file with your token.
echo Installing node modules...
npm install
echo Node modules installed. Start run.bat to start the bot!
pause