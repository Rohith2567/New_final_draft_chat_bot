# # import os
# # import re
# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # import google.generativeai as genai
# # from dotenv import load_dotenv

# # load_dotenv()  # Load environment variables

# # API_KEY = os.getenv("GOOGLE_API_KEY")  # Use the correct environment variable name

# # if not API_KEY:
# #     raise ValueError("❌ API Key not found. Check your .env file or environment variables.")

# # # Configure Google Generative AI
# # genai.configure(api_key=API_KEY)

# # app = Flask(__name__)
# # CORS(app)  # Allow frontend to call the backend

# # conversation_history = []  # Store chat history

# # @app.route("/chat", methods=["POST"])
# # def chat():
# #     data = request.json
# #     user_message = data.get("message", "")
# #     initial_price = float(data.get("initial_price", 100))
# #     max_discount_price = float(data.get("max_discount_price", 80))

# #     chatbot_reply, final_price, highest_discount = chat_with_gemini(
# #         user_message, conversation_history, initial_price, max_discount_price
# #     )

# #     return jsonify({"reply": chatbot_reply, "final_price": final_price})


# # def chat_with_gemini(user_message, conversation_history, initial_price, max_discount_price, highest_discount=0):
# #     context = '\n--'.join(['{}: {}'.format(x["role"], x["parts"][0]) for x in conversation_history])

# #     prompt = f"""
# #         -- You are a chatbot negotiating a price for a seller.
# #         -- Initial price: {initial_price}
# #         -- Max discount price: {max_discount_price}
# #         -- Offer small discounts (2%-5%) only if user insists.
# #         -- Never go below {max_discount_price}.
# #         -- Keep negotiations professional and polite.
# #         -- Ensure the price remains profitable.
# #         -- Respond to user message: {user_message}
# #     """

# #     generation_config = {
# #         "temperature": 1,
# #         "top_p": 0.95,
# #         "top_k": 64,
# #         "max_output_tokens": 8192,
# #         "response_mime_type": "text/plain",
# #     }

# #     model = genai.GenerativeModel(model_name="gemini-1.5-pro", generation_config=generation_config)
# #     chat_session = model.start_chat(history=conversation_history)
# #     response = chat_session.send_message(user_message)
# #     chatbot_reply = response.text

# #     discount_match = re.search(r'(\d+)%', chatbot_reply)
# #     if discount_match:
# #         discount = int(discount_match.group(1))
# #         highest_discount = max(highest_discount, discount)

# #     final_price = initial_price * (1 - highest_discount / 100)
# #     final_price = max(final_price, max_discount_price)

# #     conversation_history.append({"role": "user", "parts": [user_message]})
# #     conversation_history.append({"role": "model", "parts": [chatbot_reply]})

# #     return chatbot_reply, final_price, highest_discount


# # if __name__ == "__main__":
# #     app.run(debug=True)
















# # from flask import Flask, request, jsonify
# # from flask_cors import CORS
# # import google.generativeai as genai
# # from dotenv import load_dotenv
# # import re
# # import os

# # app = Flask(__name__)
# # CORS(app) 

# # # Load API key
# # load_dotenv()
# # API_KEY = os.getenv("GOOGLE_API_KEY")  # Store API Key in .env file
# # genai.configure(api_key=API_KEY)

# # # Store conversations (in-memory)
# # conversations = {}

# # # Chatbot function
# # def chat_with_gemini(user_message, conversation_history, initial_price, max_discount_price, highest_discount=0):
# #     context = '\n--'.join(['{}: {}'.format(x["role"], x["parts"][0]) for x in conversation_history])

# #     prompt = f"""
# #         INSTRUCTIONS \n
# #         -- You are a helpful and professional chatbot working on behalf of the seller. \n
# #         -- Your primary goal is to minimize discounts for the seller, ideally offering 0%. \n
# #         -- The initial assigned price of the product is {initial_price}. \n
# #         -- The maximum discount price (lowest acceptable price) is {max_discount_price}. Never go below this price. \n
# #         -- Start with a small discount (e.g., 2%, 3%, or 5%) only when the user explicitly starts negotiating. Never start with more than 5%. \n
# #         -- Ensure the final price never goes below {max_discount_price}, even if the buyer insists. Politely decline if they ask for a lower price. \n
# #         -- Keep the conversation focused on the product and negotiation. \n
# #         -- Negotiate to the best of your abilities while retaining the user without giving unnecessary discounts. \n
# #         -- Once an agreement is reached, never increase the discount. \n
# #         -- Always maintain a polite and professional tone. \n

# #         CONTEXT \n
# #         {context}\n
# #         -- Respond to the following user message: \n
# #         {user_message}
# #     """

# #     # Create the model
# #     generation_config = {
# #         "temperature": 1,
# #         "top_p": 0.95,
# #         "top_k": 64,
# #         "max_output_tokens":  100,
# #         "response_mime_type": "text/plain",
# #     }

# #     model = genai.GenerativeModel(
# #         model_name="gemini-1.5-pro",
# #         generation_config=generation_config,
# #         system_instruction=prompt,
# #     )

# #     formatted_history = [{"role": msg["role"], "parts": [msg["parts"][0]]} for msg in conversation_history]
# #     chat_session = model.start_chat(history=formatted_history)

# #     response = chat_session.send_message(user_message)
# #     chatbot_reply = response.text.strip()

# #     # Extract discount percentage
# #     discount_match = re.search(r'(\d+)%', chatbot_reply)
# #     if discount_match:
# #         discount = int(discount_match.group(1))
# #         if discount > highest_discount:
# #             highest_discount = discount

# #     final_price = initial_price * (1 - highest_discount / 100)
# #     if final_price < max_discount_price:
# #         final_price = max_discount_price

# #     # Update conversation history
# #     conversation_history.append({"role": "user", "parts": [user_message]})
# #     conversation_history.append({"role": "model", "parts": [chatbot_reply]})

# #     return chatbot_reply, final_price, highest_discount


# # @app.route('/start_chat', methods=['POST'])
# # def start_chat():
# #     data = request.json
# #     if not data or "user_id" not in data or "initial_price" not in data or "max_discount_price" not in data:
# #         return jsonify({"error": "Missing user_id, initial_price, or max_discount_price"}), 400

# #     user_id = data["user_id"]
# #     initial_price = float(data["initial_price"])
# #     max_discount_price = float(data["max_discount_price"])

# #     # Initialize conversation for new user
# #     conversations[user_id] = {
# #         "history": [],
# #         "initial_price": initial_price,
# #         "max_discount_price": max_discount_price,
# #         "highest_discount": 0
# #     }

# #     return jsonify({"message": "Chat started!", "initial_price": initial_price, "max_discount_price": max_discount_price})


# # @app.route('/chat', methods=['POST'])
# # def chat():
# #     data = request.json

# #     if not data or "user_id" not in data or "message" not in data:
# #         return jsonify({"error": "Missing user_id or message"}), 400

# #     user_id = data["user_id"]
# #     user_message = data["message"]

# #     if user_id not in conversations:
# #         return jsonify({"error": "Chat not initialized for user. Please start a chat first using /start_chat"}), 400

# #     chat_data = conversations[user_id]
# #     chatbot_reply, final_price, highest_discount = chat_with_gemini(
# #         user_message, chat_data["history"], chat_data["initial_price"], chat_data["max_discount_price"], chat_data["highest_discount"]
# #     )

# #     # Update conversation state
# #     chat_data["highest_discount"] = highest_discount

# #     return jsonify({"reply": chatbot_reply, "current_final_price": final_price})


# # @app.route('/end_chat', methods=['POST'])
# # def end_chat():
# #     data = request.json
# #     if not data or "user_id" not in data:
# #         return jsonify({"error": "Missing user_id"}), 400

# #     user_id = data["user_id"]

# #     if user_id in conversations:
# #         final_price = conversations[user_id]["initial_price"] * (1 - conversations[user_id]["highest_discount"] / 100)
# #         if final_price < conversations[user_id]["max_discount_price"]:
# #             final_price = conversations[user_id]["max_discount_price"]

# #         del conversations[user_id]  # Remove conversation history

# #         return jsonify({"message": "Chat ended!", "final_price": final_price})

# #     return jsonify({"error": "No active chat for user"}), 400


# # if __name__ == '__main__':
# #     app.run(debug=True)






# from flask import Flask, request, jsonify
# from flask_cors import CORS
# import google.generativeai as genai
# from dotenv import load_dotenv
# import re
# import os

# app = Flask(__name__)
# CORS(app) 

# # Load API key
# load_dotenv()
# API_KEY = os.getenv("GOOGLE_API_KEY")  # Store API Key in .env file
# genai.configure(api_key=API_KEY)

# # Store conversations (in-memory)
# conversations = {}

# # Chatbot function
# def chat_with_gemini(user_message, conversation_history, initial_price, max_discount_price, highest_discount=0):
#     context = '\n--'.join(['{}: {}'.format(x["role"], x["parts"][0]) for x in conversation_history])

#     prompt = f"""
#         INSTRUCTIONS \n
#         -- You are a helpful and professional chatbot working on behalf of the seller. \n
#         -- The initial assigned price of the product is {initial_price}. \n
#         -- The maximum discount price (lowest acceptable price) is {max_discount_price}. Never go below this price. \n
#         -- Start with a reasonable discount (e.g., 5-10%) when the user begins negotiating. If they continue, consider increasing the discount. \n
#         -- You can offer a maximum discount of up to 30%, but never exceed this unless the final price is still above {max_discount_price}. \n
#         -- Be more flexible in negotiation but ensure profitability for the seller. \n
#         -- Negotiate dynamically based on the user's persistence. \n
#         -- Keep the conversation friendly and professional. \n
#         CONTEXT \n
#         {context}\n
#         -- Respond to the following user message: \n
#         {user_message}
#     """

#     # Create the model
#     generation_config = {
#         "temperature": 1,
#         "top_p": 0.95,
#         "top_k": 64,
#         "max_output_tokens": 100,
#         "response_mime_type": "text/plain",
#     }

#     model = genai.GenerativeModel(
#         model_name="gemini-1.5-pro",
#         generation_config=generation_config,
#         system_instruction=prompt,
#     )

#     formatted_history = [{"role": msg["role"], "parts": [msg["parts"][0]]} for msg in conversation_history]
#     chat_session = model.start_chat(history=formatted_history)

#     response = chat_session.send_message(user_message)
#     chatbot_reply = response.text.strip()

#     # Extract discount percentage
#     discount_match = re.search(r'(\d+)%', chatbot_reply)
#     if discount_match:
#         discount = int(discount_match.group(1))
#         if discount > highest_discount:
#             highest_discount = discount

#     final_price = initial_price * (1 - highest_discount / 100)
#     if final_price < max_discount_price:
#         final_price = max_discount_price

#     # Update conversation history
#     conversation_history.append({"role": "user", "parts": [user_message]})
#     conversation_history.append({"role": "model", "parts": [chatbot_reply]})

#     return chatbot_reply, final_price, highest_discount


# @app.route('/start_chat', methods=['POST'])
# def start_chat():
#     data = request.json
#     if not data or "user_id" not in data or "initial_price" not in data or "max_discount_price" not in data:
#         return jsonify({"error": "Missing user_id, initial_price, or max_discount_price"}), 400

#     user_id = data["user_id"]
#     initial_price = float(data["initial_price"])
#     max_discount_price = float(data["max_discount_price"])

#     # Initialize conversation for new user
#     conversations[user_id] = {
#         "history": [],
#         "initial_price": initial_price,
#         "max_discount_price": max_discount_price,
#         "highest_discount": 0
#     }

#     return jsonify({"message": "Chat started!", "initial_price": initial_price, "max_discount_price": max_discount_price})


# @app.route('/chat', methods=['POST'])
# def chat():
#     data = request.json

#     if not data or "user_id" not in data or "message" not in data:
#         return jsonify({"error": "Missing user_id or message"}), 400

#     user_id = data["user_id"]
#     user_message = data["message"]

#     if user_id not in conversations:
#         return jsonify({"error": "Chat not initialized for user. Please start a chat first using /start_chat"}), 400

#     chat_data = conversations[user_id]
#     chatbot_reply, final_price, highest_discount = chat_with_gemini(
#         user_message, chat_data["history"], chat_data["initial_price"], chat_data["max_discount_price"], chat_data["highest_discount"]
#     )

#     # Update conversation state
#     chat_data["highest_discount"] = highest_discount

#     return jsonify({"reply": chatbot_reply, "current_final_price": final_price})


# @app.route('/end_chat', methods=['POST'])
# def end_chat():
#     data = request.json
#     if not data or "user_id" not in data:
#         return jsonify({"error": "Missing user_id"}), 400

#     user_id = data["user_id"]

#     if user_id in conversations:
#         final_price = conversations[user_id]["initial_price"] * (1 - conversations[user_id]["highest_discount"] / 100)
#         if final_price < conversations[user_id]["max_discount_price"]:
#             final_price = conversations[user_id]["max_discount_price"]

#         del conversations[user_id]  # Remove conversation history

#         return jsonify({"message": "Chat ended!", "final_price": final_price})

#     return jsonify({"error": "No active chat for user"}), 400


# if __name__ == '__main__':
#     app.run(debug=True)




# With database connection
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import google.generativeai as genai
from dotenv import load_dotenv
import re
import os



app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
# from flask_cors import CORS

# ✅ Configure CORS with specific origin and methods

# ✅ Add CORS headers to all responses
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, PUT, DELETE, OPTIONS'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Credentials'] = 'true'
    return response


CORS(app)

# ✅ Load API key
load_dotenv()
API_KEY = os.getenv("GOOGLE_API_KEY")  # Store API Key in .env file
genai.configure(api_key=API_KEY)

# ✅ MongoDB connection
MONGO_URI = "mongodb+srv://vairaperumals:zUmYx7ufw4A41Hp6@cluster0.2rwom.mongodb.net/seller?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI)
db = client["seller"]  # Database name
sellers_collection = db["products"]  # Collection name

# ✅ Store conversations (in-memory)
conversations = {}

# ✅ Chatbot function with dynamic MongoDB query
def chat_with_gemini(user_message, conversation_history, initial_price, max_discount_price, highest_discount=0):
    context = '\n--'.join(['{}: {}'.format(x["role"], x["parts"][0]) for x in conversation_history])

    # ✅ Detect product name dynamically
    try:
        # Extract all product names
        product_names = sellers_collection.distinct("productName")
        print("Available products:", product_names)  # Debug log

        # Match product in the user message
        category = next((p for p in product_names if p.lower() in user_message.lower()), None)

    except Exception as e:
        print("Error fetching product names:", e)
        category = None

    # ✅ Fetch product details from MongoDB
    products = []
    if category:
        try:
            query = {"productName": {"$regex": re.escape(category), "$options": "i"}}
            products = list(sellers_collection.find(query))

        except Exception as e:
            print("Error fetching products:", e)

    # ✅ Respond with product details or continue chat
    if products:
        # Display products dynamically
        product_list = "\n".join(
            [
                f"{p['productName']} - ₹{p['originalPrice']} "
                f"Seller: {p['name']} (📞 {p['phone']}, 📍 {p['location']})"
                f"👉 <a href='http://localhost:3000/detail/{str(p['_id'])}' target='_blank'>View Details</a>" 

                for p in products
            ]
        )
        chatbot_reply = f"Here are the {category}s available:\n\n{product_list}"

    else:
        # ✅ Fallback to negotiation flow if no products are found
        prompt = f"""
        INSTRUCTIONS \n
        -- You are a helpful and professional chatbot working on behalf of the seller. \n
        -- The initial assigned price of the product is {initial_price}. \n
        -- The maximum discount price (lowest acceptable price) is {max_discount_price}. Never go below this price. \n
        -- Start with a reasonable discount (e.g., 5-10%) when the user begins negotiating. If they continue, consider increasing the discount. \n
        -- You can offer a maximum discount of up to 30%, but never exceed this unless the final price is still above {max_discount_price}. \n
        -- Be flexible in negotiation but ensure profitability for the seller. \n
        -- Keep the conversation friendly and professional. \n
        CONTEXT \n
        {context}\n
        -- Respond to the following user message: \n
        {user_message}
        """

        generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 200,
            "response_mime_type": "text/plain",
        }

        model = genai.GenerativeModel(
            model_name="gemini-1.5-pro",
            generation_config=generation_config,
            system_instruction=prompt,
        )

        formatted_history = [{"role": msg["role"], "parts": [msg["parts"][0]]} for msg in conversation_history]
        chat_session = model.start_chat(history=formatted_history)

        response = chat_session.send_message(user_message)
        chatbot_reply = response.text.strip()

    # ✅ Extract discount percentage
    discount_match = re.search(r'(\d+)%', chatbot_reply)
    if discount_match:
        discount = int(discount_match.group(1))
        if discount > highest_discount:
            highest_discount = discount

    final_price = initial_price * (1 - highest_discount / 100)
    if final_price < max_discount_price:
        final_price = max_discount_price

    # ✅ Update conversation history
    conversation_history.append({"role": "user", "parts": [user_message]})
    conversation_history.append({"role": "model", "parts": [chatbot_reply]})

    return chatbot_reply, final_price, highest_discount


# # ✅ API to fetch products by category dynamically
# @app.route('/products/<category>', methods=['GET'])
# def get_products_by_category(category):
#     """Fetch products by category from MongoDB."""
#     try:
#         query = {"productName": {"$regex": re.escape(category), "$options": "i"}}
#         products = list(sellers_collection.find(query))

#         if not products:
#             return jsonify({"message": "No products found"}), 404

#         product_list = []
#         for product in products:
#             product_list.append({
#                 "seller_name": product["name"],
#                 "phone": product["phone"],
#                 "email": product["email"],
#                 "location": product["location"],
#                 "product": product["productName"],
#                 "original_price": product["originalPrice"],
#                 "discount_price": product["discountPrice"],
#                 "description": product["description"],
#                 "date": product["date"],
#                 "image": product["image"]
#             })

#         return jsonify(product_list)

#     except Exception as e:
#         return jsonify({"error": str(e)}), 500








@app.route('/products/<category>', methods=['GET'])
def get_products_by_category(category):
    """Fetch products by category from MongoDB."""
    try:
        # ✅ Strip trailing spaces and newlines
        clean_category = category.strip()

        # ✅ Case-insensitive and exact matching
        query = {"productName": {"$regex": f"^{re.escape(clean_category)}$", "$options": "i"}}
        
        products = list(sellers_collection.find(query))

        if not products:
            return jsonify({"message": "No products found"}), 404

        product_list = []
        for product in products:
            product_list.append({
                "seller_name": product.get("name", "N/A"),
                "phone": product.get("phone", "N/A"),
                "email": product.get("email", "N/A"),
                "location": product.get("location", "N/A"),
                "product": product.get("productName", "N/A"),
                "original_price": product.get("originalPrice", 0),
                "discount_price": product.get("discountPrice", 0),
                "description": product.get("description", "No description available"),
                "date": product.get("date", "N/A"),
                "image": product.get("image", "no-image.jpg")
            })

        return jsonify(product_list)

    except Exception as e:
        return jsonify({"error": str(e)}), 500


# ✅ Start chat endpoint
@app.route('/start_chat', methods=['POST'])
def start_chat():
    data = request.json
    if not data or "user_id" not in data or "initial_price" not in data or "max_discount_price" not in data:
        return jsonify({"error": "Missing user_id, initial_price, or max_discount_price"}), 400

    user_id = data["user_id"]
    initial_price = float(data["initial_price"])
    max_discount_price = float(data["max_discount_price"])

    # ✅ Initialize conversation for new user
    conversations[user_id] = {
        "history": [],
        "initial_price": initial_price,
        "max_discount_price": max_discount_price,
        "highest_discount": 0
    }

    return jsonify({"message": "Chat started!", "initial_price": initial_price, "max_discount_price": max_discount_price})


# ✅ Chat route
# @app.route('/chat', methods=['POST'])
# def chat():
#     data = request.json

#     if not data or "user_id" not in data or "message" not in data:
#         return jsonify({"error": "Missing user_id or message"}), 400

#     user_id = data["user_id"]
#     user_message = data["message"]

#     if user_id not in conversations:
#         return jsonify({"error": "Chat not initialized for user. Please start a chat first using /start_chat"}), 400

#     chat_data = conversations[user_id]
#     chatbot_reply, final_price, highest_discount = chat_with_gemini(
#         user_message, chat_data["history"], chat_data["initial_price"], chat_data["max_discount_price"], chat_data["highest_discount"]
#     )

#     # ✅ Update conversation state
#     chat_data["highest_discount"] = highest_discount

#     return jsonify({"reply": chatbot_reply, "current_final_price": final_price})






# @app.route('/chat', methods=['POST'])
# def chat():
#     if request.method == 'OPTIONS':
#         response = jsonify({'message': 'CORS preflight passed'})
#         response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
#         response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
#         response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
#         return response, 200
#     data = request.json

#     if not data or "user_id" not in data or "message" not in data:
#         return jsonify({"error": "Missing user_id or message"}), 400

#     user_id = data["user_id"]
#     user_message = data["message"]

#     if user_id not in conversations:
#         return jsonify({"error": "Chat not initialized for user. Please start a chat first using /start_chat"}), 400

#     chat_data = conversations[user_id]
#     chatbot_reply, final_price, highest_discount = chat_with_gemini(
#         user_message, 
#         chat_data["history"], 
#         chat_data["initial_price"], 
#         chat_data["max_discount_price"], 
#         chat_data["highest_discount"]
#     )

#     # ✅ Update conversation state
#     chat_data["highest_discount"] = highest_discount

#     # ✅ Add payment link if the user agrees
#     payment_link = f"http://localhost:3000/payment?user_id={user_id}&price={final_price}"

#     # Use regex to detect agreement-related phrases
#     if re.search(r'\b(agree|accept|confirm|yes|final price|proceed)\b', user_message, re.IGNORECASE):
#         chatbot_reply += f"\n\n✅ You can proceed to payment using the link below:\n👉 [Pay Now]({payment_link})"

#     return jsonify({
#         "reply": chatbot_reply, 
#         "current_final_price": final_price
#     })



@app.route('/chat', methods=['POST'])
def chat():
    if request.method == 'OPTIONS':
        response = jsonify({'message': 'CORS preflight passed'})
        response.headers['Access-Control-Allow-Origin'] = 'http://localhost:3000'
        response.headers['Access-Control-Allow-Methods'] = 'POST, GET, OPTIONS'
        response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
        return response, 200

    data = request.json

    if not data or "user_id" not in data or "message" not in data:
        return jsonify({"error": "Missing user_id or message"}), 400

    user_id = data["user_id"]
    user_message = data["message"]

    if user_id not in conversations:
        return jsonify({"error": "Chat not initialized for user. Please start a chat first using /start_chat"}), 400

    chat_data = conversations[user_id]

    # ✅ Get chatbot response and updated prices
    chatbot_reply, final_price, highest_discount = chat_with_gemini(
        user_message, 
        chat_data["history"], 
        chat_data["initial_price"], 
        chat_data["max_discount_price"], 
        chat_data["highest_discount"]
    )

    # ✅ Update conversation state
    chat_data["highest_discount"] = highest_discount

    # ✅ Properly recalculate and update final price
    final_price = round(chat_data["initial_price"] * (1 - highest_discount / 100), 2)

    # Ensure the price does not go below max_discount_price
    if final_price < chat_data["max_discount_price"]:
        final_price = chat_data["max_discount_price"]

    # ✅ Update the final price in the conversation state
    chat_data["final_price"] = final_price

    # ✅ Generate the payment link with the accurate final price
    #  payment_link =  f"👉 <a href='http://localhost:3000/api/products/{str(p['_id'])}' target='_blank'>View Details</a>" 

    # ✅ Use regex to detect agreement-related phrases
    if re.search(r'\b(agree|accept|confirm|yes|final price|proceed)\b', user_message, re.IGNORECASE):
        payment_url = f"http://localhost:3000/payment?user_id={user_id}&price={final_price}"
        chatbot_reply += f"""\n\n✅ You can proceed to payment using the link below:\n👉 f"👉 <a href='{payment_url}' target='_blank'>Make a payment</a>"""






    return jsonify({
        "reply": chatbot_reply, 
        "current_final_price": final_price
    })



# Real-time transcription route
@app.route('/start_transcription', methods=['POST'])
def start_transcription():
    data = request.json
    if "user_id" not in data:
        return jsonify({"error": "Missing user_id"}), 400

    user_id = data["user_id"]

    # Start the speech recognition process in a separate thread
    thread = threading.Thread(target=transcribe_real_time, args=(user_id,))
    thread.start()

    return jsonify({"message": "Started speech transcription!"})


# Function for real-time transcription (speech to text)
def transcribe_real_time(user_id):
    recognizer = sr.Recognizer()
    with sr.Microphone() as source:
        print("🔴 Listening for your speech...")
        recognizer.adjust_for_ambient_noise(source)

        try:
            audio = recognizer.listen(source, timeout=5)  # Wait for the user's speech
            print("⏳ Transcribing...")

            transcription = recognizer.recognize_google(audio)
            print(f"💬 You said: {transcription}")

            # Send transcribed message to chatbot
            response = chat_with_gemini(
                transcription, conversations[user_id]["history"], conversations[user_id]["initial_price"],
                conversations[user_id]["max_discount_price"], conversations[user_id]["highest_discount"]
            )

            chatbot_reply = response[0]
            final_price = response[1]

            # Return bot's response
            print(f"🤖 Bot replied: {chatbot_reply}")
            return jsonify({"reply": chatbot_reply, "current_final_price": final_price})

        except sr.UnknownValueError:
            print("❌ Could not understand the audio.")
        except sr.RequestError as e:
            print(f"❌ Could not request results; {e}")


# ✅ End chat route
@app.route('/end_chat', methods=['POST'])
def end_chat():
    data = request.json
    if not data or "user_id" not in data:
        return jsonify({"error": "Missing user_id"}), 400

    user_id = data["user_id"]

    if user_id in conversations:
        del conversations[user_id]

        return jsonify({"message": "Chat ended!"})

    return jsonify({"error": "No active chat for user"}), 400


if __name__ == '__main__':
    app.run(debug=True)
