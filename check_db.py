import sqlite3
import os

DB_FILE = os.path.join(os.path.dirname(__file__), "finvoice.sqlite")

conn = sqlite3.connect(DB_FILE)
c = conn.cursor()

print("📂 Using DB file:", DB_FILE)

# Show all tables
c.execute("SELECT name FROM sqlite_master WHERE type='table';")
print("📋 Tables:", c.fetchall())

# Show all rows in expenses
c.execute("SELECT * FROM expenses;")
rows = c.fetchall()
print("📊 Expenses:")
for row in rows:
    print(row)

conn.close()
