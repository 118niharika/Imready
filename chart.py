from flask import Flask, jsonify
from flask_cors import CORS
import sqlite3

app = Flask(__name__)
CORS(app)

DB_FILE = "finvoice.sqlite"

@app.route("/analytics", methods=["GET"])
def analytics():
    conn = sqlite3.connect(DB_FILE)
    c = conn.cursor()
    c.execute("SELECT category, SUM(amount) FROM expenses GROUP BY category")
    rows = c.fetchall()
    conn.close()

    categories = {r[0]: r[1] for r in rows}
    total_spent = sum(categories.values())

    data = {
        "total_spent": total_spent,
        "categories": categories,
        "savings_goal": "Try to save 20% of your income."
    }
    return jsonify(data)

if __name__ == "__main__":
    app.run(port=5001, debug=True)  # 👈 different port (5001)
