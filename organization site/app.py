from flask import Flask, render_template, request, jsonify,redirect
from dbhelper import DBhelper

app = Flask(__name__)
db=DBhelper()

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/register', methods=['POST'])
def handle_registration():
    ngoName = request.json['ngoName']
    checkboxs = request.json['checkboxs']
    phn_no = request.json['phn_no']
    password = request.json['password']
    goal = request.json['goal']
    fundingSource = request.json['fundingSource']
    achievements = request.json['achievements']

    checkbox= ",".join(checkboxs)
    print(ngoName,checkbox,phn_no,goal,fundingSource,achievements,password)
    response =db.register(ngoName,checkbox,phn_no,goal,fundingSource,achievements,password)
    if response == 1:
        print("Registration successful.")
    else:
        print("Registration failed.")
    return jsonify({'success': response})

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        phone = request.json.get('phone')
        password = request.json.get('password')
        print(phone,password)
        data = db.search(phone, password)
        print(data)
        if data==0:
            return jsonify({'success': False, 'message': 'Invalid phone no or password'})
        else:
            return jsonify({'success': True, 'message': 'Login successful'})

@app.route('/map/<phone>/<password>')
def map(phone,password):
    print(phone,password)
    result=[]
    data = db.require(phone, password)
    print(data)
    result.append(data[1])
    result.append(data[0])
    return render_template('index.html',data=result)


@app.route('/food', methods=['GET'])
def food():
    data=db.select("food&nutrition")
    return jsonify(data)

@app.route('/water', methods=['GET'])
def water():
    data=db.select("water")
    return jsonify(data)

@app.route('/medics', methods=['GET'])
def medics():
    data=db.select("medical")
    return jsonify(data)

@app.route('/sanitary', methods=['GET'])
def sanitary():
    data=db.select("sanitary")
    return jsonify(data)


@app.route('/emergency')
def emergency():
    return render_template('emergency.html')

@app.route('/emergencyy')
def emergencyy():
    data=db.emergency()
    print(data)
    return jsonify(data)


@app.route('/update_map/essential', methods=['POST'])
def update_map_essential():
    map_data=[]
    data = request.get_json()  # Assuming JSON data is sent in the request body
    if data and 'latitude' in data and 'longitude' in data and 'food_nutrition' in data and 'water' in data and 'medical_health_supplies' in data and 'sanitary' in data:
        map_entry = {
            'latitude': data['latitude'],
            'longitude': data['longitude'],
            'food_nutrition': data['food_nutrition'],
            'water': data['water'],
            'medical_health_supplies': data['medical_health_supplies'],
            'sanitary': data['sanitary'],
            'fullname': data.get('fullname', ''),
            'address': data.get('address', ''),
            'phone': data.get('phone', ''),
            'family': data.get('family', ''),
            'children': data.get('children', False)
        }
        map_data.append(map_entry)
        print(f"Received essential data: {map_entry}")
        if map_entry['food_nutrition']==True:
            map_entry['food_nutrition']="1"
        else:
            map_entry['food_nutrition'] = "0"

        if map_entry['medical_health_supplies']==True:
            map_entry['medical_health_supplies']="1"
        else:
            map_entry['medical_health_supplies'] = "0"

        if map_entry['water']==True:
            map_entry['water']="1"
        else:
            map_entry['water'] = "0"

        if map_entry['sanitary']==True:
            map_entry['sanitary']="1"
        else:
            map_entry['sanitary'] = "0"

        data=db.essential(map_entry['fullname'],map_entry['family'],map_entry['latitude'],map_entry['longitude'],map_entry['food_nutrition'],map_entry['water'],map_entry['medical_health_supplies'],map_entry['sanitary'])
        return jsonify({"message": "Essential map updated successfully"}), 200
    else:
        return jsonify({"error": "Invalid essential data"}), 400

@app.route('/update_map/emergency', methods=['POST'])
def update_map_emergency():
    essential_data=[]
    data = request.get_json()  # Assuming JSON data is sent in the request body
    if data and 'latitude' in data and 'longitude' in data and 'emergencyTransport' in data and 'healthMedicalSupplies' in data and 'criticalSituation' in data:
        map_entry = {
            'latitude': data['latitude'],
            'longitude': data['longitude'],
            'emergencyTransport': data['emergencyTransport'],
            'healthMedicalSupplies': data['healthMedicalSupplies'],
            'criticalSituation': data['criticalSituation'],
            'fullname': data.get('fullname', ''),
            'address': data.get('address', ''),
            'phone': data.get('phone', ''),
            'family': data.get('family', ''),
            'children': data.get('children', False)
        }
        essential_data.append(map_entry)
        if map_entry['emergencyTransport'] == True:
            map_entry['emergencyTransport'] = "1"
        else:
            map_entry['emergencyTransport'] = "0"

        if map_entry['healthMedicalSupplies'] == True:
            map_entry['healthMedicalSupplies'] = "1"
        else:
            map_entry['healthMedicalSupplies'] = "0"

        if map_entry['criticalSituation'] == True:
            map_entry['criticalSituation'] = "1"
        else:
            map_entry['criticalSituation'] = "0"
        data = db.emergencymap(map_entry['fullname'],map_entry['family'], map_entry['emergencyTransport'], map_entry['healthMedicalSupplies'],map_entry['criticalSituation'],map_entry['latitude'],map_entry['longitude'])
        print(f"Received emergency data: {map_entry}")
        return jsonify({"message": "Emergency map updated successfully"}), 200
    else:
        return jsonify({"error": "Invalid emergency data"}), 400
if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)