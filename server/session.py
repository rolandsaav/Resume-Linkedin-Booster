from typing import Dict

# In-Memory Session Storage
# In a real production app, this would be a database like Redis or a SQL database.
SESSIONS_DB: Dict[str, Dict] = {} 