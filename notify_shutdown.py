import requests
from datetime import datetime

def notify_shutdown():
    url = "http://localhost:8001/server/registerExecution"
    data = { 
        "instanceId": "i-1234567890abcdef0",
        "time": datetime.now().isoformat(),
        "type": "shutdown"
    }
    try:
        response = requests.post(url, json=data)
        print(f"Server notified: {response.status_code}")
    except requests.RequestException as e:
        print(f"Error notifying server: {e}")

if __name__ == "__main__":
    notify_shutdown()


