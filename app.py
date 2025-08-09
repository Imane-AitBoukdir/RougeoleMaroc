from flask import Flask, render_template, request, jsonify, session
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=['http://localhost:5173'])



# Login/Signup
# History of chats
# sessions

# Database :
#    - UserName/password
#    - chat messages

@app.route('/login', methods=['GET', 'POST'])
def login():
    # Get JSON data from request body
    data = request.get_json()

# Example API route
@app.route('/api/chat', methods=['POST'])
def api_data():
    # Get JSON data from request body
    data = request.get_json()

    if not data:
        return jsonify({"error": "No JSON data received"}), 400

    # Process the data
    query = data.get('query')

    # Response back
    result = f"text from AI for {query}"
    return jsonify({
        "message": result,
    })

# Running the app
if __name__ == '__main__':
    app.run(debug=True)
