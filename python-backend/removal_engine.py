from typing import Dict, Any, List, Optional
import asyncio
import uuid
from datetime import datetime, timedelta
import random

# Mock database of data brokers
data_brokers = {
    "1": {
        "id": "1",
        "name": "Acxiom",
        "category": "Data Broker",
        "removal_process": "email",
        "removal_email": "optout@acxiom.com",
        "removal_template": "I request the removal of my personal information from your database pursuant to CCPA/GDPR regulations. My information includes: {name}, {email}, {address}, {phone}."
    },
    "2": {
        "id": "2",
        "name": "Experian",
        "category": "Credit Bureau",
        "removal_process": "form",
        "removal_url": "https://www.experian.com/privacy/opting-out",
        "removal_template": "N/A - Web form required"
    },
    "3": {
        "id": "3",
        "name": "Spokeo",
        "category": "People Search",
        "removal_process": "email",
        "removal_email": "privacy@spokeo.com",
        "removal_template": "Please remove my information from your database. My information includes: {name}, {email}, {address}. This is a formal opt-out request."
    },
    "4": {
        "id": "4",
        "name": "Whitepages",
        "category": "People Search",
        "removal_process": "form",
        "removal_url": "https://www.whitepages.com/suppression-requests",
        "removal_template": "N/A - Web form required"
    },
    "5": {
        "id": "5",
        "name": "Intelius",
        "category": "People Search",
        "removal_process": "email",
        "removal_email": "privacy@intelius.com",
        "removal_template": "I am requesting the removal of my personal information from your database. My information includes: {name}, {email}, {address}, {phone}."
    }
}

# Mock storage for removal requests
# In a real implementation, this would be a database
removal_requests = {}

async def send_removal_request(broker_id: str, user_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Send a removal request to a data broker.
    
    In a real implementation, this would send actual emails or API requests.
    For this demo, we'll simulate the process.
    """
    # Simulate processing time
    await asyncio.sleep(0.5)
    
    # Check if broker exists
    if broker_id not in data_brokers:
        return {
            "broker_id": broker_id,
            "success": False,
            "status": "failed",
            "message": "Broker not found"
        }
    
    broker = data_brokers[broker_id]
    
    # Generate removal request content
    request_content = ""
    if broker.get("removal_template"):
        # Format the template with user data
        name = f"{user_data.get('first_name', '')} {user_data.get('last_name', '')}"
        request_content = broker["removal_template"] \
            .replace("{name}", name.strip()) \
            .replace("{email}", user_data.get("email", "")) \
            .replace("{phone}", user_data.get("phone", "")) \
            .replace("{address}", user_data.get("address", ""))
    
    # Simulate success/failure (90% success rate)
    success = random.random() < 0.9
    
    result = {
        "broker_id": broker_id,
        "broker_name": broker["name"],
        "success": success,
        "status": "pending" if success else "failed",
        "request_date": datetime.now().isoformat(),
        "request_content": request_content,
        "message": f"Removal request {'submitted' if success else 'failed'} to {broker['name']}"
    }
    
    # Store the request for status tracking
    request_id = str(uuid.uuid4())
    removal_requests[request_id] = {
        "request_id": request_id,
        "broker_id": broker_id,
        "broker_name": broker["name"],
        "status": result["status"],
        "request_date": result["request_date"],
        "user_data": user_data,
        "request_content": request_content
    }
    
    # Add request_id to the result
    result["request_id"] = request_id
    
    return result

async def get_removal_status(request_id: str) -> Dict[str, Any]:
    """
    Get the status of a removal request.
    
    In a real implementation, this would query a database.
    For this demo, we'll use our mock storage.
    """
    # Simulate processing time
    await asyncio.sleep(0.3)
    
    # Check if request exists
    if request_id not in removal_requests:
        return {
            "request_id": request_id,
            "success": False,
            "message": "Request not found"
        }
    
    request = removal_requests[request_id]
    
    # Simulate status updates based on time elapsed
    request_date = datetime.fromisoformat(request["request_date"])
    days_elapsed = (datetime.now() - request_date).days
    
    # Update status based on time elapsed
    if request["status"] == "pending":
        if days_elapsed >= 1:
            request["status"] = "in_progress"
    elif request["status"] == "in_progress":
        if days_elapsed >= 3:
            # 80% chance of completion after 3 days
            if random.random() < 0.8:
                request["status"] = "completed"
                request["completion_date"] = datetime.now().isoformat()
            # 20% chance of failure
            else:
                request["status"] = "failed"
    
    return {
        "request_id": request_id,
        "broker_id": request["broker_id"],
        "broker_name": request["broker_name"],
        "status": request["status"],
        "request_date": request["request_date"],
        "completion_date": request.get("completion_date"),
        "message": f"Removal request is {request['status']}"
    }

async def batch_removal_requests(broker_ids: List[str], user_data: Dict[str, Any]) -> Dict[str, Any]:
    """
    Send removal requests to multiple data brokers in parallel.
    
    Args:
        broker_ids: List of broker IDs to send removal requests to
        user_data: User data to include in the removal requests
        
    Returns:
        Dictionary with results of the batch operation
    """
    # Create tasks for each broker
    tasks = [send_removal_request(broker_id, user_data) for broker_id in broker_ids]
    
    # Execute all tasks concurrently
    results = await asyncio.gather(*tasks)
    
    # Generate a batch ID
    batch_id = str(uuid.uuid4())
    
    return {
        "batch_id": batch_id,
        "request_date": datetime.now().isoformat(),
        "broker_count": len(broker_ids),
        "success_count": sum(1 for result in results if result["success"]),
        "results": results
    }

async def get_removal_templates() -> Dict[str, Any]:
    """
    Get templates for removal requests for all supported data brokers.
    
    Returns:
        Dictionary with templates for each broker
    """
    templates = {}
    
    for broker_id, broker in data_brokers.items():
        if broker.get("removal_template") and broker.get("removal_template") != "N/A - Web form required":
            templates[broker_id] = {
                "broker_id": broker_id,
                "broker_name": broker["name"],
                "template": broker["removal_template"]
            }
    
    return {
        "count": len(templates),
        "templates": templates
    }