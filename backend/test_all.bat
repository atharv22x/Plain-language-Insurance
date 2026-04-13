@echo off
echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║       Plain-Language Insurance — API Test Suite         ║
echo ╚══════════════════════════════════════════════════════════╝

echo.
echo ─────────────────────────────────────────────────────────
echo  TEST 1: GET /  (Health Check)
echo ─────────────────────────────────────────────────────────
curl -s http://localhost:3001/
echo.

echo.
echo ─────────────────────────────────────────────────────────
echo  TEST 2: POST /analyze  (Coverage Visualizer)
echo ─────────────────────────────────────────────────────────
curl -s -X POST http://localhost:3001/analyze ^
  -H "Content-Type: application/json" ^
  -d @test_analyze.json
echo.

echo.
echo ─────────────────────────────────────────────────────────
echo  TEST 3: GET /exclusions  (What's Not Covered)
echo ─────────────────────────────────────────────────────────
curl -s http://localhost:3001/exclusions
echo.

echo.
echo ─────────────────────────────────────────────────────────
echo  TEST 4: POST /risk-score  (Claim Probability)
echo ─────────────────────────────────────────────────────────
curl -s -X POST http://localhost:3001/risk-score ^
  -H "Content-Type: application/json" ^
  -d @test_risk.json
echo.

echo.
echo ─────────────────────────────────────────────────────────
echo  TEST 5: GET /suggestions  (Smart Suggestions)
echo ─────────────────────────────────────────────────────────
curl -s http://localhost:3001/suggestions
echo.

echo.
echo ─────────────────────────────────────────────────────────
echo  TEST 6: POST /simplify  (Legal → Plain English)
echo ─────────────────────────────────────────────────────────
curl -s -X POST http://localhost:3001/simplify ^
  -H "Content-Type: application/json" ^
  -d @test_simplify.json
echo.

echo.
echo ─────────────────────────────────────────────────────────
echo  TEST 7: POST /full-analysis  (All-in-One)
echo ─────────────────────────────────────────────────────────
curl -s -X POST http://localhost:3001/full-analysis ^
  -H "Content-Type: application/json" ^
  -d @test_full.json
echo.

echo.
echo ╔══════════════════════════════════════════════════════════╗
echo ║                  All Tests Complete!                    ║
echo ╚══════════════════════════════════════════════════════════╝
echo.
