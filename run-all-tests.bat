@echo off
echo Installing dependencies...
call npm i

echo.
echo ================================================
echo Dependencies installed. Continuing with tests...
echo ================================================
echo.

echo Starting test website and running tests...

REM Start the test website in a new window
start cmd /k "npm run start-test-site"

REM Wait for the test website to initialize (10 seconds)
echo Waiting for test website to start...
timeout /t 10 /nobreak

REM Run the tests
echo Running tests...
call npm test

echo.
echo Tests completed. Press any key to exit...
pause > nul
