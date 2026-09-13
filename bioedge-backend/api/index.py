import sys
from pathlib import Path

# Ensure root directory is accessible by serverless execution
BASE_DIR = Path(__file__).resolve().parent.parent
if str(BASE_DIR) not in sys.path:
    sys.path.insert(0, str(BASE_DIR))

from main import app

# Vercel serverless ASGI handler
handler = app
